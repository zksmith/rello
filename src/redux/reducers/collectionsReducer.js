import {
  ADD_COLLECTION,
  DELETE_COLLECTION,
  MOVE_TASK,
  MOVE_COLLECTION,
  ADD_TASK,
  DELETE_TASK,
  FILTER_TASKS,
  REHYDRATE
} from '../types';
import SAMPLE_DATA from '../../sample-data/sampleData';
import { deleteTasks, deleteItem } from './utils';

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
    case DELETE_COLLECTION:
      return {
        ...state,
        collections: deleteItem(action.payload, state.collections),
        collectionOrder: state.collectionOrder.filter(
          id => id !== action.payload
        ),
        tasks: deleteTasks(
          state.collections[action.payload].taskIds,
          state.tasks
        )
      };
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
          },
          [prevCollectionId]: {
            ...state.collections[prevCollectionId],
            taskIds:
              prevCollectionId !== collectionId
                ? state.collections[prevCollectionId].taskIds.filter(
                    id => id !== taskId
                  )
                : newTaskIds
          }
        }
      };
    }
    case ADD_TASK: {
      const { collectionId, taskId, subject, content } = action.payload;
      const newTaskIds = [...state.collections[collectionId].taskIds, taskId];

      return {
        ...state,
        collections: {
          ...state.collections,
          [collectionId]: {
            ...state.collections[collectionId],
            taskIds: newTaskIds
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
    }
    case DELETE_TASK:
      return {
        ...state,
        tasks: deleteItem(action.payload.taskId, state.tasks),
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
    case FILTER_TASKS:
      return {
        ...state,
        filter: action.payload.toLowerCase()
      };
    case REHYDRATE:
      if (action.payload)
        return {
          ...action.payload.collectionState,
          filter: state.filter
        };
      return state;
    default:
      return state;
  }
};

export default boardReducer;
