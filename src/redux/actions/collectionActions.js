import uuidv4 from "uuid";

import {
  SET_COLLECTIONS,
  ADD_COLLECTION,
  MOVE_TASK,
  DELETE_COLLECTION,
  MOVE_COLLECTION,
  FILTER_TASKS,
  DELETE_TASK,
  ADD_TASK,
  UPDATE_TASK
} from "../types";

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

export const deleteCollection = collectionId => ({
  type: DELETE_COLLECTION,
  payload: collectionId
});
export const moveCollection = (
  sourceIndex,
  destinationIndex,
  collectionId
) => ({
  type: MOVE_COLLECTION,
  payload: { sourceIndex, destinationIndex, collectionId }
});

//Handle Task Drag and Drop
export const moveTask = ({
  collectionId,
  prevCollectionId,
  taskId,
  sourceIndex,
  destinationIndex
}) => ({
  type: MOVE_TASK,
  payload: {
    collectionId,
    prevCollectionId,
    taskId,
    sourceIndex,
    destinationIndex
  }
});
export const addTask = (collectionId, taskId, { subject, content }) => ({
  type: ADD_TASK,
  payload: { collectionId, taskId, subject, content }
});

export const deleteTask = (collectionId, taskId) => ({
  type: DELETE_TASK,
  payload: { collectionId, taskId }
});

export const updateTask = (id, subject, description) => ({
  type: UPDATE_TASK,
  payload: { id, subject, description }
});

export const filterTasks = text => ({
  type: FILTER_TASKS,
  payload: text
});
