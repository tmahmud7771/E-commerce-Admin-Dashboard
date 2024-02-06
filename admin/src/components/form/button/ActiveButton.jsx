import React from "react";

const ActiveButton = ({ tapValue, activeValue, handleProductTap }) => {
  return (
    <button
      className={`inline-block px-4 py-2 text-base ${
        tapValue === activeValue &&
        "text-orange-400 border-emerald-600 dark:text-['#FF914D'] dark:border-emerald-500 rounded-t-lg border-b-2"
      } focus:outline-none`}
      aria-current="page"
      onClick={() => handleProductTap(activeValue, false, tapValue)}
    >
      {activeValue}
    </button>
  );
};

export default ActiveButton;
