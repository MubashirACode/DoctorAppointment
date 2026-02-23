import express from 'express';
import { addDoctor, loginAdmin , allDoctors , appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminController.js';
import upload from '../middelware/multer.js'; // Fixed 'middelware' typo
import authAdmin from '../middelware/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';


const adminRouter = express.Router();

// Route to add a doctor
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin, allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailablity);
adminRouter.get('/appointments' , authAdmin , appointmentsAdmin);

adminRouter.post('/cancel-appointment' , authAdmin , appointmentCancel);

adminRouter.get('/dashboard' , authAdmin, adminDashboard)

export default adminRouter;
