import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logoImg from "../assets/task-logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const { currentUser, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = (
    <>
      <li>
        <Link
          to="/tasks"
          className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:text-blue-700 md:p-0 md:dark:text-blue-500"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/handle-task"
          className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:text-blue-700 md:p-0 md:dark:text-blue-500"
        >
          All My Tasks
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img src={logoImg} className="h-8" alt="Task Trek Logo" />
          <span className="text-2xl font-semibold dark:text-white">
            TaskTrek
          </span>
        </div>

        {/* Hamburger Menu for small screens */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 dark:text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <IoMdClose className="w-6 h-6" />
          ) : (
            <IoMdMenu className="w-6 h-6" />
          )}
        </button>

        {/* Menu Items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 right-0 bg-white shadow-lg p-2 rounded-lg md:hidden`}
        >
          <ul className="flex flex-col space-y-2 font-medium p-4 mt-2 border border-gray-100 rounded-lg bg-gray-200 rtl:space-x-reverse ">
            {links}
            {/* On small screens, show logout button */}
            {currentUser && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Flex layout for large devices */}
        {currentUser && (
          <div
            className={`items-center justify-between hidden md:flex md:text-sm lg:text-base md:w-auto md:order-1 ${
              isMenuOpen ? "hidden" : ""
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mr-80">
              {links}
            </ul>

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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
