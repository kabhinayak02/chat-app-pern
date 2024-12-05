import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

type SignupInputsType = {
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
};

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (inputs: SignupInputsType) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/auth/signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);
            setAuthUser(data);

        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
}

export default useSignup;