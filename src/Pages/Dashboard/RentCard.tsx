import React, { FC } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { BiBed } from "react-icons/bi";
import { MdAlternateEmail, MdOutlinePersonOutline } from "react-icons/md";
import { TbBath, TbSquaresFilled } from "react-icons/tb";
import { Booking } from "../../modals/Booking";
import { useQuery } from "react-query";

interface Props {
  rent: Booking;
}

const RentCard: FC<Props> = ({ rent }) => {
  const { property_id, applicant_email, status } = rent;

  const { data: property, isLoading: isPropertyLoading } = useQuery(
    ["property", property_id],
    () => {
      if (property_id) {
        return fetch(
          `https://rent-a-property-server.vercel.app/property/${property_id}`
        ).then((res) => res.json());
      }
    }
  );

  const { data: propertyOwner, isLoading: isPropertyOwnerLoading } = useQuery(
    ["property_owner", property?._id],
    () => {
      if (property?._id) {
        return fetch(
          `https://rent-a-property-server.vercel.app/user/${property?.owner_email}`
        ).then((res) => res.json());
      }
    }
  );

  if (isPropertyLoading || isPropertyOwnerLoading) return <></>;

  return (
    <div className="rounded bg-white border border-primary relative w-full md:h-80 flex overflow-hidden">
      <div className="w-72 lg:w-96">
        <span
          className={`text-white font-semibold text-lg uppercase p-2 rounded-3xl absolute top-1 right-1 z-20 ${
            status === "pending" && "bg-primary"
          } ${status === "declined" && "bg-error"} ${
            status === "accepted" && "bg-success"
          }`}
        >
          {status}
        </span>
        <img className="w-full h-full" src={property?.image} alt="" />
      </div>
      <div className="mt-3 p-3">
        <p>
          <span className="text-primary font-semibold text-xl">
            {property?.asking_price} TK
          </span>
          <span className="text-gray-500">/month</span>
        </p>
        <h3 className="text-2xl font-semibold">{property?.property_name}</h3>
        <p className="text-gray-500 text-lg">{property?.city}</p>
        <div className="md:grid md:grid-cols-3 mt-6">
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <BiBed className="text-xl" /> {property?.beds} Beds
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbBath className="text-xl" /> {property?.baths} Baths
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbSquaresFilled className="text-xl" />
            {property?.size} &#13217;
          </span>
        </div>
        <div className="bg-base-100 p-2 rounded-lg mt-8 overflow-x-auto">
          <h3 className="text-accent text-lg font-semibold">Property Owner</h3>
          <hr className="mb-3" />
          <p>
            <span className="flex gap-2 items-center text-gray-600 font-semibold">
              <MdOutlinePersonOutline className="text-xl" />:{" "}
              {propertyOwner?.name}
            </span>
          </p>
          <p>
            <span className="flex gap-2 items-center text-gray-600 font-semibold">
              <AiOutlinePhone className="text-xl" />: {propertyOwner?.contact}
            </span>
          </p>
          <p>
            <span className="flex gap-2 items-center text-gray-600 font-semibold">
              <MdAlternateEmail className="text-xl" />: {propertyOwner?.email}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentCard;
