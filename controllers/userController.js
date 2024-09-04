const User = require('./../models/userModel');
const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');


const addUser = async (req, res) => {   
    const { first_name, last_name, email, phone, state } = req.body;
    try {
        const token = crypto.randomBytes(20).toString('hex');
        
        // Create the user with an 'inactive' status and a confirmation token
        const user = await User.create({
            ...req.body,
            isActive: false, 
            confirmationToken: token
        });

        if (email) {
            console.log("Sending confirmation email");

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Confirm Your Email Address',
                text: `Hello ${first_name},\n\nPlease confirm your email address by clicking the following link:\n\n/confirm-email/${token}\n\nBest regards,\nThe Team`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Confirmation email sent:', info.response);
                }
            });
        }

        res.json({
            status_code: true,
            message: "User created. Please check your email to confirm your account."
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status_code: false,
            message: "An error occurred"
        });
    }
};



async function getAllUsers(req, res) {
    try {
        const users = await User.find().lean()
        if(users.length>0){
            return res.json({
                status_code: true,
                message:  `${users.length} users are found`
        })
        }
        res.json({
            status_code: true,
            message: "No user found"
        })
    } catch (error) {
        res.json({
            status_code: false,
            message: error.meassage
        })
    }
}



module.exports = {
    getAllUsers, addUser
};
