/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useGetLatest from "../hooks/useGetLatest";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { loading, latest } = useGetLatest();

    const getLastestProducts = async () => {
        const data = await latest();
        setProducts(data);
    };

    useEffect(() => {
        getLastestProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {products.map(product => (
                <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img src={product.url} alt={product.item} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800">{product.item}</h2>
                        <p className="text-gray-600 mt-2">{product.storeName}</p>
                        <p className="text-gray-600 mt-2">Quantity: {product.quantity}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-4">₹{product.mrp.toFixed(2)}</p>
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
