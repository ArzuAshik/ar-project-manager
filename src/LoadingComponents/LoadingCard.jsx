import React from "react";
import generateRandomNumber from "../utils/selectRandomElement";

export default function LoadingCard() {
  return (
    <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg bg-opacity-90 group">
      <span
        className={`bg-gradient-to-br from-slate-400 to--slate-300 animate-pulse rounded-full w-24 h-5 block`}
      />
      <div
        className={`mt-3 h-2 bg-gradient-to-br from-slate-300 to-slate-200 animate-pulse rounded-full w-${generateRandomNumber()}/12`}
      />
      <div
        className={`mt-3 h-2 bg-gradient-to-br from-slate-300 to-slate-200 animate-pulse rounded-full w-${generateRandomNumber()}/12`}
      />
      <div
        className={`mt-3 h-2 bg-gradient-to-br from-slate-300 to-slate-200 animate-pulse rounded-full w-${generateRandomNumber()}/12`}
      />
      <div
        className={`mt-3 h-2 bg-gradient-to-br from-slate-300 to-slate-200 animate-pulse rounded-full w-${generateRandomNumber()}/12`}
      />
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
          <span className="ml-1 h-3 bg-gradient-to-br from-slate-300 to-slate-200 animate-pulse rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}
