import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { UserDataContext } from "../../context/user/userContext";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const { setUser, setLoading } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/user/register", formData);
      setUser(data.data);
      navigate("/home");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(
        "Catched error in component level::",
        err.response?.data?.message
      );
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
          <h3 className="text-lg mb-2 font-medium">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] rounded  border px-4 w-1/2 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />{" "}
            <input
              className="bg-[#eeeeee] rounded  border px-4 w-1/2 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded mb-6 border w-full px-4 py-2 text-lg placeholder:text-sm"
            required
            type="email"
            name="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <h3 className="text-lg  mb-2 font-medium">Enter Password</h3>

          <input
            required
            className="bg-[#eeeeee] rounded mb-6 border w-full px-4 py-2 text-lg placeholder:text-sm"
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="bg-[#111] text-white font-semibold rounded mb-7 w-full px-4 py-2 text-lg placeholder:text-base">
            Register
          </button>
          <span className="text-center">Already have an account? </span>
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
