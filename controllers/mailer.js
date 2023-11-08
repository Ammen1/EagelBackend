import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../config.js";

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, //true for 465, false for other port
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, //generated ethereal password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "http://mailgen.js",
  },
});

/** POST: http://localhost:5000/api/users/registerMail 
 * @param: {
 "username": "amen",
 "userEmail": "amen123@gmail.com",
 "text": "",
 "subject":"",
 }
*/

export const registerByMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  var email = {
    body: {
      name: username,
      intro:
        text || "Welcome to Sra... ! We are Very Excited To Have You On Site",
      outro:
        "Need Help, or Have Questions? Just Repl to This Email We Heppy To Help",
    },
  };
  var emailBody = MailGenerator.generate(email);

  var message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Signup SuccessFull",
    html: emailBody,
  };

  //send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You Should Receive An Email From Us...!" });
    })
    .catch((error) => res.status(500).send({ error }));
};
