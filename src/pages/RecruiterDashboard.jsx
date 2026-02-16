import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { Building2, Briefcase, Users, FileText, CheckCircle, XCircle, MessageCircle, Plus, Loader2 } from 'lucide-react'
import DashboardStatsSkeleton from '../components/skeletons/DashboardStatsSkeleton' // Import DashboardStatsSkeleton
import RecruiterActivityStream from '../components/RecruiterActivityStream';

const RecruiterDashboard = () => {
  const { user, loading: authLoading } = useAuth()
  const { internships, applications, companies, updateApplicationStatus, users } = useData()
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [recruiterCompany, setRecruiterCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && companies.length > 0 && internships.length > 0) { // Wait for companies and internships to load
      const company = companies.find(c => c.id === user.companyId)
      setRecruiterCompany(company)
      setLoading(false)
    }
    if (!user) { // If user logs out
        setLoading(false);
    }
  }, [user, companies, internships]) // Added internships to dependencies

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
          <DashboardStatsSkeleton /> {/* Skeleton for stats cards */}
          <div className="flex gap-4 mb-8">
            <div className="h-12 bg-gray-200 rounded-lg w-48 animate-pulse"></div> {/* Post New Internship button skeleton */}
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 h-96 animate-pulse"></div> {/* My Internships Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6 h-96 animate-pulse"></div> {/* Applicants Skeleton */}
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'recruiter' || !recruiterCompany) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Please log in as a recruiter to view this page.</p>
          <Link to="/login" className="inline-block mt-4 px-6 py-2 gradient-bg text-white rounded-lg">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  const myInternships = internships.filter(i => i.companyId === user.companyId)
  const applicantsForMyInternships = applications.filter(app =>
    myInternships.some(int => int.id === app.internshipId)
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case 'shortlisted':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Shortlisted</span>
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Rejected</span>
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>
    }
  }

  const handleStatusChange = (applicantId, newStatus) => {
    updateApplicationStatus(applicantId, newStatus)
  }

  const displayApplicants = selectedInternship
    ? applicantsForMyInternships.filter(app => app.internshipId === selectedInternship.id)
    : applicantsForMyInternships;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Manage your company's internship postings and applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-h4 font-bold text-gray-900">{myInternships.length}</p>
                <p className="text-body-sm text-gray-500">Active Postings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-h4 font-bold text-gray-900">{applicantsForMyInternships.length}</p>
                <p className="text-body-sm text-gray-500">Total Applicants</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-h4 font-bold text-gray-900">
                  {applicantsForMyInternships.filter(a => a.status === 'shortlisted').length}
                </p>
                <p className="text-body-sm text-gray-500">Shortlisted</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-h4 font-bold text-gray-900">{recruiterCompany.name}</p>
                <p className="text-body-sm text-gray-500">Company</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Link
            to="/recruiter/post"
            className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            <Plus className="h-5 w-5" />
            Post New Internship
          </Link>
        </div>

        {/* Activity Stream */}
        <div className="mb-8">
          <RecruiterActivityStream />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Internships */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-400" />
                My Internships
              </h2>
              <Link to="/recruiter/post" className="text-primary-600 text-sm font-semibold hover:text-primary-700">
                + Add New
              </Link>
            </div>

            <div className="space-y-4">
              {myInternships.length > 0 ? (
                myInternships.map(internship => (
                  <div
                    key={internship.id}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      selectedInternship?.id === internship.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedInternship(internship)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{internship.title}</h3>
                        <p className="text-sm text-gray-500">{internship.location} • {internship.duration}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-primary-700 rounded text-xs font-medium">
                        {applications.filter(app => app.internshipId === internship.id).length} applicants
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">You haven't posted any internships yet.</p>
                  <Link to="/recruiter/post" className="text-primary-600 font-semibold hover:underline">
                    Post your first internship!
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Applicants */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                {selectedInternship ? `Applicants for ${selectedInternship.title}` : 'Recent Applicants'}
              </h2>
            </div>

            <div className="space-y-4">
              {displayApplicants.length > 0 ? (
                displayApplicants.map(applicant => (
                  <div key={applicant.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{users.find(u => u.id === applicant.studentId)?.name || 'Unknown Student'}</h3>
                        <p className="text-sm text-gray-500">{users.find(u => u.id === applicant.studentId)?.email || 'Unknown Email'}</p>
                        <p className="text-sm text-gray-600 mt-1">{users.find(u => u.id === applicant.studentId)?.education?.[0]?.degree || 'No Education'}</p>
                      </div>
                      {getStatusBadge(applicant.status)}
                    </div>

                    {/* Skills and Resume - assuming applicant has these properties from their user object */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {users.find(u => u.id === applicant.studentId)?.skills?.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(applicant.id, 'shortlisted')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusChange(applicant.id, 'rejected')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100 transition"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-primary-700 rounded-lg text-sm hover:bg-blue-100 transition">
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </button>
                      <a
                        href={users.find(u => u.id === applicant.studentId)?.resume || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition"
                      >
                        <FileText className="h-4 w-4" />
                        Resume
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    {selectedInternship
                      ? `No applicants for ${selectedInternship.title} yet.`
                      : 'No applicants for your internships yet.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboard