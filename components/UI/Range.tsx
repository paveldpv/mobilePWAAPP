import React from "react";

type TRange = {
  quality: number;
  setQuality: React.Dispatch<React.SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
  stepRange?: number;
  label?: string;
};

export default function Range({
  quality,
  setQuality,
  maxValue = 10,
  minValue = 1,
  stepRange = 1,
  label = `Точность в грудусах`,
}: TRange) {
  return (
    <>
      <label
        htmlFor="medium-range"
        className="block mb-2  dark:text-white text-2xl font-SofiaSans text-white text-center font-bold"
      >
        {label} {quality}
      </label>
      <input
        onChange={(e) => setQuality(+e.target.value)}
        id="medium-range"
        type="range"
        min={minValue}
        max={maxValue}
        step={stepRange}
        className="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        defaultValue={quality}
      />
    </>
  );
}
