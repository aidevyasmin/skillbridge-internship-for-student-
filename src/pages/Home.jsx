import { Link } from 'react-router-dom'
import { Search, Users, Briefcase, CheckCircle, ArrowRight, MapPin, DollarSign, Clock } from 'lucide-react'
import { mockInternships } from '../data/mockData'
import DynamicStats from '../components/DynamicStats';

const Home = () => {
  const featuredInternships = mockInternships.filter(i => i.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bridge Your Skills to Real Opportunities
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Connect with top companies, build your skills, and get discovered. Your dream internship is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup?role=student"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              Sign Up as Student
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/signup?role=recruiter"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition"
            >
              Hire Talent
            </Link>
          </div>

          {/* Quick Search */}
          <div className="mt-12 bg-white rounded-2xl p-4 max-w-2xl mx-auto shadow-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search internships..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Link to="/browse" className="gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition text-center">
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Simple steps to connect with your dream internship opportunity
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Create Profile</h3>
              <p className="text-gray-600">
                Build your professional profile with your skills, education, and projects to showcase your potential.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Browse & Apply</h3>
              <p className="text-gray-600">
                Explore thousands of internships from top companies and apply to the ones that match your interests.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Hired</h3>
              <p className="text-gray-600">
                Connect with recruiters, showcase your skills, and land your dream internship opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Internships</h2>
              <p className="text-gray-600">Discover exciting opportunities from top companies</p>
            </div>
            <Link to="/browse" className="hidden sm:flex items-center text-primary-600 font-semibold hover:text-primary-700">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInternships.map(internship => (
              <div key={internship.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">
                      {internship.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{internship.company}</h3>
                      <p className="text-sm text-gray-500">{internship.domain}</p>
                    </div>
                  </div>
                  {internship.paid && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Paid
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2">{internship.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{internship.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-primary-700 text-sm rounded-full flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {internship.type}
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-accent-700 text-sm rounded-full flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {internship.stipend}
                  </span>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {internship.duration}
                  </span>
                </div>

                <Link
                  to={`/internship/${internship.id}`}
                  className="block w-full text-center py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/browse" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700">
              View All Internships <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Section (NEW) */}
      <DynamicStats />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of students who found their dream internships through SkillBridge
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 gradient-bg text-white rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home