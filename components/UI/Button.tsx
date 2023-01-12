import React from "react";

type TButton = {
  label: String;
  handlerClick: () => void;
};

export default function Button({ label, handlerClick }: TButton) {
  return (
    <button
      onClick={handlerClick}
      className=" font-SofiaSans text-2xl p-2 bg-buttonBlack rounded-xl shadow-2xl w-11/12 text-white my-1 "
    >
      {label}
    </button>
  );
}
