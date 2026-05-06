import { assets } from "../assets/assets_frontend/assets"

export const Header = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-blue-700 rounded-2xl mx-4 md:mx-0">

            {/* Background decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2" />

            <div className="relative flex flex-col  md:flex-row items-end px-8 md:px-14 lg:px-20">

                {/* Left Side */}
                <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-5 pt-12 pb-8 md:py-16 z-10">

                    {/* Badge */}
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-white/90 text-xs font-medium tracking-wide">500+ Verified Doctors Available</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight">
                        Book Appointment <br />
                        <span className="text-blue-100">With Trusted</span>{" "}
                        <span className="relative inline-block">
                            Doctors
                            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                                <path d="M0 4 Q50 0 100 4 Q150 8 200 4" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/80 text-sm">
                        <img className="w-24" src={assets.group_profiles} alt="Trusted Patients" />
                        <p className="leading-relaxed">
                            Browse our extensive list of trusted doctors <br className="hidden sm:block" />
                            and schedule your appointment hassle-free.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="#speciality"
                            className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Book Appointment
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                        <a
                            href="#speciality"
                            className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
                        >
                            View Specialities
                        </a>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-6 pt-4 border-t border-white/15 w-full md:mb-8">
                        {[
                            { value: '100+', label: 'Doctors' },
                            { value: '50k+', label: 'Patients' },
                            { value: '4.9★', label: 'Rating' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-white font-bold text-lg leading-tight">{stat.value}</p>
                                <p className="text-white/60 text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side — image anchored to bottom of card */}
                <div className="w-full md:w-1/2  flex justify-center md:justify-end items-end mt-6 md:mt-0">
                    <img
                        src={assets.header_img}
                        alt="Doctors"
                        className="w-64 sm:w-80 md:w-full md:max-w-[340px] lg:max-w-[100%] object-contain object-bottom"
                    />
                </div>

            </div>
        </div>
    )
}