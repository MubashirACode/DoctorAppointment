import { createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
// 1. Create the AppContext
export const AppContext = createContext();

// 2. Define the AppContextProvider component
const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false)

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Combine the values into a single context object

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list')

      if (data.success) {

        setDoctors(data.doctors)


      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error, "this code is not working")
      toast.error(error.message)

    }
  }


  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
      if (data.success) {
        setUserData(data.userData)



      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error, "this code is not working")
      toast.error(error.message)
    }
  }

  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    token, setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData

  };


  useEffect(() => {
    getDoctorsData()
  }, [])


  useEffect(() => {
    if (token) {
      loadUserProfileData()

    } else {
      setUserData(false)
    }
  }, [token])


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Create a custom hook for easier access to context
export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;







