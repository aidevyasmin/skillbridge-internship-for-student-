import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockInternships, mockAdminStats } from '../../data/mockData'
import { Shield, Users, Building2, Briefcase, AlertTriangle, Check, X, TrendingUp, Eye, Trash2, Star } from 'lucide-react'

const AdminPanel = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [companies, setCompanies] = useState([
    { id: 1, name: 'TechCorp', email: 'contact@techcorp.com', status: 'approved', internships: 5 },
    { id: 2, name: 'DataMind AI', email: 'info@datamind.com', status: 'approved', internships: 3 },
    { id: 3, name: 'StartupXYZ', email: 'hello@startupxyz.com', status: 'pending', internships: 0 },
    { id: 4, name: 'GrowthHub', email: 'team@growthhub.com', status: 'approved', internships: 2 },
  ])
  const [internships, setInternships] = useState(mockInternships)

  const handleApproveCompany = (id) => {
    setCompanies(companies.map(c =>
      c.id === id ? { ...c, status: 'approved' } : c
    ))
  }

  const handleRejectCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id))
  }

  const handleFeatureInternship = (id) => {
    setInternships(internships.map(i =>
      i.id === id ? { ...i, featured: !i.featured } : i
    ))
  }

  const handleDeleteInternship = (id) => {
    if (confirm('Delete this internship?')) {
      setInternships(internships.filter(i => i.id !== id))
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Access denied. Admin privileges required.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="gradient-bg text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-blue-100">Platform Management Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl shadow-md p-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'companies', label: 'Companies', icon: Building2 },
            { id: 'internships', label: 'Internships', icon: Briefcase },
            { id: 'users', label: 'Users', icon: Users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockAdminStats.totalStudents}</p>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockAdminStats.totalCompanies}</p>
                    <p className="text-sm text-gray-500">Companies</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockAdminStats.totalInternships}</p>
                    <p className="text-sm text-gray-500">Internships</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockAdminStats.totalApplications}</p>
                    <p className="text-sm text-gray-500">Applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockAdminStats.pendingCompanies}</p>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockAdminStats.flaggedPosts}</p>
                    <p className="text-sm text-gray-500">Flagged</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New student registered</p>
                    <p className="text-sm text-gray-500">John Doe joined the platform</p>
                  </div>
                  <span className="text-sm text-gray-400">2 minutes ago</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Internship approved</p>
                    <p className="text-sm text-gray-500">Frontend Developer at TechCorp</p>
                  </div>
                  <span className="text-sm text-gray-400">15 minutes ago</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New internship posted</p>
                    <p className="text-sm text-gray-500">Data Science Intern at AnalyticsPro</p>
                  </div>
                  <span className="text-sm text-gray-400">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Company Management</h2>
            <div className="overflow-x-auto">
              {companies.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Internships</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr key={company.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{company.name}</td>
                        <td className="py-3 px-4 text-gray-600">{company.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            company.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {company.status === 'approved' ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{company.internships}</td>
                        <td className="py-3 px-4 text-right">
                          {company.status === 'pending' ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleApproveCompany(company.id)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRejectCompany(company.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => alert('View company details functionality pending!')} className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No companies to display.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Internships Tab */}
        {activeTab === 'internships' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Internship Management</h2>
            {internships.length > 0 ? (
              <div className="space-y-4">
                {internships.map(internship => (
                  <div key={internship.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">
                          {internship.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold">{internship.title}</h3>
                          <p className="text-sm text-gray-500">{internship.company} • {internship.domain}</p>
                          <p className="text-xs text-gray-400 mt-1">{internship.applicants} applicants</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFeatureInternship(internship.id)}
                          className={`p-2 rounded-lg transition ${
                            internship.featured ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <Star className={`h-5 w-5 ${internship.featured ? 'fill-current' : ''}`} />
                        </button>
                        <button onClick={() => alert('View internship details functionality pending!')} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteInternship(internship.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    {internship.featured && (
                      <span className="mt-2 inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No internships to display.</p>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600 mb-6">View and manage all platform users</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Alex Johnson</td>
                    <td className="py-3 px-4 text-gray-600">alex@example.com</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-primary-700 rounded-full text-xs font-medium">Student</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => alert('View user details functionality pending!')} className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Sarah Williams</td>
                    <td className="py-3 px-4 text-gray-600">sarah@techcorp.com</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-purple-100 text-accent-700 rounded-full text-xs font-medium">Recruiter</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => alert('View user details functionality pending!')} className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel