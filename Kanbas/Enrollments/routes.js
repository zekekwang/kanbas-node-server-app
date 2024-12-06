//kanbas-node-server-app/Kanbas/Enrollments/routes.js
import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // user enroll in course
  app.post("/api/enrollments/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  });

  // user unenroll from course
  app.delete("/api/enrollments/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(204);
  });

  // check if user is enrolled in course
  app.get("/api/enrollments/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const isEnrolled = enrollmentsDao.isUserEnrolledInCourse(currentUser._id, courseId);
    res.json({ enrolled: isEnrolled });
  });

  // get courses of current user chosen
  app.get("/api/users/current/courses", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const courses = enrollmentsDao.findCoursesForUser(currentUser._id);
    res.json(courses);
  });
}