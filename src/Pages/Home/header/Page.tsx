import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";
// import Profile from "./profile/Page";
import { useState } from "react";
import { motion } from "framer-motion";
import BaseButton from "../../../components/BaseButton";
import { useAppDispatch } from "../../../feautures/store/store";

import Profile from "./profile/Page";
import { logout } from "../../../feautures/authslice/AuthSlice";
import { setSelectedBoard } from "../../../feautures/boardsSlice/BoardSlice";
import { BACKEND_API } from "../../../constants";

const Header = ({ user }: any) => {
  const dispatch = useAppDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await axios.get(`${BACKEND_API}/api/user/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      dispatch(setSelectedBoard(null));
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-black/50 h-16 p-3 border-b border-b-gray-500 flex justify-between items-center px-12"
    >
      <div className=" text-2xl">Trello Assignment</div>
      <div className=" flex items-center gap-6">
        <div className="w-56 mt-32 z-10 ">
          {" "}
          {showDropdown && <Profile user={user} />}
        </div>

        <span
          className=" text-2xl font-bold  "
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {user.name}
        </span>

        <BaseButton className="text-sm" text="Logout" onClick={logoutHandler} />
      </div>
    </motion.div>
  );
};

export default Header;
