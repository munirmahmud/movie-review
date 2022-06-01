import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-primary">
      <div className="bg-secondary max-w-screen-xl mx-auto p-2">
        <div className="flex justify-between items-center">
          <h1>MOVIEFLIX</h1>
          <div className="flex items-center space-x-3">
            <button className="bg-dark-subtle p-1 rounded">
              <BsFillSunFill className="text-secondary" size={24} />
            </button>
            <input
              type="text"
              className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
              placeholder="Search..."
            />
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
