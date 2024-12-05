import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
dotenv.config();
const PORT = process.env.PORT || 4000;
// const app = express();
app.use(cookieParser()); // for parse the cookie
app.use(express.json()); // for pasring application/json
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
