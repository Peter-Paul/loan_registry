var express = require('express');
var router = express.Router();
const Registry = require('../database')
const table="clients"
const registry = new Registry(table)
const { clientSchema } = require('../schemas')
const {authenticateToken,itemAvailable,isAdmin} = require('../utils')


// create a new client
router.post('/', authenticateToken, async (req,res)=>{ 
    const payload = req.body
    const {error} = await clientSchema.validate(payload) 
    if (error){
        res.status(400).json({error})
    }else{
        // let nullFields = Array(11).fill("")
        // nullFields.splice(-6,6,0,0,0,0,null,null)
        let nullFields = Array(10).fill("")
        nullFields.splice(-5,5,0,0,0,0,null)
        const data = Object.values(payload).concat(nullFields)
        try{
            let client
            await registry.post(data).then( data => client=data.data[0] )
            res.status(201).json({message:'Post Successful',client});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
})



// patch/update specific post
router.patch('/:id', authenticateToken, async(req,res)=>{
    var id = req.params.id
    const item = await itemAvailable(id,table)
    if (item){
        try{
            await registry.patch(id,req.body)
            res.status(200).json({message:'Update successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'Not Found'})
    }
})

// delete specific user
router.delete('/:id', authenticateToken, async(req,res)=>{
    var id = req.params.id
    const item = await itemAvailable(id,table)
    if (item){
        try{
            await registry.delete(id)
            res.status(200).json({message:'Delete successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'Not Found'})
    }
})

module.exports = router;