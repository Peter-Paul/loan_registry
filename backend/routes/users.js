var express = require('express');
var router = express.Router();
const Registry = require('../database')
const table = 'users'
const userRegistry = new Registry('users')
const clientRegistry = new Registry('clients')
const nodeMailer = require("nodemailer")
const {userSchema,signinSchema,forgotpasswordSchema} = require('../schemas')
const { hashPassword,
        confirmUser,
        authenticateToken,
        verifyCookieToken,
        createTokens,
        refreshTokenName,
        refreshTimeOut,
        userAvailable,
        Auth} = require('../utils')

// create a new user
router.post('/create',  async (req,res)=>{ 
    let payload = req.body //the payload must be in order of db columns#
    const {error} = await userSchema.validate(req.body)
    payload = {...payload, password:await hashPassword(payload.password)}
    const data = Object.values(payload)
    if (error){
        res.status(400).json({error})
    }else{
        try{
            let user
            await userRegistry.post(data).then( data => user=data.data[0] )
            res.status(201).json({message:'Sign up Successful',user});  
        }catch(err){
            res.status(500).json({err})  
        }
    }
})

// login must confirm if user exsists
router.post('/login', confirmUser, async (req,res)=>{
    let payload = req.body
    console.log(req.user)
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
        await userRegistry.patch(id,payload)
        res.status(200).json({message:'Update successful'});
    }catch(err){
        res.status(500).json({err})
    }
})

// change password (make sure to add email and password to the body)
router.patch('/forgot_password', async (req,res)=>{
    let payload = req.body //the payload must be in order of db columns
    const {error} = await forgotpasswordSchema.validate(payload)
    if (error) return res.status(400).json({message:'Must send username and password'}) // Bad request
    try{
        // await userRegistry.patch(id,payload)
        //
        res.status(200).json({message:'Update successful'});
    }catch(err){
        res.status(500).json({err})
    }
})


// get all users
router.get('/', authenticateToken, async (req, res) => {
    try{
        let data = await userRegistry.getAll()
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
            const data = await userRegistry.getOne(id)
            res.json(data);  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

// get user details

router.get('/info', authenticateToken, async (req, res) => {
    // req now has user property added from token authentication
    var {email} = req.body
    console.log(req.user)
    // const user = await userAvailable(id,undefined)
    const auth = new Auth()
    const user = await auth.exists(email)
    if (user[0]){
        try{ 
            const data = user[0]
            if ( data.role == "Admin"){
                data['clients'] = await clientRegistry.getAll()
                data['workers'] = await userRegistry.getAll()
            }else if( data.role == "LBF Agent" || data.role === "CS Agent"){
                data['clients'] = await clientRegistry.getClients(data.id)
            }else if( data.role == "LBF Leader" || data.role === "CS Leader"){
                data['workers'] = await userRegistry.getTeam(data.team,data.branch)
                data['clients'] = await clientRegistry.getClients(data.id)
            }else if ( data.role == "LBF Branch Manager" || data.role === "CS Branch Manager" ){
                data['workers'] = await userRegistry.getBranch(data.branch)
                data['clients'] = await clientRegistry.getClients(data.id)
            }else if ( data.role == "LBF Regional Manager" || data.role === "CS Regional Manager" ){
                data['workers'] = await userRegistry.getRegion(data.region)
                data['clients'] = await clientRegistry.getClients(data.id)
            }

            if( data.role === "LBF Agent" || data.role === "CS Agent" ){
            }else{
                for ( let w of data['workers'] ){
                    const indx = data['workers'].indexOf( w )
                    const clients = await clientRegistry.getClients(w.id)
                    data['workers'][indx]['clients'] = clients
                    data.clients = data['clients'].concat(clients)
                }
            }
            
            res.json(data);  
        }catch(err){
            console.log(err)
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

router.get( '/email/:name',async  (req,res) => {
    try{
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user:"backendtester22@gmail.com",
                // pass:"ajhricgryppzsydo"
                pass:"kxxgffiuptxjltqx"
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Platimun Credit" <backendtester22@gmail.com>', // sender address
            to: "ppmunga@hotmail.com", // list of receivers
            subject: "Account Activated", // Subject line
            // text: "Hello world?", // plain text body
            html: ` <h1>Hello Peter!</h1>
                    <p>Your account with the platinum credit pipeline has successfully been acivated.
                    Use your email password below to access pipeline</p>
                    <h5>OIimodoij23</h5>
                    `, // html body
        });
    
        console.log("Message sent: %s", info.messageId);

        res.json({message:`${nodeMailer.getTestMessageUrl(info)}`})
    }catch(err){console.log(err)}


})


// patch/update specific user
router.patch('/:id', authenticateToken, async(req,res)=>{
    // req now has user property added from token authentication
    var id = req.params.id
    const user = await userAvailable(id,undefined)
    if (user){
        try{
            await userRegistry.patch(id,req.body)
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
    const user = await userAvailable(id,undefined)
    if (user){
        try{
            await userRegistry.delete(id)
            res.status(200).json({message:'Delete successful'});  
        }catch(err){
            res.status(500).json({err})  
        }
    }else{
        res.status(404).json({message:'User Not Found'})
    }
})

module.exports = router;