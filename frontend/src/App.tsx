import SignupForm from './signup';
import Login from './login';
import StoreManagement from './store';
import WarehouseManagement from './warehouse';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/store" element={<StoreManagement />} />
        <Route path="/warehouse" element={<WarehouseManagement />} />
      </Routes>
    </>
  )
}

export default App;