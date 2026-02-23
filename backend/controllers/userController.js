import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appiontments.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Ensure password is a string
        const passwordString = String(password);

        // Hash password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordString, saltRounds);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }



};




const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate token if successful
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};





///api to get user profile data
const getProfile = async (req, res) => {
  try {
    // Preferred: use req.user from middleware (recommended)
    const userId = req.user?.id;

    // Fallback (if you didn't update middleware yet):
    // const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required – user ID missing"
      });
    }

    const user = await userModel
      .findById(userId)
      .select('-password -__v -createdAt -updatedAt'); // remove sensitive / unnecessary fields

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      userData: user
    });
  } catch (error) {
    console.error("getProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile"
    });
  }
};





//Api to update user profile    


const updateProfile = async (req, res) => {
    try {


         
        const imageFile = req.file


        if (!name || !phone || !dob || !gender) {

            return res.json({ success: false, message: "Data Missing" })

        }


        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image cloudnary

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })

            const imageURL = imageUpload.secure_url


            await userModel.findByIdAndUpdate(userId, { image: imageURL })

        }


        res.json({ success: true, message: "Profile  Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// API to book appointemnts

const bookAppointment = async (req, res) => {





    try {



        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {

            return res.json({ success: false, message: 'Doctor not available ' })

        }


        let slots_booked = docData.slots_booked


        // checking for slot availablility

        if (slots_booked[slotDate]) {

            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available ' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }

        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }


        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked



        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),

        }

        const newAppointment = new appointmentModel(appointmentData)

        await newAppointment.save()


        // save new slots data in doctor data

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointemnt Booked' })




    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }





}





// api to getuser appoitmnets

const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch appointments for the given user ID
        const appointments = await appointmentModel.find({ userId });

        // Return a successful response with appointments data
        res.json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);

        // Return an error response with a message
        res.json({ success: false, message: error.message });
    }
};




// Api to cancel Appointemnts 


const cancelAppointment = async (req, res) => {
    try {



        const { userId, appointmentId } = req.body

        const appointentData = await appointmentModel.findById(appointmentId)
        //  verify appointments user 

        if (appointentData.userId !== userId) {

            return res.json({ success: false, message: 'Unauthorized action' });

        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })



// releasing doctor slot

const {docId , slotDate ,slotTime} = appointentData


const doctorData  = await doctorModel.findById(docId) 

let slots_booked = doctorData.slots_booked

slots_booked[slotDate]=slots_booked[slotDate ].filter(e=>e!== slotTime)


await doctorModel.findByIdAndUpdate(docId , {slots_booked})

res.json({success:true , message:"Appointment Cancelled"})




    } catch (error) {
        console.log(error)

        res.json({ success: false, message: error.message });
    }
}





// Api to make payment of appointment using razorpay








export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment,cancelAppointment };
