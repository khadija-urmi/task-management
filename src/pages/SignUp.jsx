import { FaGoogle } from "react-icons/fa";
import loginImg from "../assets/login.jpg";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";

const SignUp = () => {
  const { googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogIn = () => {
    googleSignUp()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
        };
        axiosPublic
          .post("/user", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Successfully Login",
                icon: "success",
                draggable: true,
              });
            }
          })
          .catch((err) => {
            console.error("Error during axios request:", err);
          });
        navigate("/task");
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center mt-24 px-4">
      <img
        src={loginImg}
        className="w-64 h-64 md:w-96 md:h-96 mb-6 md:mb-0"
        alt="Login Image"
      />
      <button
        onClick={handleGoogleLogIn}
        className="w-full md:w-1/2 bg-blue-500 text-white py-2 px-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 md:mt-0 flex items-center justify-center space-x-2"
      >
        <FaGoogle className="w-5 h-5" />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SignUp;
