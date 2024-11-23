import express from 'express'
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import cors from 'cors'
import "dotenv/config";
import session from "express-session";
const app = express()
app.use(express.json());
// app.subscribe(express.json());

// app.use(cors({
//     credentials: true,
//     origin: process.env.NETLIFY_URL || "http://localhost:3000",
// }
// ));

app.use(cors({
    credentials: true,
    origin: true // Allow all origins
}));


// const sessionOptions = {
//     secret: "any string",
//     resave: false,
//     saveUninitialized: false,
// };
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

app.use(
    session(sessionOptions)
);

// const allowedOrigins = [
//     process.env.NETLIFY_URL,
//     "http://localhost:3000",
//     "https://poetic-tanuki-df2e01.netlify.app/"
// ];

// app.use(cors({
//     credentials: true,
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }));


if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
UserRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
ModuleRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000);