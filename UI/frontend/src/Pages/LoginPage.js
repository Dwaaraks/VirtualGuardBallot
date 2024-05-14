import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter all fields");
      return;
    }
    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/alluser");
    }
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: email,
        password: password,
      });
      if (data.success) {
        localStorage.setItem("userID", data?.user._id);
        localStorage.setItem("name", data?.user?.username);
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        var data1 = {
          otp: otp,
          email: email,
        };
        // Setup email data
        emailjs
          .send(
            "service_hn5whch",
            "template_1ujqdfd",
            data1,
            "E227cpqu76H5djOKk"
          )
          .then(
            (result) => {
              alert("Otp sent");
              localStorage.setItem("otp", otp);
              navigate("/otp");
            },
            (error) => {
              console.log(error.text);
            }
          );
        navigate("/otp");
      }
    } catch (error) {
      console.log(error);
      alert("Email or password is incorrect");
    }
  };
  return (
    <>
      <div className="bg-black h-screen w-screen text-black">
        <div className="signUp p-2 flex justify-center items-center h-full">
          <div className="signup box">
            <div className="box bg-white p-4 w-[400px] rounded-xl shadow-lg flex flex-col justify-center items-center gap-5 ">
              <div className="heading flex justify-center items-center w-full mt-2">
                <h1 className="font-bold text-4xl">LOGIN</h1>
              </div>

              <div className="username flex bg-slate-300 w-[300px] rounded-lg mt-10 p-2 justify-center items-center ">
                <input
                  className="bg-slate-300 p-1 rounded-lg w-[300px] placeholder-black font-semibold outline-none"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="username flex bg-slate-300 w-[300px] rounded-lg mt-10  p-2 justify-center items-center ">
                <input
                  className="bg-slate-300 p-1 rounded-lg w-[300px]  placeholder-black font-semibold outline-none"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <select className="username flex bg-slate-300 rounded-lg mt-10 p-4 justify-center items-center w-[300px] outline-none">
                  <option value="" hidden>
                    Select Role
                  </option>
                  <option className="bg-white" value="admin">
                    Admin
                  </option>
                  <option className="bg-white" value="user">
                    User
                  </option>
                </select>
              </div>
              <div className="button mt-8 flex justify-center items-center">
                <button
                  className="bg-violet-400 cursor-pointer hover:bg-violet-500 font-bold p-2 w-[300px] rounded-xl"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div className="font-bold mt-8 flex justify-center items-center">
                <h1>
                  Don't have an account?{" "}
                  <Link className="underline underline-offset-2" to="/signUp">
                    Register
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
