const nodeMailer = require("nodemailer")


class Mailing {
    

    constructor(){}


    newAccount(email,name, password){
        const body = `  <p>Hello ${name}!</p>
                        <p>Your account with the platinum credit pipeline has successfully been acivated.
                        Use your email address and password below to access pipeline. You are
                        advised to change password on login to a password you can remember.</p>
                        <p style="color:blue;font-size:30px"><strong>${password}</strong></p>
                        <br>
                        <p>Platinum Credit Pipeline Support Team</p>`
        const info = this.sendEmail("Pipeline Account Activation",body,email)
        return info
    }

    forgotPassword(email,tempPassword){
        const body = `  <p>Hello!</p>
                        <p>Glad to be of help. Use your email address and password below to access pipeline. You are
                        advised to change password on login to a password you can remember.</p>
                        <p style="color:blue;font-size:30px"><strong>${tempPassword}</strong></p>
                        <br>
                        <p>Platinum Credit Pipeline Support Team</p>`
        const info = this.sendEmail("Pipeline Password Recovery",body,email)
        return info
    }

    async sendEmail( subject,body,receiver){
        try{
            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth:{
                    // user:"backendtester22@gmail.com",
                    // pass:"wbdywsburilwwkhw"
                    user:"bombmungati@gmail.com",
                    pass:"obdfkcvwngmdicft"
                },
                tls:{
                    rejectUnauthorized:false
                }
            })
            let info = await transporter.sendMail({
                from: '"Platimun Credit Pipeline Support" <bombmungati@gmail.com>', // sender address
                to: receiver, // list of receivers
                subject: subject, // Subject line
                html: body, // html body
            });
            return info
        }catch(err){console.log(err)}
    }
}

module.exports = Mailing
// let m = new Mailing()
// m.forgotPassword("ppmunga@hotmail.com","iueh9788y23u798")
