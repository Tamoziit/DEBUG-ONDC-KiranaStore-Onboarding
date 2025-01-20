import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full items-center justify-center p-4">
        <div className="flex items-center justify-center gap-4">
          <Link to="/stores/my-stores" className="px-4 py-3 bg-blue-600 rounded-lg shadow-lg text-lg font-semibold text-gray-100">Your Stores</Link>
          <Link to="/warehouse/explore" className="px-4 py-3 bg-blue-600 rounded-lg shadow-lg text-lg font-semibold text-gray-100">Register your Stores</Link>
        </div>
      </div>
    </div>
  )
}

export default Home