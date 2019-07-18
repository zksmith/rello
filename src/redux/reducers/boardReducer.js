import {
  SET_BOARD_NAME,
  SET_COLLECTIONS,
  ADD_TASK_ID_TO_COLLECTION,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  MOVE_TASK,
  DELETE_TASK
} from '../types';

import {
  updateCollectionTaskIds,
  updateCollectionTaskIdsOnMove
} from './taskUtils';
import { REHYDRATE } from 'redux-persist';

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
    case DELETE_COLLECTION: {
      const newCollections = { ...state.collections };
      delete newCollections[action.payload];
      return {
        ...state,
        collections: newCollections
      };
    }
    case ADD_TASK_ID_TO_COLLECTION: {
      const { collectionId, taskId, subject, content } = action.payload;
      const newTaskIds = [...state.collections[collectionId].taskIds, taskId];

      return {
        // Update taskIds in target collection using collectionId
        ...state,
        collections: updateCollectionTaskIds(
          state.collections,
          collectionId,
          newTaskIds
        ),

        // Update tasks using taskId
        tasks: {
          ...state.tasks,
          [taskId]: {
            id: taskId,
            subject,
            content
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

      //PrevTaskIds handles user moving task to another collection
      const prevTaskIds = [...state.collections[prevCollectionId].taskIds];
      prevTaskIds.splice(sourceIndex, 1);

      const newTaskIds = [...state.collections[collectionId].taskIds];
      newTaskIds.splice(destinationIndex, 0, taskId);

      return {
        ...state,
        collections: updateCollectionTaskIdsOnMove(
          state.collections,
          collectionId,
          prevCollectionId,
          newTaskIds,
          prevTaskIds
        )
      };
    }
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
    case REHYDRATE:
      if (action.payload) return { ...state, ...action.payload.board };
      return { ...state };
    default:
      return { ...state };
  }
};

export default boardReducer;
