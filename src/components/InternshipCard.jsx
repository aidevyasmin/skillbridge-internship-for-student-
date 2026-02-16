import { MapPin, DollarSign, Clock, Calendar, Building2, ArrowRight, Heart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { useState, useEffect } from 'react';

export default function InternshipCard({ internship, featured = false }) {
  const { user } = useAuth();
  const { savedInternships, toggleSaveInternship } = useData();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user && user.role === 'student' && savedInternships) {
      setIsSaved(savedInternships.includes(internship.id));
    } else {
      setIsSaved(false);
    }
  }, [user, internship.id, savedInternships]);

  const handleSave = (e) => {
    e.preventDefault(); // Prevent navigating to details page
    e.stopPropagation(); // Stop event propagation

    if (!user) {
      navigate('/login');
      return;
    }
    toggleSaveInternship(internship.id);
    setIsSaved(prev => !prev);
  };
  return (
    <div className={`bg-white rounded-[16px] shadow-md border ${featured ? 'border-deep-navy shadow-xl' : 'border-gray-100'} hover:shadow-xl hover:scale-[1.01] active:scale-99 transition-all duration-300 ease-in-out overflow-hidden`}>
      {featured && (
        <div className="bg-gradient-to-r from-action-blue to-deep-navy px-4 py-1 text-white text-xs font-medium rounded-t-[16px]">
          Featured
        </div>
      )}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-grey to-deep-navy rounded-lg flex items-center justify-center">
              <span className="text-action-blue font-bold">{internship.logo || internship.company?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <div className="flex items-center gap-2"> {/* Added flex container for title and badge */}
                <h3 className="font-semibold text-gray-900">{internship.title || 'Untitled Internship'}</h3>
                {typeof internship.matchPercentage === 'number' && internship.matchPercentage > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                    {internship.matchPercentage}% Match
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <Building2 className="w-3 h-3 mr-1" />
                {internship.company || 'Unknown Company'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="p-2 rounded-[12px] border border-gray-200 hover:bg-gray-50 transition"
            aria-label="Save internship"
          >
            <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{internship.description || 'No description provided.'}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {internship.requirements?.slice(0, 3).map((req, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {req}
            </span>
          )) || <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">No skills listed</span>}
          {internship.requirements?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{internship.requirements.length - 3}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-action-blue" />
            {internship.location || internship.type || 'N/A'}
          </div>
          <div className="flex items-center text-gray-500">
            <DollarSign className="w-4 h-4 mr-1 text-green-500" />
            {internship.isPaid ? (internship.stipend || 'Paid') : 'Unpaid'}
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1 text-accent-500" />
            {internship.duration || 'Flexible'}
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1 text-orange-500" />
            {(internship.posted && `Posted: ${new Date(internship.posted).toLocaleDateString()}`) || 'Date N/A'}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">{internship.applicants || 0} applicants</span>
          <Link
            to={`/internship/${internship.id}`}
            className="inline-flex items-center text-action-blue hover:text-deep-navy text-sm font-medium transition"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}