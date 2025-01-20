import { useNavigate } from "react-router-dom";
import { StoreProps } from "../types";

interface StoreCardProps {
    store: StoreProps;
}

const StoreCard = ({ store }: StoreCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-96 bg-white/30 backdrop-blur-md shadow-lg rounded-lg overflow-hidden p-6">
            <div className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
                style={{ backgroundImage: `url('/Store.png')` }}>
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-800">{store.name}</h2>
                <p className="text-gray-600"><strong>GST No:</strong> {store.gstNo}</p>
                <p className="text-gray-600"><strong>Address:</strong> {store.address}</p>
                <p className="text-gray-600"><strong>Contact No:</strong> {store.contactNo}</p>
                <p className="text-gray-600"><strong>Warehouse Code:</strong> {store.warehouseCode}</p>
            </div>

            <div className="mt-4 flex justify-center">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all" onClick={() => navigate(`/stores/my-stores/${store._id}`)}>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default StoreCard;
