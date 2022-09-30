import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

export default function Card({
  info = {},
  draggable = false,
  active = false,
  onClick = false,
}) {
  // destructuring props
  const {
    title,
    description,
    teamColor,
    adminAvatar,
    createdAt,
    status = "none",
    admin = false,
    isSyncing = false,
  } = info;

  const dragRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: status,
    item: { ...info },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (!draggable || isSyncing) return;
    drag(dragRef);
  }, [drag, draggable, isSyncing]);

  return (
    <div
      className={`relative flex flex-col items-start p-4 mt-3 gap-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100 ${
        active ? "ring-4 ring-pink-500" : ""
      } 
      ${isDragging ? "opacity-20" : "opacity-100"} ${
        draggable && !isSyncing ? "cursor-move" : "cursor-pointer"
      }
      ${
        isSyncing
          ? "animate-pulse bg-gradient-to-br from-blue-200 ring-1 ring-yellow-400 pointer-events-none"
          : ""
      }`}
      ref={dragRef}
    >
      {onClick && (
        <button
          onClick={() => onClick(info)}
          className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mr-2 mt-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
        >
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      )}
      <span
        className={`flex items-center h-6 px-3 text-xs font-semibold text-${teamColor}-500 bg-${teamColor}-100 rounded-full capitalize`}
      >
        {title}
      </span>
      <h4 className="text-sm font-medium">{description}</h4>
      <div className="flex items-center w-full mt-auto text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">{createdAt}</span>
        </div>
        {admin && (
          <img
            className="w-6 h-6 ml-auto rounded-full"
            alt={admin}
            src={adminAvatar}
          />
        )}
      </div>
    </div>
  );
}
