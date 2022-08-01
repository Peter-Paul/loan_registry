require('dotenv').config()
const Registry = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {ACCESS_SECRET,REFRESH_SECRET} = require('../config')
const refreshTokenName="rtk"
const refreshTimeOut= 60*60*24 // 1 day
const accessTimeOut= 60*60 // 1 hour


class Auth{
    async generatePassword(){
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return Math.random().toString(36).slice(-8);
    }

    async passwordHash(password){
        let salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt);
    }
    async passwordValidation(enteredPassword, savedPassword){
        return await bcrypt.compare(enteredPassword,savedPassword)
    }

    async loginValidate(email,password){
        const [user] = await this.exists(email)
        if ( user ){
            if (await this.passwordValidation(password,user.password) ){
                return user
            }else{ return undefined}
        }else{ return undefined}
    }

    async exists(email){
        try{
            const registry=new Registry('users')
            let user = await registry.userExists(email)
            return user
        }catch(err){
            console.log('DB error',err)
            return undefined
        }
    } 

}

const hashPassword = async (password) => {
    var salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
};

const validatePassword = async (enteredPassword, savedPassword) => {
    return await bcrypt.compare(enteredPassword,savedPassword)
};

const userAvailable = async (id,email) =>{
    try{
        const registry=new Registry('users')
        var users = await registry.getAll()
        return users.find(user=>(user.id===id || user.email===email))
    }catch(err){
        console.log('DB error',err)
        return undefined
    }
}

const itemAvailable = async (id,table) =>{
    try{
        const registry=new Registry(table)
        var item = registry.getOne(id) 
        return item
    }catch(err){
        console.log('DB error',err)
        return undefined
    }
}

const createTokens = (user) => {
    const at = jwt.sign(user,ACCESS_SECRET,{expiresIn:accessTimeOut})
    const rt = jwt.sign(user,REFRESH_SECRET,{expiresIn:refreshTimeOut}) 
    return {at,rt}
}

const refreshToken = async (rt) => {
    let token
    await jwt.verify(rt, REFRESH_SECRET, (err, user) => {
        // if (err) return res.status(403).json({message:'You dont have access to this data'})
        if (err) undefined
        const {iat,exp,...payload}=user // extract payload / remove iat from user object 
        token = createTokens(payload).at
    })
    return token
}


const checkForRefresh = (cookies) => {
    for (let cookie of cookies){
        if (cookie.slice(0,refreshTokenName.length)==refreshTokenName){
            return cookie.slice(refreshTokenName.length+1,) // plus one to ignore the equal sign
        }
    }
    return undefined
}


// MIDDLEWARE
// FOR USERS
const confirmUser = async (req,res,next) =>{ // middleware only for users route
    const authenticate = new Auth()
    var {email,password} = req.body // payload
    const account = await authenticate.loginValidate(email,password)
    if(account){
        req.user=account
        next()
    }else res.status(400).json({message:'Provided invalid Login redentials'})// undefined  
}


const authenticateToken = (req,res,next) => { // middleware for any route group because it doesn't access any database
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message:'No Token Provided'})
    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) return res.status(403).json({message:'Invalid Token'})
        req.user = user // creates new property 'user' on req object
        next()
      })
}

const verifyCookieToken = async (req,res,next) => {
    if (req.headers.cookie===undefined) return res.status(401).json({message:'No Token Provided'})
    const cookies = req.headers.cookie.split("; ")
    const rt = await checkForRefresh(cookies)
    if (rt){
        try{
            req.body.access=await refreshToken(rt)
            // console.log(req.body.access)
            next()
        }catch(err){
            { return res.status(401).json({err}) }   
        }
    }else{ return res.status(401).json({message:'No Token Provided'}) }
}

// FOR NON-USER ROUTES

const isAdmin = async (req,res,next) =>{
    const user = await userAvailable(undefined,req.user.email)
    if (user.role!='admin') return res.status(401).json({message:'Invalid User'})
    req.user.role="admin"
    next()
}

// HELPER FUNCTIONS


module.exports={
                userAvailable,
                confirmUser,
                authenticateToken,
                verifyCookieToken,
                createTokens,
                hashPassword,
                validatePassword,
                isAdmin,
                itemAvailable,
                refreshTokenName,
                refreshTimeOut,
                Auth,
                Mailer: require('./mailing'),
                Authenticate: require('./auth')
            }