import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  const getUser = () => {
    fetch("http://localhost:3000/api/auth/currentuser", {
      // fetch("http://192.168.0.23:3000/api/auth/currentuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "text/plain",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          setUser(res.data);
        } else {
          setUser({ loggedOut: true });
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const value = { user, getUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
