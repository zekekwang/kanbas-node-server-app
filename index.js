// import "dotenv/config";
// import express from 'express'
// import mongoose from 'mongoose';
// import Hello from './Hello.js';
// import Lab5 from './Lab5/index.js';
// import UserRoutes from "./Kanbas/Users/routes.js";
// import CourseRoutes from "./Kanbas/Courses/routes.js";
// import ModuleRoutes from "./Kanbas/Modules/routes.js";
// import AssignmentRoutes from './Kanbas/Assignments/routes.js';
// import cors from 'cors'
// import "dotenv/config";
// import session from "express-session";
// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect(CONNECTION_STRING);
// const app = express()
// app.use(express.json());
// // app.subscribe(express.json());

// // app.use(cors({
// //     credentials: true,
// //     origin: process.env.NETLIFY_URL || "http://localhost:3000",
// // }
// // ));

// app.use(cors({
//     credentials: true,
//     origin: true // Allow all origins
// }));


// // const sessionOptions = {
// //     secret: "any string",
// //     resave: false,
// //     saveUninitialized: false,
// // };
// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kanbas",
//     resave: false,
//     saveUninitialized: false,
// };
// // const allowedOrigins = [
// //     process.env.NETLIFY_URL,
// //     "http://localhost:3000",
// //     "https://poetic-tanuki-df2e01.netlify.app/"
// // ];

// // app.use(cors({
// //     credentials: true,
// //     origin: function (origin, callback) {
// //         if (!origin || allowedOrigins.includes(origin)) {
// //             callback(null, true);
// //         } else {
// //             callback(new Error('Not allowed by CORS'));
// //         }
// //     }
// // }));

// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.NODE_SERVER_DOMAIN,
//     };
// }
// app.use(session(sessionOptions));
// UserRoutes(app);
// CourseRoutes(app);
// Lab5(app);
// Hello(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// app.listen(process.env.PORT || 4000);


// const express = require("express");
import session from "express-session";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import courses from "./Kanbas/Database/courses.js";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kanbas-01-fa24";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

app.listen(process.env.PORT || 4000);