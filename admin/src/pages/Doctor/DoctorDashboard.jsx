import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

export const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment , completeAppointment } = useContext(DoctorContext);
  const { currency, slotDateformat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  // Wait until dashData and latestAppointments are defined before rendering
  if (!dashData || !dashData.latestAppointments) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-5">
      {/* Earnings, Appointments, and Patients Section */}
      <div className="flex flex-wrap gap-3">
        <DashboardCard
          icon={assets.earning_icon}
          label="Earnings"
          value={`${currency} ${dashData.earnings || 0}`}
        />
        <DashboardCard
          icon={assets.appointments_icon}
          label="Appointments"
          value={dashData.totalAppointments || 0}
        />
        <DashboardCard
          icon={assets.patients_icon}
          label="Patients"
          value={dashData.uniquePatients || 0}
        />
      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white mt-10 rounded border">
        <div className="flex items-center gap-2.5 py-4 px-6 border-b">
          <img src={assets.list_icon} alt="Latest Bookings Icon" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4">
          {(dashData.latestAppointments || []).map((item, index) => (
            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={item._id || index}>
              <img src={item.userData?.image} className="rounded-full w-10" alt="Doctor" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.userData?.name || 'N/A'}</p>
                <p className="text-gray-800">{slotDateformat(item.slotDate)}</p>
              </div>
              {

                item.cancelled
                  ? <p className="text-red-400 text-xs font-medium"> Cancelled</p>
                  : item.isCompleted
                    ? <p className="text-green-500 text-xs">Completed</p>
                    : <div className="flex items-center justify-center gap-2">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-10 cursor-pointer"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Confirm"
                        className="w-10 cursor-pointer"
                      />
                    </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper Component for Reusability
const DashboardCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={icon} alt={`${label} Icon`} />
    <div>
      <p className="text-xl font-semibold text-gray-600">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);
