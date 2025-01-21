import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetSearch = () => {
    const [loading, setLoading] = useState();
    const networkUrl = import.meta.env.VITE_NETWORK_URL;

    const search = async (item) => {
        setLoading(true);
        try {
            const response = await axios.get(`${networkUrl}/warehouse/search-items`, {
                params: { item },
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

    return { loading, search }
}

export default useGetSearch;