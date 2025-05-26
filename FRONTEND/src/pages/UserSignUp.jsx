import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [captainData, setCaptainData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ firstName, lastName, email, password });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    console.log(captainData);
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber_logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg mb-2 font-medium">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] rounded  border px-4 w-1/2 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />{" "}
            <input
              className="bg-[#eeeeee] rounded  border px-4 w-1/2 py-2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded mb-6 border w-full px-4 py-2 text-lg placeholder:text-sm"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h3 className="text-lg  mb-2 font-medium">Enter Password</h3>

          <input
            required
            className="bg-[#eeeeee] rounded mb-6 border w-full px-4 py-2 text-lg placeholder:text-sm"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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

export default UserLogin;
