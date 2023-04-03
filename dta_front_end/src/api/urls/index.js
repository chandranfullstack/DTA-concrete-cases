export const APP_LOGIN = "api/auth/login/";

export const GET_QUIZ_LIST = "/api/assessment/all/";

export const ADMIN_LOGIN="/api/admin/quiz/all/meta";

export const CONCRETECASES="/api/concrecases/content";

export const GET_QUESTION_AND_GROUP = (quizID) =>
  `api/assessment/${quizID}/start/`;

//  export const GET_QUESTION_AND_GROUP = (quizID) =>
//  `api/assessment/${quizID}:quiz_id/start/`;

export const SAVE_QUESTION_ANSWER = "api/answer/createquizanswer";

export const GET_RESULT_LIST = (quizID) => `api/all/result?quizid=${quizID}`;

export const GET_QUESTION_ANSWER = (questionID, optionID, answerId) =>
  `api/answer/allquizanswer?questionid=${questionID}&option=${optionID}&answerid=${answerId}`;
