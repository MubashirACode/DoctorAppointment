import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appiontments.js";
const changeAvailablity = async (req, res) => {



    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)

        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed  ' })


    } catch (error) {
        console.log(error)

        res.json({ success: false, message: error.message });

    }
}



const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password -email');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while fetching doctors." });
    }
};




// API for doctor Login

const loginDoctor = async (req, res) => {
    try {


        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Invalied credentials" })

        }


        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)


            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalied credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}





const appointmentsDoctors = async (req, res) => {
    try {
        const { docId } = req.body;

        // Check if `docId` exists in the request
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }

        // Fetch appointments for the doctor with `docId`
        const appointments = await appointmentModel.find({ docId });

        // Respond with appointments if found
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching doctor's appointments:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};




// API to mark appointment completed for doctor panel


const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        // Find the appointment by ID and wait for the result
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Check if the appointment exists and matches the provided docId
        if (appointmentData && appointmentData.docId.toString() === docId) {
            // Update the appointment status to completed
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: 'Appointment Completed' });
        } else {
            return res.json({ success: false, message: "Failed to mark appointment as completed" });
        }

    } catch (error) {
        console.error("Error completing appointment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// API to cancel  appointment  for doctor panel


const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        // Find the appointment by ID and await the result
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Check if the appointment exists and matches the provided docId
        if (appointmentData && appointmentData.docId.toString() === docId) {
            // Update the appointment status to canceled
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: 'Appointment Canceled' });
        } else {
            return res.json({ success: false, message: "Cancellation Failed" });
        }

    } catch (error) {
        console.error("Error canceling appointment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};








// Api  to get dashboard data for doctor panel 


const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        let patients = [];

        appointments.forEach((item) => {
            if (item.isCompleted && item.payment) {
                earnings += item.amount;
            }

            if (!patients.includes(item.userId.toString())) {
                patients.push(item.userId.toString());
            }
        });

        const dashData = {
            earnings,
            totalAppointments: appointments.length,
            uniquePatients: patients.length,
            latestAppointments: appointments.slice(-5).reverse() // Get last 5 appointments in reverse order
        };

        res.json({ success: true, dashData });

    } catch (error) {
        console.error("Error generating dashboard data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};





// API to get doctor profile for Doctor panel


const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;

        // Check if docId is provided
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required" });
        }

        // Retrieve doctor profile data excluding password field
        const profileData = await doctorModel.findById(docId).select('-password');

        // Check if doctor profile was found
        if (!profileData) {
            return res.status(404).json({ success: false, message: "Doctor profile not found" });
        }
        console.log(profileData)
        // Respond with profile data
        res.json({ success: true, profileData });

    } catch (error) {
        console.error("Error fetching doctor profile data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};




// API to Update doctor profile data from Doctor panel


const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;

        // Validate that docId is provided
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required" });
        }

        // Update the doctor's profile
        const updatedProfile = await doctorModel.findByIdAndUpdate(
            docId,
            { fees, address, available },
            { new: true } // Returns the updated document
        );

        // Check if update was successful
        if (!updatedProfile) {
            return res.status(404).json({ success: false, message: "Doctor profile not found" });
        }

        res.json({ success: true, message: "Profile Updated", updatedProfile });

    } catch (error) {
        console.error("Error updating doctor profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export { changeAvailablity, doctorList, loginDoctor, appointmentsDoctors, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile }