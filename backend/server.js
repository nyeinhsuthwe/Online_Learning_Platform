const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
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
const path = require("path");

const app = express()

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MONGO_URI is missing");
}

mongoose.connect(MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`app is running on ${process.env.PORT}`)
    })
})

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



