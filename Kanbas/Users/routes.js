// import * as dao from "./dao.js";
// import * as courseDao from "../Courses/dao.js";
// import * as enrollmentsDao from "../Enrollments/dao.js";

// export default function UserRoutes(app) {
//     const createCourse = (req, res) => {
//         const currentUser = req.session["currentUser"];
//         const newCourse = courseDao.createCourse(req.body);
//         enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
//         res.json(newCourse);
//     };
//     app.post("/api/users/current/courses", createCourse);

//     const createUser = (req, res) => { };
//     const deleteUser = (req, res) => { };
//     const findAllUsers = (req, res) => { };
//     const findUserById = (req, res) => { };
//     const updateUser = (req, res) => {
//         const userId = req.params.userId;
//         const userUpdates = req.body;
//         dao.updateUser(userId, userUpdates);
//         const currentUser = dao.findUserById(userId);
//         req.session["currentUser"] = currentUser;
//         res.json(currentUser);
//     };
//     const signup = (req, res) => {
//         const user = dao.findUserByUsername(req.body.username);
//         if (user) {
//             res.status(400).json(
//                 { message: "Username already in use" });
//             return;
//         }
//         // currentUser = dao.createUser(req.body);
//         const currentUser = dao.createUser(req.body);
//         req.session["currentUser"] = currentUser;
//         res.json(currentUser);
//     };
//     const signin = (req, res) => {
//         const { username, password } = req.body;
//         const currentUser = dao.findUserByCredentials(username, password);
//         if (currentUser) {
//             req.session["currentUser"] = currentUser;
//             res.json(currentUser);
//         } else {
//             res.status(401).json({ message: "Unable to login. Try again later." });
//         }
//     };
//     const profile = async (req, res) => {
//         const currentUser = req.session["currentUser"];
//         if (!currentUser) {
//             res.sendStatus(401);
//             return;
//         }
//         res.json(currentUser);
//     };
//     const findCoursesForEnrolledUser = (req, res) => {
//         let { userId } = req.params;
//         if (userId === "current") {
//             const currentUser = req.session["currentUser"];
//             if (!currentUser) {
//                 res.sendStatus(401);
//                 return;
//             }
//             userId = currentUser._id;
//         }
//         const courses = courseDao.findCoursesForEnrolledUser(userId);
//         res.json(courses);
//     };
//     app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
//     const signout = (req, res) => {
//         req.session.destroy();
//         res.sendStatus(200);
//     };
//     app.post("/api/users", createUser);
//     app.get("/api/users", findAllUsers);
//     app.get("/api/users/:userId", findUserById);
//     app.put("/api/users/:userId", updateUser);
//     app.delete("/api/users/:userId", deleteUser);
//     app.post("/api/users/signup", signup);
//     app.post("/api/users/signin", signin);
//     app.post("/api/users/signout", signout);
//     app.post("/api/users/profile", profile);
// }
import * as dao from "./dao.js";
// let currentUser = null;
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";




export default function UserRoutes(app) {

  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllcourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  };
  app.get("/api/users/:uid/courses", findCoursesForUser);

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };


  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    } else {
      console.log(`Current user ID: ${currentUser ? currentUser._id : 'null'}, User ID: ${userId}`);
    }
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);

  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }

  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };


  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);


  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}