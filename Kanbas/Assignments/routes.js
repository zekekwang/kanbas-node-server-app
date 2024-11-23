import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status =  assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const status = assignmentDao.deleteAssignment(assignmentId);
        res.send(status);
    });

    app.get("/api/assignments", (req, res) => {
        const assignments = assignmentDao.findAllAssignments();
        res.send(assignments);
    });

    app.post("/api/assignments/:courseId", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
            };
        const newAssignment = assignmentDao.createAssignment(assignment);
        res.send(newAssignment);
    });

    app.get("/api/assignments/:courseId", (req, res) => {
        const { courseId } = req.params;
        console.log("Fetching assignments for course:", courseId);
        const assignments = assignmentDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = assignmentDao.findAssignmentById(assignmentId);
        res.json(assignment);
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
          ...req.body,
          course: courseId,
        };
        const newAssignment = assignmentDao.createAssignment(assignment);
        res.send(newAssignment);
      });
}

