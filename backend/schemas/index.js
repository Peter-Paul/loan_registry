const Joi = require('joi')

const userSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
    role:Joi.string().required(),
    firstname:Joi.string().required(),
    surname:Joi.string().required(),
    dob:Joi.string().allow(null, ''),
    gender:Joi.string().required(),
    team:Joi.string().allow(null, ''),
    branch:Joi.string().allow(null, ''),
    zone:Joi.string().allow(null, ''),
    region:Joi.string().allow(null, ''),
    contact1:Joi.string().required(),
    contact2:Joi.string().required(),
})

const signinSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
})

const clientSchema = Joi.object({
    email:Joi.string().required(),
    firstname:Joi.string().required(),
    surname:Joi.string().required(),
    dob:Joi.string().required(),
    gender:Joi.string().required(),
    contact1:Joi.string().required(),
    contact2:Joi.string().required(),
    created:Joi.string().required(),
    agent:Joi.string().required(),
})


module.exports={    
                    userSchema,
                    clientSchema,
                    signinSchema
                }