import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto flex justify-between items-center p-3">
        <div className="text-white text-4xl font-bold">Transparent Voting</div>
        <div className="flex justify-evenly gap-10">
          <Link
            to="/voting"
            className="text-white text-xl font-bold hover:scale-105 hover:underline underline-offset-4"
          >
            Voting
          </Link>
          <Link
            to="/alluser"
            className="text-white text-xl font-bold hover:scale-105 hover:underline underline-offset-4"
          >
            Users
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

export default Header;
