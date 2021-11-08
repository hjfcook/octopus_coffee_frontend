
import React, {useState, useEffect} from 'react';

const UserContext = React.createContext();

function UserProvider({children}) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    }).then((res) => res.json())
      .then(res => {
        // setUser(res);
        console.log(res)
        if (res.loggedOut) {
          setUser({});
        } else {
          setUser(res);
        }
      });
  }, [loggedIn]);

  const value = {user, setUser, loggedIn, setLoggedIn}

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider};