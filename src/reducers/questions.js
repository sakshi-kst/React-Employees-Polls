import { RECEIVE_QUESTIONS, ADD_ANSWER_TO_QUESTION, ADD_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions };
    case ADD_ANSWER_TO_QUESTION:
      const { authUser, question_id, answer } = action;
      return {
        ...state,
        [question_id]: {
          ...state[question_id],
          [answer]: {
            ...state[question_id][answer],
            votes: state[question_id][answer].votes.concat(authUser)
          }
        }
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question
      };
    default:
      return state;
  }
}