import { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

export const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Please select an image.');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message);

        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout(' ')
        setFees(' ')

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred while adding doctor:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="mb-3 text-lg font-medium w-full">
        <p className="mb-3 ml-3 text-lg font-medium">Add Doctor</p>

        <div className="bg-white px-8 py-8 border border-gray-300 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                className="w-16 bg-gray-100 rounded-full"
                alt="Upload area"
              />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p>Upload Doctor Picture</p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="doctor-name">Doctor Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  id="doctor-name"
                  placeholder="Name"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="doctor-email">Doctor Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="doctor-email"
                  placeholder="Email"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="doctor-password">Doctor Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="doctor-password"
                  placeholder="Password"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="experience">Experience</label>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  id="experience"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="fees">Fees</label>
                <input
                  onChange={(e) => setFees(e.target.value)}
                  value={fees}
                  type="number"
                  id="fees"
                  placeholder="Fees"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="speciality">Speciality</label>
                <select
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  id="speciality"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                >
                  {["General physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="education">Education</label>
                <input
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                  type="text"
                  id="education"
                  placeholder="Education"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Address</label>
                <input
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  type="text"
                  placeholder="Address Line 1"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
                <input
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  type="text"
                  placeholder="Address Line 2"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="about">About Doctor</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              id="about"
              placeholder="Write about the doctor"
              rows={5}
              required
              className="w-full border border-gray-300 rounded p-2"
            ></textarea>
          </div>

          <button type="submit" className="px-10 py-3 mt-4 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Add Doctor
          </button>
        </div>
      </form>
    </>
  );
};
