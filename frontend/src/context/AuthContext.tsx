import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

type AuthUserType = {
    id: string;
    username: string;
    fullname: string;
    profilePic: string;
    gender: string;
}

const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({children}:{children:ReactNode}) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await fetch(`${API_URL}/api/auth/me`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error);
                    
                }
                setAuthUser(data);
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            } finally{
                setIsLoading(false);    
            }
        }

        fetchAuthUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authUser,
                isLoading,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};