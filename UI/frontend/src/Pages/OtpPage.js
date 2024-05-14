import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpPage = () => {
  const navigate = useNavigate();
  const otp = localStorage.getItem("otp");
  const [enteredOtp, setEnteredOtp] = useState("");

  const handleOtp = () => {
    if (otp !== enteredOtp) {
      alert("Otp dosen't match");
      return;
    }
    navigate("/upload");
  };

  return (
    <>
      <div className="bg-black h-screen w-screen text-black">
        <div className="signUp p-2 flex justify-center items-center h-full">
          <div className="signup box">
            <div className="box bg-white p-4 w-96 rounded-xl shadow-lg flex flex-col justify-center items-center ">
              <div className="heading flex justify-center items-center w-full mt-2">
                <h1 className="font-bold text-4xl">OTP</h1>
              </div>

              <div className="username flex bg-slate-300 rounded-lg mt-10 w-80 p-2 justify-center items-center ">
                <input
                  className="bg-slate-300 p-1 rounded-lg w-80 placeholder-black font-semibold outline-none"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                />
              </div>
              <button
                className="bg-violet-400 cursor-pointer hover:bg-violet-500 font-bold p-2 w-[300px] rounded-xl mt-10"
                onClick={handleOtp}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
