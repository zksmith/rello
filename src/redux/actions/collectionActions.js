import uuidv4 from 'uuid';

import {
  SET_COLLECTIONS,
  ADD_TASK_ID_TO_COLLECTION,
  ADD_COLLECTION,
  MOVE_TASK,
  DELETE_TASK,
  REORDER_TASK,
  DELETE_COLLECTION
} from '../types';

export const setCollections = collections => ({
  type: SET_COLLECTIONS,
  payload: collections
});

export const addTaskIdToCollection = (collectionId, task) => {
  const { subject, content } = task;
  const taskId = uuidv4();
  return {
    type: ADD_TASK_ID_TO_COLLECTION,
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

export const deleteCollection = collectionId => {
  return {
    type: DELETE_COLLECTION,
    payload: collectionId
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
