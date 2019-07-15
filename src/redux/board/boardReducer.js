const INITIAL_STATE = {
  boardName: 'Kanban Board',
  collections: [
    {
      id: 'sample_collection',
      title: 'Sample Collection'
    }
  ],
  tasks: { sample_collection: ['Sample Task'] }
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_BOARD_NAME':
      return {
        ...state,
        boardName: action.payload
      };
    case 'SET_COLLECTIONS':
      return {
        ...state,
        collections: [...action.payload]
      };
    case 'ADD_COLLECTION':
      return {
        ...state,
        collections: [...state.collections, action.payload]
      };
    case 'ADD_TASK_TO_COLLECTION':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.tasksKey]: [
            ...state.tasks[action.payload.tasksKey],
            action.payload.task
          ]
        }
      };
    case 'ADD_FIRST_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.tasksKey]: [action.payload.task]
        }
      };
    default:
      return { ...state };
  }
};

export default boardReducer;
