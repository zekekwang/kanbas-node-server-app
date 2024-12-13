import model from "./model.js";

export function createAttempt(attempt) {
    return model.create(attempt);
}

export function getAttempt(attemptId) {
    return model.findOne({_id: attemptId});
}

export function getAttemptsForCourse(courseId) {
    return model.find({course: courseId});
}

export function updateAttempt(attemptId, attemptUpdates) {
    return model.updateOne({_id: attemptId}, attemptUpdates);
}

export function getAttemptsForUser(userId, quizId) {
    return model.find({user: userId, quiz: quizId});
}