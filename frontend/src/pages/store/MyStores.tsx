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
  };

  useEffect(() => {
    fetchMyStores();
  }, []);

  return (
    <div className="md:p-8 p-2 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Store Directory
      </h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {myStores.map((store) => (
            <div className="flex justify-center" key={store._id}>
              <StoreCard store={store} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStores;
