import {
  ADD_TASK_ID_TO_COLLECTION,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  MOVE_TASK,
  REMOVE_TASK_ID_FROM_COLLECTION
} from '../types';

const INITIAL_STATE = {
  collections: {
    sample_collection: {
      id: 'sample_collection',
      title: 'Sample Collection',
      taskIds: ['sample_task']
    }
  },
  collectionOrder: ['sample_collection']
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COLLECTION:
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.payload.id]: { ...action.payload }
        }
      };
    case DELETE_COLLECTION: {
      const newCollections = { ...state.collections };
      delete newCollections[action.payload];

      return {
        ...state,
        collections: { ...newCollections }
      };
    }
    case ADD_TASK_ID_TO_COLLECTION: {
      const { collectionId, taskId } = action.payload;

      const newTaskIds = [...state.collections[collectionId].taskIds, taskId];

      return {
        ...state,
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            taskIds: newTaskIds
          }
        }
      };
    }
    case REMOVE_TASK_ID_FROM_COLLECTION: {
      const { collectionId, taskId } = action.payload;
      const newTaskIds = state.collections[collectionId].taskIds.filter(
        id => id !== taskId
      );

      return {
        ...state,
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            taskIds: newTaskIds
          }
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

      const newTaskIds = [...state.collections[collectionId].taskIds];
      if (prevCollectionId === collectionId) {
        //this handles user reording task within a collection
        newTaskIds.splice(sourceIndex, 1);
      }
      newTaskIds.splice(destinationIndex, 0, taskId);

      return {
        ...state,
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            taskIds: newTaskIds
          }
        }
      };
    }
    default:
      return state;
  }
};

export default boardReducer;
