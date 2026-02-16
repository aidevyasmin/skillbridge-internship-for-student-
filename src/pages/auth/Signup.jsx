import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    terms: false
  });
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [searchParams] = useSearchParams();

  // Basic email regex for client-side validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_MIN_LENGTH = 6;

  const validateForm = (data) => {
    let valid = true;

    // Name validation
    if (!data.name.trim()) {
      setNameError('Full Name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    // Email validation
    if (!data.email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!emailRegex.test(data.email)) {
      setEmailError('Invalid email format.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!data.password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (data.password.length < PASSWORD_MIN_LENGTH) {
      setPasswordError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
      valid = false;
    } else {
      setPasswordError('');
    }

    // Confirm Password validation
    if (!data.confirmPassword) {
      setConfirmPasswordError('Confirm Password is required.');
      valid = false;
    } else if (data.password !== data.confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    // Terms validation
    if (!data.terms) {
        setTermsError('You must agree to the terms.');
        valid = false;
    } else {
        setTermsError('');
    }
    return valid;
  };

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && (roleParam === 'student' || roleParam === 'recruiter')) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [searchParams]);

  // Validate form fields
  useEffect(() => {
    // Only determine overall form validity here, don't set individual errors yet
    const nameValid = !!formData.name.trim();
    const emailValid = emailRegex.test(formData.email);
    const passwordValid = formData.password.length >= PASSWORD_MIN_LENGTH;
    const confirmPasswordValid = formData.password === formData.confirmPassword;
    const termsValid = formData.terms;

    setIsFormValid(nameValid && emailValid && passwordValid && confirmPasswordValid && termsValid);
  }, [formData]);


  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark form as submitted
    setGeneralError('');

    const isValid = validateForm(formData); // Run validation and set individual errors

    if (!isValid) {
      setGeneralError('Please correct the errors in the form.');
      return;
    }

    try {
      const newUser = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (newUser) {
        if (newUser.role === 'student') {
          navigate('/student/profile');
        } else {
          navigate('/recruiter/dashboard');
        }
      }
    } catch (err) {
      setGeneralError(err.message || "An error occurred during sign up.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="h-10 w-10 text-primary-600" />
            <span className="text-3xl font-bold gradient-text">SkillBridge</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-gray-600">Start your journey to finding the perfect opportunity</p>
        </div>

        {/* Signup Form */}
        <form className="mt-8 space-y-6 bg-white rounded-xl shadow-lg p-8" onSubmit={handleSubmit}>
          {submitted && (generalError || nameError || emailError || passwordError || confirmPasswordError || termsError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {generalError || 'Please correct the errors in the form.'}
            </div>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                  formData.role === 'student'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Find Internships
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'recruiter' }))}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                  formData.role === 'recruiter'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Post Internships
              </button>
            </div>
          </div>

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
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                submitted && nameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500'
              }`}
              placeholder="John Doe"
            />
            {submitted && nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                submitted && emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500'
              }`}
              placeholder="you@example.com"
            />
            {submitted && emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                submitted && passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500'
              }`}
              placeholder="••••••••"
            />
            {submitted && passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                submitted && confirmPasswordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500'
              }`}
              placeholder="••••••••"
            />
            {submitted && confirmPasswordError && <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className={`mt-1 h-4 w-4 focus:ring-primary-500 border rounded ${
                submitted && termsError ? 'border-red-500 text-red-600' : 'border-gray-300 text-primary-600'
              }`}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
            </label>
          </div>
          {submitted && termsError && <p className="mt-1 text-sm text-red-600">{termsError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 px-4 gradient-bg text-white rounded-lg font-semibold transition ${
              isFormValid ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;