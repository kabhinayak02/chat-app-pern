import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
// Send message Controller 
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                }
            }
        });
        // Creating new conversation for first time, if previous conversation not found 
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId]
                    }
                }
            });
        }
        // create new Message for conversation
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id,
            }
        });
        // Add message to the conversation. 
        if (newMessage) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            });
        }
        // Socket.io logic
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(200).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Get messages Controller
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, userToChatId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });
        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getUsersForSidebar = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId,
                }
            },
            select: {
                id: true,
                fullname: true,
                profilePic: true,
            }
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({ error: "Internl Server Error" });
    }
};
