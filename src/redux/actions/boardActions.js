import { SET_BOARD_NAME } from '../types';

export const setBoardName = name => ({
  type: SET_BOARD_NAME,
  payload: name
});
