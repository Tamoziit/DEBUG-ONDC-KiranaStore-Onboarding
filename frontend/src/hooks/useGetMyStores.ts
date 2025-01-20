import { useState } from "react";
import toast from "react-hot-toast";

const useGetMyStores = () => {
    const [loading, setLoading] = useState<boolean>();
    const apiUrl = import.meta.env.VITE_API_URL_1;

    const getMyStores = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/store/my-stores`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("BK-token")}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            if (error instanceof Error)
                toast.error(error.message);
            else
                console.log("An unknown error occured");
        } finally {
            setLoading(false);
        }
    }
    return { loading, getMyStores }
}

export default useGetMyStores;