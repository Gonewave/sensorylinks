import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import salesRoutes from './routes/sales.js';
import therapyRoutes from './routes/therapies.js';
import needRoutes from './routes/needs.js';
import generalRoutes from './routes/general.js';
import childRoutes from "./routes/child.js";
import staffRoutes from "./routes/staff.js";
import designationRoutes from "./routes/designation.js";
import diffRoutes from "./routes/difficulties.js"
import goalsRoutes from "./routes/goals.js"
import therapyplansRoutes from './routes/therapyplans.js';
import surveyRoutes from './routes/survey.js';
import eventRoutes from './routes/event.js'
import vacationRoutes from "./routes/vacation.js";
import emailRoutes from './routes/emailRoutes.js';
import templateRoutes from './routes/templates.js'
//import userRoutes from './routes/user.js'
//import childRoutes from "./routes"

import User from "./models/User.js";
//import { dataTransaction, dataUser  } from './data/index.js';
import OverallStat from './models/OverallStat.js';
import Transaction from './models/Transaction.js';
import{
dataUser,dataTransaction,dataOverallStat,
} from "./data/index.js";
dotenv.config();
const app =  express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/therapies",therapyRoutes);
app.use("/general",generalRoutes);
app.use("/client",clientRoutes);
app.use("/sales",salesRoutes);
app.use('/', therapyRoutes);
app.use('/',needRoutes);
app.use('/',diffRoutes);
app.use('/',eventRoutes);
app.use("/child", childRoutes);
app.use("/staff", staffRoutes);
app.use("/designation", designationRoutes);
app.use("/therapyplans", therapyplansRoutes);
app.use('/',goalsRoutes);
app.use("/",surveyRoutes);
app.use("/",vacationRoutes);
app.use('/emails', emailRoutes);
app.use('/templates', templateRoutes);
//app.use('/needs',needRoutes)

//mongoose 
const PORT=process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL).then(()=>
{
    app.listen(PORT,()=> console.log(`server port: ${PORT}`));
//User.insertMany(dataUser);
//OverallStat.insertMany(dataOverallStat);
//Transaction.insertMany(dataTransaction);
})
.catch((error) => console.log(`${error} did not connect`));