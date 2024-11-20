import { useState } from "react";
import { ChevronRight, Edit, Trash, X } from "react-feather";
import { ChevronLeft, Plus } from "react-feather";
import { Popover } from "react-tiny-popover";
import { motion } from "framer-motion";
import {
  AppDispatch,
  RootState,
  useAppSelector,
} from "../../../feautures/store/store";
import { useDispatch } from "react-redux";

import {
  createBoard,
  deleteBoard,
  updateBoard,
} from "../../../feautures/boardsSlice/BoardApi";
import { setSelectedBoard } from "../../../feautures/boardsSlice/BoardSlice";
import {
  selectBoards,
  selectSelectedBoard,
} from "../../../feautures/boardsSlice/BoardSelectors";

const slideHori = (delay: any) => {
  return {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay,
      },
    },
  };
};

const Sidebar = ({ user }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  // Access all boards from the Redux store
  const boards = useAppSelector((state: RootState) => selectBoards(state));

  // Access the selected board from the Redux store
  const selectedBoard = useAppSelector((state: RootState) =>
    selectSelectedBoard(state)
  );

  const [title, setTitle] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [showpop, setShowpop] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const createHandle = () => {
    dispatch(createBoard(title));
    setTitle("");
  };
  const removeBoard = (boardId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this board?"
    );
    if (isConfirmed) {
      dispatch(deleteBoard(boardId));
      dispatch(setSelectedBoard(null));
    }
  };
  const boardHandler = (boardId: any) => {
    const selectedBoard = boards.find((board) => board._id === boardId);
    if (selectedBoard) {
      dispatch(setSelectedBoard(selectedBoard));
    }
  };
  const updateBoardName = (editingBoardId: string) => {
    if (editingBoardId && editingTitle) {
      dispatch(updateBoard({ boardId: editingBoardId, title: editingTitle }));
      setEditingBoardId(null);
      setEditingTitle("");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div
      variants={slideHori(0.7)}
      initial="initial"
      whileInView="animate"
      className={` bg-black/30 border-r-2 border-r-gray-500 transition-all ease-linear duration-300 ${
        !collapsed ? "w-[250px]" : "w-[30px]"
      } flex-shrink-0  `}
    >
      {collapsed && (
        <div className="py-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-md"
          >
            {" "}
            <ChevronRight size={20} />
          </button>
        </div>
      )}
      {!collapsed && (
        <div>
          <div className="flex justify-between p-3 border-b border-b-slate-500">
            {" "}
            <h4>{user.name}'s Workspace</h4>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-md"
            >
              {" "}
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="boardlist">
            <div className="flex justify-between px-3 py-2">
              <h6>Your Boards </h6>

              <Popover
                isOpen={showpop}
                align="start"
                positions={["top", "bottom", "left"]} // preferred positions by priority
                content={
                  <div className="ml-2 p-2 w-60 flex flex-col rounded bg-slate-500 text-white justify-center items-center gap-2">
                    <h4>Create Board</h4>
                    <button
                      onClick={() => setShowpop(!showpop)}
                      className="hover:bg-slate-600 rounded p-1 absolute right-2 top-2 "
                    >
                      <X size={13} />
                    </button>
                    <input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="p-1 w-full rounded bg-slate-200 text-black"
                      type="text"
                      placeholder="Enter Board Title"
                    />
                    <button
                      onClick={createHandle}
                      className="bg-slate-700 px-1 rounded w-full active:scale-95"
                    >
                      Create
                    </button>
                  </div>
                }
              >
                <button
                  onClick={() => setShowpop(!showpop)}
                  className="hover:bg-slate-600 rounded p-1 "
                >
                  <Plus size={13} />
                </button>
              </Popover>
            </div>
          </div>
          <ul>
            {boards.map((board) => {
              const isSelected = selectedBoard?._id == board._id;
              const isEditing = editingBoardId === board._id;
              return (
                <li key={board._id} className="flex items-center mr-3">
                  <button
                    onClick={() => boardHandler(board._id)}
                    className={`px-6 py-2 w-[70%] overflow-hidden flex justify-between rounded mr-2 ${
                      isSelected
                        ? "bg-gray-700 text-white"
                        : "hover:bg-gray-500"
                    }`}
                  >
                    {isEditing ? (
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={() => updateBoardName(editingBoardId)}
                        className="bg-gray-600 text-white rounded px-2"
                        placeholder="Enter new title"
                      />
                    ) : (
                      <span>{board.title}</span>
                    )}
                  </button>
                  <Edit
                    size={25}
                    className=" hover:bg-slate-600 rounded p-1  "
                    onClick={() => {
                      if (board._id && board.title) {
                        setEditingBoardId(board._id);
                        setEditingTitle(board.title);
                      }
                    }}
                  />
                  <Trash
                    size={25}
                    className=" hover:bg-slate-600 rounded p-1  "
                    onClick={() => board._id && removeBoard(board._id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
