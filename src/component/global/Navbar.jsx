import { FaUser } from "react-icons/fa";
function Navbar() {
  return (
    <nav className="navbar  bg-info p-3 text-white shadow-xl mb-16">
      <div className="logo text-2xl text-white	 font-bold flex gap-3 m-auto">
        <FaUser className="text-3xl text-white	" /> ASTUDIO
      </div>
    </nav>
  );
}

export default Navbar;
