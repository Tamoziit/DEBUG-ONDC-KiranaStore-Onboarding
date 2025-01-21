// src/components/ProductPage.jsx
import { products } from "../data/constants";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
    return (
        <div>
            <header className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
                    Welcome to the Product Store
                </h1>
                <p className="text-lg text-gray-200 mt-3">
                    Choose from our range of exclusive products.
                </p>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </main>
        </div>
    );
};

export default ProductPage;
