import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InventoryParams, StoreRegistrationParams } from "../../types";
import handleImageUpload from "../../utils/handleImageUpload";
import useRegisterStore from "../../hooks/useRegisterStore";

const RegisterStore: React.FC = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState<StoreRegistrationParams>({
    name: "",
    gstNo: "",
    address: "",
    contactNo: "",
    warehouseId: id!,
    inventory: [],
  });
  const [inventoryList, setInventoryList] = useState<InventoryParams[]>([]);
  const [inventoryItem, setInventoryItem] = useState<InventoryParams>({
    item: "",
    url: "",
    quantity: null,
    costPerItem: null,
    mrp: null
  });
  const [step, setStep] = useState<number>(1);
  const [uploading, setUploading] = useState<boolean>(false);
  const { loading, register } = useRegisterStore();

  const addInventoryItem = () => {
    if (!inventoryItem.item || !inventoryItem.url || inventoryItem.quantity === null || inventoryItem.costPerItem === null || inventoryItem.mrp === null) {
      alert("Please fill all inventory fields.");
      return;
    }
    const newItem = {
      item: inventoryItem.item,
      url: inventoryItem.url,
      quantity: inventoryItem.quantity,
      costPerItem: inventoryItem.costPerItem,
      mrp: inventoryItem.mrp,
    };
    setInventoryList([...inventoryList, newItem]);
    setInventoryItem({
      item: "",
      url: "",
      quantity: null,
      costPerItem: null,
      mrp: null
    });
  };

  useEffect(() => {
    setInputs((prevInputs) => ({ ...prevInputs, inventory: inventoryList }));
  }, [inventoryList]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    if (e.target.files) {
      const file = e.target.files[0];
      const uploadedUrl = await handleImageUpload(file);
      setInventoryItem((prev) => ({ ...prev, url: uploadedUrl }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(inputs);
  }

  return (
    <div
      className="min-h-screen w-full relative top-0 bottom-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('/loginbg.jpg')", // Using the image from the public folder
        margin: 0, // Ensures no margin around the background div
        padding: 0, // Ensures no padding around the background div
      }}
    >
      <div className="max-w-4xl m-auto p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Store Management</h1>

        {step === 1 && (
          <div className="step-transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 1: General Store Information</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="storeName" className="block text-gray-700 font-medium mb-1">
                  Store Name
                </label>
                <input
                  id="storeName"
                  type="text"
                  placeholder="Store Name"
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
              </div>

              <div>
                <label htmlFor="storeGstNo" className="block text-gray-700 font-medium mb-1">
                  GST No
                </label>
                <input
                  id="storeGstNo"
                  type="text"
                  placeholder="GST No"
                  value={inputs.gstNo}
                  onChange={(e) => setInputs({ ...inputs, gstNo: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
              </div>

              <div>
                <label htmlFor="storeAddress" className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <input
                  id="storeAddress"
                  type="text"
                  placeholder="Address"
                  value={inputs.address}
                  onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
              </div>

              <div>
                <label htmlFor="storeContactNo" className="block text-gray-700 font-medium mb-1">
                  Contact No
                </label>
                <input
                  id="storeContactNo"
                  type="text"
                  placeholder="Contact No"
                  value={inputs.contactNo}
                  onChange={(e) => setInputs({ ...inputs, contactNo: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                Next Step
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="step-transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Warehouse and Inventory Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Inventory</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={inventoryItem.item}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, item: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={inventoryItem.quantity!}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, quantity: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  />
                  <input
                    type="number"
                    placeholder="Cost Per Item"
                    value={inventoryItem.costPerItem!}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, costPerItem: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  />
                  <input
                    type="number"
                    placeholder="MRP"
                    value={inventoryItem.mrp!}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, mrp: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  />

                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />

                  {inventoryItem.url && (
                    <div className="mt-4">
                      <h4 className="text-gray-700">Uploaded Image:</h4>
                      <img
                        src={inventoryItem.url}
                        alt="Uploaded Inventory"
                        className="w-full h-auto border rounded-lg mt-2"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={addInventoryItem}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={loading || uploading}
                  >
                    Add Item
                  </button>
                </div>

                <ul className="mt-6 space-y-4">
                  {inventoryList.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item.item} - {item.quantity} units @ ₹{item.costPerItem} (MRP: ₹{item.mrp})
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                disabled={loading || uploading}
              >
                Register Store
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterStore;
