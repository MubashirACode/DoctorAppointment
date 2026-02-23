import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appiontments.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, available, fees, address } = req.body;
        const imageFile = req.file;

        console.log("Request Body:", req.body);

        // Check for missing fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            console.log("Missing details:", { name, email, password, speciality, degree, experience, about, fees, address });
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please Enter a Valid Email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please Enter a Strong Password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Prepare doctor data
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            available: available || true,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };

        // Save doctor to the database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        console.log("Doctor added successfully:", newDoctor);
        return res.status(201).json({ success: true, message: "Doctor Added", doctor: newDoctor });

    } catch (error) {
        console.error("An error occurred while adding the doctor:", error);
        return res.status(500).json({ success: false, error: "Failed to add doctor" });
    }
};



//API For Admin Login

const loginAdmin = async (req, res) => {

    try {


        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalied Admin Login" });
        }


    } catch (error) {
        console.error("An error occurred while adding the doctor:", error);
        return res.status(500).json({ success: false, error: "Failed to Admin Login" });
    }

}



const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.error("An error occurred while adding the doctor:", error);
        return res.status(500).json({ success: false, error: "error doctor is not working" });
    }
}





// API to get all appointments list 


const appointmentsAdmin = async (req, res) => {
    try {
        // Fetch all appointments from the database
        const appointments = await appointmentModel.find({});

        // Send a success response with the list of appointments
        res.json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);

        // Send an error response with the error message
        res.status(500).json({ success: false, message: error.message });
    }
};




// API for Appointments cancellations

const appointmentCancel = async (req, res) => {
    try {



        const { appointmentId } = req.body

        const appointentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })



        // releasing doctor slot

        const { docId, slotDate, slotTime } = appointentData


        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)


        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })




    } catch (error) {
        console.log(error)

        res.json({ success: false, message: error.message });
    }
}



// API to get dashboard data  for admin panel 

const adminDashboard = async (req, res) => {
    try {


const doctors = await doctorModel.find({})
const users = await userModel.find({})
const appointments = await appointmentModel.find({})


const dashData = {
    doctors:doctors.length,
    appointment:appointments.length,
    patients:users.length,
    latestAppointment:appointments.reverse().slice(0,5) 
}



res.json({success:true , dashData})


    } catch (error) {
        console.log(error)

        res.json({ success: false, message: error.message });
    }
}




export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel  , adminDashboard};
