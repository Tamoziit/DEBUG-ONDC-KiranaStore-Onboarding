/* eslint-disable react/prop-types */
// src/components/ProductCard.jsx
const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
            <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-pink-600 font-semibold">{product.price}</p>
                <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:opacity-90">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
