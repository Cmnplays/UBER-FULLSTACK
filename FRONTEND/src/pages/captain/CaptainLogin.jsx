import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axisoInstance from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CaptainDataContext } from "../../context/captain/captainContext.js";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const { setCaptainData: setCaptain, setCaptainLoading } =
    useContext(CaptainDataContext);
  const [captainData, setCaptainData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setCaptainData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axisoInstance.post("/captain/login", captainData);
      setCaptain(data.data);
      setCaptainData({
        email: "",
        password: "",
      });
      navigate("/captain-home");
    } catch (err) {
      console.log("Catched error in component level::", err);
    } finally {
      setCaptainLoading(false);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="uber_logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded mb-6 border w-full px-4 py-2 text-lg placeholder:text-sm"
            required
            type="email"
            placeholder="email@example.com"
            value={captainData.email}
            name="email"
            onChange={handleInput}
          />

          <h3 className="text-lg  mb-2 font-medium">Enter Password</h3>

          <input
            required
            className="bg-[#eeeeee] rounded mb-6 border w-full px-4 py-2 text-lg placeholder:text-sm"
            type="password"
            placeholder="password"
            value={captainData.password}
            name="password"
            onChange={handleInput}
          />
          <button className="bg-[#111] text-white font-semibold rounded mb-7 w-full px-4 py-2 text-lg placeholder:text-base">
            Login
          </button>
          <span className="text-center">New here? </span>
          <Link to={"/captain-signup"} className="text-blue-600">
            Register as captain
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

export default CaptainLogin;
