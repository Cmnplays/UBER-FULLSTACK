import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center  h-screen w-full flex justify-between flex-col pt-8 ">
        <img
          className="w-10 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber_logo"
        />
        <div className="bg-white py-5 px-10 pb-6">
          <h2 className="text-2xl font-bold">Get Started with User</h2>
          <Link
            to={"/login"}
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
