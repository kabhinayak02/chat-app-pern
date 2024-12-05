import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation) return;
            setMessages([]);
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/api/message/${selectedConversation.id}`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "An error occurred");

                setMessages(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getMessages();
    }, [selectedConversation, setMessages])

    return {messages, loading}
}

export default useGetMessages