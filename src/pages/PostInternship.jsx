import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MapPin, DollarSign, Clock, Calendar, Save, ArrowLeft, Building2 } from 'lucide-react';

const PostInternship = () => {
  const { user } = useAuth();
  const { addInternship, companies } = useData();
  const navigate = useNavigate();
  const [recruiterCompany, setRecruiterCompany] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    type: 'Remote',
    isPaid: true,
    stipend: '',
    duration: '',
    location: '',
    deadline: '',
    domain: ''
  });

  useEffect(() => {
    if (user && user.role === 'recruiter' && companies.length > 0) {
      const company = companies.find(c => c.id === user.companyId);
      setRecruiterCompany(company);
    }
  }, [user, companies]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recruiterCompany) {
      alert("Company details not found. Cannot post internship.");
      return;
    }

    const newInternship = {
      ...formData,
      requirements: formData.requirements.split(',').map(s => s.trim()),
      company: recruiterCompany.name,
      companyId: recruiterCompany.id,
      logo: recruiterCompany.logo,
    };

    addInternship(newInternship);
    alert('Internship posted successfully!');
    navigate('/recruiter/dashboard');
  };

  const domains = ['Web Development', 'AI/ML', 'Marketing', 'Design', 'Data Science', 'Mobile Development'];

  if (!user || user.role !== 'recruiter') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Please log in as a recruiter to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold mb-2">Post New Internship</h1>
            <p className="text-gray-600">Fill in the details to attract the best talent</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">

          {/* Company Info */}
          {recruiterCompany && (
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {recruiterCompany.logo}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{recruiterCompany.name}</h3>
                <p className="text-sm text-gray-500">You are posting on behalf of your company.</p>
              </div>
            </div>
          )}

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer Intern"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain *
            </label>
            <select
              name="domain"
              required
              value={formData.domain}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a domain</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Type *
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['Remote', 'Onsite', 'Hybrid'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                    formData.type === type
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compensation *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isPaid: true })}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                  formData.isPaid
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Paid
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isPaid: false })}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                  !formData.isPaid
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Unpaid
              </button>
            </div>
          </div>

          {/* Stipend */}
          {formData.isPaid && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stipend *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="stipend"
                  required
                  value={formData.stipend}
                  onChange={handleChange}
                  placeholder="e.g., $500/month"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {/* Duration & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration *
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="duration"
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 3 months"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Deadline *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the role, responsibilities, and what the intern will learn..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements (comma-separated) *
            </label>
            <textarea
              name="requirements"
              required
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              placeholder="e.g., React, JavaScript, CSS"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Save className="h-5 w-5" />
            Post Internship
          </button>
        </form>
      </div>
    </div>
  )
};

export default PostInternship;