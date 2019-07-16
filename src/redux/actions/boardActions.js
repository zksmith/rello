import {
  SET_BOARD_NAME,
  SET_COLLECTIONS,
  ADD_TASK,
  ADD_COLLECTION,
  MOVE_TASK,
  DELETE_TASK,
  REORDER_TASK
} from '../types';
import uuidv4 from 'uuid';

export const setBoardName = name => ({
  type: SET_BOARD_NAME,
  payload: name
});

export const setCollections = collections => ({
  type: SET_COLLECTIONS,
  payload: collections
});

export const addTask = (collectionId, subject, content = '') => {
  const taskId = uuidv4();
  return {
    type: ADD_TASK,
    payload: { collectionId, taskId, subject, content }
  };
};

export const addCollection = title => {
  const id = uuidv4();
  return {
    type: ADD_COLLECTION,
    payload: { id, title, taskIds: [] }
  };
};

export const moveTask = (
  collectionId,
  prevCollectionId,
  taskId,
  sourceIndex,
  destinationIndex
) => {
  console.log(destinationIndex);

  if (prevCollectionId === collectionId) {
    return {
      type: REORDER_TASK,
      payload: { collectionId, taskId, sourceIndex, destinationIndex }
    };
  }

  return {
    type: MOVE_TASK,
    payload: { collectionId, taskId, sourceIndex, destinationIndex }
  };
};

export const removeTask = (collectionId, taskId) => {
  return {
    type: DELETE_TASK,
    payload: { collectionId, taskId }
  };
};
