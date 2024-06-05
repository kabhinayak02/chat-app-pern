import express from "express";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser()) // for parse the cookie
app.use(express.json()) // for pasring application/json

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(8000, ()=>{
    console.log("server is running on port 8000");
})