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
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocslots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocslots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        const isSlotAvalable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
        if (isSlotAvalable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocslots(prev => ([...prev, timeSlots]));
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => { fetchDocInfo(); }, [doctors, docId]);
  useEffect(() => { getAvailableSlots(); }, [docInfo]);

  if (!docInfo) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading doctor details...</p>
      </div>
    </div>
  );

  return docInfo && (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">

      {/* Doctor Profile Card */}
      <div className="flex flex-col sm:flex-row gap-6">

        {/* Doctor Image */}
        <div className="w-full sm:w-56 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 aspect-square sm:aspect-auto">
            <img src={docInfo.image} alt={docInfo.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          {/* Name & Verified */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{docInfo.name}</h1>
            <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
          </div>

          {/* Degree / Speciality / Experience */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
            <span>{docInfo.degree} — {docInfo.speciality}</span>
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-0.5 rounded-full">
              {docInfo.experience} yrs exp
            </span>
          </div>

          {/* About */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-1.5 mb-2">
              <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
              <span className="text-sm font-semibold text-gray-700">About</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{docInfo.about}</p>
          </div>

          {/* Fee */}
          <div className="mt-4 flex items-center gap-2">
            <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-xl flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">
                Appointment Fee: <span className="text-green-700 font-bold">{currencySymbol}{docInfo.fees}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Select Appointment Slot
        </h2>

        {/* Day Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`flex flex-col items-center justify-center min-w-[64px] py-3 px-2 rounded-2xl cursor-pointer transition-all duration-200 flex-shrink-0 ${
                slotIndex === index
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-50 border border-gray-100 text-gray-600 hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              <span className="text-xs font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
              <span className="text-lg font-bold mt-0.5">{item[0] && item[0].datetime.getDate()}</span>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-2 mt-5">
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                item.time === slotTime
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-gray-50 border border-gray-100 text-gray-600 hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={bookAppointment}
          className="mt-6 flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Confirm Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};