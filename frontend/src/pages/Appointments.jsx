import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { RelatedDoctors } from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

export const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocslots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('')

  // Fetch Doctor Info based on ID
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);

  };


  const getAvailableSlots = async () => {
    setDocslots([])

    // getting current date


    let today = new Date()

    for (let i = 0; i < 7; i++) {

      // getting Date with index

      let currentDate = new Date(today)

      currentDate.setDate(today.getDate() + i)

      //settings end time of the date with index 

      let endTime = new Date()

      endTime.setDate(today.getDate() + i)

      endTime.setHours(21, 0, 0, 0);

      //setting hours

      if (today.getDate() === currentDate.getDate()) {

        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)

        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)

      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = [];

      while (currentDate < endTime) {

        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvalable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true


        if (isSlotAvalable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
   
        }

        // add slot to array

    
        // increwment current time by 30 minutes

        currentDate.setMinutes(currentDate.getMinutes() + 30)


      }


      setDocslots(prev => ([...prev, timeSlots]))

    }

  }



  const bookAppointment = async () => {
    if (!token) {
      toast.warn('  Login to book appointment')
      return navigate('/login')
    }


    try {

      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate();
      let month = date.getMonth() + 1
      let year = date.getFullYear()


      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)

        getDoctorsData()
        navigate('/my-appointments')

      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error)
    }





  }



  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);



  useEffect(() => {
    getAvailableSlots();
  }, [docInfo])


  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])


  if (!docInfo) return <p>Loading doctor details...</p>;

  return docInfo && (
    <div className="flex flex-col gap-4 my-10">
      {/* Doctor's Details Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left Section: Doctor's Image */}
        <div className="w-full sm:max-w-xs">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="bg-primary w-full rounded-lg"
          />
        </div>

        {/* Right Section: Doctor's Information */}
        <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mt-[-80px] sm:mt-0 sm:mx-0 mx-2">
          {/* Doctor's Name and Verification */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>

          {/* Degree, Speciality, and Experience */}
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience} years
            </button>
          </div>

          {/* About Section */}
          <div className="mt-3">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About
              <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          {/* Appointment Fee */}
          <p className="mt-4  font-medium text-gray-500">
            Appointment fee:
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>


      {/*--------Booking Slots----------*/}


      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll">
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer  ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>

                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>

              </div>
            ))
          }
        </div>


        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 ">
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'} `} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>



        <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light  px-14 py-3 rounded-full my-6 ">Book an appointment</button>





      </div>


      {/* Listed Related Doctors */}


      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>
  );
};
