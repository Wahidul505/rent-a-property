import React, { FC } from "react";
import { BiBed } from "react-icons/bi";
import { TbBath, TbSquaresFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Property } from "../../modals/Property";

interface Props {
  sale: Property;
}

const SaleCard: FC<Props> = ({ sale }) => {
  const navigate = useNavigate();
  const {
    _id,
    propertyImage,
    price,
    propertyName,
    location,
    bedrooms,
    bathrooms,
    propertySize,
  } = sale;
  return (
    <div
      onClick={() => navigate(`/dashboard/my-sales/${_id}`)}
      className="rounded-lg bg-white border border-primary relative hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div>
        <img className="rounded-t-lg w-full h-64" src={propertyImage} alt="" />
      </div>
      <div className="mt-3 p-3">
        <p>
          <span className="text-primary font-semibold text-xl">{price} TK</span>
          <span className="text-gray-500">/month</span>
        </p>
        <h3 className="text-2xl font-semibold">{propertyName}</h3>
        <p className="text-gray-500 text-lg">{location}</p>
        <div className="md:grid md:grid-cols-3 mt-6">
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <BiBed className="text-xl" /> {bedrooms} Beds
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbBath className="text-xl" /> {bathrooms} Baths
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbSquaresFilled className="text-xl" />
            {propertySize} &#13217;
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
