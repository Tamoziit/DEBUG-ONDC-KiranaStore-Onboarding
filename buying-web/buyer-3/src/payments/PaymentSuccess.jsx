import { useLocation } from "react-router-dom";
import { useState } from "react";
import useConfirmOrder from "../hooks/useConfirmPayment";

const PaymentSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const sessionId = queryParams.get("session_id");
    const itemId = queryParams.get("itemId");
    const storeId = queryParams.get("storeId");
    const quantity = queryParams.get("quantity");

    const [buyData, setBuyData] = useState(null);
    const { payLoading, handleConfirm } = useConfirmOrder();

    const handleConfirmPayment = async () => {
        const data = await handleConfirm({ itemId, storeId, quantity });
        setBuyData(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
                    Payment Success 🎉
                </h1>

                {buyData ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                            Invoice Details
                        </h2>
                        <p className="text-gray-700">
                            <strong>Item:</strong> {buyData.item}
                        </p>
                        <p className="text-gray-700">
                            <strong>Store:</strong> {buyData.store}
                        </p>
                        <p className="text-gray-700">
                            <strong>Warehouse:</strong> {buyData.warehouse} ({buyData.warehouseId})
                        </p>
                        <p className="text-gray-700">
                            <strong>Quantity:</strong> {buyData.quantity}
                        </p>
                        <p className="text-gray-700">
                            <strong>Total Cost:</strong> ₹{buyData.totalCost}
                        </p>
                        <img
                            src={buyData.url}
                            alt={buyData.item}
                            className="w-full rounded-md mt-4"
                        />
                    </div>
                ) : (
                    // Show initial details before confirming payment
                    <>
                        <div className="space-y-4">
                            <p className="text-gray-700 break-words">
                                <strong>Session ID:</strong>{" "}
                                <span className="block truncate">{sessionId}</span>
                            </p>
                            <p className="text-gray-700 break-words">
                                <strong>Item ID:</strong>{" "}
                                <span className="block truncate">{itemId}</span>
                            </p>
                            <p className="text-gray-700 break-words">
                                <strong>Store ID:</strong>{" "}
                                <span className="block truncate">{storeId}</span>
                            </p>
                            <p className="text-gray-700 break-words">
                                <strong>Quantity:</strong> {quantity}
                            </p>
                        </div>
                        <button
                            className={`mt-6 w-full py-2 px-4 rounded-lg text-white font-semibold ${payLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                            onClick={handleConfirmPayment}
                            disabled={payLoading}
                        >
                            {payLoading ? "Confirming..." : "Confirm Payment"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;