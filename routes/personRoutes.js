const express=require('express');
const router=express.Router();
const person = require('./../models/person'); 

router.post('/',async (req,res)=>{
    
    try{
      const data=req.body
  
      const newPerson=new person(data);
      const response=await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const data = await person.find(); // Ensure correct casing for the model
      console.log('Data fetched:', data);
      res.status(200).json(data);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/:workType',async(req,res)=>{
    try{
      const workType=req.params.workType;  //extract work type from url prameter
      if(workType=='chef'||workType=='manager'|| workType=='waiter'){
        const response=await person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error:'invalid work type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  router.put('/:id',async(req,res)=>{
    try{
      const personId=req.params.id;  //extract id from url parameter
      const updatedPersonData=req.body; //update data from person

      const response=await person.findByIdAndUpdate(personId,updatedPersonData,{
        new: true, //return updated document
        runValidators: true, //run mongoose validation
      })

      if(!response){
        return res.status(404).json({error:'person not found'});
      }
      console.log('data updated');
      res.status(200).json(response)
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  router.delete('/:id',async(req,res)=>{
    try{
      const personId=req.params.id;
      const response=await person.findByIdAndDelete(personId);
      if(!response){
        return res.status(404).json({error:'person not found'});
      }
      console.log('data deleted');
      res.status(200).json({message:'person deleted successfully'});
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  module.exports=router;