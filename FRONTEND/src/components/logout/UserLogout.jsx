import React, { useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/user/userContext";
const UserLogout = () => {
  const { setLoading, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.get("/user/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Catched error in component level::", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition duration-200"
    >
      Logout
    </button>
  );
};

export default UserLogout;
