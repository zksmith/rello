import { SET_BOARD_NAME } from '../types';

const INITIAL_STATE = {
  boardName: 'Kanban Board'
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOARD_NAME:
      return {
        ...state,
        boardName: action.payload
      };

    default:
      return state;
  }
};

export default boardReducer;
