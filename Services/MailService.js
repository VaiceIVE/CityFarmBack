const nodemailer = require('nodemailer')
const db = require('../DB')

class MailService{
    sendConfirmationEmail(name, email, confirmationCode)
    {
        console.log("Check");
        const transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
            user: "vanisachenko",
            pass: "ssiinutlhuomwxgf",
            },
        });
        transport.sendMail({
        from: "vanisachenko",
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:8000/api/confirm/${confirmationCode}> Click here</a>
            </div>`,
        }).catch(err => console.log(err));
        }
    async verifyUser (confirmationCode){
            db()
            await User.findOne({
              confirmationCode: confirmationCode,
            })
              .then((user) => {
                if (!user) {
                  return res.status(404).send({ message: "User Not found." });
                }
                console.log(user)
                user.status = "Active";
                user.save().then((err) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                  });
              })
              .catch((e) => console.log("error", e));
          }
}

module.exports = new MailService();