import { products } from '../data/constants';

const ProductList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-4">${product.price.toFixed(2)}</p>
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
