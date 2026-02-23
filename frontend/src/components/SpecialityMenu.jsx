import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets_frontend/assets';

export const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-6 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto">
        {specialityData.map((item, index) => (
          <Link
          onClick={()=>scrollTo(0,0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center  text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500   gap-2"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-16 sm:w-24 bg-2 rounded-full object-cover"
            />
            <p className="text-sm font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
