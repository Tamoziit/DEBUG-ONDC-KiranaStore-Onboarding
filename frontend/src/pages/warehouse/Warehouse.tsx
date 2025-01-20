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
              <WarehouseCard key={index} warehouse={warehouse} />
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
