import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

export const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 my-16">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-blue-700 rounded-3xl max-w-6xl mx-auto">

        {/* Background decorative elements */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-14 lg:px-16">

          {/* Text Content */}
          <div className="py-10 md:py-16 lg:py-20 flex-1 z-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-3 py-1 rounded-full mb-6">
              <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/90 text-xs font-medium">Trusted by 50,000+ patients</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Book Appointment <br />
              <span className="text-blue-100">With 100+ Trusted</span>
              <br />Doctors
            </h2>

            <p className="text-white/70 text-sm mb-8 max-w-sm leading-relaxed">
              Create your free account and get instant access to our network of verified healthcare professionals.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { navigate('/login'); scroll(0, 0) }}
                className="flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Create Free Account
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button
                onClick={() => { navigate('/doctors'); scroll(0, 0) }}
                className="flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
              >
                Browse Doctors
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/15">
              {['Free to join', 'Instant booking', '24/7 support'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-white/70 text-xs">
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Image */}
          <div className="hidden md:block md:w-[300px] lg:w-[370px] relative self-end flex-shrink-0">
            <img
              src={assets.appointment_img}
              alt="Doctor"
              className="w-full relative bottom-0 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}