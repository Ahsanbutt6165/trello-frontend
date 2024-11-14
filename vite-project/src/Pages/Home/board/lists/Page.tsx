import { X } from "react-feather";
import Card from "./cards/Page";
import AddCard from "./addcard/Page";
import {
  deleteList,
  fetchSingleBoard,
} from "../../../../feautures/boardsSlice/BoardApi";
import { useAppDispatch } from "../../../../feautures/store/store";

import toast from "react-hot-toast";
// removeCard;

function List({ task, boardId, selectedBoard }: any) {
  const dispatch = useAppDispatch();
  const removeList = async ({
    boardId,
    listId,
  }: {
    boardId: string;
    listId: string;
  }) => {
    if (selectedBoard?._id) {
      await dispatch(deleteList({ boardId, listId })).unwrap();
      await dispatch(fetchSingleBoard(selectedBoard?._id));
      toast.success("list deleted");
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">{task.title}</h3>
        <X
          className="text-sm cursor-pointer hover:bg-slate-500 rounded"
          size={15}
          onClick={() => removeList({ boardId, listId: task._id })}
        />
      </div>

      <p className="text-white/70 mt-2 border-b-2 border-slate-600">
        {task.description}
      </p>

      <ul className="mt-4 space-y-4">
        {task.cards?.map((card: any) => (
          <li key={card._id} className="p-3 border rounded-lg shadow-sm  ">
            <Card
              key={card._id}
              listId={task._id}
              boardId={boardId}
              card={card}
            />
          </li>
        ))}
        <AddCard listId={task._id} boardId={boardId} />
      </ul>
    </div>
  );
}

export default List;
