const express = require('express')
const app = express();
const dataModel = require('./db')
const cors = require('cors')
require("dotenv").config();
app.use(cors());

const PORT  = process.env.PORT || 4000
app.listen(PORT)
console.log(`Server is running at Port ${PORT}`);
app.use(express.json());

app.get('/api',async(req,res)=>{
     try{
      const findData = await dataModel.find({})
      res.status(201).send(findData);
    //   console.log(findData);
     }catch(e){
    console.log(`error is ${e}`)
    res.status(404).send(e);
     }
})




app.post('/submit',async (req,res)=>{
    try{
        const {name,comment} = req.body;
        const userexists  = await dataModel.findOne({name:name})
        if(userexists){
           return res.status(401).json({error:'Oops! Please Fill Correctly!'})
       }
        const data = new dataModel(req.body)
        const saveData = await data.save();
        console.log(saveData);
        res.status(201).send(`Your data of  has been saved! Thankyou.`)

    }catch(e){
        res.status(400).send(e);
        console.log(e);
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
       const id =  req.params.id
       const deleteData = await dataModel.findByIdAndDelete({_id:id});
       console.log(deleteData);
       res.status(201).json('data deleted successfully')
    }catch(e){
        res.status(400).send(`error is ${e}`)
    }
})

app.patch('/update/:userid',async(req,res)=>{
    try{
        const _id = req.params.userid;
        const upadtedValue = await dataModel.findByIdAndUpdate(_id,req.body,{new:true})
        if(upadtedValue===null){
            res.status(404).send('error faced')
        }else{
            console.log(`upadtedValue is ${upadtedValue}`);
            res.status(201).json({saveData: 'updated'})
        }
        }catch(e){
        res.status(404).send('error faced ',e)
    }
})