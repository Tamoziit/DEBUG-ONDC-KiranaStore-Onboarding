import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetLatest = () => {
    const [loading, setLoading] = useState();
    const networkUrl = import.meta.env.VITE_NETWORK_URL;

    const latest = async (limit = 3) => {
        setLoading(true);
        try {
            const response = await axios.get(`${networkUrl}/warehouse/explore/latest`, {
                params: { limit },
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            return response.data;
        } catch (err) {
            console.error("Error fetching latest products:", err);
            toast.error(err.response?.data?.error || "Failed to fetch latest products");
        } finally {
            setLoading(false);
        }
    };

    return { loading, latest }
}

export default useGetLatest;