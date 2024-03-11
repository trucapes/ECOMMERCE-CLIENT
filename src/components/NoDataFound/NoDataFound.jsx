import React from "react";

function NoDataFound({TryingToFind}) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center">
      <img
        className="w-[40%]"
        src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621845-6166999.png"
        alt=""
      />
      <h1 className="text-center text-lg capitalize">No {TryingToFind} Found</h1>
    </div>
  );
}

export default NoDataFound;
