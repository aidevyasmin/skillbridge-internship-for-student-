import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { User, Briefcase, Heart, Mail, Clock, CheckCircle, XCircle, Loader2, Lightbulb, Send, GraduationCap } from 'lucide-react'
import InternshipCard from '../components/InternshipCard'
import DashboardStatsSkeleton from '../components/skeletons/DashboardStatsSkeleton' // Import DashboardStatsSkeleton
import CardSkeleton from '../components/skeletons/CardSkeleton' // Import CardSkeleton for recommended internships
import ProfileImpactMeter from '../components/ProfileImpactMeter'; // Import ProfileImpactMeter
import RecruiterActivityStream from '../components/RecruiterActivityStream'; // Import RecruiterActivityStream

const StudentDashboard = () => {
  const { user, loading: authLoading } = useAuth()
  const { getStudentProfile, getStudentApplications, internships, notifications, isLoadingExternal, savedInternships, profileCompletionPercentage } = useData()

  const [profile, setProfile] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && internships) { // Wait for internships to load as well
      const studentProfile = getStudentProfile() // No ID needed now, uses `user` context directly
      const studentApps = getStudentApplications()
      setProfile(studentProfile)
      setApplications(studentApps)
      setLoading(false)
    }
  }, [user, internships, getStudentProfile, getStudentApplications])
  
  const recommendedInternships = useMemo(() => {
      if (!user || !internships || !profile?.skills || !savedInternships) return []; // Added savedInternships to dependencies
      
      const userSkills = new Set(profile.skills);
      const appliedIds = new Set(applications.map(a => a.internshipId));
      const savedIds = new Set(savedInternships); // Get saved internship IDs

      return internships.filter(internship => {
          if(appliedIds.has(internship.id) || savedIds.has(internship.id)) return false; // Exclude applied and saved
          
          const requiredSkills = new Set(internship.requirements);
          const commonSkills = [...userSkills].filter(skill => requiredSkills.has(skill));
          
          return commonSkills.length > 0;
      }).slice(0, 3);
  }, [user, internships, profile, applications, savedInternships]); // Added savedInternships to dependencies

  const isDashboardTrulyEmpty = useMemo(() => {
    return (
      applications.length === 0 &&
      (!savedInternships || savedInternships.length === 0) &&
      recommendedInternships.length === 0
    );
  }, [applications, savedInternships, recommendedInternships]);


  if (authLoading || loading || isLoadingExternal) { // Include isLoadingExternal in overall loading check
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
          <DashboardStatsSkeleton /> {/* Skeleton for stats cards */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6 border h-64 animate-pulse"></div> {/* Applications Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6 border">
                 <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                 <div className="grid grid-cols-1 gap-6">
                    {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)} {/* Skeleton for recommended internships */}
                 </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 border h-48 animate-pulse"></div> {/* Profile Summary Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6 border h-48 animate-pulse"></div> {/* Quick Actions Skeleton */}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!profile) {
      return (
          <div className="text-center py-20">
              <p>Could not load student profile.</p>
              <Link to="/login" className="text-primary-600">Return to Login</Link>
          </div>
      )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Shortlisted':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }
  
  const unreadMessagesCount = notifications?.filter(m => !m.read).length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Welcome, {profile.name}!</h1>
          <p className="text-gray-700 text-lg">Here's your personal dashboard.</p>
        </div>

        {/* Profile Impact Meter (Hero Section) */}
        <div className="mb-8">
          <ProfileImpactMeter />
        </div>

        {/* Getting Started Section for Empty Dashboard */}
        {isDashboardTrulyEmpty && (
          <div className="bg-gradient-to-r from-blue-500 to-primary-600 rounded-xl shadow-lg p-8 mb-8 text-white flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-3">Welcome to SkillBridge!</h2>
              <p className="text-lg opacity-90 mb-4">It looks a little empty here. Let's get you started on your internship journey!</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link
                  to="/browse"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  <Briefcase className="h-5 w-5 mr-2" /> Browse Internships
                </Link>
                <Link
                  to="/student/profile"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5 mr-2" /> Complete Your Profile
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center items-center">
              <GraduationCap className="h-24 w-24 text-white opacity-70" />
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Briefcase />} value={applications.length} label="Applications" color="blue" />
          <StatCard icon={<CheckCircle />} value={applications.filter(a => a.status === 'Shortlisted').length} label="Shortlisted" color="green" />
          <StatCard icon={<Heart />} value={savedInternships?.length || 0} label="Saved" color="purple" />
          <StatCard icon={<Mail />} value={unreadMessagesCount} label="New Messages" color="orange" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Smart Nudges */}
            {profileCompletionPercentage < 100 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg shadow-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="font-medium">Your profile is {profileCompletionPercentage}% complete. <Link to="/student/profile" className="font-bold underline">Complete your profile</Link> to unlock better matches!</p>
                  </div>
                </div>
              </div>
            )}
            {/* Applications */}
            <div className="bg-white rounded-xl shadow-md p-6 border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Applications</h2>
                <Link to="/browse" className="text-primary-600 text-sm font-semibold hover:text-primary-700">
                  Apply for More
                </Link>
              </div>
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.slice(0, 5).map(app => (
                    <ApplicationItem key={app.internshipId} application={app} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Briefcase className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="mb-4 text-lg font-medium">You haven't applied to any internships yet.</p>
                  <Link
                    to="/browse"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white gradient-bg hover:opacity-90 transition-opacity"
                  >
                    Find Internships
                  </Link>
                </div>
              )}
            </div>
            
            {/* Recommended Internships */}
            <div className="bg-white rounded-xl shadow-md p-6 border">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-accent-600" />
                  Recommended For You
              </h2>
              {recommendedInternships.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                      {recommendedInternships.map(internship => (
                          <InternshipCard small key={internship.id} internship={internship} />
                      ))}
                  </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Lightbulb className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="mb-4 text-lg font-medium">Update your skills to see personalized recommendations!</p>
                  <Link
                    to="/student/profile#skills"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white gradient-bg hover:opacity-90 transition-opacity"
                  >
                    Update Skills
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                    <QuickActionLink to="/browse" icon={<Briefcase />} label="Browse Internships" />
                    <QuickActionLink to="/messages" icon={<Mail />} label="View Messages" />
                    <QuickActionLink to="/student/profile#skills" icon={<User />} label="Update Skills" />
                </div>
            </div>

            {/* Recruiter Activity Stream */}
            <RecruiterActivityStream limit={5} />
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, value, label, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-primary-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-accent-600',
        orange: 'bg-orange-50 text-orange-600',
    }
    return (
        <div className="bg-white rounded-xl shadow-md p-5 border transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                </div>
            </div>
        </div>
    )
}

const ApplicationItem = ({ application }) => {
    if(!application.internship) return null;

    const getStatusPill = (status) => {
        const base = "px-2.5 py-0.5 text-xs font-medium rounded-full"
        switch(status) {
            case 'Shortlisted': return `${base} bg-green-100 text-green-800`;
            case 'Rejected': return `${base} bg-red-100 text-red-800`;
            default: return `${base} bg-yellow-100 text-yellow-800`;
        }
    }
    
    return (
        <Link to={`/internship/${application.internship.id}`} className="block border border-gray-200 rounded-lg p-4 hover:border-primary-400 hover:bg-gray-50 transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-md">
                  {application.internship.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{application.internship.title}</h3>
                  <p className="text-sm text-gray-500">{application.internship.company}</p>
                </div>
              </div>
              <span className={getStatusPill(application.status)}>{application.status}</span>
            </div>
        </Link>
    )
}

const QuickActionLink = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-600 font-medium">
        {icon}
        <span>{label}</span>
    </Link>
)


export default StudentDashboard