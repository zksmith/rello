import {
  SET_COLLECTIONS,
  ADD_TASK_ID_TO_COLLECTION,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  MOVE_TASK,
  REMOVE_TASK_ID_FROM_COLLECTION
} from '../types';

const INITIAL_STATE = {
  sample_collection: {
    id: 'sample_collection',
    title: 'Sample Collection',
    taskIds: ['sample_task']
  }
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COLLECTIONS:
      return {
        ...state,
        ...action.payload
      };
    case ADD_COLLECTION:
      return {
        ...state,
        [action.payload.id]: { ...action.payload }
      };
    case DELETE_COLLECTION: {
      const newCollections = { ...state };
      delete newCollections[action.payload];

      return {
        ...newCollections
      };
    }
    case ADD_TASK_ID_TO_COLLECTION: {
      const { collectionId, taskId } = action.payload;

      const newTaskIds = [...state[collectionId].taskIds, taskId];

      return {
        ...state,
        [collectionId]: {
          ...state[collectionId],
          taskIds: newTaskIds
        }
      };
    }
    case REMOVE_TASK_ID_FROM_COLLECTION: {
      const { collectionId, taskId } = action.payload;
      const newTaskIds = state[collectionId].taskIds.filter(
        id => id !== taskId
      );

      return {
        ...state,
        [collectionId]: {
          ...state[collectionId],
          taskIds: newTaskIds
        }
      };
    }
    case MOVE_TASK: {
      const {
        collectionId,
        prevCollectionId,
        taskId,
        sourceIndex,
        destinationIndex
      } = action.payload;

      const newTaskIds = [...state[collectionId].taskIds];
      if (prevCollectionId === collectionId) {
        //this handles user reording task in a collection
        newTaskIds.splice(sourceIndex, 1);
      }
      newTaskIds.splice(destinationIndex, 0, taskId);

      return {
        ...state,
        [collectionId]: {
          ...state[collectionId],
          taskIds: newTaskIds
        }
      };
    }
    default:
      return state;
  }
};

export default boardReducer;
