import { useEffect, useState } from "react";
import { WarehouseProps } from "../../types";
import { useParams } from "react-router-dom";
import useGetMyWarehouse from "../../hooks/useGetMyWarehouse";
import Spinner from "../../components/Spinner";

const MyWarehouse = () => {
    const [warehouse, setWarehouse] = useState<WarehouseProps | null>(null);
    const { id } = useParams();
    const { loading, getMyWarehouse } = useGetMyWarehouse();

    const fetchWarehouse = async () => {
        const data = await getMyWarehouse(id!);
        setWarehouse(data);
    };

    useEffect(() => {
        fetchWarehouse();
    }, [id]);

    return (
        <div className="w-full min-h-screen px:4 md:px-8 py-4 text-gray-800"
            style={{
                backgroundImage: "url('/loginbg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-lg p-6 shadow-lg">
                {loading ? (
                    <div className="flex items-center justify-center w-full">
                        <Spinner size="large" />
                    </div>
                ) : warehouse ? (
                    <div className="container mx-auto mt-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Warehouse Details</h1>
                        <div className="border-2 border-gray-700 rounded-lg shadow-sm p-6 max-w-lg mx-auto">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Code: {warehouse.code}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                <strong>Contact No:</strong> {warehouse.contactNo}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Address:</strong> {warehouse.address}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Registered Stores:</strong> {warehouse.registeredStores.length}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Inventory Cost:</strong> ₹{warehouse.inventoryCost}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Income:</strong> ₹{warehouse.income}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Created At:</strong>{" "}
                                {new Date(warehouse.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full">
                        <h1>No Warehouse data found</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyWarehouse;