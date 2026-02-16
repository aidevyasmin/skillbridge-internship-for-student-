import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Github, Globe, Link as LinkIcon } from 'lucide-react';

const EditProfileForm = ({ onClose }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    about: user?.about || '',
    links: {
      github: user?.links?.github || '',
      portfolio: user?.links?.portfolio || '',
      linkedin: user?.links?.linkedin || '',
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Update form data if user context changes while modal is open
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      location: user?.location || '',
      about: user?.about || '',
      links: {
        github: user?.links?.github || '',
        portfolio: user?.links?.portfolio || '',
        linkedin: user?.links?.linkedin || '',
      },
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (site, value) => {
    setFormData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [site]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError('');
    try {
      // Assuming updateUser can handle partial updates
      await updateUser(formData);
      alert('Profile updated successfully!');
      onClose();
    } catch (err) {
      setSaveError(err.message || 'Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {saveError}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue"
          placeholder="Your full name"
          required
        />
      </div>

      {/* About Me */}
      <div>
        <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
          About Me
        </label>
        <textarea
          id="about"
          name="about"
          rows={4}
          value={formData.about}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue resize-none"
          placeholder="Tell us about yourself..."
        ></textarea>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          Contact Info
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{user?.email}</span> {/* Email is not editable here */}
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue text-sm"
                placeholder="Add phone number"
              />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="sr-only">Location</label>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue text-sm"
                placeholder="Add location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Links</h4>
        <div className="space-y-3">
          <div>
            <label htmlFor="github" className="sr-only">GitHub URL</label>
            <div className="flex items-center gap-3">
              <Github className="h-4 w-4 text-gray-400" />
              <input
                id="github"
                name="github"
                type="text"
                value={formData.links.github}
                onChange={(e) => handleLinkChange('github', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue text-sm"
                placeholder="GitHub URL"
              />
            </div>
          </div>
          <div>
            <label htmlFor="portfolio" className="sr-only">Portfolio/Website URL</label>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-gray-400" />
              <input
                id="portfolio"
                name="portfolio"
                type="text"
                value={formData.links.portfolio}
                onChange={(e) => handleLinkChange('portfolio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue text-sm"
                placeholder="Portfolio/Website URL"
              />
            </div>
          </div>
          <div>
            <label htmlFor="linkedin" className="sr-only">LinkedIn URL</label>
            <div className="flex items-center gap-3">
              <LinkIcon className="h-4 w-4 text-gray-400" />
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                value={formData.links.linkedin}
                onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue text-sm"
                placeholder="LinkedIn URL"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-[12px] font-semibold hover:bg-gray-300 transition"
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;