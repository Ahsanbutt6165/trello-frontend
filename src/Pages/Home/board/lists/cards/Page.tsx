import { X } from "react-feather";
import { useAppDispatch } from "../../../../../feautures/store/store";
import {
  deleteCard,
  fetchSingleBoard,
} from "../../../../../feautures/boardsSlice/BoardApi";
import toast from "react-hot-toast";

const Card = ({ card, listId, boardId }: any) => {
  const dispatch = useAppDispatch();

  const removeCard = async () => {
    await dispatch(deleteCard({ boardId, listId, cardId: card._id }));
    await dispatch(fetchSingleBoard(boardId));
    toast.success("Card deleted successfully");
  };
  return (
    <>
      <div className="flex justify-between ">
        <div>
          <h4 className="font-bold text-lg text-white">{card.title}</h4>
          <p className="text-white/70 mt-1">{card.description}</p>
        </div>
        <X
          onClick={removeCard}
          size={16}
          className="text-sm cursor-pointer hover:bg-slate-500"
        />
      </div>
    </>
  );
};

export default Card;
