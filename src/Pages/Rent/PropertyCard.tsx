import React, { FC } from "react";
import { Property } from "../../modals/Property";
import { BiBed } from "react-icons/bi";
import { TbBath } from "react-icons/tb";
import { TbSquaresFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type Props = {
  property: Property;
};

const PropertyCard: FC<Props> = ({ property }) => {
  const {
    _id,
    propertyName,
    propertyImage,
    price,
    propertySize,
    bedrooms,
    bathrooms,
    category,
    location,
  } = property;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/property/${_id}`)}
      className="rounded-lg bg-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
    >
      <div className="relative">
        <img className="rounded-t-lg w-full h-64" src={propertyImage} alt="" />
        <p className="bg-primary text-white absolute bottom-0 left-0 px-2 py-1 text-base font-semibold rounded-tr-2xl">
          {category.split("_").join(" ").toUpperCase()}
        </p>
      </div>
      <div className="mt-3 p-3">
        <p>
          <span className="text-primary font-semibold text-xl">${price}</span>
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

export default PropertyCard;
