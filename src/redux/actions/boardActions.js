import { SET_BOARD_NAME, DELETE_TASK, ADD_TASK, UPDATE_TASK } from '../types';

export const setBoardName = name => ({
  type: SET_BOARD_NAME,
  payload: name
});

export const addTask = (collectionId, taskId, { subject, content }) => ({
  type: ADD_TASK,
  payload: { collectionId, taskId, subject, content }
});

export const deleteTask = (collectionId, taskId) => ({
  type: DELETE_TASK,
  payload: { collectionId, taskId }
});

export const updateTask = (id, subject, description) => ({
  type: UPDATE_TASK,
  payload: { id, subject, description }
});
