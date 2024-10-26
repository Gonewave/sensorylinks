import  express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Difficulties from '../models/Difficulties.js'
const app=express()
app.use(cors())
app.use(express.json())
const router = express.Router();

router.get('/difficulties',(req,res)=>{Difficulties.find({})
.then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.post("/createDifficulties",(req,res)=>{
    Difficulties.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/getDifficulties/:id',(req,res)=>
{
    const id=req.params.id;
    Difficulties.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

  
  router.post('/updateDifficulties/:id', (req, res) => {
    const id = req.params.id;
    Difficulties.findByIdAndUpdate(id, {
      dtitle: req.body.dtitle,
      ddescription: req.body.ddescription,
    })
      .then(user => res.json(user))
      .catch(err => res.json(err));
  });

  

  router.delete('/deleteDifficulties/:id', (req, res) => {
    const id = req.params.id;
   Difficulties.findByIdAndDelete(id)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });
  
export default router;