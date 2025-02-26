import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    "https://my-task-manager-app-server-gbg74ens6-khadija-urmis-projects.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
