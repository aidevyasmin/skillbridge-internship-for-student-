const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {/* Stat Card 1 */}
      <div className="bg-white rounded-xl shadow-md p-6 h-32 flex items-center justify-between">
        <div className="w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>

      {/* Stat Card 2 */}
      <div className="bg-white rounded-xl shadow-md p-6 h-32 flex items-center justify-between">
        <div className="w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>

      {/* Stat Card 3 */}
      <div className="bg-white rounded-xl shadow-md p-6 h-32 flex items-center justify-between">
        <div className="w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>

      {/* Stat Card 4 */}
      <div className="bg-white rounded-xl shadow-md p-6 h-32 flex items-center justify-between">
        <div className="w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default DashboardStatsSkeleton;