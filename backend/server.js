import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnarry.js';
import addminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
// /app config

const app = express();

const port = process.env.PORT || 5000

connectDB()
connectCloudinary()

//middelwares


app.use(express.json())
app.use(cors())


// api End Point



app.use('/api/admin', addminRouter)

app.use('/api/doctor', doctorRouter)

app.use('/api/user', userRouter)


app.get('/', (req, res) => {

    res.send('API WORKING')

})


app.listen(port, () => console.log("Server Started", port))