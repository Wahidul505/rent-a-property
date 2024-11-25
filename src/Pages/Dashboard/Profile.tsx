import React from "react";
import { useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";

const Profile = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  if (!user) return <Loading />;
  return (
    <div className="flex justify-center items-center ">
      <div className="w-full p-4 md:pl-10 md:py-4 md:pr-4 rounded h-40 flex flex-col justify-center space-y-3 border border-solid border-secondary">
        <div>
          <h3 className="text-lg md:text-2xl text-primary">Name</h3>
          <p className="text-base md:text-xl text-accent">{user?.name}</p>
        </div>
        <div>
          <h3 className="text-lg md:text-2xl text-primary">Email</h3>
          <p className="text-base md:text-xl text-accent">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
