import { useNavigate, useParams } from "react-router-dom";
import { InventoryParams, StoreProps } from "../../types";
import { useEffect, useState } from "react";
import useGetStoreById from "../../hooks/useGetStoreById";
import toast from "react-hot-toast";
import BarChart from "../../components/BarChart";
import Modal from "../../components/Modal";
import InventoryUpdateForm from "../../components/InventoryUpdateForm";
import Spinner from "../../components/Spinner";

interface IncomeBlockProps {
	incomePerMonth: number[];
	incomePerYear: number[];
}

interface InventoryBlockProps {
	inventory: InventoryParams[];
	onAddInventory: () => void;
}

const Store = () => {
	const { id } = useParams();
	const [store, setStore] = useState<StoreProps | null>(null);
	const { loading, getStore } = useGetStoreById();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const fetchStore = async () => {
		if (id) {
			const data = await getStore(id);
			setStore(data);
		} else {
			toast.error("Error in fetching Store Id");
		}
	};

	useEffect(() => {
		fetchStore();
	}, [id]);

	return (
		<div className="w-full min-h-screen px:4 md:px-8 py-4 text-gray-800"
			style={{
				backgroundImage: "url('/loginbg.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-lg p-6 shadow-lg">
				{loading ? (
					<div className="w-full flex items-center justify-center">
						<Spinner size="large" />
					</div>
				) : (
					store ? (
						<>
							<h2 className="text-3xl text-orange-800 font-bold mb-4">{store.name}</h2>
							<div className="mb-4">
								<p>
									<strong className="text-gray-600">GST No:</strong> {store.gstNo}
								</p>
								<p>
									<strong className="text-gray-600">Address:</strong> {store.address}
								</p>
								<p>
									<strong className="text-gray-600">Contact No:</strong> {store.contactNo}
								</p>
								<p>
									<strong className="text-gray-600">Warehouse ID:</strong> {store.warehouseId}
								</p>
								<p>
									<strong className="text-gray-600">Warehouse Code:</strong> {store.warehouseCode}
								</p>
							</div>

							<button
								className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-gray-100 font-medium py-2 px-4 rounded-lg mb-4"
								onClick={() => navigate(`/my-warehouse/${store.warehouseId}`)}
							>
								Visit My Warehouse
							</button>

							<IncomeBlock
								incomePerMonth={store.incomePerMonth}
								incomePerYear={store.incomePerYear}
							/>
							<InventoryBlock
								inventory={store.inventory}
								onAddInventory={() => setIsModalOpen(true)}
							/>

							{isModalOpen && (
								<Modal onClose={() => setIsModalOpen(false)}>
									<InventoryUpdateForm />
								</Modal>
							)}
						</>
					) : (
						<h1 className="text-2xl font-bold mb-4">No Store data found!</h1>
					)
				)}
			</div>
		</div>
	);
};

const IncomeBlock = ({ incomePerMonth, incomePerYear }: IncomeBlockProps) => {
	const monthlyLabels = incomePerMonth.map((_, index) => `Month ${index + 1}`);
	const yearlyLabels = incomePerYear.map((_, index) => `Year ${index + 1}`);

	return (
		<div className="mb-6">
			<h3 className="text-xl font-bold text-gray-800">Income Information</h3>
			<div className="grid grid-cols-1 gap-4">
				<BarChart
					labels={monthlyLabels}
					data={incomePerMonth}
					title="Monthly Income"
				/>
				<BarChart
					labels={yearlyLabels}
					data={incomePerYear}
					title="Yearly Income"
				/>
			</div>
		</div>
	);
};

const InventoryBlock = ({ inventory, onAddInventory }: InventoryBlockProps) => {
	return (
		<div>
			<h3 className="text-xl font-bold text-gray-800">Inventory</h3>
			<table className="min-w-full mt-4 border-collapse border border-gray-800">
				<thead>
					<tr className="bg-black/20 backdrop-blur-lg border border-white/30">
						<th className="border border-gray-800 p-2">Item</th>
						<th className="border border-gray-800 p-2">Image</th>
						<th className="border border-gray-800 p-2">Quantity</th>
						<th className="border border-gray-800 p-2">Cost per Item</th>
						<th className="border border-gray-800 p-2">MRP</th>
					</tr>
				</thead>
				<tbody>
					{inventory.map((item, index) => (
						<tr key={index} className="bg-white/10 backdrop-blur-lg border border-white/30 hover:bg-white/40 hover:backdrop-blur-md hover:border-white/40 transition-all duration-100">
							<td className="border border-gray-800 p-2">{item.item}</td>
							<td className="border border-gray-800 p-2">
								<img
									src={item.url}
									alt={item.item}
									className="w-20 h-20 object-cover"
								/>
							</td>
							<td className="border border-gray-800 p-2">
								{item.quantity !== null ? item.quantity : "N/A"}
							</td>
							<td className="border border-gray-800 p-2">
								{item.costPerItem !== null ? `₹${item.costPerItem}` : "N/A"}
							</td>
							<td className="border border-gray-800 p-2">
								{item.mrp !== null ? `₹${item.mrp}` : "N/A"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="mt-4">
				<button
					className="bg-orange-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-orange-700"
					onClick={onAddInventory}
				>
					Add Inventory
				</button>
			</div>
		</div>
	);
};

export default Store;