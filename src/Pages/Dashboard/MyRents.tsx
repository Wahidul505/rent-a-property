import React, { FC } from "react";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";
import { removeUser } from "../../features/userSlice";
import { Booking } from "../../modals/Booking";
import RentCard from "./RentCard";

const MyRents: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { data: myRents, isLoading } = useQuery("my-rents", () =>
    fetch(`https://rent-a-property-server.vercel.app/my-rents/${user?.email}`, {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        dispatch(removeUser());
      } else {
        return res.json();
      }
    })
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col space-y-3">
      {myRents.length === 0 ? (
        <h1 className="text-lg md:text-2xl font-semibold text-center text-primary">
          You have No Rent Application
        </h1>
      ) : (
        myRents &&
        myRents.map((rent: Booking) => <RentCard key={rent._id} rent={rent} />)
      )}
    </div>
  );
};

export default MyRents;
