import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { MapPin, DollarSign, Clock, Calendar, ArrowLeft, Send, Heart, FileText, CheckCircle, XCircle, ExternalLink, Loader2 } from 'lucide-react'
import ApplyModal from '../components/ApplyModal'; // Import ApplyModal

const InternshipDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const { internships, applyForInternship, toggleSaveInternship, savedInternships, applications, getInternship, isLoadingExternal } = useData()
  const navigate = useNavigate()
  const [internship, setInternship] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false); // State for ApplyModal

  useEffect(() => {
    // getInternship now handles parsing id
    const found = getInternship(id);
    setInternship(found)
  }, [id, getInternship, internships]) // Added internships to dependencies to react to data changes

  useEffect(() => {
    if (user && user.role === 'student' && internship) {
      // Check if savedInternships and applications are defined before using
      setIsSaved(savedInternships?.includes(internship.id) || false);
      setHasApplied(applications?.some(app => app.internshipId === internship.id && app.studentId === user.id) || false);
    }
  }, [user, internship, savedInternships, applications]);

  // Loading state handling
  if (isLoadingExternal && !internship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-action-blue" />
      </div>
    );
  }

  // Fallback if internship not found after loading
  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Internship not found.</p>
      </div>
    )
  }

  const handleApplyClick = () => {
    if (!user) {
      navigate('/login')
      return
    }
    if (user.role !== 'student') {
      alert('Only students can apply for internships')
      return
    }
    // For external internships, redirect to the external URL
    if (internship.redirect_url) {
      window.open(internship.redirect_url, '_blank');
      return;
    }
    setShowApplyModal(true); // Open the modal for internal applications
  }

  const handleModalSubmit = (formData) => {
    // Here you would typically send formData to your backend
    console.log("Application Data from modal:", formData);
    applyForInternship(internship.id, user.id); // Use existing apply logic
    setHasApplied(true);
    setShowApplyModal(false); // Close modal after submission
  };

  const handleSave = () => {
    if (!user) {
      navigate('/login')
      return
    }
    // Check if toggleSaveInternship exists before calling
    if (toggleSaveInternship) {
      toggleSaveInternship(internship.id);
      setIsSaved(!isSaved);
    } else {
      console.warn("toggleSaveInternship function is not available in DataContext.");
      alert("Save functionality not available.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center text-action-blue hover:text-deep-navy mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Link>

        {/* Header */}
        <div className="bg-white rounded-[16px] shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 gradient-bg rounded-[16px] flex items-center justify-center text-white font-bold text-2xl">
                {internship.logo || internship.company?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{internship.title || 'Untitled Internship'}</h1>
                <p className="text-lg text-gray-600">{internship.company || 'Unknown Company'}</p>
                <p className="text-sm text-gray-500">{internship.domain || 'General'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="p-2 rounded-[12px] border border-gray-200 hover:bg-gray-50 transition"
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-slate-grey/20 text-deep-navy rounded-[12px] flex items-center gap-2 font-medium">
              <MapPin className="h-4 w-4" />
              {internship.type || 'N/A'}
            </span>
            <span className="px-4 py-2 bg-slate-grey/20 text-deep-navy rounded-[12px] flex items-center gap-2 font-medium">
              <DollarSign className="h-4 w-4" />
              {internship.stipend || 'Unpaid'}
            </span>
            <span className="px-4 py-2 bg-slate-grey/20 text-deep-navy rounded-[12px] flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              {internship.duration || 'Flexible'}
            </span>
            {internship.deadline && ( // Only show deadline if it exists
              <span className="px-4 py-2 bg-slate-grey/20 text-deep-navy rounded-[12px] flex items-center gap-2 font-medium">
                <Calendar className="h-4 w-4" />
                Deadline: {internship.deadline}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-3">About this Internship</h2>
            <p className="text-gray-700 leading-relaxed">{internship.description || 'No description provided.'}</p>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-[16px] shadow-md p-8 mb-6">
          <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {internship.requirements?.map((skill, index) => ( // Use optional chaining here
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {skill}
              </span>
            )) || <p className="text-gray-500">No specific requirements listed.</p>}
          </div>
        </div>

        {/* About Company */}
        <div className="bg-white rounded-[16px] shadow-md p-8 mb-6">
          <h2 className="text-lg font-semibold mb-4">About {internship.company || 'Unknown Company'}</h2>
          <p className="text-gray-700 leading-relaxed">
            {internship.company || 'This company'} is a great place to gain experience in the {internship.domain || 'chosen'} industry.
            {internship.company || 'We'} are committed to providing excellent internship opportunities for students to gain real-world experience.
          </p>
        </div>

        {/* Location */}
        <div className="bg-white rounded-[16px] shadow-md p-8 mb-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="h-5 w-5 text-action-blue" />
            <span>{internship.location || 'Remote'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {user?.role === 'student' ? (
            internship.redirect_url ? (
              <a
                href={internship.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                Apply on {internship.type || 'External Site'} <ExternalLink className="h-5 w-5" />
              </a>
            ) : hasApplied ? (
              <div className="flex-1 bg-slate-grey/20 border-2 border-action-blue text-action-blue rounded-[12px] p-4 flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Application Submitted</span>
              </div>
            ) : (
              <button
                onClick={handleApplyClick} // Call the new handler
                className="flex-1 py-3 px-6 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Apply Now
              </button>
            )
          ) : user?.role === 'recruiter' ? (
            <button
              onClick={() => navigate('/recruiter/post')}
              className="flex-1 py-3 px-6 border-2 border-action-blue text-action-blue rounded-[12px] font-semibold hover:bg-slate-grey transition"
            >
              Edit This Posting
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex-1 py-3 px-6 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Apply Now
            </button>
          )}
        </div>
      </div>

      <ApplyModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onSubmit={handleModalSubmit}
        internshipTitle={internship?.title || 'this internship'}
      />
    </div>
  )
}

export default InternshipDetails