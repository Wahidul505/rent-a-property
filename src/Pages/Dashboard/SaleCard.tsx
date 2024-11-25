import React, { FC } from "react";
import { BiBed } from "react-icons/bi";
import { TbBath, TbSquaresFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Property } from "../../modals/Property";

interface Props {
  listing: Property;
}

const SaleCard: FC<Props> = ({ listing }) => {
  const navigate = useNavigate();
  const { _id, image, property_name, city, beds, baths, size } = listing;
  return (
    <div
      onClick={() => navigate(`/dashboard/my-sales/${_id}`)}
      className="rounded-lg bg-white border border-primary relative hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div>
        <img className="rounded-t-lg w-full h-64" src={image} alt="" />
      </div>
      <div className="mt-3 p-3">
        {listing?.property_use === "rental" && (
          <p>
            <span className="text-primary font-semibold text-xl">
              {listing?.monthly_rent} TK
            </span>
            <span className="text-gray-500">/month</span>
          </p>
        )}
        <h3 className="text-2xl font-semibold">{property_name}</h3>
        <p className="text-gray-500 text-lg">{city}</p>
        <div className="md:grid md:grid-cols-3 mt-6">
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <BiBed className="text-xl" /> {beds} Beds
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbBath className="text-xl" /> {baths} Baths
          </span>
          <span className="flex gap-2 items-center text-gray-600 font-semibold">
            <TbSquaresFilled className="text-xl" />
            {size} &#13217;
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
