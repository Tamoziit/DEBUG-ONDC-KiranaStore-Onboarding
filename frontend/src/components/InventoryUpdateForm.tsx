import { useState } from "react";
import { InventoryParams } from "../types";
import handleImageUpload from "../utils/handleImageUpload";
import useUpdateInventory from "../hooks/useUpdateInventory";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const InventoryUpdateForm = () => {
	const [inventoryList, setInventoryList] = useState<InventoryParams[]>([]);
	const [inventoryItem, setInventoryItem] = useState<InventoryParams>({
		item: "",
		url: "",
		quantity: null,
		costPerItem: null,
		mrp: null
	});
	const [uploading, setUploading] = useState<boolean>(false);
	const { loading, update } = useUpdateInventory();
	const { id } = useParams();

	const addInventoryItem = () => {
		if (!inventoryItem.item || !inventoryItem.url || inventoryItem.quantity === null || inventoryItem.costPerItem === null || inventoryItem.mrp === null) {
			toast.error("Please fill all inventory fields.");
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
		if (id) {
			await update({ inventory: inventoryList, id });
		} else {
			toast.error("Error in fetching Store Id");
		}
	}

	return (
		<div>
			<div className="bg-gray-200 w-full">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Update Inventory Details</h2>
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
										className="w-[40%] lg:w-[20%] h-auto border rounded-lg mt-2"
									/>
								</div>
							)}

							<button
								type="button"
								onClick={addInventoryItem}
								className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
								disabled={loading || uploading}
							>
								Add to Inventory
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

					<div className="w-full flex justify-center items-center pt-4">
						<button
							type="submit"
							className="px-6 py-3 w-full bg-green-600 text-white text-xl font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
							disabled={loading || uploading}
						>
							{loading ? <Spinner size="small" /> : "Update Inventory"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default InventoryUpdateForm