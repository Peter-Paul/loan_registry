var express = require('express');
var router = express.Router();
const Registry = require('../database')
const table="clients"
const registry = new Registry(table)
const { clientSchema } = require('../schemas')
const {authenticateToken,itemAvailable,isAdmin} = require('../utils')

// get all clients
router.get('/', authenticateToken, async (req, res) => {
    try{
        let data = await registry.getAll()
        res.status(200).json({data});  
    }catch(err){
        res.status(500).json({err})
    }
});

// create a new client
router.post('/', authenticateToken, async (req,res)=>{ 
    const payload = req.body
    const {error} = await clientSchema.validate(payload) 
    let nullFields = Array(11).fill("")
    nullFields.splice(-6,6,0,0,0,0,null,null)
    const data = Object.values(payload).concat(nullFields)
    if (error){
        res.status(400).json({error})
    }else{
        try{
            let client
            await registry.post(data).then( data => client=data.data[0] )
            res.status(201).json({message:'Post Successful',client});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
})

// get specific client
router.get('/:id', authenticateToken, async (req, res) => {
    var id = req.params.id
    const item = await itemAvailable(id,table)
    if (item){
        try{
            const data = await registry.getOne(id)
            res.json(data);  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'Not Found'})
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