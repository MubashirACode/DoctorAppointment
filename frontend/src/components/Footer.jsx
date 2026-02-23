import { assets } from "../assets/assets_frontend/assets"


export const Footer = () => {
    return (
        <>


<div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
  {/* Left Section */}
  <div className="space-y-6">
    <img src={assets.logo} alt="Company Logo" />
    <p className="leading-relaxed text-gray-600">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    </p>
  </div>

  {/* Center Section */}
  <div className="space-y-4">
    <p className="font-semibold text-gray-800">COMPANY</p>
    <ul className="space-y-2 text-gray-600">
      <li>Home</li>
      <li>About Us</li>
      <li>Contact Us</li>
      <li>Privacy Policy</li>
    </ul>
  </div>

  {/* Right Section */}
  <div className="space-y-4">
    <p className="font-semibold text-gray-800">GET IN TOUCH</p>
    <ul className="space-y-2 text-gray-600">
      <li>+0-000-000-000</li>
      <li><a href="mailto:mubashirali200512@gmail.com">mubashirali200512@gmail.com</a></li>
    </ul>
  </div>

  {/* Footer */}
  <div className="col-span-3">
    <hr className="border-gray-300" />
    <p className="text-center text-gray-500 mt-4">
      Copyright © 2024 M.A Coder.dev - All Rights Reserved.
    </p>
  </div>
</div>


        </>
    )
}
