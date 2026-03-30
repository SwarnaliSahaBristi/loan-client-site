const LoanCardSkeleton = () => {
  return (
    <div className="bg-gradient-to-r from-base-300 via-base-200 to-base-300 
           dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 
           animate-pulse">

      {/* Image */}
      <div className="h-40 w-full rounded-lg bg-base-300 dark:bg-gray-700"></div>

      {/* Title */}
      <div className="h-5 w-3/4 mt-4 rounded bg-base-300 dark:bg-gray-700"></div>

      {/* Description */}
      <div className="h-4 w-full mt-2 rounded bg-base-300 dark:bg-gray-700"></div>
      <div className="h-4 w-5/6 mt-2 rounded bg-base-300 dark:bg-gray-700"></div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 w-20 rounded bg-base-300 dark:bg-gray-700"></div>
        <div className="h-8 w-20 rounded bg-base-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default LoanCardSkeleton;