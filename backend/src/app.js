// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { app, server } from "./lib/socket.js";

// dotenv.config();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// const port = process.env.PORT;

// import authRoute from "./routes/authRoute.js";
// import messageRoute from "./routes/messageRoute.js";

// app.use("/api/auth", authRoute);
// app.use("/api/message", messageRoute);

// mongoose.connect(process.env.MONGODB_URI).then((res) => {
//   console.log("mongoDB connected:" + res.connection.host);
//   server.listen(port, () => {
//     console.log(`server running on port ${port}`);
//   });
// });

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log("MongoDB connected:", res.connection.host);

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
