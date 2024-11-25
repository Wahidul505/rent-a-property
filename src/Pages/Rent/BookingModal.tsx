import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeUser } from "../../features/userSlice";
import { Booking } from "../../modals/Booking";
import { Property } from "../../modals/Property";

interface Props {
  bookingProperty: Property;
  setBookingProperty: React.Dispatch<
    React.SetStateAction<Property | null | undefined>
  >;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const BookingModal: FC<Props> = ({
  bookingProperty,
  setBookingProperty,
  refetch,
}) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.email && user?.name) {
      const bookingInfo: Booking = {
        property_id: bookingProperty._id,
        applicant_email: user?.email,
        status: "pending",
      };
      fetch("https://rent-a-property-server.vercel.app/applications", {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        method: "POST",
        body: JSON.stringify(bookingInfo),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            dispatch(removeUser());
          } else {
            return res.json();
          }
        })
        .then((data) => {
          toast.success("Applied for Rent", { id: "apply-success" });
          setBookingProperty(null);
          refetch();
        });
    } else {
      navigate("/login");
      return toast.error("Please, Login", { id: "apply-error" });
    }
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg mt-6 text-center">
            Make a request to property owner
          </h3>
          <form onSubmit={handleApply} className="flex justify-center mt-3">
            <button type="submit" className="btn btn-primary rounded">
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
