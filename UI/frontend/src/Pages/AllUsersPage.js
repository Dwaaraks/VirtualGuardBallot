import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
const AllUsersPage = () => {
  const [users, setusers] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setuser] = useState();
  const getAllusers = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/get-Users");
      if (data?.success) {
        setusers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleUser = async (id) => {
    try {
      const { data } = await axios.post("/api/v1/user/singleuser", {
        id: id,
      });
      if (data?.success) {
        setuser(data?.user);
        setModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdhar = async (id, value) => {
    try {
      const { data } = await axios.post("/api/v1/user/showAdhar", {
        id: id,
        value: value,
      });
      if (data?.success) {
        alert("Request Sent ");
        setModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoterID = async (id, value) => {
    try {
      const { data } = await axios.post("/api/v1/user/showVoter", {
        id: id,
        value: value,
      });
      if (data?.success) {
        alert("Request Sent ");
        setModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex flex-wrap justify-evenly gap-20 mt-20">
          {users?.map((user) => (
            <div
              className="bg-white p-4 shadow-xl flex flex-col rounded-xl gap-5 w-[400px] hover:scale-105 cursor-pointer "
              onClick={() => getSingleUser(user._id)}
            >
              <img
                className="place-self-center h-60"
                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
              />
              <h1 className="font-bold text-xl">Name: {user.username}</h1>
              <h1 className="font-bold text-xl">Email: {user.email}</h1>
              <h1 className="font-bold text-xl">
                Aadhaar Status: {user.showadhar ? "Accepted" : "Rejected"}
              </h1>
              <h1 className="font-bold text-xl">
                Voter ID Status: {user.showvoterid ? "Accepted" : "Rejected"}
              </h1>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="fixed z-10 inset-0 flex justify-center overflow-auto items-center backdrop-blur-md ">
          <div className="bg-slate-100 p-4 rounded-xl  w-[1000px] flex flex-col overflow-auto ">
            <button
              className="place-self-end text-2xl"
              onClick={() => {
                setModal(false);
              }}
            >
              X
            </button>
            <div className="flex w-full justify-center gap-10 ">
              <div className="flex flex-col justify-center items-center gap-5 font-bold">
                <h1 className="place-self-center text-2xl font-bold">
                  Adhar Card
                </h1>
                {user?.adharcard ? (
                  <img src={user?.adharcard} className="h-64 rounded-xl" />
                ) : (
                  <h1 className="mt-28 mb-28 font-bold text-2xl">
                    Not Uploaded
                  </h1>
                )}

                <button
                  className="bg-green-500 rounded-xl p-4 hover:bg-green-400 cursor-pointer w-[300px]"
                  onClick={() => handleAdhar(user._id, true)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 rounded-xl p-4 hover:bg-red-400 cursor-pointer w-[300px]"
                  onClick={() => handleAdhar(user._id, false)}
                >
                  Reject
                </button>
              </div>
              <div className="flex flex-col justify-center items-center gap-5 font-bold">
                <h1 className="place-self-center text-2xl font-bold">
                  Voter ID Card
                </h1>
                {user?.voteridcard ? (
                  <img src={user?.voteridcard} className="h-64 rounded-xl" />
                ) : (
                  <h1 className="mt-28 mb-28 font-bold text-2xl">
                    Not Uploaded
                  </h1>
                )}

                <button
                  className="bg-green-500 rounded-xl p-4 hover:bg-green-400 cursor-pointer w-[300px]"
                  onClick={() => handleVoterID(user._id, true)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 rounded-xl p-4 hover:bg-red-400 cursor-pointer w-[300px]"
                  onClick={() => handleVoterID(user._id, false)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsersPage;
