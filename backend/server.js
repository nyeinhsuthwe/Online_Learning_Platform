const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const http = require("http");
require("dotenv").config();
const CategoryRoute = require('./routes/category')
const AuthRoute = require("./routes/auth")
const CourseRoute = require("./routes/course")
const cookieParser = require("cookie-parser")
const ChapterRoute = require('./routes/chapter')
const EpisodeRoute = require('./routes/episode')
const Enroll = require("./routes/enroll")
const Review = require("./routes/review")
const Comment = require("./routes/comment")
const User = require("./routes/user")
const Chat = require("./routes/chat")
const path = require("path");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User");
const { Server } = require("socket.io");
const { registerChatSocket } = require("./socket/chatSocket");

const app = express()
const httpServer = http.createServer(app);

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MONGO_URI is missing");
}

mongoose.connect(MONGO_URL).then(() => {
    seedDefaultAdmin().then(() => {
        httpServer.listen(process.env.PORT, () => {
            console.log(`app is running on ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.error("Failed to seed default admin:", error.message);
        process.exit(1);
    });
})

async function seedDefaultAdmin() {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@online-learning.local";
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin123456!";
    const adminName = process.env.DEFAULT_ADMIN_NAME || "System Admin";

    const existingUser = await UserModel.findOne({ email: adminEmail });

    if (!existingUser) {
        const salt = await bcrypt.genSalt();
        const hashValue = await bcrypt.hash(adminPassword, salt);

        await UserModel.create({
            name: adminName,
            email: adminEmail,
            password: hashValue,
            role: "admin",
        });

        console.log(`Default admin created: ${adminEmail}`);
        return;
    }

    if (existingUser.role !== "admin") {
        existingUser.role = "admin";
        await existingUser.save();
        console.log(`Existing user promoted to admin: ${adminEmail}`);
    }
}

app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.100.163:5173"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))
app.use(morgan(`dev`))
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api", CategoryRoute)
app.use("/api", AuthRoute)
app.use("/api", CourseRoute)
app.use("/api", ChapterRoute)
app.use("/api", EpisodeRoute)
app.use("/api", Enroll)
app.use("/api", Review)
app.use("/api", Comment)
app.use("/api", User)
app.use("/api", Chat)

// Serve React frontend build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// For any other route, serve index.html (React handles routing)
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next();
  }
});

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.100.163:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

registerChatSocket(io);
