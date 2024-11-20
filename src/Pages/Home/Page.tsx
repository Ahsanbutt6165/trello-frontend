import Sidebar from "./sidebar/Page.tsx";
import Main from "./board/Page.tsx";
import Header from "./header/Page.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../feautures/store/store.tsx";

import { selectUser } from "../../feautures/authslice/AuthSelectors.tsx";
import { fetchBoards } from "../../feautures/boardsSlice/BoardApi.tsx";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);
  return (
    <div className="flex flex-col h-screen text-3xl ">
      <Header user={user} />
      <div className=" flex flex-grow text-base   ">
        <Sidebar user={user} />
        <Main />
      </div>
    </div>
  );
};

export default Home;
