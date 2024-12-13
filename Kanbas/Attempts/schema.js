import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
   {
      user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
      user_firstName: String,
      user_lastName: String,
      quiz: {type: mongoose.Schema.Types.ObjectId, ref: "QuizModel"},
      quiz_name: String,
      course: {type: mongoose.Schema.Types.ObjectId, ref: "CourseModel"},
      attempt_time: Date,
      points_earned: Number,
      total_points: Number,
      answers: [{
         question: {type: mongoose.Schema.Types.ObjectId, ref:"QuestionModel"},
         user_answer: String,
         is_correct: Boolean
      }]
   },
   { collection: "attempts" }
);

export default attemptSchema;