import { SET_BOARD_NAME, ADD_TASK } from '../types';

export const setBoardName = name => ({
  type: SET_BOARD_NAME,
  payload: name
});

export const addTask = (collectionId, taskId, { subject, content }) => ({
  type: ADD_TASK,
  payload: { collectionId, taskId, subject, content }
});
