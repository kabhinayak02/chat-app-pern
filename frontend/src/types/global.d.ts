type conversationType = {
    id: string;
    fullname: string;
    profilePic: string;
}

type MessageType = {
    id: string;
    body: string;
    senderId: string;
    createdAt: string;
    shouldShake?: boolen;
}
