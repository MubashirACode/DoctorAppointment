import { assets } from "../assets/assets_frontend/assets"

export const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">

      {/* Page Header */}
      <div className="text-center pt-14 pb-4">
        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
          Reach Out
        </span>
        <h1 className="text-4xl font-bold text-gray-900">
          Contact <span className="text-primary">Us</span>
        </h1>
      </div>

      {/* Contact Section */}
      <div className="my-14 flex flex-col md:flex-row gap-10 items-start">

        {/* Image */}
        <div className="relative md:w-2/5 flex-shrink-0">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl translate-x-3 translate-y-3" />
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="relative w-full rounded-3xl object-cover shadow-lg"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6 md:w-3/5">

          {/* Office Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="font-semibold text-gray-800">Our Office</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              54709 Willms Station<br />Suite 350, Washington, USA
            </p>
          </div>

          {/* Contact Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 mb-1">Phone</p>
              <p className="text-sm font-medium text-gray-700">(415) 555‑0132</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 mb-1">Email</p>
              <a href="mailto:greatstackdev@gmail.com" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                greatstackdev@gmail.com
              </a>
            </div>
          </div>

          {/* Careers */}
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-semibold">Careers at Prescripto</p>
            </div>
            <p className="text-sm text-white/80 mb-5 leading-relaxed">
              Learn more about our teams and join us in transforming healthcare.
            </p>
            <button className="flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Explore Jobs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}