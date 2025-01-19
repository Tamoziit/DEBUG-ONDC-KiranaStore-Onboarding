import React, { useState } from "react";
import "./store.css";
const StoreManagement: React.FC = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [gstNo, setGstNo] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contactNo, setContactNo] = useState<string>("");
  const [warehouseId, setWarehouseId] = useState<string>("");
  const [inventory, setInventory] = useState<string>("[]");
  const [storeList, setStoreList] = useState<object[]>([]);

  const registerStore = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = {
        name: storeName,
        gstNo,
        address,
        contactNo,
        warehouseId,
        inventory: JSON.parse(inventory),
      };

      const response = await fetch("/api/v1/store/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message || JSON.stringify(result));
    } catch (error) {
      console.error("Error registering store:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchStores = async () => {
    try {
      const response = await fetch("/api/v1/store/my-stores", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const stores = await response.json();
      setStoreList(stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Store Management</h1>

      <h2>Register Store</h2>
      <form onSubmit={registerStore}>
        <div className="form-group">
          <label htmlFor="storeName">Store Name</label>
          <input
            id="storeName"
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="storeGstNo">GST No</label>
          <input
            id="storeGstNo"
            type="text"
            placeholder="GST No"
            value={gstNo}
            onChange={(e) => setGstNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="storeAddress">Address</label>
          <input
            id="storeAddress"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="storeContactNo">Contact No</label>
          <input
            id="storeContactNo"
            type="text"
            placeholder="Contact No"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="warehouseId">Warehouse ID</label>
          <input
            id="warehouseId"
            type="text"
            placeholder="Warehouse ID"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
            required
          />
        </div>

        <textarea
          id="storeInventory"
          placeholder='Inventory (e.g., [{"item":"item1","quantity":10,"costPerItem":100}])'
          value={inventory.length>0?inventory:""}
          onChange={(e) => setInventory(e.target.value)}
          required
        ></textarea>

        <button type="submit">Register Store</button>
      </form>

      <h2>My Stores</h2>
      <button onClick={fetchStores}>Fetch Stores</button>
      <pre id="storeList">{storeList.length>0?JSON.stringify(storeList, null, 2):""}</pre>
    </div>
  );
};

export default StoreManagement;
