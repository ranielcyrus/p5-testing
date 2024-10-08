import express from 'express';
import mongoose from 'mongoose';
import { mongoURI, port } from './config/index.js';
import { Schema } from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes.js'
import customerLoginRoute from './routes/customerLoginRoute.js'
import userManagementRoute from './routes/userManagementRoute.js'
import userLoginRoute from './routes/userLoginRoute.js'
import userProfileRoute from './routes/userProfileRoute.js'

const app = express();

app.set('port', port);

app.use(express.json()); //to parse req.body

mongoose.connect(mongoURI)
.then(() => {console.log("MongoDB Connected")})
.catch(err => console.error('mongoDB connection error')) 

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.use(cors())
app.use(helmet())
app.use("/api/register", registerRoutes)
app.use("/api/customer", customerLoginRoute)
app.use("/api/users", userManagementRoute)
app.use("/api/login/users", userLoginRoute)
app.use("/api/profile", userProfileRoute)
// app.use("/menu", menuRouter)

export default app