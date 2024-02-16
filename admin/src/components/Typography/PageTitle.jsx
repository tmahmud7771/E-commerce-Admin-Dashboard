import React from "react";

const PageTitle = ({ children }) => {
  return (
    <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-white">
      {children}
    </h1>
  );
};

export default PageTitle;
