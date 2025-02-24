import { FaGoogle } from "react-icons/fa";
import loginImg from "../assets/login.jpg";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const SignUp = () => {
  const { googleSignUp } = useContext(AuthContext);

  const handleGoogleLogIn = () => {
    googleSignUp().then();
  };

  return (
    <div className="max-w-3xl mx-auto flex justify-between items-center mt-24">
      <img src={loginImg} className="w-96 h-96" />
      <button
        onClick={handleGoogleLogIn}
        className="w-1/2 bg-blue-500 text-white py-2 px-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 flex items-center justify-center space-x-2"
      >
        <FaGoogle className="w-5 h-5" />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SignUp;
