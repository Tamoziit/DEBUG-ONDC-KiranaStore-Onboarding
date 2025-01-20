import React, { useState } from "react";

interface Warehouse {
  code: string;
  contactNo: string;
  address: string;
  storesCount: number; // Assuming the stores count is provided
}

const WarehouseManagement: React.FC = () => {
  const [warehouseCode, setWarehouseCode] = useState<string>("");
  const [warehouseContact, setWarehouseContact] = useState<string>("");
  const [warehouseAddress, setWarehouseAddress] = useState<string>("");
  const [warehouseList, setWarehouseList] = useState<Warehouse[]>([
    {
      code: "W123",
      contactNo: "+1234567890",
      address: "123 Warehouse Street, City, Country",
      storesCount: 50,
    },
    {
      code: "W124",
      contactNo: "+0987654321",
      address: "456 Warehouse Avenue, City, Country",
      storesCount: 60,
    },
  ]);

  const createWarehouse = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = {
        code: warehouseCode,
        contactNo: warehouseContact,
        address: warehouseAddress,
      };

      const response = await fetch("/api/v1/warehouse/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message || JSON.stringify(result));
    } catch (error) {
      console.error("Error creating warehouse:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await fetch("/api/v1/warehouse", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const warehouses = await response.json();
      setWarehouseList(warehouses);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Warehouse Management</h1>

      <div>
        <h2 className="text-xl text-gray-800 mb-4">All Warehouses</h2>
        <button
          onClick={fetchWarehouses}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-600"
        >
          Fetch Warehouses
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {warehouseList.length > 0 ? (
            warehouseList.map((warehouse, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300 text-center">
                <h3 className="text-blue-500 text-lg font-semibold">{warehouse.code}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Contact No:</strong> {warehouse.contactNo}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Address:</strong> {warehouse.address}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Stores Registered:</strong> {warehouse.storesCount}
                </p>
              </div>
            ))
          ) : (
            <p>No warehouses found.</p>
          )}
        </div>
      </div>

      <h2 className="text-xl text-gray-800 mt-8 mb-4">Create New Warehouse</h2>
      <form onSubmit={createWarehouse} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="warehouseCode" className="block text-gray-700 font-medium">Warehouse Code</label>
          <input
            id="warehouseCode"
            type="text"
            value={warehouseCode}
            onChange={(e) => setWarehouseCode(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="warehouseContact" className="block text-gray-700 font-medium">Contact No</label>
          <input
            id="warehouseContact"
            type="text"
            value={warehouseContact}
            onChange={(e) => setWarehouseContact(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="warehouseAddress" className="block text-gray-700 font-medium">Address</label>
          <input
            id="warehouseAddress"
            type="text"
            value={warehouseAddress}
            onChange={(e) => setWarehouseAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Create Warehouse
        </button>
      </form>
    </div>
  );
};

export default WarehouseManagement;
