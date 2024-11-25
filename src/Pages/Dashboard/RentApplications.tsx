import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePhone } from "react-icons/ai";
import { MdAlternateEmail, MdOutlinePersonOutline } from "react-icons/md";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading";
import { removeUser } from "../../features/userSlice";
import { Booking } from "../../modals/Booking";

interface Props {
  id: string | undefined;
}

const RentApplications: FC<Props> = ({ id }) => {
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");
  const [userDetails, setUserDetails] = useState<Record<string, any>>({});
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const {
    data: applications,
    isLoading,
    refetch,
  } = useQuery(["rent-applications", id], () =>
    fetch(`https://rent-a-property-server.vercel.app/applications/${id}`, {
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

  useEffect(() => {
    if (applications) {
      // Fetch user details for each application
      applications.forEach((application: Booking) => {
        const email = application.applicant_email;
        if (!userDetails[email]) {
          fetch(`https://rent-a-property-server.vercel.app/user/${email}`, {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          })
            .then((res) => {
              if (res.status === 401 || res.status === 403) {
                dispatch(removeUser());
              } else {
                return res.json();
              }
            })
            .then((userData) => {
              if (userData) {
                setUserDetails((prev) => ({ ...prev, [email]: userData }));
              }
            });
        }
      });
    }
  }, [applications, user, dispatch]);

  useEffect(() => {
    if (currentId && currentStatus && user) {
      fetch(
        `https://rent-a-property-server.vercel.app/applications?id=${currentId}&status=${currentStatus}&email=${user?.email}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            dispatch(removeUser());
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data.success) {
            if (data.status === "accepted") {
              toast.success(data.status, { id: "status-accepted" });
            } else {
              toast.error(data.status, { id: "status-declined" });
            }
          } else {
            toast.error("Something went wrong", { id: "update-failed" });
          }
          refetch();
        });
    }
  }, [currentStatus, currentId, user, refetch]);

  const handleUpdateStatus = (status: string, id: string | undefined) => {
    setCurrentStatus(status);
    setCurrentId(id || "");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-accent">Rent Applications</h1>
      <div className="mt-8">
        {applications &&
          applications.map((application: Booking) => {
            const { _id, applicant_email, status } = application;
            const userInfo = userDetails[applicant_email];

            return (
              <div
                key={_id}
                className="shadow-lg bg-accent text-white p-2 rounded-lg mb-8"
              >
                <p>
                  <span className="flex gap-2 items-center font-semibold">
                    <MdOutlinePersonOutline className="text-xl" />:{" "}
                    {userInfo?.name || "Fetching..."}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center font-semibold">
                    <AiOutlinePhone className="text-xl" />:{" "}
                    {userInfo?.phone || "Fetching..."}
                  </span>
                </p>
                <p>
                  <span className="flex gap-2 items-center font-semibold">
                    <MdAlternateEmail className="text-xl" />: {applicant_email}
                  </span>
                </p>
                <div>
                  {status === "pending" ? (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleUpdateStatus("accepted", _id)}
                        className="btn btn-sm btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus("declined", _id)}
                        className="btn btn-sm btn-error"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`text-lg mt-4 text-white rounded-3xl py-1 px-2 w-fit font-semibold ${
                        status === "accepted" && "bg-success"
                      } ${status === "declined" && "bg-error"}`}
                    >
                      {status}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RentApplications;
