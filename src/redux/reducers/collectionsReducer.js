import {
  ADD_TASK_ID_TO_COLLECTION,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  MOVE_TASK,
  REMOVE_TASK_ID_FROM_COLLECTION,
  MOVE_COLLECTION,
  ADD_TASK,
  DELETE_TASK,
  FILTER_TASKS,
  REHYDRATE
} from '../types';
import SAMPLE_DATA from '../../sample-data/sampleData';
import { deleteTasks } from './utils';

const INITIAL_STATE = {
  collections: SAMPLE_DATA.collections,
  collectionOrder: SAMPLE_DATA.collectionOrder,
  tasks: SAMPLE_DATA.tasks,
  filter: ''
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COLLECTION:
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.payload.id]: { ...action.payload }
        },
        collectionOrder: [...state.collectionOrder, action.payload.id]
      };
    case DELETE_COLLECTION: {
      const newCollections = { ...state.collections };
      delete newCollections[action.payload];

      return {
        ...state,
        collections: { ...newCollections },
        collectionOrder: state.collectionOrder.filter(
          id => id !== action.payload
        ),
        tasks: deleteTasks(
          state.collections[action.payload].taskIds,
          state.tasks
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
    case ADD_TASK: {
      const { id, subject, content } = action.payload;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: {
            id,
            subject,
            content
          }
        }
      };
    }

    case DELETE_TASK: {
      const newTasks = { ...state.tasks };
      delete newTasks[action.payload];

      return {
        ...state,
        tasks: { ...newTasks }
      };
    }
    case FILTER_TASKS:
      return {
        ...state,
        filter: action.payload
      };
    case REHYDRATE:
      var incoming = action.payload.collectionState;
      if (incoming)
        return {
          ...state,
          ...incoming,
          filter: state.filter
        };
      return state;
    default:
      return state;
  }
};

export default boardReducer;
