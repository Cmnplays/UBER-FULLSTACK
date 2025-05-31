import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CaptainDataContext } from "../../context/captain/captainContext";
import axiosInstance from "../../api/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";

const CaptainProtectedRoute = ({ children }) => {
  const { setCaptainData, setCaptainLoading, captainData, captainLoading } =
    useContext(CaptainDataContext);
  const [captainFetched, setCaptainFetched] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setCaptainLoading(true);
      try {
        const { data } = await axiosInstance.get("/captain/profile");
        setCaptainData(data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setCaptainData(null);
        } else {
          console.log("Unexpected error while fetching captain", err);
        }
      } finally {
        setCaptainLoading(false);
        setCaptainFetched(true);
      }
    };
    if (!captainData?.email) {
      fetchUser();
    } else {
      setCaptainFetched(true);
    }
  }, []);

  if (!captainFetched || captainLoading) return <LoadingSpinner />;
  if (!captainData?.email) {
    return <Navigate to="/captain-login" />;
  }
  return children;
};

export default CaptainProtectedRoute;
