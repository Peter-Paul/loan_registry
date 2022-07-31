var express = require('express');
var router = express.Router();
const Registry = require('../database')
const table = 'users'
const userRegistry = new Registry('users')
const clientRegistry = new Registry('clients')
const nodeMailer = require("nodemailer")
const {userSchema,forgotpasswordSchema} = require('../schemas')
const { hashPassword,
        confirmUser,
        authenticateToken,
        verifyCookieToken,
        createTokens,
        refreshTokenName,
        refreshTimeOut,
        userAvailable,
        Auth} = require('../utils')



// **** ATHENTICATION MANAGEMENT WITH TOKENS ****

// USER CONFIRMATION AND ACCESS TOKEN
router.post('/login', confirmUser, async (req,res)=>{
    let payload = req.body
    payload={...payload,id:req.user.id} // In the event we need to do cacheing later on
    const tokens = createTokens(payload)
    res.cookie(refreshTokenName,tokens.rt,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*refreshTimeOut,domain:"127.0.0.1"})
    res.status(200).json({token:tokens.at})
    
})

// REFRESH TOKEN
router.get('/refresh', verifyCookieToken, async (req, res) => {
    const token = req.body.access
    return res.status(200).json({token})
})

router.get('/logout', verifyCookieToken, async (req, res) => {
// router.get('/logout', async (req, res) => {
    res.clearCookie(refreshTokenName,{httpOnly:true,secure:true,sameSite:"none",domain:"127.0.0.1"});
    return res.status(200).json("Successfully Logged out")
})



// **** USER DATA MANAGEMENT ****

const modifyUser = async user => {
    try{ 
        if ( user.role == "Admin"){
            user['clients'] = await clientRegistry.getAll()
            user['workers'] = await userRegistry.getAll()
        }else if( user.role == "LBF Agent" || user.role === "CS Agent"){
            user['clients'] = await clientRegistry.getClients(user.id)
        }else if( user.role == "LBF Leader" || user.role === "CS Leader"){
            user['workers'] = await userRegistry.getTeam(user.team,user.branch)
            user['clients'] = await clientRegistry.getClients(user.id)
        }else if ( user.role == "LBF Branch Manager" || user.role === "CS Branch Manager" ){
            user['workers'] = await userRegistry.getBranch(user.branch)
            user['clients'] = await clientRegistry.getClients(user.id)
        }else if ( user.role == "LBF Region Manager" || user.role === "CS Region Manager" ){
            user['workers'] = await userRegistry.getRegion(user.region)
            user['clients'] = await clientRegistry.getClients(user.id)
        }

        if( user.role === "LBF Agent" || user.role === "CS Agent" ){
        }else{
            for ( let w of user['workers'] ){
                const indx = user['workers'].indexOf( w )
                const clients = await clientRegistry.getClients(w.id)
                user['workers'][indx]['clients'] = clients
                if ( user.role !== "Admin" ) user.clients = user['clients'].concat(clients)
            }
        }
        
        return user;  
    }catch(err){
        console.log(err)
        return undefined  
    }
}

// CREATE NEW USER
router.post('/create',  async (req,res)=>{ 
    let payload = req.body //the payload must be in order of db columns#
    const {error} = await userSchema.validate(req.body)
    payload = {...payload, password:await hashPassword(payload.password)}
    const data = Object.values(payload)
    if (error){
        res.status(400).json({message:'Please provide valid details to create user'})
    }else{
        try{
            let user
            await userRegistry.post(data).then( data => user = data.data[0] )
            res.status(201).json({message:'Sign up Successful',user});  
        }catch(err){
            if (err.code == "ER_DUP_ENTRY"){
                res.status(400).json({message:'User with this email already exists'})
            }else res.status(500).json(err)  
        }
    }
})



// GET USER DETAILS
router.get('/details', authenticateToken, async (req, res) => {
    // req now has user property added from token authentication
    let {email} = req.user
    const auth = new Auth()
    const [user] = await auth.exists(email)
    if (user){
        const modified = await modifyUser(user)
        modified ? res.json(modified) : res.status(500).json({error:"Server error"})
    }else{
        res.status(400).json({message:`User Not Found`})
    }
})


// UPDATE CURRENT USER
router.patch('/update', authenticateToken, async(req,res)=>{
    let payload = req.body
    try{
        let user
        await userRegistry.patch(payload.id,payload).then( data => user = data.data[0])
        res.status(200).json({message:'Update successful',user});  
    }catch(err){
        console.log(err)
        res.status(500).json({err})  
    }
  
})

// UPDATE SPECIFIC USER
router.patch('/update/:id', authenticateToken, async(req,res)=>{
    let id = req.params.id
    try{
        await userRegistry.patch(id,payload)
        res.status(200).json({message:'Update successful'});  
    }catch(err){
        res.status(500).json({err})  
    }
})


// DELETE SPECIFIC USER
router.delete('/delete/:id', authenticateToken, async(req,res)=>{
    let id = req.params.id
    try{
        await userRegistry.delete(id)
        res.status(200).json({message:'Delete successful'});  
    }catch(err){
        res.status(500).json({err})  
    }
})



//  **** PASSWORD MANAGEMENT ****

// change password (make sure to add email and password to the body)
router.patch('/change_password',authenticateToken, async (req,res)=>{
    let {oldPassword,password} = req.body //the payload must be in order of db columns
    let {email,id} = req.user
    const auth = new Auth()
    const [user] = await auth.exists(email)
    const isValid = await auth.passwordValidation(oldPassword,user.password)
    if (isValid){
        try{
            await userRegistry.patch(id,{password:await auth.passwordHash(password)})
            res.status(200).json({message:'Update successful'});
        }catch(err){
            res.status(500).json({err})
        }
    }else res.status(400).json({message:`Password doesn't match existing`})
})

// forgot password (make sure to add email to the body)
router.post('/forgot_password', async (req,res)=>{
    let payload = req.body //the payload must be in order of db columns
    const {error} = await forgotpasswordSchema.validate(payload)
    if (error) return res.status(400).json({message:'Please provide valid details'}) // Bad request
    let {email} = payload
    const auth = new Auth()
    const [user] = await auth.exists(email)
    if (user){
        try{
            // send to change password page
            res.status(200).json({message:'Update successful'});
        }catch(err){
            res.status(500).json({err})
        }
    }else res.status(400).json({message:`No user with this email exists`})
})

module.exports = router;