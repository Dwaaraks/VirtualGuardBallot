import React from "react";
import { Link } from "react-router-dom";

function VoterHeader() {
  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto flex justify-between items-center p-3">
        <div className="text-white text-4xl font-bold">Transparent Voting</div>
        <div className="flex justify-evenly gap-10">
          <Link
            to="/upload"
            className="text-white text-xl font-bold hover:scale-105 hover:underline underline-offset-4"
          >
            Upload Aadhaar
          </Link>
          <Link
            to="/voterID"
            className="text-white text-xl font-bold hover:scale-105 hover:underline underline-offset-4"
          >
            Upload VoterID
          </Link>
          <Link
            to="/"
            className="text-white text-xl font-bold hover:scale-105 hover:underline underline-offset-4"
          >
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default VoterHeader;
