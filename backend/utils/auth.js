const Registry = require('../database')
const bcrypt = require('bcrypt')

class Auth{
    generatePassword(){
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

module.exports = Auth