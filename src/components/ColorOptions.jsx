import React from "react";
import colorList from "../constData/colorList";

export default function ColorOptions({
  selectedColor,
  handleSelect,
  hideTitle = false,
}) {
  return (
    <>
      {!hideTitle && (
        <p className="text-slate-600">
          Team Color: <span className="text-slate-400 ml-2">( Optional )</span>
        </p>
      )}
      <div className="flex gap-3 mb-4">
        {colorList.map((colorName) => (
          <div
            key={colorName}
            onClick={() => handleSelect(colorName)}
            className="cursor-pointer flex gap-1 items-center"
          >
            <span
              className={`block rounded-full bg-${colorName}-500 h-4 w-4 ring-${colorName}-200 ${
                selectedColor === colorName ? "ring" : ""
              }`}
            />
            <span
              className={`capitalize ${
                selectedColor === colorName
                  ? `text-${colorName}-500`
                  : "text-slate-400"
              }`}
            >
              {colorName}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
