import { Route, Routes } from 'react-router-dom';
import ProductStore from './components/ProductStore'
import { Toaster } from 'react-hot-toast';
import PaymentSuccess from './payments/PaymentSuccess';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductStore />} />
        <Route path="/complete-payment" element={<PaymentSuccess />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App;