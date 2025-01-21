/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { ShoppingCart, Heart, Search, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
import Button from './Button';
import Input from './Input';
import useGetLatest from '../hooks/useGetLatest';
import useGetSearch from '../hooks/useGetSearch';
import useHandlePay from '../hooks/useHandlePayment';

const ProductStore = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCart, setShowCart] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { loading: latestLoading, latest } = useGetLatest();
    const { loading: searchLoading, search } = useGetSearch();
    const { payLoading, handlePay } = useHandlePay();

    const handlePayInit = async () => {
		const response = await handlePay(cart[0]);

		if (response.url) {
			window.location.href = response.url;
		}
	};

    const getLastestProducts = async () => {
        const data = await latest();
        setProducts(data);
    };

    useEffect(() => {
        getLastestProducts();
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            getLastestProducts();
        }

        const searchResults = await search(searchTerm);
        if (searchResults) {
            setProducts(searchResults);
        }
    };

    const categories = ["All", ...new Set(products.map((product) => product.item))];

    const filteredProducts = products?.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.item === selectedCategory;
        return matchesCategory;
    });

    const addToCart = (product) => {
        if (!cart.some((item) => item._id === product._id)) {
            setCart([...cart, { ...product, quantityInCart: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item._id !== productId));
    };

    const updateCartQuantity = (productId, quantity) => {
        setCart(cart.map(item =>
            item._id === productId ? { ...item, quantityInCart: quantity } : item
        ));
    };

    console.log(cart);

    const CartSidebar = () => (
        <div
            className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                showCart ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Shopping Cart ({cart.length})</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {cart.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                            <img src={item.url} alt={item.item} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.item}</h3>
                                <p className="text-sm text-gray-600">Store: {item.storeName}</p>
                                <p className="text-sm text-gray-600">Warehouse: {item.warehouseCode}</p>
                                <p className="text-sm text-gray-600">MRP: ₹{item.mrp}</p>
                                <p className="text-sm text-gray-600">
                                    In Cart: {item.quantityInCart} / Available: {item.quantity}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            item.quantityInCart > 1 &&
                                            updateCartQuantity(item._id, item.quantityInCart - 1)
                                        }
                                    >
                                        -
                                    </Button>
                                    <span>{item.quantityInCart}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            item.quantityInCart < item.quantity &&
                                            updateCartQuantity(item._id, item.quantityInCart + 1)
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => removeFromCart(item._id)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-4">
                    <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold">
                            ₹
                            {cart.reduce((sum, item) => sum + item.mrp * item.quantityInCart, 0).toFixed(2)}
                        </span>
                    </div>
                    <Button className="w-full" size="lg" onClick={handlePayInit} disabled={payLoading}>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
                        <div className="flex items-center gap-6">
                            <div className="relative w-96">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                {searchLoading && <span className="text-sm text-gray-400">Searching...</span>}
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleSearch}>
                                <Search className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Heart className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setShowCart(true)}>
                                <div className="relative">
                                    <ShoppingCart className="h-6 w-6" />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className="whitespace-nowrap"
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product._id}
                            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader className="p-0 relative">
                                <img
                                    src={product.url}
                                    alt={product.item}
                                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </CardHeader>
                            <CardContent className="p-6">
                                <CardTitle className="text-xl">{product.item}</CardTitle>
                                <CardDescription className="mb-2">Store: {product.storeName}</CardDescription>
                                <CardDescription className="mb-2">Warehouse: {product.warehouseCode}</CardDescription>
                                <CardDescription className="mb-4">Available: {product.quantity}</CardDescription>
                                <div className="text-2xl font-bold">₹{product.mrp}</div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Button
                                    className="w-full"
                                    onClick={() => addToCart(product)}
                                    disabled={cart.some((item) => item._id === product._id)}
                                >
                                    {cart.some((item) => item._id === product._id) ? "In Cart" : "Add to Cart"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

            <CartSidebar />
        </div>
    );
};

export default ProductStore;