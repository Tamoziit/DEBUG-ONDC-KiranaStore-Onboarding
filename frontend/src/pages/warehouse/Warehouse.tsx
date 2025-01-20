import React, { useEffect, useState } from "react";
import { Warehouse } from "../../types";
import useGetWarehouse from "../../hooks/useGetWarehouses";
import { useNavigate } from "react-router-dom";

const WarehouseList: React.FC = () => {
  const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
  const { loading, warehouses } = useGetWarehouse();
  const navigate = useNavigate();

  const getWarehouses = async () => {
    const data = await warehouses();
    setWarehouseList(data);
  }

  useEffect(() => {
    getWarehouses();
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Warehouse Management</h1>

      <div>
        <h2 className="text-xl text-gray-800 mb-4">All Warehouses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {warehouseList?.length > 0 ? (
            warehouseList.map((warehouse, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300 text-center"
              >
                <h3 className="text-blue-500 text-lg font-semibold">{warehouse.code}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Contact No:</strong> {warehouse.contactNo}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Address:</strong> {warehouse.address}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Stores Registered:</strong> {warehouse.registeredStores.length}
                </p>

                <button className="p-2 mt-3 -mb-1 bg-blue-600 text-gray-100 rounded-lg" onClick={() => navigate(`/stores/register/${warehouse._id}`)}>
                  Register Store here
                </button>
              </div>
            ))
          ) : (
            <p>No warehouses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseList;
