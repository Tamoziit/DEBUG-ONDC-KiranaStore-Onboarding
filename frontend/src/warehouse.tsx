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

      <h2>Create Warehouse</h2>
      <form onSubmit={createWarehouse}>
        <div className="form-group">
          <label htmlFor="warehouseCode">Code</label>
          <input
            id="warehouseCode"
            type="text"
            placeholder="Code"
            value={warehouseCode}
            onChange={(e) => setWarehouseCode(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="warehouseContact">Contact No</label>
          <input
            id="warehouseContact"
            type="text"
            placeholder="Contact No"
            value={warehouseContact}
            onChange={(e) => setWarehouseContact(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="warehouseAddress">Address</label>
          <input
            id="warehouseAddress"
            type="text"
            placeholder="Address"
            value={warehouseAddress}
            onChange={(e) => setWarehouseAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Warehouse</button>
      </form>

      <h2>All Warehouses</h2>
      <button onClick={fetchWarehouses}>Fetch Warehouses</button>
      <pre id="warehouseList">{warehouseList.length>0?JSON.stringify(warehouseList, null, 2):""}</pre>
    </div>
  );
};

export default WarehouseManagement;
