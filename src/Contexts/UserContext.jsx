
import React, {useState, useEffect} from 'react';

const UserContext = React.createContext();

function UserProvider({children}) {
  const [user, setUser] = useState();
  // const [loggedIn, setLoggedIn] = useState(false);

  const getUser = () => {
    console.log('usercontext getuser');
    fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    }).then((res) => res.json())
      .then(res => {
        // setUser(res);
        console.log(res)
        if (res.loggedOut) {
          setUser({loggedOut: true});
        } else {
          setUser(res);
        }
      });
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/user", {
  //     method: "GET",
  //     headers: {'Content-Type': 'application/json'},
  //     credentials: 'include'
  //   }).then((res) => res.json())
  //     .then(res => {
  //       // setUser(res);
  //       console.log(res)
  //       if (res.loggedOut) {
  //         setUser({});
  //       } else {
  //         setUser(res);
  //       }
  //     });
  // }, [loggedIn]);

  useEffect(() => {
    getUser();
  }, []);
  // });

  // const value = {user, setUser, loggedIn, setLoggedIn, getUser}
  const value = {user, getUser}

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider};