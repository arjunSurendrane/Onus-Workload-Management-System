import nodemailer from 'nodemailer';


export const GenerateMail = (email, otp) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    })

    let details = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: "Email Verification",
        text: "body of the email",
        html: `<h1>Welcome To Onus</h1> 
                <h2>OTP : ${otp}</h2>`
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log({ err })
        } else {
            console.log("email has sent")
        }
    })
}