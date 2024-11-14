import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { BoardState } from "../../types";

export const fetchBoards = createAsyncThunk(
  "boards/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/board/allboards");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (title: string, { getState, rejectWithValue }) => {
    try {
      const { boards } = (getState() as { board: BoardState }).board;
      if (boards.length >= 10) {
        toast.error("You cannot add more than 10 boards.");
        return rejectWithValue("Limit reached");
      }
      if (!title) {
        toast.error("Enter title");
        return rejectWithValue("Title is required");
      }
      const { data } = await axios.post("/api/board/createboard", { title });
      toast.success("Board created successfully");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const fetchSingleBoard = createAsyncThunk(
  "boards/fetchSingleBoard",
  async (boardId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/board/singleboard/${boardId}`);
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/board/boards/${boardId}`);
      dispatch(fetchBoards()); // Refetch boards to update the list
      toast.success("Board deleted successfully");
      return boardId;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (
    { boardId, title }: { boardId: string; title: string },
    { dispatch, rejectWithValue }
  ) => {
    if (!title) {
      toast.error("Enter title");
      return rejectWithValue("Title is required");
    }
    try {
      await axios.put(`/api/board/boards/${boardId}`, { title });
      dispatch(fetchBoards());
      toast.success("Board updated successfully");
      return { boardId, title };
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const addList = createAsyncThunk(
  "boards/addList",
  async (
    {
      boardId,
      title,
      description,
    }: { boardId: string; title: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `/api/tasks/boards/${boardId}/addtask`,
        { title, description }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteList = createAsyncThunk(
  "boards/deleteList",
  async (
    { boardId, listId }: { boardId: string; listId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.delete(
        `/api/tasks//boards/${boardId}/lists/${listId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const addCard = createAsyncThunk(
  "boards/addCard",
  async (
    {
      boardId,
      listId,
      title,
      description,
    }: { boardId: string; listId: string; title: string; description?: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `/api/card/boards/${boardId}/lists/${listId}/cards`,
        { title, description }
      );
      return { boardId, listId, card: data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCard = createAsyncThunk(
  "boards/deleteCard",
  async (
    {
      boardId,
      listId,
      cardId,
    }: { boardId: string; listId: string; cardId: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(
        `/api/card/boards/${boardId}/lists/${listId}/cards/${cardId}`
      );

      return { boardId, listId, cardId };
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
