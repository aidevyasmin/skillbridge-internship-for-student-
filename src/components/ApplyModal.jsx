import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle, XCircle as XCircleIcon } from 'lucide-react';

const ApplyModal = ({ isOpen, onClose, onSubmit, internshipTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form and status when modal closes
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        resume: null,
      });
      setErrors({});
      setIsSubmitting(false);
      setSubmissionSuccess(false);
    }
  }, [isOpen]);

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/; // Basic 10-15 digit phone number

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (10-15 digits)';
    }
    if (!formData.resume) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      // Clear resume error
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: undefined }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      onSubmit(formData); // Call parent submit handler
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Application submission failed:", error);
      setErrors({ submission: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-deep-navy bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-lg p-6 relative">
        {!submissionSuccess && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        {submissionSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="h-20 w-20 text-action-blue mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-deep-navy mb-3">Application Submitted!</h3>
            <p className="text-slate-grey mb-6">Your application for the <span className="font-semibold">"{internshipTitle}"</span> internship has been successfully received.</p>
            <button
              onClick={onClose}
              className="px-6 py-3 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-deep-navy mb-6">Apply for {internshipTitle}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-grey mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-action-blue'
                  }`}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-grey mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-action-blue'
                  }`}
                  placeholder="your@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-grey mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 ${
                    errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-action-blue'
                  }`}
                  placeholder="e.g., 555-123-4567"
                  disabled={isSubmitting}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="resume-upload" className="block text-sm font-medium text-slate-grey mb-1">
                  Upload Resume / CV
                </label>
                <div
                  className={`flex items-center justify-center w-full h-32 border-2 ${
                    errors.resume ? 'border-red-500' : 'border-gray-300'
                  } border-dashed rounded-[12px] cursor-pointer bg-gray-50 hover:bg-gray-100 transition`}
                  onClick={() => document.getElementById('resume-upload-input').click()}
                >
                  <input
                    id="resume-upload-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    disabled={isSubmitting}
                  />
                  {formData.resume ? (
                    <div className="flex items-center gap-2 text-action-blue">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{formData.resume.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  )}
                </div>
                {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
              </div>

              {errors.submission && <p className="text-red-500 text-sm text-center">{errors.submission}</p>}

              <button
                type="submit"
                className="w-full px-4 py-3 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Submit Application
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
