import { SET_BOARD_NAME, DELETE_TASK } from '../types';

import { updateCollectionTaskIds } from './taskUtils';

const INITIAL_STATE = {
  boardName: 'Kanban Board',
  tasks: {
    sample_task: { id: 'sample_task', subject: 'Sample Task', content: '' }
  }
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOARD_NAME:
      return {
        ...state,
        boardName: action.payload
      };
    case DELETE_TASK: {
      const { taskId } = action.payload;
      const newTasks = { ...state.tasks };
      delete newTasks[taskId];

      return {
        ...state,
        tasks: newTasks
      };
    }
    default:
      return state;
  }
};

export default boardReducer;
