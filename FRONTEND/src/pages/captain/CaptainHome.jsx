import React from "react";
import CaptainLogout from "../../components/logout/CaptainLogout";
import { CaptainDataContext } from "../../context/captain/captainContext";

const CaptainHome = () => {
  const { captainData } = React.useContext(CaptainDataContext);

  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl">Captain Home page</h1>
        <div>
          User name is : {captainData.fullName.firstName}{" "}
          {captainData.fullName.lastName}{" "}
        </div>
        <CaptainLogout />
      </div>
    </div>
  );
};

export default CaptainHome;
