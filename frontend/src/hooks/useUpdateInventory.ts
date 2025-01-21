import { useState } from "react"
import toast from "react-hot-toast";
import { InventoryParams } from "../types";

interface UpdateProps {
    inventory: InventoryParams[],
    id: string
}

const useUpdateInventory = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL_1;

    const update = async ({inventory, id}: UpdateProps) => {
        const success = handleInputErrors(inventory);
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/store/my-stores/update-inventory/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("BK-token")}`
                },
                body: JSON.stringify(inventory)
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success(data.message);
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
    return { loading, update };
}

export default useUpdateInventory;


function handleInputErrors(inventory: InventoryParams[]) {
    if (inventory.length < 1 || !Array.isArray(inventory)) {
        toast.error("Atleast 1 item has to be added to the inventory");
        return false;
    }

    return true;
}