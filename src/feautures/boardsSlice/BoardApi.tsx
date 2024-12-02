import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { BoardState } from "../../types";
import { BACKEND_API } from "../../constants";

export const fetchBoards = createAsyncThunk(
  "boards/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BACKEND_API}/api/board/allboards`);
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
      const { data } = await axios.post(
        `${BACKEND_API}/api/board/createboard`,
        { title },
        { withCredentials: true }
      );
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
      const { data } = await axios.get(
        `${BACKEND_API}/api/board/singleboard/${boardId}`,
        { withCredentials: true }
      );
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
      await axios.delete(`${BACKEND_API}/api/board/boards/${boardId}`, {
        withCredentials: true,
      });
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
      await axios.put(
        `${BACKEND_API}/api/board/boards/${boardId}`,
        { title },
        { withCredentials: true }
      );
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
        `${BACKEND_API}/api/tasks/boards/${boardId}/addtask`,
        { title, description },
        { withCredentials: true }
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
        `${BACKEND_API}/api/tasks//boards/${boardId}/lists/${listId}`,
        { withCredentials: true }
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
        `${BACKEND_API}/api/card/boards/${boardId}/lists/${listId}/cards`,
        { title, description },
        { withCredentials: true }
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
        `${BACKEND_API}/api/card/boards/${boardId}/lists/${listId}/cards/${cardId}`,
        { withCredentials: true }
      );

      return { boardId, listId, cardId };
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
