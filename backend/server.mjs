// const express = require('express')
// const app = express()

// app.listen((req,res) => {
//     res.send(`listening port: https://localhost:${port}`)
// })

import express from "express";
// import notes from "../frontend/src/data/notes.js";
import notes from './data/notes.js';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import { errorHandler, notFoundError } from "./middlewares/errorMiddleware.js";
import path from "path";
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//   })
// );

const port = process.env.PORT || 5000;

//---------------deployement---------------
//signifies current workiing directory
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend","build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send(`listening port: https://localhost:${port}`);
  });
}
//---------------deployement---------------






// app.get("/api/notes", (req, res) => {
//   res.send(notes);
// });

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)
app.use(notFoundError);
app.use(errorHandler);

// app.get("/api/notes/:id", (req, res) => {
//   const id = req.params.id;
//   res.send(notes.find((note) => note._id === id));
// });

app.listen(port, () => {
  console.log(`app is running at port: ${port} `);
});
