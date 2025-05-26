import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email, password });
    setEmail("");
    setPassword("");
    console.log(userData);
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
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded mb-7 border w-full px-4 py-2 text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>

          <input
            required
            className="bg-[#eeeeee] rounded mb-7 border w-full px-4 py-2 text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
