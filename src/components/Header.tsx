import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaRunning } from "react-icons/fa";

const Header: React.FC = () => {
  // A header element with Tailwind
  return (
    <div className="z-10 flex w-full justify-between bg-blue-950 px-8 py-2 text-white">
      <Link href="/">
        <div className="flex items-center gap-1">
          <FaRunning className="h-6 w-8" />

          <h1 className="text-2xl font-bold text-white">NUS Gym</h1>
        </div>
      </Link>
      <nav className="flex items-center gap-x-4 text-3xl font-semibold">
        <a
          href="https://github.com/zsh-eng"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="transition hover:scale-110" />
        </a>
        <a
          href="https://www.linkedin.com/in/cheng-zhi-sheng/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="transition hover:scale-110" />
        </a>
      </nav>
    </div>
  );
};

export default Header;
