const nodeMailer = require("nodemailer")


class Mailing {
    transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user:"backendtester22@gmail.com",
            // pass:"ajhricgryppzsydo"
            // pass:"kxxgffiuptxjltqx"
            pass:"jvzmtedjlmujlbxd"
        }
    })

    constructor(){}


    newAccount(name, password){
        const body = `  <p>Hello ${name}!</p>
                        <p>Your account with the platinum credit pipeline has successfully been acivated.
                        Use your email address and password below to access pipeline</p>
                        <p><strong>${password}</strong></p>
                        <br>
                        <p>Platinum Credit Support Team</p>`
    }

    forgotPassword(email,tempPassword){
        const body = `  <p>Hello!</p>
                        <p>Your account with the platinum credit pipeline has successfully been acivated.
                        Use your email password below to access pipeline</p>
                        <p><strong>${tempPassword}</strong></p>
                        <br>
                        <p>Platinum Credit Support Team</p>`
        this.sendEmail("Pipeline Password Recovery",body,email)
        return 
    }

    async sendEmail( subject,body,receiver){
        try{
            let info = await this.transporter.sendMail({
                from: '"Platimun Credit Pipeline Support" <backendtester22@gmail.com>', // sender address
                to: receiver, // list of receivers
                subject: subject, // Subject line
                html: body, // html body
            });
            return info
        }catch(err){console.log(err)}
    }
}

module.export = Mailing
// let m = new Mailing()
// m.forgotPassword("ppmunga@hotmail.com","768718uyh983y9y")
