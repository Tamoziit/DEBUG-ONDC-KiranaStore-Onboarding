import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LoginParams } from "../types";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL_1;

    const login = async ({ mobileNo, password }: LoginParams) => {
        const success = handleInputErrors({ mobileNo, password });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("BK-token")}`
                },
                body: JSON.stringify({ mobileNo, password })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("BK-token", data.token);
            localStorage.setItem("BK-user", JSON.stringify(data));
            setAuthUser(data);

            if (data) {
                toast.success("Logged in successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

export default useLogin;


function handleInputErrors({ mobileNo, password }: LoginParams) {
    if (!mobileNo || !password) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (mobileNo.length != 10) {
        toast.error("Enter a valid Mobile no.");
        return false;
    }

    if (password.length < 6) {
        toast.error("password should be atleast 6 characters long");
        return false;
    }

    return true;
}