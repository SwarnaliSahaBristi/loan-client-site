const AllLoansSkeleton = () => {
  return (
    <div className="container mx-auto px-6 py-10 animate-pulse">

      {/* Title */}
      <div className="h-10 w-1/3 mx-auto rounded bg-base-300 dark:bg-gray-700 mb-12"></div>

      {/* Search + Filter */}
      <div className="flex gap-4 justify-center mb-8 flex-wrap">
        <div className="h-10 w-60 rounded bg-base-300 dark:bg-gray-700"></div>
        <div className="h-10 w-40 rounded bg-base-300 dark:bg-gray-700"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-base-100 dark:bg-gray-900 
                       border border-base-300 dark:border-gray-700 
                       rounded-xl p-4 shadow-md"
          >
            <div className="h-40 w-full rounded bg-base-300 dark:bg-gray-700"></div>
            <div className="h-5 w-3/4 mt-4 rounded bg-base-300 dark:bg-gray-700"></div>
            <div className="h-4 w-full mt-2 rounded bg-base-300 dark:bg-gray-700"></div>
            <div className="h-4 w-5/6 mt-2 rounded bg-base-300 dark:bg-gray-700"></div>
            <div className="flex justify-between mt-4">
              <div className="h-4 w-20 rounded bg-base-300 dark:bg-gray-700"></div>
              <div className="h-8 w-20 rounded bg-base-300 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-12 rounded bg-base-300 dark:bg-gray-700"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AllLoansSkeleton;