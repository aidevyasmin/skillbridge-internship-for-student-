import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Basic email regex for client-side validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_MIN_LENGTH = 6;

  // Validate form fields
  useEffect(() => {
    let valid = true;

    // Email validation
    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      setPasswordError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
      valid = false;
    } else {
      setPasswordError('');
    }

    setIsFormValid(valid && !!email && !!password); // Ensure fields are not empty too
  }, [email, password]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!isFormValid) {
      setGeneralError('Please correct the errors in the form.');
      return;
    }

    try {
      const user = login(email, password);

      if (user) {
        if (user.role === 'student') {
          navigate('/student/dashboard');
        } else if (user.role === 'recruiter') {
          navigate('/recruiter/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setGeneralError('Invalid email or password');
      }
    } catch (err) {
      setGeneralError(err.message || 'An error occurred during login.');
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white rounded-xl shadow-lg p-8" onSubmit={handleSubmit}>
          {(generalError || emailError || passwordError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {generalError || 'Please check your input.'}
            </div>
          )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500'
              }`}
              placeholder="you@example.com"
            />
            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500'
              }`}
              placeholder="••••••••"
            />
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
            <div className="flex justify-end mt-1">
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 px-4 gradient-bg text-white rounded-lg font-semibold transition ${
              isFormValid ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Sign In
          </button>

          {/* Demo Notice */}
          <p className="text-xs text-center text-gray-500">
            Default user: alex@example.com / password123
          </p>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;