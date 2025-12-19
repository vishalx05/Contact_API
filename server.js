import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import { Contact } from "./Models/Contact.js";
import { User } from "./Models/User.js";

import bcrypt from "bcrypt";

import {
  getAllContact,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
} from "./controllers/Contact.js";
import userRouter from "./routes/User.js";
import contactRouter from "./routes/Contact.js";
import {config} from 'dotenv'
import cors from 'cors'
const app = express();
// .env setup
config({path:'.env'})

app.use(bodyParser.json());
app.use(cors({
  origin:true,
  methods:["POST","GET","PUT","DELETE"],
  credentials:true
}))
mongoose
  .connect(
    process.env.MongoUrl
    ,
    { dbName: "contactApi_youtube" }
  )
  .then(() => console.log("mongodb conneted "))
  .catch(() => console.log("erorr"));

//user router
app.use("/api/user", userRouter);


// contact router
app.use("/api/contact", contactRouter);

const port = 3000;
app.listen(port, () => console.log("server is running on port 1000..."));
