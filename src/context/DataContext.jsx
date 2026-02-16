import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import {
  mockInternships,
  mockCompanies,
  mockAdminStats,
  skillSuggestions,
  mockMessages,
  mockApplicants
} from '../data/mockData';
import { keywordRelationships } from '../data/keywordRelationships'; // Import keywordRelationships

const DataContext = createContext(null);

// Adzuna API Credentials (PLACEHOLDER - in a real app, use environment variables)
const ADZUNA_APP_ID = 'YOUR_ADZUNA_APP_ID'; 
const ADZUNA_APP_KEY = 'YOUR_ADZUNA_APP_KEY';

// Base URL for Adzuna API
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs';
const ADZUNA_API_VERSION = '1.0';
const ADZUNA_COUNTRY = 'gb'; // For example, Great Britain. Can be dynamic.

export const useData = () => useContext(DataContext);

// Helper to get data from localStorage
const getStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null || stored === '') { // Genuinely empty or not set
      setStorage(key, fallback); // Seed localStorage with fallback
      return fallback;
    }
    
    const parsed = JSON.parse(stored);
    // If parsed value is null or not an array/object when expected,
    // it implies corruption or invalid structure. Use fallback and re-seed.
    if (parsed === null || (Array.isArray(fallback) && !Array.isArray(parsed)) || (typeof fallback === 'object' && fallback !== null && (typeof parsed !== 'object' || parsed === null))) {
      console.warn(`LocalStorage key "${key}" contains invalid data. Re-seeding with fallback.`);
      setStorage(key, fallback);
      return fallback;
    }
    return parsed;
  } catch (error) {
    console.error(`Error reading or parsing from localStorage key "${key}". Returning fallback and NOT overwriting localStorage to prevent data loss:`, error);
    // On parsing error, return fallback but DO NOT re-seed localStorage immediately
    // This prevents overwriting potentially valid data if the error was transient or due to a bad parse attempt.
    return fallback;
  }
};

// Helper to set data to localStorage
const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key “${key}”:`, error);
  }
};

// Function to fetch internships from Adzuna
const fetchAdzunaInternships = async (query = 'internship', location = '', page = 1) => {
  if (ADZUNA_APP_ID === 'YOUR_ADZUNA_APP_ID' || ADZUNA_APP_KEY === 'YOUR_ADZUNA_APP_KEY') {
    console.warn("Adzuna API keys are not set. Skipping API fetch.");
    return [];
  }

  const params = new URLSearchParams({
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    results_per_page: 50, // Fetch a reasonable number
    what: query,
    where: location,
    content_type: 'application/json',
    sort_by: 'date',
    distance: '100', // max distance in miles
    'full_time': '0', // Exclude full-time
    'part_time': '0', // Exclude part-time
    'contract': '0', // Exclude contract
    'permanent': '0', // Exclude permanent
    'temp': '0', // Exclude temporary
    // Attempt to filter for internships explicitly if possible
    // Adzuna doesn't have a direct 'internship' job category filter,
    // so we rely on the 'what' keyword and further filtering post-fetch.
    page: page
  });

  const url = `${ADZUNA_BASE_URL}/${ADZUNA_API_VERSION}/${ADZUNA_COUNTRY}/search?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data.results.map(job => ({
      id: `adzuna-${job.id}`, // Prefix ID to avoid conflicts with mock data
      title: job.title,
      company: job.company.display_name,
      companyId: job.company.display_name.replace(/\s/g, ''), // Generate a simple company ID
      logo: 'AZ', // Placeholder logo
      location: job.location.display_name,
      type: 'Adzuna', // Mark as external data source
      isPaid: job.salary_min > 0,
      stipend: job.salary_is_predicted ? `~${job.salary_min} / month` : `${job.salary_min} / month`,
      duration: 'Varies', // Adzuna doesn't provide this directly
      domain: job.category.label,
      posted: new Date(job.created).toISOString().split('T')[0],
      applicants: Math.floor(Math.random() * 50), // Simulate applicants
      requirements: job.description.match(/\b(react|python|javascript|java|sql|aws|azure)\b/gi) || [], // Simple keyword extraction
      description: job.description,
      redirect_url: job.redirect_url
    }));
  } catch (error) {
    console.error("Failed to fetch internships from Adzuna API:", error);
    return [];
  }
};


export const DataProvider = ({ children }) => {
  const { user, users } = useAuth();

  // Initialize state from localStorage or mock data
  const [localInternships, setLocalInternships] = useState(() => getStorage('internships', mockInternships));
  const [companies, setCompanies] = useState(() => getStorage('companies', mockCompanies));
  const [applications, setApplications] = useState(() => getStorage('applications', mockApplicants));
  const [notifications, setNotifications] = useState(() => getStorage('notifications', mockMessages));
  const [externalInternships, setExternalInternships] = useState([]);
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);
  const [savedInternships, setSavedInternships] = useState(() => getStorage('savedInternships', [])); // NEW: Saved Internships state

  // Calculate Profile Impact Score, Percentage, and Checklist
  const { profileImpactScore, profileCompletionPercentage, profileCompletionChecklist } = useMemo(() => {
    if (!user || user.role !== 'student') {
      return {
        profileImpactScore: 0,
        profileCompletionPercentage: 0,
        profileCompletionChecklist: [],
      };
    }

    const checklist = [];
    let score = 0;

    // --- Criteria & Weights ---
    // Assuming user object has fields: resume (string), skills (array), education (array), bio (string), projects (array)
    // You might need to add these fields to your mock user data in src/data/mockData.js for testing.

    // Has Resume (max 30 points)
    const hasResume = !!user.resume;
    if (hasResume) score += 30;
    checklist.push({ label: 'Upload Resume', completed: hasResume, points: 30, action: 'Upload' });

    // Has 3+ Skills (max 20 points)
    const hasEnoughSkills = (user.skills?.length || 0) >= 3;
    if (hasEnoughSkills) score += 20;
    checklist.push({ label: 'Add 3+ Skills', completed: hasEnoughSkills, points: 20, action: 'Add Skills' });

    // Has 1+ Education Entry (max 15 points)
    const hasEducation = (user.education?.length || 0) >= 1;
    if (hasEducation) score += 15;
    checklist.push({ label: 'Add Education Details', completed: hasEducation, points: 15, action: 'Add Education' });

    // Has Bio/Summary (max 15 points)
    const hasBio = !!user.bio;
    if (hasBio) score += 15;
    checklist.push({ label: 'Write a Short Bio', completed: hasBio, points: 15, action: 'Add Bio' });

    // Has 1+ Project/Experience (max 20 points)
    const hasProjects = (user.projects?.length || 0) >= 1;
    if (hasProjects) score += 20;
    checklist.push({ label: 'Add 1+ Project/Experience', completed: hasProjects, points: 20, action: 'Add Project' });
    // --- End Criteria & Weights ---

    const percentage = Math.round(score); // Score is already out of 100

    return {
      profileImpactScore: score,
      profileCompletionPercentage: percentage,
      profileCompletionChecklist: checklist,
    };
  }, [user]); // Re-calculate when user object changes

  // Fetch external internships on mount
  useEffect(() => {
    const loadExternalInternships = async () => {
      setIsLoadingExternal(true);
      const fetched = await fetchAdzunaInternships();
      setExternalInternships(fetched);
      setIsLoadingExternal(false);
    };
    loadExternalInternships();
  }, []);

  // Merge local and external internships
  const allInternships = useMemo(() => {
    // Use a Set to track IDs and ensure uniqueness
    const uniqueInternships = new Map();
    localInternships.forEach(int => uniqueInternships.set(int.id, int));
    externalInternships.forEach(int => uniqueInternships.set(int.id, int));
    return Array.from(uniqueInternships.values());
  }, [localInternships, externalInternships]);

  // Persist local state changes to localStorage
  useEffect(() => setStorage('internships', localInternships), [localInternships]);
  useEffect(() => setStorage('companies', companies), [companies]);
  useEffect(() => setStorage('applications', applications), [applications]);
  useEffect(() => setStorage('notifications', notifications), [notifications]);
  useEffect(() => setStorage('savedInternships', savedInternships), [savedInternships]); // NEW: Persist saved internships

  // Expose the merged internships
  const internships = allInternships;

  const getInternship = useCallback((id) => internships.find(i => i.id === parseInt(id) || i.id === id), [internships]);
  const getCompany = useCallback((id) => companies.find(c => c.id === parseInt(id)), [companies]);
  
  const getStudentProfile = useCallback(() => {
    if (!user || user.role !== 'student') return null;
    
    // In a real app, education, skills, resume would be part of user's stored data
    // For now, we'll use what's available in the user object or sensible defaults.
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        education: user.education || [], 
        skills: user.skills || [], 
        resume: user.resume || '', 
        bio: user.bio || '', // Assuming bio field can exist
        projects: user.projects || [], // Assuming projects field can exist
        applications: applications.filter(app => app.studentId === user.id)
      .map(app => ({
        ...app,
        internship: internships.find(i => i.id === app.internshipId) // Attach internship details
      }))
    };
  }, [user, applications, internships]);
  
  const getRecruiterProfile = useCallback(() => {
    if (!user || user.role !== 'recruiter') return null;

    // In a real app, company details would be part of recruiter's stored data
    // For now, we'll use what's available in the user object.
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
        companyName: companies.find(c => c.id === user.companyId)?.name || 'Unknown Company',
        postedInternships: internships.filter(i => i.companyId === user.companyId).map(i => i.id)
    };
  }, [user, internships, companies]);


  const addInternship = useCallback((internshipData) => {
    if (user?.role !== 'recruiter') return;

    const newInternship = {
      ...internshipData,
      id: Date.now(),
      companyId: user.companyId,
      company: companies.find(c => c.id === user.companyId)?.name || 'Unknown Company',
      logo: companies.find(c => c.id === user.companyId)?.logo || '??',
      posted: new Date().toISOString().split('T')[0],
      applicants: 0,
    };
    setLocalInternships(prev => [...prev, newInternship]); // Add to localInternships
    return newInternship;
  }, [user, companies]);

  const applyForInternship = useCallback((internshipId) => {
    if (user?.role !== 'student') return;

    // Prevent duplicate applications
    const hasApplied = applications.some(app => app.internshipId === internshipId && app.studentId === user.id);
    if(hasApplied) return;

    const newApplication = {
      internshipId,
      studentId: user.id,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setApplications(prev => [...prev, newApplication]);

    // Also update applicant count
    setLocalInternships(prev => prev.map(i => i.id === internshipId ? { ...i, applicants: (i.applicants || 0) + 1 } : i));
  }, [user, applications]);

  const getStudentApplications = useCallback(() => {
    if (user?.role !== 'student') return [];
    return applications
      .filter(app => app.studentId === user.id)
      .map(app => ({
        ...app,
        internship: internships.find(i => i.id === app.internshipId)
      }));
  }, [user, applications, internships]);

  const getRecruiterApplicants = useCallback((internshipId) => {
      if(user?.role !== 'recruiter') return [];
      
      const targetInternship = internships.find(i => i.id === internshipId);
      if (!targetInternship || targetInternship.companyId !== user.companyId) {
        return []; // Recruiter can only view applicants for their own company's internships
      }

      return applications
        .filter(app => app.internshipId === internshipId)
        .map(app => {
          const student = users.find(u => u.id === app.studentId);
          return {
            ...app,
            studentName: student?.name || 'Unknown Student',
            studentEmail: student?.email || 'Unknown Email',
            // Add other student details as needed, e.g., skills, education, resume from the 'student' object
          };
        });
  }, [user, applications, internships, users]);

  const toggleSaveInternship = useCallback((internshipId) => {
    setSavedInternships(prevSaved => {
      if (prevSaved.includes(internshipId)) {
        return prevSaved.filter(id => id !== internshipId);
      } else {
        return [...prevSaved, internshipId];
      }
    });
  }, []); // NEW: toggleSaveInternship function

  const updateApplicationStatus = useCallback((applicationId, newStatus) => {
    if (user?.role !== 'recruiter') return;

    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus } 
        : app
    ));
  }, [user]);

  // Search, Filter, and Suggestion Logic moved to DataContext
  const getFilteredInternships = useCallback((filters) => {
    if (!internships) return [];
    
    return internships.filter(internship => {
      const searchKeywords = filters.search.toLowerCase().split(' ').filter(Boolean);
      
      const expandedKeywords = new Set(searchKeywords);
      searchKeywords.forEach(keyword => {
        if (keywordRelationships[keyword]) {
          keywordRelationships[keyword].forEach(related => expandedKeywords.add(related));
        }
      });

      const searchableText = [
        internship.title,
        internship.company,
        internship.domain,
        internship.description,
        ...(internship.requirements || [])
      ].join(' ').toLowerCase();

      const hasActiveSearchKeyword = expandedKeywords.size > 0;
      const matchesSearch = hasActiveSearchKeyword
        ? [...expandedKeywords].some(keyword => searchableText.includes(keyword))
        : true;

      const matchesType = filters.type === 'all' || internship.type === filters.type;
      const matchesPaid = filters.paid === 'all' ||
                          (filters.paid === 'paid' && internship.isPaid) ||
                          (filters.paid === 'unpaid' && !internship.isPaid);
      const matchesDomain = filters.domain === 'all' || internship.domain === filters.domain;
      const matchesLocation = !filters.location ||
                              internship.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesType && matchesPaid && matchesDomain && matchesLocation;
    });
  }, [internships]);

  // Modified getRecommendedInternships to include Skills Match Percentage
  const getRecommendedInternships = useCallback(() => {
    // For now, simply return the most recently posted internships.
    // In a real app, this would involve more sophisticated recommendation logic.
    // We'll enhance this to include a skills match percentage if a student is logged in.
    
    const studentSkills = user?.role === 'student' ? (user.skills || []).map(s => s.toLowerCase()) : [];

    const recommendations = internships
      .map(internship => {
        let matchPercentage = 0;
        if (user?.role === 'student' && studentSkills.length > 0) { // Only calculate for logged-in students with skills
          const internshipRequirements = (internship.requirements || []).map(r => r.toLowerCase());
          const matchedSkillsCount = studentSkills.filter(skill => internshipRequirements.includes(skill)).length;
          // Calculate match based on internship requirements, avoiding division by zero
          // If internship has no requirements, consider it a 0% match to encourage adding requirements,
          // or you could assign a default if appropriate for the product.
          matchPercentage = internshipRequirements.length > 0 
                            ? Math.round((matchedSkillsCount / internshipRequirements.length) * 100) 
                            : 0; 
        }
        return { ...internship, matchPercentage };
      })
      .sort((a, b) => {
        // Sort by matchPercentage (desc) then by posted date (desc)
        if (b.matchPercentage !== a.matchPercentage) {
          return b.matchPercentage - a.matchPercentage;
        }
        return new Date(b.posted) - new Date(a.posted);
      })
      .slice(0, 5); // Limit to top 5 recommendations

    return recommendations;
  }, [internships, user]); // Re-calculate when internships or user object (for skills) changes

  const getSearchableTerms = useCallback(() => {
    const terms = new Set();
    internships.forEach(internship => {
      terms.add(internship.title);
      internship.requirements?.forEach(req => terms.add(req));
      if (internship.domain) terms.add(internship.domain);
      if (internship.company) terms.add(internship.company);
      // Also add keywords from descriptions if they are significant
      // For now, let's keep it concise to avoid too many suggestions
    });

    Object.keys(keywordRelationships).forEach(key => terms.add(key));
    Object.values(keywordRelationships).flat().forEach(val => terms.add(val));

    // Capitalize and sort for presentation in suggestions
    return [...terms].map(term => term.charAt(0).toUpperCase() + term.slice(1)).sort();
  }, [internships]);


  const value = {
    internships,
    companies,
    notifications,
    getInternship,
    getCompany,
    applyForInternship,
    addInternship,
    getStudentProfile,
    getRecruiterProfile,
    getStudentApplications,
    getRecruiterApplicants,
    getFilteredInternships, // Expose new search function
    getRecommendedInternships, // Expose new recommendations function
    getSearchableTerms, // Expose new function for autocomplete
    isLoadingExternal, // Expose loading state for external data
    savedInternships, // Expose saved internships
    toggleSaveInternship, // Expose function to toggle saved internships
    updateApplicationStatus, // Expose function to update application status
    // Keep admin/general data for now
    adminStats: mockAdminStats,
    skillSuggestions,
    users, // Make users available through DataContext
    // NEW: Profile Impact Score and Checklist
    profileImpactScore,
    profileCompletionPercentage,
    profileCompletionChecklist,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};