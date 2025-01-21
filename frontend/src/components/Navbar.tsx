import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-white bg-opacity-30 backdrop-blur-md p-4 fixed top-0 left-0 right-0 shadow-lg z-50">
            <div className="flex justify-between items-center max-w-7xl mx-auto">

                <div className="text-white font-bold text-2xl">
                    <img src="/Logo.png" alt="Logo" className="w-24" />
                </div>

                <div className="space-x-6">
                    <Link to="/" className="text-gray-700 font-medium hover:text-gray-800">Home</Link>
                    <a href="#services" className="text-gray-700 font-medium hover:text-gray-800">Services</a>
                    <a href="#about" className="text-gray-700 font-medium hover:text-gray-800">About</a>
                    <a href="#contact" className="text-gray-700 font-medium hover:text-gray-800">Contact</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
