import { useState, useEffect } from "react"
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<conversationType[]>([]);

    useEffect(() => {
        const getConversations = async () => {

            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/api/message/conversations`);
                const data = await res.json();

                if (data.error) throw new Error(data.error);

                setConversations(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getConversations();

    }, [])

    return { loading, conversations }
}

export default useGetConversations;