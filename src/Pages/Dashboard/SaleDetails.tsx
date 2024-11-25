import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlinePhone } from "react-icons/ai";
import { BiBed } from "react-icons/bi";
import { MdAlternateEmail, MdOutlinePersonOutline } from "react-icons/md";
import { TbBath, TbSquaresFilled } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Property } from "../../modals/Property";
import RentApplications from "./RentApplications";
import { useQuery } from "react-query";

const SaleDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property>();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://rent-a-property-server.vercel.app/property/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
      });
  }, [id]);

  const { data: propertyOwner, isLoading: isOwnerLoading } = useQuery(
    ["property_owner", property],
    () => {
      if (property?.owner_email) {
        return fetch(
          `https://rent-a-property-server.vercel.app/user/${property?.owner_email}`
        ).then((res) => res.json());
      }
    }
  );

  if (isOwnerLoading) return <></>;

  return (
    <div>
      <div>
        <span
          onClick={() => navigate("/dashboard/my-sales")}
          className="flex gap-2 items-center text-primary font-semibold cursor-pointer w-fit"
        >
          <AiOutlineLeft className="text-xl" />
          Back to My Sales
        </span>
        <div className="mt-8">
          <h1 className="text-3xl font-bold">
            {property?.property_name ? property.property_name : ""}
            <span>{property?.property_type ? property.property_type : ""}</span>
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            {property?.city?.toUpperCase() ? property.city?.toUpperCase() : ""}
          </p>
        </div>
        <div className="mt-8">
          <img
            className="rounded-lg w-full h-96"
            src={property?.image ? property.image : ""}
            alt=""
          />
          <div className="stats stats-vertical md:stats-horizontal shadow w-full mt-8 border border-accent">
            <div className="stat">
              <div className="stat-title">Beds</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <BiBed className="text-xl" />{" "}
                  {property?.beds ? property.beds : ""} Beds
                </span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Baths</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <TbBath className="text-xl" />{" "}
                  {property?.baths ? property.baths : ""} Baths
                </span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Square Area</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <TbSquaresFilled className="text-xl" />{" "}
                  {property?.size ? property.size : ""} &#13217;
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8">
            <div>
              <h2 className="text-xl font-semibold mb-6">
                About this{" "}
                {property?.property_type ? property.property_type : ""}
              </h2>
            </div>
            <div className="border border-accent rounded-lg p-2">
              <p className="text-gray-500">Rent Price</p>
              {property?.property_use === "rental" && (
                <p>
                  <span className="text-primary font-semibold text-2xl">
                    {property?.monthly_rent ? property?.monthly_rent : ""} TK
                  </span>
                  <span className="text-gray-500">/month</span> for{" "}
                  {property?.lease_term} months
                </p>
              )}
              {property?.property_use === "sale" && (
                <p>
                  <span className="text-primary font-semibold text-2xl">
                    {property?.asking_price ? property?.asking_price : ""} TK
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <RentApplications id={id} />
    </div>
  );
};

export default SaleDetails;
