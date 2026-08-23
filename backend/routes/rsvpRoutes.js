const express = require("express");
const Guest = require("../models/Guest");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, attendance, guestsCount } = req.body;

    const guest = await Guest.create({
      name,
      attendance,
      guestsCount,
    });

    res.status(201).json({
      message: "RSVP saved successfully ❤️",
      guest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save RSVP",
      error: error.message,
    });
  }
});

module.exports = router;