var express = require('express');
var router = express.Router();
const Registry = require('../database')
const table="products"
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
    let nullFields = Array(9).fill("")
    nullFields.splice(-2,2,null,null)
    const data = Object.values(payload).concat(nullFields)
    // const data = Object.values(payload)
    if (error){
        res.status(400).json({error})
    }else{
        try{
            await registry.post(data)
            res.status(201).json({message:'Post Successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
})

// get specific client
router.get('/:id', authenticateToken, async (req, res) => {
    // req now has user property added from token authentication
    var id = req.params.id
    const item = await itemAvailable(id,table)
    if (item){
        if (item.user==req.user.id ){
            try{
                const data = await registry.getOne(id)
                res.json(data);  
            }catch(err){
                res.status(500).json({err})  
            }
        }else res.status(403).json({message:'Invalid user'})
    }else{
        res.status(404).json({message:'Not Found'})
    }
})



// patch/update specific post
router.patch('/:id', authenticateToken, isAdmin, async(req,res)=>{
    // req now has user property added from token authentication
    var id = req.params.id
    const item = await itemAvailable(id,table)
    if (item){
        if (item.user==req.user.id){
            try{
                await registry.patch(id,req.body)
                res.status(200).json({message:'Update successful'});  
            }catch(err){
                res.status(500).json({err})  
            }
        }else res.status(403).json({message:'Invalid user'})
    }else{
        res.status(404).json({message:'Not Found'})
    }
})

// delete specific user
router.delete('/:id', authenticateToken, async(req,res)=>{
    var id = req.params.id
    const item = await itemAvailable(id,table)
    if (item){
        // console.log(item[0].customer , req.user.id )
        if (item[0].customer==req.user.id || req.user.role=="admin" ){
            try{
                await registry.delete(id)
                res.status(200).json({message:'Delete successful'});  
            }catch(err){
                res.status(500).json({err})  
            }
        }else res.status(403).json({message:'Invalid user'})
    }else{
        res.status(404).json({message:'Not Found'})
    }
})

module.exports = router;