import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import UserModel from '../models/Therapies.js'
import { getChild, getSpecificChild, putTherapy, therapies } from '../controllers/therapies.js';
const app=express()
app.use(cors())
app.use(express.json())
const router = express.Router();


//mongoose.connect("mongodb://127.0.0.1:27017/crud")
router.get('/',(req,res)=>{UserModel.find({})
.then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.post("/createUser",(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/getUser/:id',(req,res)=>
{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.post('/updateUser/:id',(req,res)=>{
    const id=req.params.id;
UserModel.findByIdAndUpdate({_id:id},
    {therapy_name:req.body.therapy_name,
    description:req.body.description})
.then(users=>res.json(users))
    .catch(err=>res.json(err))
})
router.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });
  

router.get('/children',getChild );  
router.get('/therapies',therapies );
router.put('/assign-therapy/:childId',putTherapy );
router.get('/children/:id',getSpecificChild );


export default router;
