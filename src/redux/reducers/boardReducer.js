import {
  SET_BOARD_NAME,
  SET_COLLECTIONS,
  ADD_TASK,
  ADD_COLLECTION,
  MOVE_TASK,
  REMOVE_TASK
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
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.payload.collectionId]: {
            ...state.collections[action.payload.collectionId],
            taskIds: [
              ...state.collections[action.payload.collectionId].taskIds,
              action.payload.taskId
            ]
          }
        },
        tasks: {
          ...state.tasks,
          [action.payload.taskId]: {
            id: action.payload.taskId,
            subject: action.payload.subject,
            content: action.payload.content
          }
        }
      };
    case MOVE_TASK:
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.payload.collectionId]: {
            ...state.collections[action.payload.collectionId],
            taskIds: [
              ...state.collections[action.payload.collectionId].taskIds,
              action.payload.taskId
            ]
          }
        }
      };
    case REMOVE_TASK:
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.payload.collectionId]: {
            ...state.collections[action.payload.collectionId],
            taskIds: state.collections[
              action.payload.collectionId
            ].taskIds.filter(id => id !== action.payload.taskId)
          }
        }
      };
    default:
      return { ...state };
  }
};

export default boardReducer;
