import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaRunning } from "react-icons/fa";
import QuestionButton from "./FAQ";

type Props = {
  toggleDrawer: () => void;
};

export default function Navbar({ toggleDrawer }: Props) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <button className="btn btn-ghost" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <Link href="/">
          <div className="navbar-center flex items-center gap-2 rounded-lg px-4 py-2 transition duration-500 hover:bg-slate-200 sm:hidden">
            <FaRunning className="ml-0 h-6" />
            <a className="text-xl font-bold">NUS Gym</a>
          </div>
        </Link>
      </div>
      <Link href="/">
        <div className="navbar-center hidden items-center gap-2 rounded-lg px-4 py-2 transition duration-500 hover:bg-slate-200 sm:flex">
          <FaRunning className="ml-0 h-6" />
          <a className="text-xl font-bold">NUS Gym</a>
        </div>
      </Link>
      <div className="navbar-end">
        <button className="btn btn-circle btn-ghost mx-0">
          <div className="indicator">
            <a
              href="https://www.linkedin.com/in/cheng-zhi-sheng/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </button>
        <button className="btn btn-circle btn-ghost">
          <a
            href="https://github.com/zsh-eng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-6 w-6" />
          </a>
        </button>
        <QuestionButton />
      </div>
    </div>
  );
}
