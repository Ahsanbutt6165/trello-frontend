import axios from "axios";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { BACKEND_API } from "../../../../constants";

const Profile = ({ user }: any) => {
  const [totalBoards, setTotalBoards] = useState(0);

  async function totalCount() {
    try {
      const { data } = await axios.get(`${BACKEND_API}/api/board/totalboards`, {
        withCredentials: true,
      });
      setTotalBoards(data.total);
    } catch (error: any) {
      toast.error(error);
    }
  }

  useEffect(() => {
    totalCount();
  }, []);
  if (!user) {
    return <p className="text-gray-800 text-center">User not found.</p>;
  }
  return (
    <div className="flex justify-center items-center ">
      <div className=" text-sm mx-auto p-6 bg-slate-500 rounded-lg shadow-lg space-y-4 ">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          My Profile
        </h2>

        <div className="space-y-2 ">
          <div className="flex flex-col jus items-center gap-3">
            <p>
              {" "}
              <span className="font-medium text-gray-900">Name:</span>
              <span className="ml-2 text-gray-800">{user?.name}</span>
            </p>
            <p>
              <span className="font-medium text-gray-900">Email:</span>
              <span className="ml-2 text-gray-800">{user?.email}</span>
            </p>
            <p>
              <span className="font-medium text-gray-900">Created Boards:</span>
              <span className="ml-2 text-gray-800">{totalBoards}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
