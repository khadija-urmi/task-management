import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logoImg from "../assets/task-logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOutUser();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
          <div className="flex items-center space-x-3">
            <img src={logoImg} className="h-8" alt="Task Trek Logo" />
            <span className="text-2xl font-semibold dark:text-white">
              TaskTrek
            </span>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 dark:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex space-x-8 md:flex-row md:space-x-8`}
          >
            <Link
              to="/tasks"
              className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:text-blue-700 md:p-0 md:dark:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/handle-task"
              className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:text-blue-700 md:p-0 md:dark:text-blue-500"
            >
              All My Tasks
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {currentUser && (
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.photoURL}
                  alt="User Profile"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
