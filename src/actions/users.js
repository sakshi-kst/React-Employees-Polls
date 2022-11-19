import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

function addAnswerToUser(authUser, question_id, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    question_id,
    answer
  };
}

export function handleSaveQuestionAnswer(authUser, question_id, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(authUser, question_id, answer));
    dispatch(addAnswerToQuestion(authUser, question_id, answer));

    return saveQuestionAnswer(authUser, question_id, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer: ', e);
    });
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  };
}