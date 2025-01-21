import { useEffect, useState } from "react";
import { StoreProps } from "../../types";
import StoreCard from "../../components/StoreCard";
import useGetMyStores from "../../hooks/useGetMyStores";

const MyStores = () => {
  const [myStores, setMyStores] = useState<StoreProps[]>([]);
  const { loading, getMyStores } = useGetMyStores();

  const fetchMyStores = async () => {
    const data = await getMyStores();
    setMyStores(data);
  }

  useEffect(() => {
    fetchMyStores();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Store Directory
      </h1>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myStores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyStores;