import { useState } from "react"
import toast from "react-hot-toast";
import { StoreRegistrationParams } from "../types";
import { useNavigate } from "react-router-dom";

const useRegisterStore = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL_1;

    const register = async ({
        name,
        gstNo,
        address,
        contactNo,
        warehouseId,
        inventory
    }: StoreRegistrationParams) => {
        const success = handleInputErrors({
            name,
            gstNo,
            address,
            contactNo,
            warehouseId,
            inventory
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/store/register-store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("BK-token")}`
                },
                body: JSON.stringify({
                    name,
                    gstNo,
                    address,
                    contactNo,
                    warehouseId,
                    inventory
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Store Registered Successfully");
                navigate(`/stores/my-stores/${data._id}`);
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
    return { loading, register };
}

export default useRegisterStore;


function handleInputErrors({
    name,
    gstNo,
    address,
    contactNo,
    warehouseId,
    inventory
}: StoreRegistrationParams) {
    if (!name || !gstNo || !address || !contactNo || !warehouseId) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (name.length < 2) {
        toast.error("Name should be atleast 2 characters long");
        return false;
    }

    if (inventory.length < 1 || !Array.isArray(inventory)) {
        toast.error("Atleast 1 item has to be added to the inventory");
        return false;
    }

    if (contactNo.length != 10) {
        toast.error("Enter a valid Mobile no.");
        return false;
    }

    return true;
}