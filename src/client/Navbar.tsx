import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white bg-opacity-80 backdrop-blur-md shadow-sm py-4 px-8 flex justify-between items-center fixed top-0 z-50">
      <h1 className="text-2xl font-bold text-orange-500">FoodMind</h1>

      <div className="space-x-6 font-medium">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <Link to="/login" className="hover:text-orange-500">Login</Link>
        <Link to="/signup" className="hover:text-orange-500">Sign Up</Link>
      </div>
    </nav>
  );
}
