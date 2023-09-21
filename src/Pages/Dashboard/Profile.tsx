import React from "react";
import { useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";

const Profile = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  if (!user) return <Loading />;
  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4 md:pl-10 md:py-4 md:pr-4 rounded shadow-lg bg-white h-40 flex flex-col justify-center md:text-xl space-y-3">
        <div>Name: {user?.name}</div>
        <div>Email: {user?.email}</div>
      </div>
    </div>
  );
};

export default Profile;
