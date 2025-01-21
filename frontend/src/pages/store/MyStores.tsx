import { useEffect, useState } from "react";
import { StoreProps } from "../../types";
import StoreCard from "../../components/StoreCard";
import useGetMyStores from "../../hooks/useGetMyStores";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

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
    <div className="w-full min-h-screen px:4 md:px-8 py-4 text-gray-800"
      style={{
        backgroundImage: "url('/loginbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Store Directory
        </h1>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Spinner size="large" />
          </div>
        ) : (
          myStores?.length === 0 ? (
            <div className="w-full flex items-center justify-center p-2">
              <Link to="/warehouse/explore" className="text-center text-lg font-semibold text-gray-600 hover:text-blue-600">No Stores registered! Register Now</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {myStores.map((store) => (
                <div className="flex justify-center" key={store._id}>
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyStores;
