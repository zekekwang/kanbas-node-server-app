const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
  export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
      res.json(assignment.title);
    });
    // edit title
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
      const { newTitle } = req.params;
      assignment.title = newTitle;
      res.json(assignment);
    });  
    // edit score
    app.get("/lab5/assignment/score/:a", (req, res) => {
        const {a} = req.params;
        assignment.score = a;
        res.json(assignment);
      });
    // edit completed
    app.get("/lab5/assignment/completed/:a", (req, res) => {
        const {a} = req.params;
        assignment.completed = a;
        res.json(assignment);
      }
    );
  };
  