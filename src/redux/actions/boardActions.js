import { SET_BOARD_NAME, DELETE_TASK } from '../types';

export const setBoardName = name => ({
  type: SET_BOARD_NAME,
  payload: name
});

export const deleteTask = taskId => {
  return {
    type: DELETE_TASK,
    payload: taskId
  };
};
