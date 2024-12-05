import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const useUpdateMyProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const updateMyProfile = async(username: string, fullname: string) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/auth/update-my-profile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, fullname })
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setAuthUser(data);

        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
    return { loading, updateMyProfile };
}

export default useUpdateMyProfile;