// import * as assignmentDao from "./dao.js";

// export default function AssignmentRoutes(app) {
//     app.put("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         const assignmentUpdates = req.body;
//         const status =  assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
//         res.send(status);
//     });

//     app.delete("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         const status = assignmentDao.deleteAssignment(assignmentId);
//         res.send(status);
//     });

//     app.get("/api/assignments", (req, res) => {
//         const assignments = assignmentDao.findAllAssignments();
//         res.send(assignments);
//     });

//     app.post("/api/assignments/:courseId", (req, res) => {
//         const { courseId } = req.params;
//         const assignment = {
//             ...req.body,
//             course: courseId,
//             };
//         const newAssignment = assignmentDao.createAssignment(assignment);
//         res.send(newAssignment);
//     });

//     app.get("/api/assignments/:courseId", (req, res) => {
//         const { courseId } = req.params;
//         console.log("Fetching assignments for course:", courseId);
//         const assignments = assignmentDao.findAssignmentsForCourse(courseId);
//         res.json(assignments);
//     });

//     app.get("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         const assignment = assignmentDao.findAssignmentById(assignmentId);
//         res.json(assignment);
//     });

//     app.post("/api/courses/:courseId/assignments", (req, res) => {
//         const { courseId } = req.params;
//         const assignment = {
//           ...req.body,
//           course: courseId,
//         };
//         const newAssignment = assignmentDao.createAssignment(assignment);
//         res.send(newAssignment);
//       });
// }



//kanbas-node-server-app/Kanbas/Assignments/routes.js

import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // get specific assignment
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // create a new assignment
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.json(newAssignment);
  });

  // uodate a specific assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    if (updatedAssignment) {
      res.json(updatedAssignment);
    } else {
      res.status(404).send({ message: "Assignment not found" });
    }
  });

  // delete a specific assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const success = await assignmentsDao.deleteAssignment(assignmentId);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Assignment not found" });
    }
  });
}