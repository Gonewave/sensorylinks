import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import Goals from '../models/Goals.js'
const app=express()
app.use(cors())
app.use(express.json())
const router = express.Router();

router.get('/goals',(req,res)=>{Goals.find({})
.then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.post("/createGoals",(req,res)=>{
    Goals.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/getGoals/:id',(req,res)=>
{
    const id=req.params.id;
    Goals.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.post('/updateGoals/:id',(req,res)=>{
    const id=req.params.id;
Goals.findByIdAndUpdate({_id:id},
    {gtitle:req.body.gtitle,
    gdescription:req.body.gdescription})
.then(users=>res.json(users))
    .catch(err=>res.json(err))
})
router.delete('/deleteGoals/:id', (req, res) => {
    const id = req.params.id;
    Goals.findByIdAndDelete(id)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });
  
export default router;
