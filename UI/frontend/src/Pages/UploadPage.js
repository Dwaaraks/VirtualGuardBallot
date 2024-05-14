import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import VoterHeader from "../components/VoterHeader";

const UploadPage = () => {
  const [imageOne, setImageOne] = useState(null);
  let adharcard = "";
  const id = localStorage.getItem("userID");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const handleImageOneChange = (e) => {
    setImageOne(e.target.files[0]);
  };

  const handleUploadImageOne = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageOne);
      formData.append("upload_preset", "pmcr8gua"); // Replace with your Cloudinary upload preset
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgplustqn/image/upload",
        formData
      );
      adharcard = response.data.secure_url;
      try {
        const { data } = await axios.post("/api/v1/user/adhar", {
          id: id,
          adharcard: adharcard,
        });
        if (data?.success) {
          setLoading(false);
          setImage(data?.user?.adharcard);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error uploading image one:", error);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await axios.post("/api/v1/user/singleuser", {
        id: id,
      });
      if (data?.success) {
        setImage(data?.user?.adharcard);
        setUser(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <VoterHeader />
      <div className="min-h-screen bg-blue-100">
        <div className="content p-4 w-full flex flex-col">
          <h1 className="font-bold text-4xl place-self-center ">
            Welcome {localStorage.getItem("name")}
          </h1>
          <h1 className="font-bold text-3xl place-self-center mt-10 ">
            Upload Aadhaar
          </h1>
          <h1 className="font-bold text-2xl place-self-center mt-5 ">
            Status : {user?.showadhar ? "Accepted" : "Rejected"}
          </h1>
          <div className="btnandphotos flex justify-center gap-[600px] items-center w-full">
            <div className="buttons flex flex-col justify-center gap-[60px] mt-10">
              <input
                className=""
                type="file"
                onChange={handleImageOneChange}
                accept="image/*"
                id="adhar"
              />
              <button
                onClick={handleUploadImageOne}
                className="bg-violet-500 cursor-pointer hover:bg-violet-400 flex justify-center items-center p-4 rounded-xl font-bold text-xl"
              >
                {loading ? <ImSpinner8 className="animate-spin" /> : "Upload"}
              </button>
            </div>
          </div>
          {image ? (
            <div className="image flex justify-center items-center mt-10">
              <img className="rounded-xl h-96 w-[500px]" src={image} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UploadPage;
