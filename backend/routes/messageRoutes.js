const express = require("express");
const Message = require("../models/Message");

const router = express.Router();


// POST - Add a new message
router.post("/", async (req, res) => {
    try {

        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({
                message: "Name and message are required"
            });
        }

        const newMessage = await Message.create({
            name,
            message
        });

        res.status(201).json({
            message: "Message added successfully ❤️",
            data: newMessage
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to add message",
            error: error.message
        });

    }
});


// GET - Get all messages
router.get("/", async (req, res) => {
    try {

        const messages = await Message
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(messages);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get messages",
            error: error.message
        });

    }
});


module.exports = router;