import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { assets } from "../assets/assets_frontend/assets"
import axios from "axios"
import { toast } from "react-toastify"

export const Myprofile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdite, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary to-blue-700 px-8 py-8">
          <div className="flex items-end gap-5">
            {/* Avatar */}
            {isEdite ? (
              <label htmlFor="image" className="cursor-pointer">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/30">
                  <img
                    className="w-full h-full object-cover"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </label>
            ) : (
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/30">
                <img src={userData.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              {isEdite ? (
                <input
                  className="bg-white/15 text-white placeholder-white/50 text-xl font-bold px-3 py-1.5 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 w-full max-w-xs"
                  type="text"
                  value={userData.name}
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
              )}
              <p className="text-blue-100 text-sm mt-1">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8 flex flex-col gap-6">

          {/* Contact Info */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Contact Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="text-sm font-medium text-blue-500">{userData.email}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                {isEdite ? (
                  <input
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    type="text"
                    value={userData.phone}
                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-700">{userData.phone}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 sm:col-span-2">
                <p className="text-xs text-gray-400 mb-1">Address</p>
                {isEdite ? (
                  <div className="flex flex-col gap-2">
                    <input
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      type="text"
                      onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                      value={userData.address.line1}
                      placeholder="Address line 1"
                    />
                    <input
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      type="text"
                      onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                      value={userData.address.line2}
                      placeholder="Address line 2"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    {userData.address.line1}<br />{userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Basic Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Gender</p>
                {isEdite ? (
                  <select
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    value={userData.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-sm font-medium text-gray-700">{userData.gender}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Date of Birth</p>
                {isEdite ? (
                  <input
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    type="date"
                    onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                    value={userData.dob && !isNaN(new Date(userData.dob)) ? new Date(userData.dob).toISOString().split('T')[0] : ""}
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-700">{userData.dob}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {isEdite ? (
              <>
                <button
                  onClick={updateUserProfileData}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
                <button
                  onClick={() => { setIsEdit(false); setImage(false) }}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="flex items-center gap-2 border border-primary/30 text-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}