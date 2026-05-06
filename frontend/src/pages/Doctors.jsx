import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
];

export const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => { applyfilter(); }, [doctors, speciality]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Find a Doctor</h1>
        <p className="text-gray-500 text-sm">Browse through our specialist doctors and book your appointment.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">

        {/* Filter Toggle (mobile) */}
        <button
          className={`sm:hidden flex items-center gap-2 py-2 px-4 border rounded-xl text-sm font-medium transition-all ${
            showFilter ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600'
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
        </button>

        {/* Sidebar Filter */}
        <div className={`w-full sm:w-56 flex-shrink-0 flex-col gap-2 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-1">Speciality</p>
          {specialities.map((spec) => {
            const isActive = speciality === spec;
            return (
              <button
                key={spec}
                onClick={() => isActive ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-gray-50 text-gray-600 hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/20'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1">
          {/* Active filter badge */}
          {speciality && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">Showing results for:</span>
              <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                {speciality}
                <button onClick={() => navigate('/doctors')} className="hover:text-primary/60 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointments/${item._id}`)}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 aspect-square">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className={`absolute top-2 right-2 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm ${
                    item.available ? 'bg-green-500/90 text-white' : 'bg-gray-500/80 text-white'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-white animate-pulse' : 'bg-white/70'}`}></span>
                    {item.available ? 'Available' : 'Busy'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-gray-900 font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-primary/70 text-xs mt-0.5 truncate">{item.speciality}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 group-hover:text-primary transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Book appointment</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filterDoc.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No doctors found</p>
              <p className="text-gray-400 text-sm mt-1">Try selecting a different speciality</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};