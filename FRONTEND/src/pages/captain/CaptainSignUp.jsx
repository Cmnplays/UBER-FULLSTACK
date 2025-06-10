import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axisoInstance from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CaptainDataContext } from "../../context/captain/captainContext.js";

const CaptainSignUp = () => {
  const navigate = useNavigate();
  const { setCaptainData: setCaptain, setCaptainLoading } =
    useContext(CaptainDataContext);
  const [captainData, setCaptainData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [vehicle, setVehicleDetails] = useState({
    color: "",
    plate: "",
    capacity: "",
    vehicleType: "",
  });

  const handleInput = (e) => {
    setCaptainData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleVechileDataChange = (e) => {
    setVehicleDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fullCaptainData = { ...captainData, vehicle };
    console.log(fullCaptainData);
    try {
      const { data } = await axisoInstance.post(
        "/captain/register",
        fullCaptainData
      );
      setCaptain(data.data);
      setCaptainData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setVehicleDetails({
        color: "",
        plate: "",
        capacity: "",
        vehicleType: "",
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
          <h3 className="text-lg mb-2 font-medium">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] rounded  border px-4 w-1/2 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="First name"
              value={captainData.firstName}
              name="firstName"
              onChange={handleInput}
            />{" "}
            <input
              className="bg-[#eeeeee] rounded  border px-4 w-1/2 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Last name"
              value={captainData.lastName}
              name="lastName"
              onChange={handleInput}
            />
          </div>
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

          <h3 className="text-lg mb-2 font-medium">Vehicle Details</h3>
          <div
            className="gap-4 mb-6 grid
          grid-cols-2"
          >
            <input
              className="bg-[#eeeeee] rounded  border px-4 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle color"
              value={vehicle.color}
              name="color"
              onChange={handleVechileDataChange}
            />{" "}
            <input
              className="bg-[#eeeeee] rounded  border px-4 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle plate"
              value={vehicle.plate}
              name="plate"
              onChange={handleVechileDataChange}
            />
            <input
              className="bg-[#eeeeee] rounded  border px-4 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle capacity"
              value={vehicle.capacity}
              name="capacity"
              onChange={handleVechileDataChange}
            />{" "}
            <select
              className={`bg-[#eeeeee] rounded border px-4 py-2 text-lg text-black`}
              required
              name="vehicleType"
              value={vehicle.vehicleType}
              onChange={handleVechileDataChange}
            >
              <option
                value=""
                disabled
                hidden
                className="text-gray-500 text-sm"
              >
                Vehicle type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold rounded mb-7 w-full px-4 py-2 text-lg placeholder:text-base">
            Register
          </button>
          <Link to={"/"} className="text-blue-600">
            Go to homepage
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

export default CaptainSignUp;
