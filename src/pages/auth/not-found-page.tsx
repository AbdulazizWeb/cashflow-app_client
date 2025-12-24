import React from "react";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center   w-screen h-screen">
      <img src="/src/shared/assets/notFound.jpeg" width={"50%"} alt="" />
      <h1 className="text-white text-2xl font-bold mt-5">
        404 - Page Not Found
      </h1>
    </div>
  );
};

//bg-linear-to-r from-sky-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
