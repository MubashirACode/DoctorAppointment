import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets_frontend/assets';

export const SpecialityMenu = () => {
  return (
    <div className="py-20 px-4" id="speciality">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            Specialities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find by Speciality
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Browse our extensive list of trusted doctors and schedule your appointment hassle-free.
          </p>
        </div>

        {/* Speciality Cards */}
        <div className="flex sm:justify-center gap-4 md:gap-6 pt-2 w-full overflow-x-auto pb-4 scrollbar-hide">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="group flex flex-col items-center gap-3 cursor-pointer flex-shrink-0 transition-all duration-300"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-12 sm:w-14 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors text-center max-w-[80px]">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};