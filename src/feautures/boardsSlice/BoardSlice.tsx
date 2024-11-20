import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Board, BoardState, Task } from "../../types";

import {
  addCard,
  addList,
  createBoard,
  deleteBoard,
  deleteCard,
  deleteList,
  fetchBoards,
  fetchSingleBoard,
  updateBoard,
} from "./BoardApi";
const initialState: BoardState = {
  boards: [],
  selectedBoard: null,
  loading: false,
};

export const boardSlice = createSlice({
  name: "boardslice",
  initialState,
  reducers: {
    setSelectedBoard: (state, action: PayloadAction<Board | null>) => {
      state.selectedBoard = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchBoards.fulfilled,
        (state, action: PayloadAction<Board[]>) => {
          state.boards = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchBoards.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createBoard.fulfilled, (state, action: PayloadAction<Board>) => {
        state.boards.push(action.payload);
      })
      .addCase(
        fetchSingleBoard.fulfilled,
        (state, action: PayloadAction<Board>) => {
          state.selectedBoard = action.payload;
        }
      )
      .addCase(
        deleteBoard.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.boards = state.boards.filter(
            (board) => board._id !== action.payload
          );
        }
      )
      .addCase(updateBoard.fulfilled, (state, action) => {
        const updatedBoard = state.boards.find(
          (board) => board._id === action.payload.boardId
        );
        if (updatedBoard) {
          updatedBoard.title = action.payload.title;
          // Assign the updated board to selectedBoard
          state.selectedBoard = updatedBoard;
        }
      })

      .addCase(
        addList.fulfilled,
        (state, action: PayloadAction<{ boardId: string; list: Task }>) => {
          const board = state.boards.find(
            (b) => b._id === action.payload.boardId
          );
          if (board) {
            board.tasks?.push(action.payload.list);

            if (state.selectedBoard?._id === board._id) {
              state.selectedBoard = board;
            }
          }
        }
      )

      .addCase(
        deleteList.fulfilled,
        (state, action: PayloadAction<{ boardId: string; listId: string }>) => {
          const board = state.boards.find(
            (b) => b._id === action.payload.boardId
          );
          if (board) {
            board.tasks = board.tasks?.filter(
              (list) => list._id !== action.payload.listId
            );
          }
        }
      )
      .addCase(
        addCard.fulfilled,
        (
          state,
          action: PayloadAction<{ boardId: string; listId: string; card: any }>
        ) => {
          const { boardId, listId, card } = action.payload;
          const board = state.boards.find((b) => b._id === boardId);
          if (board) {
            const list = board.tasks?.find((t) => t._id === listId);
            if (list) {
              list.cards?.push(card);
            }
          }
        }
      )
      .addCase(
        deleteCard.fulfilled,
        (
          state,
          action: PayloadAction<{
            boardId: string;
            listId: string;
            cardId: string;
          }>
        ) => {
          const { boardId, listId, cardId } = action.payload;
          const board = state.boards.find((b) => b._id === boardId);
          if (board) {
            const list = board.tasks?.find((t) => t._id === listId);
            if (list) {
              list.cards = list.cards?.filter((card) => card._id !== cardId);
            }
          }
        }
      );
  },
});
export const { setSelectedBoard } = boardSlice.actions;
export default boardSlice.reducer;
