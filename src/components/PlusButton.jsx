import React from "react";
import PlusIcon from "../assets/PlusIcon";

export default function PlusButton({ onClick, show }) {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
    >
      <PlusIcon />
    </button>
  );
}
