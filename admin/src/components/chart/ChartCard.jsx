import React from "react";
import Skeleton from "react-loading-skeleton";

const Chart = ({ children, title, loading, mode }) => {
  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 dark:text-white">
      <p className="mb-4 font-semibold text-gray-800 dark:text-white">
        {loading ? (
          <Skeleton
            count={1}
            height={20}
            className="dark:bg-gray-800 text-white bg-gray-200 dark:text-white"
            baseColor={`${mode === "dark" ? "#FFFFFF" : "#FFFFFF"}`}
            highlightColor={`${mode === "dark" ? "#FFFFFF" : "#FFFFFF"} `}
          />
        ) : (
          title
        )}
      </p>

      {title === "Best Selling Products" ? (
        <>
          {loading ? (
            <div className="flex justify-center">
              <Skeleton
                className="dark:bg-gray-800 bg-gray-200 dark:text-white"
                baseColor={`${mode === "dark" ? "#FFFFFF" : "#FFFFFF"}`}
                highlightColor={`${mode === "dark" ? "#FFFFFF" : "#FFFFFF"} `}
                count={1}
                width={250}
                height={250}
                circle
              />
            </div>
          ) : (
            children
          )}
        </>
      ) : (
        <>
          {loading ? (
            <Skeleton
              className="dark:bg-gray-800 bg-gray-200 dark:text-white"
              baseColor={`${mode === "dark" ? "#FFFFFF" : "#FFFFFF"}`}
              highlightColor={`${mode === "dark" ? "#FFFFFF" : "#FFFFFF"} `}
              count={13}
              height={20}
            />
          ) : (
            children
          )}
        </>
      )}
    </div>
  );
};

export default Chart;
