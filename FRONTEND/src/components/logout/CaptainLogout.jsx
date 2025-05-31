import React, { useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../../context/captain/captainContext";
const CaptainLogout = () => {
  const { setCaptainLoading, setCaptainData } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.get("/captain/logout");
      setCaptainData(null);
      navigate("/captain-login");
    } catch (err) {
      console.log("Catched error in component level::", err);
    } finally {
      setCaptainLoading(false);
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

export default CaptainLogout;
