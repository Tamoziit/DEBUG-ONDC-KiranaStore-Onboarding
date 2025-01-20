import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import SignupForm from './pages/auth/Signup';
import RegisterStore from './pages/store/StoreRegistration';
import WarehouseList from './pages/warehouse/Warehouse';
import MyStores from './pages/store/MyStores';

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignupForm />} />
        <Route path="/stores/register/:id" element={authUser ? <RegisterStore /> : <Navigate to="/" />} />
        <Route path="/stores/my-stores" element={authUser ? <MyStores /> : <Navigate to="/" />} />
        <Route path="/warehouse/explore" element={authUser ? <WarehouseList /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App;