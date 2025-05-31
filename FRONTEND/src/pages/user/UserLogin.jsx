import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { UserDataContext } from "../../context/user/userContext.js";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser, setLoading } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/user/login", formData);
      setUser(data.data);
      navigate("/home");
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("Catched error in component level::", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber_logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded mb-7 border w-full px-4 py-2 text-lg placeholder:text-base"
            required
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>

          <input
            required
            className="bg-[#eeeeee] rounded mb-7 border w-full px-4 py-2 text-lg placeholder:text-base"
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="bg-[#111] text-white font-semibold rounded mb-7 w-full px-4 py-2 text-lg placeholder:text-base">
            Login
          </button>
          <span className="text-center">New here? </span>
          <Link to={"/signup"} className="text-blue-600">
            Create New Account
          </Link>
        </form>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className="flex justify-center items-center bg-[#10b461] text-white font-semibold rounded mb-7 w-full px-4 py-2 text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
