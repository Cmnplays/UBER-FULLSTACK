import React from "react";
import { UserDataContext } from "../../context/user/userContext";
import UserLogout from "../../components/logout/UserLogout";

const Home = () => {
  const { user } = React.useContext(UserDataContext);

  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl">Home page</h1>
        <div>
          User name is : {user.fullName.firstName} {user.fullName.lastName}{" "}
        </div>
        <UserLogout />
      </div>
    </div>
  );
};

export default Home;
