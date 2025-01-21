import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useConfirmOrder = () => {
    const [payLoading, setPayLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_NETWORK_URL;

    const handleConfirm = async ({ itemId, storeId, quantity }) => {
        const body = {
            itemId,
            storeId,
            quantity
        }

        setPayLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/warehouse/process-order`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setPayLoading(false);
        }
    };

    return { payLoading, handleConfirm };
};

export default useConfirmOrder;