const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-80"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
        </div>

        {/* AI Resume Tips */}
        <div className="bg-gray-200 rounded-xl shadow-lg p-6 mb-8 h-28"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile Photo & Contact */}
          <div className="md:col-span-1 space-y-6">
            {/* Profile Photo */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-24 mx-auto mt-4"></div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 bg-gray-200 rounded-full w-1/5"></div>
                <div className="h-8 bg-gray-200 rounded-full w-1/6"></div>
                <div className="h-8 bg-gray-200 rounded-full w-1/5"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>

            {/* Resume Upload */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;