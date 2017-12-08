var nodemailer = require('nodemailer');
const config = require('../config/mailConfig');

export class NotificationController {

    public sendRegisterNotification(newUser: any){
        let mailOpts = {
            from: config.user,
            replyTo: newUser.email,
            to: newUser.email,
            subject: "Account activation" ,
            html: "You activation code: " + newUser.temproraryToken
        };
        this.sendMailNotification(mailOpts);
    }

    public sendModerationNotification(newUser: any){
        let subject;
        let html;
        console.log(newUser);
        if (newUser.status == "active"){
            subject = "You Account was Unlocked";
            html = "You can login";
        } else {
            subject = "You Account was Locked";
            html = newUser.banReason;
        }
        let mailOpts = {
            from: config.user,
            replyTo: newUser.email,
            to: newUser.email,
            subject: subject,
            html: html
        };
        this.sendMailNotification(mailOpts);
    }

    private sendMailNotification(mailOpts: any) {
        let smtpTransport = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass
            }
        });

        smtpTransport.sendMail(mailOpts, function (error: any, response: any) {
            if (error) {
                console.log(error);
            }else {
                console.log('Message sent: ' + response.message);
            }
            console.log('Closing Transport');
            smtpTransport.close();
        });
    };

}