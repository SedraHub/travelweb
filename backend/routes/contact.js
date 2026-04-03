const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Message = require("../models/Message");

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields (Name, Email, Message).",
        });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address.",
        });
    }

    console.log("Contact Form Submission received");

    try {
        // 1. Save to MongoDB
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        console.log("Message saved to database.");

        // 2. Try to send email (Optional/Background)
        // If the user hasn't configured email, this might fail, but the message is already saved.
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
                subject: `New Contact Form Submission from ${name}`,
                html: `<p>You have received a new message from the contact form.</p>
                       <p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong></p>
                       <p>${message}</p>`,
                replyTo: email
            };

            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully.");
        }

        res.json({
            success: true,
            message: "Your message has been received and saved!",
        });

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred, please try again later.",
        });
    }
});

module.exports = router;