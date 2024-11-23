const quiz = {
    id: 1, name: "NodeJS Quiz",
    description: "A quiz on NodeJS",
    course: "Web Development",
    score: 0,
    };

export default function QuizModuleObject(app) {
    app.get("/lab5/quiz", (req, res) => {
        res.json(quiz);
    });
    app.get("/lab5/quiz/name", (req, res) => {
        res.json(quiz.name);
    });  
    app.get("/lab5/quiz/description", (req, res) => {
        res.json(quiz.description);
    });
    app.get("/lab5/quiz/course", (req, res) => {
        res.json(quiz.course);
    });
    app.get("/lab5/quiz/score", (req, res) => {
        res.json(quiz.score);
    });
}

