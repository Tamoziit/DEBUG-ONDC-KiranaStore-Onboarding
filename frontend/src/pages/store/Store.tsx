import { useParams } from "react-router-dom";
import { InventoryParams, StoreProps } from "../../types";
import { useEffect, useState } from "react";
import useGetStoreById from "../../hooks/useGetStoreById";
import toast from "react-hot-toast";
import BarChart from "../../components/BarChart";

interface IncomeBlockProps {
	incomePerMonth: number[],
	incomePerYear: number[]
}

interface InventoryBlockProps {
	inventory: InventoryParams[];
}

const Store = () => {
	const { id } = useParams();
	const [store, setStore] = useState<StoreProps | null>(null);
	const { loading, getStore } = useGetStoreById();

	const fetchStore = async () => {
		if (id) {
			const data = await getStore(id);
			setStore(data);
		} else {
			toast.error("Error in fetching Store Id");
		}
	}

	useEffect(() => {
		fetchStore();
	}, [id]);

	return (
		<div className="p-6 bg-white shadow-md rounded-lg">
			{loading ? (
				<div>
					Loading...
				</div>
			) : (
				store ? (
					<>
						<h2 className="text-2xl font-bold mb-4">{store.name}</h2>
						<div className="mb-4">
							<p>
								<strong>GST No:</strong> {store.gstNo}
							</p>
							<p>
								<strong>Address:</strong> {store.address}
							</p>
							<p>
								<strong>Contact No:</strong> {store.contactNo}
							</p>
							<p>
								<strong>Warehouse ID:</strong> {store.warehouseId}
							</p>
							<p>
								<strong>Warehouse Code:</strong> {store.warehouseCode}
							</p>
						</div>

						<IncomeBlock
							incomePerMonth={store.incomePerMonth}
							incomePerYear={store.incomePerYear}
						/>
						<InventoryBlock inventory={store.inventory} />
					</>
				) : (
					<h1 className="text-2xl font-bold mb-4">No Store data found!</h1>
				)
			)}
		</div>
	);
};

const IncomeBlock = ({ incomePerMonth, incomePerYear }: IncomeBlockProps) => {
	const monthlyLabels = incomePerMonth.map((_, index) => `Month ${index + 1}`);
	const yearlyLabels = incomePerYear.map((_, index) => `Year ${index + 1}`);

	return (
		<div className="mb-6">
			<h3 className="text-xl font-semibold">Income Information</h3>
			<div className="grid grid-cols-2 gap-4">
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

const InventoryBlock = ({ inventory }: InventoryBlockProps) => {
	return (
		<div>
			<h3 className="text-xl font-semibold">Inventory</h3>
			<table className="min-w-full mt-4 border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-300 p-2">Item</th>
						<th className="border border-gray-300 p-2">Image</th>
						<th className="border border-gray-300 p-2">Quantity</th>
						<th className="border border-gray-300 p-2">Cost per Item</th>
						<th className="border border-gray-300 p-2">MRP</th>
					</tr>
				</thead>
				<tbody>
					{inventory.map((item, index) => (
						<tr key={index} className="hover:bg-gray-50">
							<td className="border border-gray-300 p-2">{item.item}</td>
							<td className="border border-gray-300 p-2">
								<img
									src={item.url}
									alt={item.item}
									className="w-20 h-20 object-cover"
								/>
							</td>
							<td className="border border-gray-300 p-2">
								{item.quantity !== null ? item.quantity : "N/A"}
							</td>
							<td className="border border-gray-300 p-2">
								{item.costPerItem !== null ? `$${item.costPerItem}` : "N/A"}
							</td>
							<td className="border border-gray-300 p-2">
								{item.mrp !== null ? `$${item.mrp}` : "N/A"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Store;