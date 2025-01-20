import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { SignupParams } from "../types";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL_1;

    const signup = async ({
        name,
        mobileNo,
        password,
        age,
        gender,
        aadharNo
    }: SignupParams) => {
        const success = handleInputErrors({
            name,
            mobileNo,
            password,
            age,
            gender,
            aadharNo
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("BK-token")}`
                },
                body: JSON.stringify({
                    name,
                    mobileNo,
                    password,
                    age,
                    gender,
                    aadharNo
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("BK-token", data.token);
            localStorage.setItem("BK-user", JSON.stringify(data));
            setAuthUser(data);

            if (data) {
                toast.success("Signed up Successfully");
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
    return { loading, signup };
}

export default useSignup;


function handleInputErrors({
    name,
    mobileNo,
    password,
    age,
    gender,
    aadharNo
}: SignupParams) {
    if (!name || !mobileNo || !password || !age || !gender || !aadharNo) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (name.length < 2) {
        toast.error("Name should be atleast 2 characters long");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long");
        return false;
    }

    if (mobileNo.length != 10) {
        toast.error("Enter a valid Mobile no.");
        return false;
    }

    if(gender !== "M" && gender !== "F" && gender !== "O") {
        toast.error("Enter a valid form data");
        return false;
    }

    return true;
}