import React, { useState } from "react";

const RegisterStore: React.FC = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [gstNo, setGstNo] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contactNo, setContactNo] = useState<string>("");
  const [warehouseId, setWarehouseId] = useState<string>("");
  const [inventory, setInventory] = useState<object[]>([]);
  const [step, setStep] = useState<number>(1);

  // Temporary item state for inventory addition
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [costPerItem, setCostPerItem] = useState<number | "">("");
  const [mrp, setMrp] = useState<number | "">("");

  const registerStore = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = {
        name: storeName,
        gstNo,
        address,
        contactNo,
        warehouseId,
        inventory,
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

  const addInventoryItem = () => {
    if (!itemName || quantity === "" || costPerItem === "" || mrp === "") {
      alert("Please fill all inventory fields.");
      return;
    }
    const newItem = {
      itemName,
      quantity: Number(quantity),
      costPerItem: Number(costPerItem),
      mrp: Number(mrp),
    };
    setInventory([...inventory, newItem]);
    setItemName("");
    setQuantity("");
    setCostPerItem("");
    setMrp("");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9" }}>
      <h1 style={{ textAlign: "center", color: "#333", fontSize: "2.5rem" }}>Store Management</h1>

      {step === 1 && (
        <>
          <h2 style={{ color: "#333", fontSize: "1.8rem", marginTop: "30px" }}>Step 1: General Store Information</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="storeName" style={{ display: "block", fontSize: "1rem", marginBottom: "5px", color: "#333" }}>Store Name</label>
              <input
                id="storeName"
                type="text"
                placeholder="Store Name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="storeGstNo" style={{ display: "block", fontSize: "1rem", marginBottom: "5px", color: "#333" }}>GST No</label>
              <input
                id="storeGstNo"
                type="text"
                placeholder="GST No"
                value={gstNo}
                onChange={(e) => setGstNo(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="storeAddress" style={{ display: "block", fontSize: "1rem", marginBottom: "5px", color: "#333" }}>Address</label>
              <input
                id="storeAddress"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="storeContactNo" style={{ display: "block", fontSize: "1rem", marginBottom: "5px", color: "#333" }}>Contact No</label>
              <input
                id="storeContactNo"
                type="text"
                placeholder="Contact No"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Next Step
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ color: "#333", fontSize: "1.8rem", marginTop: "30px" }}>Step 2: Warehouse and Inventory Details</h2>
          <form onSubmit={registerStore}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="warehouseId" style={{ display: "block", fontSize: "1rem", marginBottom: "5px", color: "#333" }}>Warehouse ID</label>
              <input
                id="warehouseId"
                type="text"
                placeholder="Warehouse ID"
                value={warehouseId}
                onChange={(e) => setWarehouseId(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <h3 style={{ color: "#333", fontSize: "1.5rem" }}>Inventory</h3>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="number"
                  placeholder="Cost Per Item"
                  value={costPerItem}
                  onChange={(e) => setCostPerItem(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="number"
                  placeholder="MRP"
                  value={mrp}
                  onChange={(e) => setMrp(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                type="button"
                onClick={addInventoryItem}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Add Item
              </button>
              <ul>
                {inventory.map((item: any, index) => (
                  <li key={index}>
                    {item.itemName} - {item.quantity} units @ ₹{item.costPerItem} (MRP: ₹{item.mrp})
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Register Store
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterStore;
