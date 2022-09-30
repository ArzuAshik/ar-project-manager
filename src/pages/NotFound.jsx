import React from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import styles from "../styles/notfound.module.css";

export default function NotFound() {
  return (
    <DefaultLayout title="404">
      <div className="h-screen flex items-center justify-center">
        <div>
          <h1
            className={`text-red-500 text-center drop-shadow px-10 py-6 text-9xl font-bold ${styles["text-404"]}`}
          >
            404
          </h1>
          <h2 className="text-center text-5xl">Page Not Found!</h2>
        </div>
      </div>
    </DefaultLayout>
  );
}
