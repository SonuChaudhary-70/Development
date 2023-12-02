const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const uuid = require('uuid');
const ForgotPasswordReq = require('../model/ForgotPassword')
require('dotenv').config();

// send email to the user with nodemailer  
exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    // first find the user who wants to reset the password
    const user = await User.findOne({ where: { email: email } });

    // if user found then update the forgot password request table
    if (user) {
        const id = uuid.v4();
        await user.createForgotPasswordReq({
            id: id,
            isActive: true
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        let mailDetails = {
            from: "siddhantc78@gmail.com",
            to: email,
            subject: "Password Reset Link",
            text: "link to reset your password",
            html: `<div class="card text-center">
        <div class="card-header">Reset Your Password</div>
        <div class="card-body">
            <h4 class="card-title">we have received a reset password request</h4>
            <p class="card-text">You can reset your password by clicking the link given below.</p>
            <a href="http://localhost:8001/password/reset-password/${id}" class="btn btn-primary" data-mdb-ripple-init>Change my password</a>
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
    } else {
        return res.status(401).json({ success: false, message: 'Email not registered. Please enter registered email id' })
    }
}

// reset the password of the user
exports.resetPassword = (req, res) => {
    const uuid = req.params.uuid;
    const activeForgotReq = ForgotPasswordReq.findOne({ where: { id: uuid } });
    if (activeForgotReq) {
        ForgotPasswordReq.update({ isActive: false }, { where: { id: uuid } })
        res.status(200).send(`
                <form  method="get" action="http://localhost:8001/password/update-password/${uuid}" style="border:2px solid black; width:30rem; padding:10px 20px;">
                    <h3 class="">Enter your new password below</h3>
                    <div class="mb-3">
                        <label for="Password" class="form-label h6">New Password</label><br>
                        <input type="password" name="Password" class="form-control border-dark" id="Password"
                            placeholder="Please enter your new password" required style="width:100%; height:2rem">
                    </div>
                    <button type="submit" class="btn btn-primary" id="change" style="margin-top:10px">Reset
                        Password</button>
                </form>
        `);
        res.end()
    } else {
        res.status(404).json({ success: false, message: 'link does not work' })
    }
}

exports.updatePassword = async (req, res) => {
    const newPassword = req.query.Password
    const reqId = req.params.uuid
    ForgotPasswordReq.findOne({ where: { id: reqId } })
        .then((passChangeReq) => {
            if (passChangeReq) {
                return User.findOne({ where: { id: passChangeReq.UserId } })
            } else {
                throw new Error('Change password link not found')
            }
        })
        .then(async (user) => {
            if (user) {
                let hashedPassword = await bcrypt.hash(newPassword, 10)
                await User.update({ password: hashedPassword }, { where: { id: user.id } });
                // res.status(200).json({ status: true, message: 'password changed' });
                res.status(200).send(`
                <h4>Your password has been reset.</h4>
                <a href="http://localhost:8001/" class="btn btn-primary" data-mdb-ripple-init>Please click here to login</a>`);
            } else {
                throw new Error('user does not exist')
            }
        })
        .catch((err) => {
            console.log('Error while updating the password :', err);
            res.status(403).json({ success: false, message: 'something went wrong', Error: err });
        })
}
