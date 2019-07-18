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
      const { collectionId, taskId } = action.payload;
      const newTaskIds = state.collections[collectionId].taskIds.filter(
        id => id !== taskId
      );

      return {
        ...state,
        collections: updateCollectionTaskIds(
          state.collections,
          collectionId,
          newTaskIds
        )
      };
    }
    default:
      return state;
  }
};

export default boardReducer;
