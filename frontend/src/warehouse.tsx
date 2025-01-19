import React, { useState } from "react";
import "./warehouse.css";


const WarehouseManagement: React.FC = () => {
  const [warehouseCode, setWarehouseCode] = useState<string>("");
  const [warehouseContact, setWarehouseContact] = useState<string>("");
  const [warehouseAddress, setWarehouseAddress] = useState<string>("");
  const [warehouseList, setWarehouseList] = useState<object[]>([]);

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
      const response = await fetch("/api/v1/get-warehouses", {  // Changed the endpoint to match backend
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

      <div className="warehouse-cards-container">
        {warehouseList.length > 0 ? (
          warehouseList.map((warehouse: any) => (
            <div className="warehouse-card" key={warehouse.id}>
              <h3>Warehouse ID: {warehouse.id}</h3>
              <p>Contact No: {warehouse.contactNo}</p>
              <p>Address: {warehouse.address}</p>
            </div>
          ))
        ) : (
          <p>No warehouses available.</p>
        )}
      </div>
    </div>
  );
};

export default WarehouseManagement;
