import React from "react";

export default function Suggestions({
  children,
  list = [],
  show = false,
  loading = false,
}) {
  if (!show) return null;
  return (
    <div className="rounded-lg absolute top-full w-full flex flex-col bg-slate-100 p-1 left-0">
      {loading && (
        <div className="h-10 w-full bg-slate-300 flex items-center justify-center mx-auto">
          <div className="h-4 w-4 rounded-full bg-blue-300 animate-ping ring-2 ring-blue-400"></div>
        </div>
      )}
      {list.length === 0 && !loading ? (
        <p className="text-center text-red-400 bg-red-100 p-2 rounded-full m-2">
          No Result Found!
        </p>
      ) : (
        list.map((listItem) => children(listItem))
      )}
    </div>
  );
}
