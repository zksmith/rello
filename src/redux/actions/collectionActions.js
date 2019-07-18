import uuidv4 from 'uuid';

import {
  SET_COLLECTIONS,
  ADD_TASK_ID_TO_COLLECTION,
  ADD_COLLECTION,
  MOVE_TASK,
  DELETE_COLLECTION,
  REMOVE_TASK_ID_FROM_COLLECTION
} from '../types';

export const setCollections = collections => ({
  type: SET_COLLECTIONS,
  payload: collections
});

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

export const addTaskIdToCollection = (taskId, collectionId) => {
  return {
    type: ADD_TASK_ID_TO_COLLECTION,
    payload: { collectionId, taskId }
  };
};

//Handle Task Drag and Drop
export const moveTask = ({
  collectionId,
  prevCollectionId,
  taskId,
  sourceIndex,
  destinationIndex
}) => {
  return {
    type: MOVE_TASK,
    payload: {
      collectionId,
      prevCollectionId,
      taskId,
      sourceIndex,
      destinationIndex
    }
  };
};

export const removeTaskId = ({ collectionId, taskId }) => {
  return {
    type: REMOVE_TASK_ID_FROM_COLLECTION,
    payload: { collectionId, taskId }
  };
};
