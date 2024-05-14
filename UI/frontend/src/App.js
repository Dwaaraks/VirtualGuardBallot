import React from "react";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import VotingPage from "./Pages/VotingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./Pages/UploadPage";
import VoterIdPage from "./Pages/VoterIDPage";
import OtpPage from "./Pages/OtpPage";
import AllUsersPage from "./Pages/AllUsersPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/voterID" element={<VoterIdPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/alluser" element={<AllUsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
