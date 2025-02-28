import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    "https://my-task-manager-app-server-qrei9nycc-khadija-urmis-projects.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
