import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logoImg from "../assets/task-logo.jpg";

const Navbar = () => {
  const { currentUser, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser();
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <img src={logoImg} className="h-8" alt="Task Trek Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-3">
              TaskTrek
            </span>
          </div>
          <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
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
