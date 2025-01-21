import React, { useEffect, useState } from "react";
import { Warehouse } from "../../types";
import useGetWarehouse from "../../hooks/useGetWarehouses";
import WarehouseCard from "../../components/WarehouseCard";

const WarehouseList: React.FC = () => {
  const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
  const { loading, warehouses } = useGetWarehouse();

  const getWarehouses = async () => {
    const data = await warehouses();
    setWarehouseList(data);
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center pb-8 px-6" 
      style={{
        backgroundImage: "url('/loginbg.jpg')", 
      }}
    >
      <div className="mx-auto">

        
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="w-full max-w-3xl bg-white text-gray-900 rounded-lg shadow-lg p-8 transform hover:scale-[1.01] transition duration-300 ease-in-out mt-2">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
              Warehouse Management
            </h1>
            <p className="text-lg text-center text-gray-600">
              Manage your warehouses with ease. Below you'll find a list of all available warehouses.
            </p>
          </div>
        </div>

       
        <div className="w-full max-w-7xl bg-white text-gray-900 rounded-lg shadow-lg p-8 ">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            All Warehouses
          </h2>

          {loading ? (
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
              <p className="text-lg mt-4 text-gray-900">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {warehouseList?.length > 0 ? (
                warehouseList.map((warehouse, index) => (
                  <div
                    key={index}
                    className="bg-white text-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
                  >
                    <WarehouseCard warehouse={warehouse} />
                  </div>
                ))
              ) : (
                <p className="text-gray-900 text-lg">No warehouses found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseList;
