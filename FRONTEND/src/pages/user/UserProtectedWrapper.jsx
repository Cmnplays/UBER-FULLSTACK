import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../context/user/userContext";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserProtectedWrapper = ({ children }) => {
  const { setUser, setLoading, user, loading } = useContext(UserDataContext);
  const [userFetched, setUserFetched] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/user/profile");
        setUser(data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          console.log("Unexpected error while fetching user", err);
        }
      } finally {
        setLoading(false);
        setUserFetched(true);
      }
    };
    if (!user?.email) {
      fetchUser();
    } else {
      setUserFetched(true);
    }
  }, []);

  if (!userFetched || loading) return <LoadingSpinner />;

  if (!user?.email) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default UserProtectedWrapper;
