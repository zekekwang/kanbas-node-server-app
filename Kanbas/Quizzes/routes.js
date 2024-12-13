import * as quizzesDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js";
import * as attemptsDao from "../Attempts/dao.js";

export default function QuizRoutes(app) {

    app.get("/api/quizzes/:quizId", async (req, res) => {
        const {quizId} = req.params;
        const quiz = await quizzesDao.getQuiz(quizId);
        res.json(quiz);
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizzesDao.deleteQuiz(quizId);
        res.send(status);
    });

    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });

    app.put("/api/quizzes/:quizId/status", async (req, res) => {
        const { quizId } = req.params;
        const { newStatus } = req.body;
        const status = await quizzesDao.setPublishStatus(quizId, newStatus);
        res.send(status);
    });

    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const {quizId} = req.params;
        const questions = await questionsDao.findQuestionsForQuiz(quizId);
        res.json(questions);
    });

    app.post("/api/quizzes/:quizId/questions", async (req, res)=> {
        const { quizId } = req.params;
        const question = {
          ...req.body,
          quiz: quizId,
        };
        const newQuestion = await questionsDao.createQuestion(question);
        res.send(newQuestion);
      })
      app.post("/api/quizzes/:quizId/attempts", async (req, res)=> {
        const { quizId } = req.params;
        const attempt = {
          ...req.body,
          quiz: quizId,
        };
        const newAttempt = await attemptsDao.createAttempt(attempt);
        res.send(newAttempt);
    });

    app.put("/api/quizzes/:quizId/attempts/:attemptId", async (req, res)=> {
        const { attemptId } = req.params;
        const attemptUpdates = req.body;
        const status = await attemptsDao.updateAttempt(attemptId, attemptUpdates);
        res.send(status);
    });

    app.get("/api/quizzes/:quizId/attempts/:attemptId", async (req, res)=> {
        const { attemptId } = req.params;
        const attempt = await attemptsDao.getAttempt(attemptId);
        res.json(attempt);
    });
    
    app.get("/api/quizzes/:quizId/:userId/attempts", async (req, res) => {
        const {  quizId, userId } = req.params;
        const attempts = await attemptsDao.getAttemptsForUser(userId, quizId);
        res.json(attempts);
    });
}