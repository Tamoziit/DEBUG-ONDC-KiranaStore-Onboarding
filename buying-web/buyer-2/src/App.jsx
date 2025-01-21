import ProductList from './components/ProductList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold mb-8">Shop Our Products</h1>
        <ProductList />
      </div>
    </div>
  );
}

export default App
