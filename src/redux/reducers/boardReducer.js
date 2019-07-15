import {
  SET_BOARD_NAME,
  SET_COLLECTIONS,
  ADD_TASK,
  ADD_COLLECTION
} from '../types';

const INITIAL_STATE = {
  boardName: 'Kanban Board',
  collections: {
    sample_collection: {
      id: 'sample_collection',
      title: 'Sample Collection',
      taskIds: ['sample_task']
    }
  },
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
    case SET_COLLECTIONS:
      return {
        ...state,
        collections: [...action.payload]
      };
    case ADD_COLLECTION:
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.payload.id]: { ...action.payload }
        }
      };
    case ADD_TASK:
      const { collectionId, taskId, subject, content } = action.payload;
      return {
        ...state,
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            taskIds: [...state.collections[collectionId].taskIds, taskId]
          }
        },
        tasks: {
          ...state.tasks,
          [taskId]: {
            id: taskId,
            subject,
            content
          }
        }
      };
    default:
      return { ...state };
  }
};

export default boardReducer;
