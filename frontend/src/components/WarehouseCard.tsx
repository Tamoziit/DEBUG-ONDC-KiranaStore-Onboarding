import { useNavigate } from "react-router-dom";
import { Warehouse } from "../types";

interface WarehouseCardProps {
    warehouse: Warehouse;
}

const WarehouseCard = ({warehouse} : WarehouseCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300 text-center"
        >
            <h3 className="text-blue-500 text-lg font-semibold">{warehouse.code}</h3>
            <p className="text-gray-600 text-sm mt-2">
                <strong>Contact No:</strong> {warehouse.contactNo}
            </p>
            <p className="text-gray-600 text-sm mt-2">
                <strong>Address:</strong> {warehouse.address}
            </p>
            <p className="text-gray-600 text-sm mt-2">
                <strong>Stores Registered:</strong> {warehouse.registeredStores.length}
            </p>

            <button className="p-2 mt-3 -mb-1 bg-blue-600 text-gray-100 rounded-lg" onClick={() => navigate(`/stores/register/${warehouse._id}`)}>
                Register Store here
            </button>
        </div>
    )
}

export default WarehouseCard