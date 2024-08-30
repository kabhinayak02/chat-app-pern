import { create } from "zustand";

// export type conversationType = {
//     id: string;
//     fullname: string;
//     profilePic: string;
// }

// type MessageType = {
//     id: string;
//     body: string;
//     senderId: string;
// }
interface ConversationState {
    selectedConversation: conversationType | null;
    messages: MessageType[];
    setSelectedConversation: (conversation: conversationType | null) => void;
    setMessages: (messages: MessageType[]) => void;
}
const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages: messages }),
}));

export default useConversation;