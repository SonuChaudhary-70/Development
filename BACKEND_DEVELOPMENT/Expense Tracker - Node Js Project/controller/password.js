const nodemailer = require('nodemailer');
require('dotenv').config()

// send email to the user with nodemailer  
exports.forgotPassword = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'siddhantc78@gmail.com',
            pass: process.env.PASSWORD,
        },
    });

    let mailDetails = {
        from: "siddhantc78@gmail.com",
        to: req.body.email,
        subject: "Password Reset Link",
        text: "link to reset your password",
        html: `<div class="card text-center">
        <div class="card-header">Reset Your Password</div>
        <div class="card-body">
            <h4 class="card-title">we have received a reset password request</h4>
            <p class="card-text">You can reset your password by clicking the link given below.</p>
            <a href="http://localhost:8001/password/reset-password/96c81373-6d2b-452f-a65d-6ce77e457e39" class="btn btn-primary" data-mdb-ripple-init>Change my password</a>
        </div>
        </div>`
    };
    const mailInfo = await transporter.sendMail(mailDetails);
    try {
        return res.status(200).json({ success: true, message: 'Mail received', messageId: mailInfo.messageId })
    }
    catch (err) {
        console.log('mail error :', err);
        return res.status(500).json({ success: false, message: 'something went wrong', error: err })
    }
}

// reset the password of the user
exports.resetPassword = (req, res) => {
    console.log('params :', req.params);
    res.status(200).json({ success: true, message: 'route works' })
}