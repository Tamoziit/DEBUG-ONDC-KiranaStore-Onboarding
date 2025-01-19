import React, { useState } from "react";
import "./warehouse.css";

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
      "code": "W123",
      "contactNo": "+1234567890",
      "address": "123 Warehouse Street, City, Country",
      "storesCount": 50
    },
    {
      "code": "W123",
      "contactNo": "+1234567890",
      "address": "123 Warehouse Street, City, Country",
      "storesCount": 50
    }
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
    <div className="container">
      <h1>Warehouse Management</h1>
      
      <h2>All Warehouses</h2>
      <button onClick={fetchWarehouses}>Fetch Warehouses</button>

      <div className="warehouse-grid">
        {warehouseList.length > 0 ? (
          warehouseList.map((warehouse, index) => (
            <div key={index} className="warehouse-card">
              <h3>{warehouse.code}</h3>
              <p><strong>Contact No:</strong> {warehouse.contactNo}</p>
              <p><strong>Address:</strong> {warehouse.address}</p>
              <p><strong>Stores Registered:</strong> {warehouse.storesCount}</p>
            </div>
          ))
        ) : (
          <p>No warehouses found.</p>
        )}
      </div>
    </div>
  );
};

export default WarehouseManagement;
