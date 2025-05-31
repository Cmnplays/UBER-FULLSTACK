import React, { useState } from "react";
import { CaptainDataContext } from "./CaptainContext.js";
const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState(null);
  const [captainLoading, setCaptainLoading] = useState(false);
  return (
    <CaptainDataContext.Provider
      value={{ captainData, setCaptainData, captainLoading, setCaptainLoading }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
