// AddCard.js
import { useState } from "react";

import BaseButton from "../../../../../components/BaseButton";
import {
  addCard,
  fetchSingleBoard,
} from "../../../../../feautures/boardsSlice/BoardApi";
import { useAppDispatch } from "../../../../../feautures/store/store";
import toast from "react-hot-toast";

export default function AddCard({ listId, boardId }: any) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const handleAddCard = async () => {
    if (title && description) {
      await dispatch(addCard({ boardId, listId, title, description })).unwrap();
      await dispatch(fetchSingleBoard(boardId));
      toast.success("card created successfully");
      setTitle("");
      setDescription("");
      setIsFormVisible(false);
    } else {
      return toast.error("require both title and description");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsFormVisible(false);
  };

  return (
    <div className=" rounded-lg shadow-lg max-w-sm ">
      {isFormVisible ? (
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Add Card</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-3 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAddCard}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <BaseButton text="Add Card +" onClick={() => setIsFormVisible(true)} />
      )}
    </div>
  );
}
