import React from 'react'
import { createContext, useContext} from 'react';
import { useState , useEffect } from 'react'
import axios from 'axios'
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  // useEffect(()=>{
  //   if(!user)
  //   {
  //     // axios.get('/profile')
  //     axios.get('/profile', { withCredentials: true })
  //       .then(response => {
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });

  //   }
  // },[]);
    useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await axios.get('/profile', { withCredentials: true });
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
