import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

export const MyAppoinments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateformat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments ', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track your upcoming appointments</p>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No appointments yet</p>
          <p className="text-gray-400 text-sm mt-1">Book your first appointment with a trusted doctor</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {appointments.map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-4">

                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                    <img src={item.docData.image} alt={item.docData.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900">{item.docData.name}</p>
                      <p className="text-primary text-sm font-medium mt-0.5">{item.docData.speciality}</p>
                    </div>

                    {/* Status Badge */}
                    {item.cancelled && !item.isCompleted && (
                      <span className="flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-medium px-3 py-1 rounded-full border border-red-100">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        Cancelled
                      </span>
                    )}
                    {item.isCompleted && (
                      <span className="flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full border border-green-100">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Completed
                      </span>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <span className="flex items-center gap-1.5 bg-blue-50 text-primary text-xs font-medium px-3 py-1 rounded-full border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                        Upcoming
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                  </div>

                  {/* Date & Time */}
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-600">
                      {slotDateformat(item.slotDate)} &nbsp;·&nbsp; {item.slotTime}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {!item.cancelled && !item.isCompleted && (
                  <div className="flex sm:flex-col gap-2 sm:justify-center">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-primary/5 border border-primary/20 text-primary text-xs font-medium px-4 py-2 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-50 border border-red-100 text-red-500 text-xs font-medium px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}