import { SET_BOARD_NAME, DELETE_TASK, ADD_TASK } from '../types';

export const setBoardName = name => ({
  type: SET_BOARD_NAME,
  payload: name
});

export const addTask = (id, { subject, content }) => {
  return {
    type: ADD_TASK,
    payload: { id, subject, content }
  };
};

export const deleteTask = taskId => {
  return {
    type: DELETE_TASK,
    payload: taskId
  };
};
