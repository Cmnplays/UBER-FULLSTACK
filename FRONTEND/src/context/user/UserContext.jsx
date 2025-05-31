import React, { useState } from "react";
import { UserDataContext } from "./UserContext.js";
const UserContext = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser, loading, setLoading }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
