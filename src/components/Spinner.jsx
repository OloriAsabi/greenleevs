import React from 'react';
import { TailSpin } from 'react-loader-spinner';

/* eslint-disable */
function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <TailSpin
        type="TailSpin" 
        color="#1F451A"
        height={100}
        width={200}
        className="m-5"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;