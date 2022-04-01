var express = require('express');
var router = express.Router();
const Registry = require('../database')
const table = 'users'
const registry = new Registry(table)
const {userSchema,signinSchema} = require('../schemas')
const { hashPassword,
        confirmUser,
        authenticateToken,
        verifyCookieToken,
        createTokens,
        refreshTokenName,
        refreshTimeOut,
        userAvailable} = require('../utils')

// create a new user
router.post('/create',  async (req,res)=>{ 
    let payload = req.body //the payload must be in order of db columns
    const {error} = await userSchema.validate(req.body)
    payload = {...payload, password:await hashPassword(payload.password)}
    const data = Object.values(payload)
    if (error){
        res.status(400).json({error})
    }else{
        try{
            await registry.post(data)
            res.status(201).json({message:'Sign up Successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
})

// login must confirm if user exsists
router.post('/login', confirmUser, async (req,res)=>{
    let payload = req.body
    const {error} = await signinSchema.validate(payload)
    if (error) return res.status(400).json({message:'Must send username and password'}) // Bad request
    payload={...payload,id:req.user.id} // In the event we need to do cacheing later on
    const tokens = createTokens(payload)
    res.cookie(refreshTokenName,tokens.rt,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*refreshTimeOut,domain:"127.0.0.1"})
    res.status(200).json({token:tokens.at})
    
})

router.get('/refresh', verifyCookieToken, async (req, res) => {
    const token = req.body.access
    return res.status(200).json({token})
})

router.get('/logout', verifyCookieToken, async (req, res) => {
// router.get('/logout', async (req, res) => {
    res.clearCookie(refreshTokenName,{httpOnly:true,secure:true,sameSite:"none",domain:"127.0.0.1"});
    return res.status(200).json("Successfully Logged out")
})


// change password (make sure to add email and password to the body)
router.patch('/:id/change_password',authenticateToken,confirmUser, async (req,res)=>{
    let payload = req.body //the payload must be in order of db columns
    let id = req.params.id
    try{
        await registry.patch(id,payload)
        res.status(200).json({message:'Update successful'});
    }catch(err){
        res.status(500).json({err})
    }
})

// get all users
router.get('/', authenticateToken, async (req, res) => {
    try{
        let data = await registry.getAll()
        res.status(200).json({data});  
    }catch(err){
        res.status(500).json({err})
    }
});

// get specific user
router.get('/:id', authenticateToken, async (req, res) => {
    // req now has user property added from token authentication
    var id = req.params.id
    const user = await userAvailable(id,undefined)
    if (user){
        try{
            const data = await registry.getOne(id)
            res.json(data);  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

// patch/update specific post
router.patch('/:id', authenticateToken, async(req,res)=>{
    // req now has user property added from token authentication
    var id = req.params.id
    const user = await userAvailable(id,undefined)
    console.log(req.body)
    if (user){
        try{
            await registry.patch(id,req.body)
            res.status(200).json({message:'Update successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

// delete specific user
router.delete('/:id', authenticateToken, async(req,res)=>{
    var id = req.params.id
    const post = await userAvailable(id,undefined)
    if (post){
        if (post.user==req.user.id){
            try{
                await registry.delete(id)
                res.status(200).json({message:'Delete successful'});  
            }catch(err){
                res.status(500).json({err})  
            }
        }else res.status(403).json({message:'Invalid user'})
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

module.exports = router;