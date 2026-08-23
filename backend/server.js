const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const cors = require("cors");

const rsvpRoutes = require("./routes/rsvpRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Engagement Invitation API is running 💍❤️");
});

app.use("/api/rsvp", rsvpRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed ❌");
    console.log(error.message);
  });
