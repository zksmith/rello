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

//Handle Task Drag and Drop
export const moveTask = (
  collectionId,
  prevCollectionId,
  taskId,
  sourceIndex,
  destinationIndex
) => {
  if (prevCollectionId === collectionId) {
    //handle user moving tasks within a collection
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

export const deleteTask = (collectionId, taskId) => {
  return {
    type: DELETE_TASK,
    payload: { collectionId, taskId }
  };
};
