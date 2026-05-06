import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

export const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            Similar Specialists
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Related Doctors
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto text-sm">
            Browse other trusted doctors in the same speciality.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointments/${item._id}`); scrollTo(0, 0) }}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 aspect-square">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                  alt={item.name}
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/90 text-white backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Available
                </div>
              </div>

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

        <div className="text-center mt-10">
          <button
            onClick={() => { navigate('/doctors'); scroll(0, 0) }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-10 py-3.5 rounded-full text-sm font-medium hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            View All Doctors
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}