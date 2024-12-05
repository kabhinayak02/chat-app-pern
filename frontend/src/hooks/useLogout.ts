import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_URL;

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }
            setAuthUser(null);
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
}

export default useLogout;