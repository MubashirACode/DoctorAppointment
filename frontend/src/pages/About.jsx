import { assets } from "../assets/assets_frontend/assets"

export const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">

      {/* Page Header */}
      <div className="text-center pt-14 pb-4">
        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
          Who We Are
        </span>
        <h1 className="text-4xl font-bold text-gray-900">
          About <span className="text-primary">Us</span>
        </h1>
      </div>

      {/* About Section */}
      <div className="my-14 flex flex-col md:flex-row gap-12 items-center">
        <div className="relative md:w-2/5 flex-shrink-0">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl translate-x-3 translate-y-3" />
          <img
            src={assets.about_image}
            alt="About Prescripto"
            className="relative w-full rounded-3xl object-cover shadow-lg"
          />
          {/* Floating stat card */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl shadow-gray-200 px-6 py-4 border border-gray-100">
            <p className="text-2xl font-bold text-primary">100+</p>
            <p className="text-xs text-gray-500 mt-0.5">Verified Doctors</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 md:w-3/5 text-gray-600">
          <p className="text-sm leading-relaxed">
            Welcome to <span className="font-semibold text-gray-800">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing health records.
          </p>
          <p className="text-sm leading-relaxed">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here every step of the way.
          </p>

          {/* Vision */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <b className="text-gray-800">Our Vision</b>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              To create a seamless healthcare experience for every user — bridging the gap between patients and healthcare providers, making care accessible when you need it most.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Why <span className="text-primary">Choose Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              title: 'Efficiency',
              desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
              color: 'from-blue-500 to-primary'
            },
            {
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              title: 'Convenience',
              desc: 'Access to a network of trusted healthcare professionals in your area.',
              color: 'from-indigo-500 to-blue-600'
            },
            {
              icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
              title: 'Personalization',
              desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
              color: 'from-primary to-blue-700'
            }
          ].map((item, i) => (
            <div key={i}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 cursor-default overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-primary/5 transition-all duration-300" />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}