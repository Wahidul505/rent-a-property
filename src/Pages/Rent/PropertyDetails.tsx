import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiBed } from "react-icons/bi";
import { TbBath } from "react-icons/tb";
import { TbSquaresFilled } from "react-icons/tb";
import { Property } from "../../modals/Property";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { MdAlternateEmail, MdLocationCity } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import BookingModal from "./BookingModal";
import { useQuery } from "react-query";
import { useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property>();
  const [bookingProperty, setBookingProperty] = useState<Property | null>();
  // const [propertyOwner, setPropertyOwner] = useState(null);

  useEffect(() => {
    fetch(`https://rent-a-property-server.vercel.app/property/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data));
  }, [id]);

  const {
    data: bookingStatus,
    isLoading,
    refetch,
  } = useQuery(["booking_status", user, id], () =>
    fetch(
      `https://rent-a-property-server.vercel.app/isApplied?id=${id}&email=${user?.email}`
    ).then((res) => res.json())
  );

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

  // useEffect(() => {
  //   if (property?.owner_email) {
  //     fetch(
  //       `https://rent-a-property-server.vercel.app/user/${property?.owner_email}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => setPropertyOwner(data));
  //   }
  // }, [property?.owner_email]);

  if (isLoading || isOwnerLoading) {
    return <Loading />;
  }

  console.log(propertyOwner);

  return (
    <div>
      <div className="lg:px-12">
        <span
          onClick={() => navigate("/")}
          className="flex gap-2 items-center text-primary font-semibold cursor-pointer w-fit"
        >
          <AiOutlineLeft className="text-xl" />
          Back to map
        </span>
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-2">{property?.property_name}</h1>
          <div className="text-xl">
            <span className="text-primary">
              {property?.property_type?.toUpperCase()}
            </span>{" "}
            property in{" "}
            <span className="text-primary">
              {property?.city?.toUpperCase()}
            </span>
          </div>
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
                  <BiBed className="text-xl text-primary" />{" "}
                  {property?.beds ? property.beds : ""} Beds
                </span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Baths</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <TbBath className="text-xl text-primary" />{" "}
                  {property?.baths ? property.baths : ""} Baths
                </span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Square Area</div>
              <div>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <TbSquaresFilled className="text-xl text-primary" />{" "}
                  {property?.size ? property.size : ""} &#13217;
                </span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-8">
            <div className=" border border-accent rounded-lg p-2 lg:p-4">
              <div className="shadow-lg bg-white p-2 rounded-lg mb-8">
                <h3 className="text-accent text-lg font-semibold">
                  Property Owner
                </h3>
                <hr className="mb-3" />
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <MdOutlinePersonOutline className="text-xl text-primary" />:{" "}
                    {propertyOwner?.name ? propertyOwner?.name : ""}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <AiOutlinePhone className="text-xl text-primary" />:{" "}
                    {propertyOwner?.contact ? propertyOwner?.contact : ""}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <MdLocationCity className="text-xl text-primary" />:{" "}
                    {propertyOwner?.city ? propertyOwner?.city : ""}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <MdAlternateEmail className="text-xl text-primary" />:{" "}
                    {propertyOwner?.email ? propertyOwner?.email : ""}
                  </span>
                </p>
              </div>
            </div>
            <div className=" border border-accent rounded-lg p-2 lg:p-4">
              <p>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <span className="text-primary">Property Type:</span>{" "}
                  {property?.property_type
                    ? property?.property_type?.toUpperCase()
                    : ""}
                </span>
              </p>
              <p>
                <span className="flex gap-2 items-center text-gray-600 font-semibold">
                  <span className="text-primary">City:</span>{" "}
                  {property?.city ? property?.city?.toUpperCase() : ""}
                </span>
              </p>
              {property?.property_use === "sale" && (
                <p>
                  <span className="flex gap-2 items-center text-gray-600 font-semibold">
                    <span className="text-primary">Asking Price:</span>{" "}
                    {property?.asking_price ? property?.asking_price : ""} TK
                  </span>
                </p>
              )}
              {property?.property_use === "rental" && (
                <>
                  <p>
                    <span className="flex gap-2 items-center text-gray-600 font-semibold">
                      <span className="text-primary">Monthly Rent:</span>{" "}
                      {property?.monthly_rent ? property?.monthly_rent : ""} TK
                    </span>
                  </p>
                  <p>
                    <span className="flex gap-2 items-center text-gray-600 font-semibold">
                      <span className="text-primary">Lease Term:</span>{" "}
                      {property?.lease_term ? property?.lease_term : ""} months
                    </span>
                  </p>
                </>
              )}
              {user?.email !== propertyOwner?.email ? (
                <>
                  {bookingStatus.success ? (
                    <p className="text-lg text-white mt-2 uppercase bg-secondary rounded-3xl py-1 px-2 font-semibold w-fit">
                      {bookingStatus.status}
                    </p>
                  ) : (
                    <label
                      onClick={() => setBookingProperty(property)}
                      htmlFor="booking-modal"
                      className="btn btn-primary rounded mt-4"
                    >
                      {property?.property_use === "sale"
                        ? "Apply to Buy "
                        : "Apply for Rent"}
                    </label>
                  )}
                </>
              ) : (
                <p className="mt-8">You are the owner of this property</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {bookingProperty && (
        <BookingModal
          bookingProperty={bookingProperty}
          setBookingProperty={setBookingProperty}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
