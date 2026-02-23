import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
export const DoctorContext = createContext();
import { toast } from 'react-toastify'

const DoctorContextProvider = ({ children }) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);


    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })


            if (data.success) {

                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }

    }


    const completeAppointment = async (appointmentId) => {



        try {


            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })



            if (data.success) {
                toast.success(data.message)

                getAppointments()

            } else {
                toast.error(data.message)
            }



        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }



    const cancelAppointment = async (appointmentId) => {



        try {


            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })



            if (data.success) {
                toast.success(data.message)

                getAppointments()

            } else {
                toast.error(data.message)
            }



        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }



    const getDashData = async () => {
        try {
            // Check if the token exists before making the request
            if (!dToken) {
                toast.error("Authentication token is missing. Please log in again.");
                return;
            }

            // Make the API call
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dToken } });

            // Handle the response
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData)
            } else {
                toast.error(data.message || "Failed to fetch dashboard data.");
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            // Capture detailed error message
            const errorMsg = error.response?.data?.message || "An unexpected error occurred while fetching data.";
            toast.error(errorMsg);
        }
    };




    const getProfileData = async () => {
        console.log("this code ")
        try {
            // Make the API request to fetch profile data
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } });
            console.log(data)
            // Check if the API request was successful
            if (data.success) {
                setProfileData(data.profileData);
                console.log(data.profileData, "this code"); // Optionally, you can remove this in production
            } else {
                // Handle the case where the success flag is false
                toast.error(data.message || "Failed to fetch profile data.");
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error("Error fetching profile data:", error);
            const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred.";
            toast.error(errorMsg);
        }
    };




    // Add any context values here, e.g., state or functions
    const value = {

        dToken, setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};



export default DoctorContextProvider;
