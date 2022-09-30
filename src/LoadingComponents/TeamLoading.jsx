import React from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import LoadingCard from "./LoadingCard";

export default function TeamLoading() {
  return (
    <DefaultLayout title="Teams">
      <div className="px-10 mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </DefaultLayout>
  );
}
