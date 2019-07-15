import uuidv4 from 'uuid';

export const setBoardName = name => ({
  type: 'SET_BOARD_NAME',
  payload: name
});

export const setCollections = collections => ({
  type: 'SET_COLLECTIONS',
  payload: collections
});

export const addTask = (isEmptyCollection, tasksKey, task) => {
  if (isEmptyCollection) {
    return {
      type: 'ADD_FIRST_TASK',
      payload: { tasksKey, task }
    };
  }
  return {
    type: 'ADD_TASK_TO_COLLECTION',
    payload: { tasksKey, task }
  };
};

export const createFirstTask = (tasksKey, task) => ({});

export const addCollection = title => {
  const id = uuidv4();
  return {
    type: 'ADD_COLLECTION',
    payload: { id, title }
  };
};
