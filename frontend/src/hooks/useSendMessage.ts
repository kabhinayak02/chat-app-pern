import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string) => {
        setLoading(true);
        if (!selectedConversation) return;
        try {
            const res = await fetch(`${API_URL}/api/message/send/${selectedConversation.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };

}

export default useSendMessage;