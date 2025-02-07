require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./Config/corsOptions");
const cookieParser = require("cookie-parser");

// Database connection
const connectDB = require("./Config/dbConn");
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors(corsOptions));
app.use(cookieParser());


// Routes
const authRoutes = require("./routes/authRoutes");
const AchievementRoutes = require("./routes/AchievementRoutes");
const ProjectRoutes = require("./routes/ProjectRoutes");

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/achievements", AchievementRoutes);
app.use("/projects", ProjectRoutes);


// Database connection and server start
mongoose.connection.once("open", () => {
    console.log("MongoDB connected successfully");    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
  
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});