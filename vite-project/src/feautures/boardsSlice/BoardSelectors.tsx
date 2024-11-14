// selectors/boardSelectors.ts

import { RootState } from "../store/store";
import { Board } from "../../types";

// Selector to get the loading status
export const selectBoardLoading = (state: RootState): boolean =>
  state.board.loading;

// Selector to get all boards
export const selectBoards = (state: RootState): Board[] => state.board.boards;

// Selector to get the selected board
export const selectSelectedBoard = (state: RootState): Board | null =>
  state.board.selectedBoard;
