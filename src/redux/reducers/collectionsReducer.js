import {
  ADD_TASK_ID_TO_COLLECTION,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  MOVE_TASK,
  REMOVE_TASK_ID_FROM_COLLECTION,
  MOVE_COLLECTION
} from '../types';

const INITIAL_STATE = {
  collections: {
    sample_collection: {
      id: 'sample_collection',
      title: 'Up Next',
      taskIds: ['sample_task']
    },
    sample_collection2: {
      id: 'sample_collection2',
      title: 'In Progress',
      taskIds: []
    },
    sample_collection3: {
      id: 'sample_collection3',
      title: 'Done',
      taskIds: []
    }
  },
  collectionOrder: [
    'sample_collection',
    'sample_collection2',
    'sample_collection3'
  ]
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
        collections: { ...newCollections },
        collectionOrder: state.collectionOrder.filter(
          id => id !== action.payload
        )
      };
    }
    case MOVE_COLLECTION: {
      const newCollectionOrder = [...state.collectionOrder];
      newCollectionOrder.splice(action.payload.sourceIndex, 1);
      newCollectionOrder.splice(
        action.payload.destinationIndex,
        0,
        action.payload.collectionId
      );

      return {
        ...state,
        collectionOrder: newCollectionOrder
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
      return {
        ...state,
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            taskIds: state.collections[collectionId].taskIds.filter(
              id => id !== taskId
            )
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
