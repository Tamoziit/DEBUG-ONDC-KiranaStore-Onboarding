import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useHandlePay = () => {
    const [payLoading, setPayLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_NETWORK_URL;

    const handlePay = async (prodInfo) => {
        const body = {
            id: prodInfo._id,
            product_name: prodInfo.item, 
            storeId: prodInfo.storeId, 
            product_description: `${prodInfo.storeName} | ${prodInfo.warehouseCode}`, 
            price: prodInfo.mrp, 
            quantity: prodInfo.quantityInCart, 
            imageUrl: prodInfo.url
        };

        setPayLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/payments/checkout`, body, {
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

    return { payLoading, handlePay };
};

export default useHandlePay;