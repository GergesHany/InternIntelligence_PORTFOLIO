require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = require("./Config/dbConn");
connectDB();


const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});


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