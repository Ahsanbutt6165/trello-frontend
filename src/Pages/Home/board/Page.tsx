import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { motion } from "framer-motion";
import { X } from "react-feather";
import {
  addList,
  fetchSingleBoard,
} from "../../../feautures/boardsSlice/BoardApi";

import List from "./lists/Page";
import { useAppDispatch, useAppSelector } from "../../../feautures/store/store";

import { selectSelectedBoard } from "../../../feautures/boardsSlice/BoardSelectors";
const slideUp = (delay: any) => {
  return {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay,
      },
    },
  };
};
const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showpop, setShowpop] = useState(false);
  const selectedBoard = useAppSelector(selectSelectedBoard);
  const dispatch = useAppDispatch();

  const createList = async () => {
    if (selectedBoard?._id) {
      await dispatch(
        addList({ boardId: selectedBoard._id, title, description })
      ).unwrap();
      //why need to fetch infact selectedboardstate is updated on createlist function
      dispatch(fetchSingleBoard(selectedBoard?._id));
      setTitle("");
      setDescription("");
    }
  };

  if (!selectedBoard) {
    return (
      <div className="text-bold  text-2xl">
        Please select a board to view details.
      </div>
    );
  }
  return (
    <>
      <motion.div
        variants={slideUp(0.8)}
        initial="initial"
        whileInView="animate"
        className="flex flex-col w-full "
      >
        <div className="p-3 px-20  flex justify-between w-full items-center ">
          <h2 className="text-2xl font-bold">{selectedBoard.title}</h2>
          <span className="text-white">
            Created At:{" "}
            {new Date(selectedBoard.createdAt ?? "").toLocaleString()}
          </span>
        </div>
        <div className="flex  w-full flex-grow  relative">
          <div className="flex flex-col w-full flex-grow relative ">
            <div className="absolute inset-0 mb-1 pb-2  p-3 flex overflow-x-scroll no-scrollbar">
              <div className="flex  gap-6">
                {selectedBoard.tasks?.map((task) => (
                  <div
                    key={task._id}
                    className="w-64 p-4 bg-black/50 rounded-lg overflow-y-scroll no-scrollbar shadow-md"
                  >
                    <List
                      key={task._id}
                      task={task}
                      boardId={selectedBoard?._id}
                      selectedBoard={selectedBoard}
                    />
                  </div>
                ))}
                <div className="flex-shrink-0">
                  <Popover
                    isOpen={showpop}
                    align="start"
                    positions={["bottom"]}
                    content={
                      <div className="ml-2 p-2 w-60 flex flex-col rounded bg-slate-500 text-white justify-center items-center gap-2">
                        <h4>Create List</h4>
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
                          placeholder="Enter List Title"
                        />
                        <input
                          id="title"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="p-1 w-full rounded bg-slate-200 text-black"
                          type="text"
                          placeholder="Enter List Description"
                        />
                        <button
                          onClick={createList}
                          className="bg-slate-700 px-1 rounded w-full active:scale-95"
                        >
                          Create
                        </button>
                      </div>
                    }
                  >
                    <button
                      onClick={() => setShowpop(!showpop)}
                      className="hover:bg-slate-900 h-10 w-20 bg-slate-600  rounded p-1 "
                    >
                      Add List
                    </button>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Main;
