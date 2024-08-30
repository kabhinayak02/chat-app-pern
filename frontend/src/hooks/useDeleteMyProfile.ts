import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useDeleteMyProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const deleteMyProfile = async() => {
        try {
            setLoading(true);
            const res = await fetch('api/auth/delete-my-profile', {
                method: "delete"
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }
            setAuthUser(null);

        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
    return { loading, deleteMyProfile };
}

export default useDeleteMyProfile;