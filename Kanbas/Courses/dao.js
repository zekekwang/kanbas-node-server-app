// import Database from "../Database/index.js";
import model from "./model.js";

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
   }   

// export function deleteCourse(courseId) {
//     const { courses, enrollments } = Database;
//     Database.courses = courses.filter((course) => course._id !== courseId);
//     Database.enrollments = enrollments.filter(
//         (enrollment) => enrollment.course !== courseId
//     );
// }

export function findAllcourses() {
    // return Database.courses;
    return model.find();
}

// export function findCoursesForEnrolledUser(userId) {
//     const { courses, enrollments } = Database;
//     const enrolledCourses = courses.filter((course) =>
//         enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//     return enrolledCourses;
// }

export function createCourse(course) {
    delete course._id;
    return model.create(course);
    // const newCourse = { ...course, _id: Date.now().toString() };
    // Database.courses = [...Database.courses, newCourse];
    // return newCourse;
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    // const { courses } = Database;
    // const course = courses.find((course) => course._id === courseId);
    // Object.assign(course, courseUpdates);
    // return course;
}
