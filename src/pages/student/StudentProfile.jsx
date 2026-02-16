import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Github, Globe, Upload, Save, Lightbulb, FileText, Link as LinkIcon } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import ProfileSkeleton from '../../components/skeletons/ProfileSkeleton'; // Import ProfileSkeleton
import EditProfileModal from '../../components/EditProfileModal'; // Import EditProfileModal

const StudentProfile = () => {
  const { user, updateUser, loading } = useAuth();
  const { skillSuggestions } = useData();

  const [profile, setProfile] = useState(user);
  const [skills, setSkills] = useState(user?.skills || []);
  const [inputSkill, setInputSkill] = useState('');
  const [aiTip, setAiTip] = useState('');
  const [isEditingEducation, setIsEditingEducation] = useState(null); // null or index
  const [newEducation, setNewEducation] = useState({ degree: '', school: '', year: '' });
  const [isEditingProject, setIsEditingProject] = useState(null); // null or index
  const [newProject, setNewProject] = useState({ name: '', description: '', link: '' });
  const [profileImage, setProfileImage] = useState(user?.profileImage || ''); // New state for profile image
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

  useEffect(() => {
    // Update local state if the user context changes
    setProfile(user);
    setSkills(user?.skills || []);
    setProfileImage(user?.profileImage || ''); // Update profile image state
  }, [user]);

  if (loading) {
    return (
      <ProfileSkeleton />
    );
  }

  if (!user || user.role !== 'student') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Please log in as a student to view this page.</p>
          <RouterLink to="/login" className="inline-block mt-4 px-6 py-2 gradient-bg text-white rounded-lg">
            Go to Login
          </RouterLink>
        </div>
      </div>
    );
  }

  const generateResumeTip = () => {
    const tips = [
      "Add quantifiable achievements to your education (e.g., 'GPA: 3.8/4.0')",
      "Include links to live projects or demos in your portfolio",
      "Highlight relevant coursework related to your target internships",
      "Mention any leadership roles in clubs or organizations",
      "Add technical tools and frameworks you're familiar with"
    ];
    setAiTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (inputSkill && !skills.includes(inputSkill)) {
      const newSkills = [...skills, inputSkill];
      setSkills(newSkills);
      setInputSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    const newSkills = skills.filter(s => s !== skill);
    setSkills(newSkills);
  };

  const handleSave = () => {
    updateUser({ ...profile, skills, profileImage }); // Include profileImage in the update
    alert('Profile saved successfully!');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to a server and get a URL.
      // For now, we'll use a placeholder URL or the file name as a representation.
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Use base64 for immediate preview (not for production)
      };
      reader.readAsDataURL(file);
      // Or just setProfileImage('/path/to/uploaded/image/' + file.name);
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.school && newEducation.year) {
      const updatedEducation = [...(profile.education || []), newEducation];
      setProfile(prev => ({ ...prev, education: updatedEducation }));
      setNewEducation({ degree: '', school: '', year: '' });
    }
  };

  const handleEditEducation = (index) => {
    setIsEditingEducation(index);
    setNewEducation({ ...profile.education[index] });
  };

  const handleUpdateEducation = () => {
    if (isEditingEducation !== null && newEducation.degree && newEducation.school && newEducation.year) {
      const updatedEducation = [...profile.education];
      updatedEducation[isEditingEducation] = newEducation;
      setProfile(prev => ({ ...prev, education: updatedEducation }));
      setNewEducation({ degree: '', school: '', year: '' });
      setIsEditingEducation(null);
    }
  };

  const handleCancelEditEducation = () => {
    setNewEducation({ degree: '', school: '', year: '' });
    setIsEditingEducation(null);
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      const updatedProjects = [...(profile.projects || []), newProject];
      setProfile(prev => ({ ...prev, projects: updatedProjects }));
      setNewProject({ name: '', description: '', link: '' });
    }
  };

  const handleEditProject = (index) => {
    setIsEditingProject(index);
    setNewProject({ ...profile.projects[index] });
  };

  const handleUpdateProject = () => {
    if (isEditingProject !== null && newProject.name && newProject.description) {
      const updatedProjects = [...profile.projects];
      updatedProjects[isEditingProject] = newProject;
      setProfile(prev => ({ ...prev, projects: updatedProjects }));
      setNewProject({ name: '', description: '', link: '' });
      setIsEditingProject(null);
    }
  };

  const handleCancelEditProject = () => {
    setNewProject({ name: '', description: '', link: '' });
    setIsEditingProject(null);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate upload by setting a placeholder URL or the file name
      // In a real app, this would be an API call to upload and get a URL
      setProfile(prev => ({ ...prev, resume: `/uploads/${file.name}` }));
      alert(`Resume uploaded: ${file.name}`);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-h1 font-bold mb-2">My Profile</h1>
            <p className="text-body-base text-gray-600">Keep your profile updated to get discovered by recruiters</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-action-blue text-action-blue rounded-[12px] font-semibold hover:bg-slate-grey transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition"
            >
              <Save className="h-5 w-5" />
              Save Profile
            </button>
          </div>
        </div>

        {/* AI Resume Tips */}
        <div className="bg-gradient-to-r from-deep-navy to-action-blue rounded-[16px] shadow-md p-6 mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">AI Resume Improvement Tips</h3>
              {aiTip ? (
                <p className="text-purple-100">{aiTip}</p>
              ) : (
                <p className="text-purple-100">Get personalized tips to improve your resume and profile</p>
              )}
              <button
                onClick={generateResumeTip}
                className="mt-3 px-4 py-2 bg-white text-deep-navy rounded-[12px] text-sm font-semibold hover:bg-slate-grey transition"
              >
                Get a Tip
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile Photo & Basic Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Profile Photo */}
            <div className="bg-white rounded-[16px] shadow-md p-6 text-center">
              <div className="w-32 h-32 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profile?.name?.charAt(0) || 'U'
                )}
              </div>
              <p className="text-h4 font-semibold text-center w-full">{profile?.name || ''}</p>
              <p className="text-body-sm text-gray-500">{profile?.email}</p>
              <input
                type="file"
                id="profile-photo-upload"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="profile-photo-upload"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-action-blue text-action-blue rounded-[12px] text-sm font-semibold hover:bg-slate-grey transition cursor-pointer"
              >
                <Upload className="h-4 w-4" />
                Change Photo
              </label>
            </div>

            {/* Contact Info (Display Only) */}
            <div className="bg-white rounded-[16px] shadow-md p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-h5">
                <User className="h-5 w-5 text-gray-400" />
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-body-sm">{profile?.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span className="text-body-sm">{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-body-sm">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Links (Display Only) */}
            <div className="bg-white rounded-[16px] shadow-md p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-h5">
                <LinkIcon className="h-5 w-5 text-gray-400" />
                Links
              </h3>
              <div className="space-y-3">
                {profile?.links?.github && (
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-action-blue">
                    <Github className="h-4 w-4" />
                    <span className="text-body-sm truncate">{profile.links.github}</span>
                  </a>
                )}
                {profile?.links?.portfolio && (
                  <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-action-blue">
                    <Globe className="h-4 w-4" />
                    <span className="text-body-sm truncate">{profile.links.portfolio}</span>
                  </a>
                )}
                {profile?.links?.linkedin && (
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-action-blue">
                    <Linkedin className="h-4 w-4" />
                    <span className="text-body-sm truncate">{profile.links.linkedin}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About (Display Only) */}
            <div className="bg-white rounded-[16px] shadow-md p-6">
              <h3 className="font-semibold mb-4 text-h5">About Me</h3>
              <p className="text-body-base text-gray-700 leading-relaxed">{profile?.about || 'No description provided.'}</p>
            </div>

            {/* Education */}
            <div className="bg-white rounded-[16px] shadow-md p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-gray-400" />
                Education
              </h3>
              <div className="space-y-4">
                {profile?.education?.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500">Class of {edu.year}</p>
                      </div>
                      <button onClick={() => handleEditEducation(index)} className="text-action-blue text-sm">Edit</button>
                    </div>
                  </div>
                ))}
                {isEditingEducation !== null && (
                  <div className="border border-action-blue rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold">Edit Education</h4>
                    <input
                      type="text"
                      placeholder="Degree (e.g., B.S. Computer Science)"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <input
                      type="text"
                      placeholder="School (e.g., University of Technology)"
                      value={newEducation.school}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, school: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <input
                      type="text"
                      placeholder="Year (e.g., 2024)"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleUpdateEducation} className="px-4 py-2 gradient-bg text-white rounded-[12px] text-sm">Update</button>
                      <button onClick={handleCancelEditEducation} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-[12px] text-sm">Cancel</button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setIsEditingEducation(null); // Ensure not in edit mode when adding
                    setNewEducation({ degree: '', school: '', year: '' }); // Clear form
                    // Then optionally open a modal or inline form for adding
                    // For now, I'll reuse the edit form logic for simplicity
                    // This implies the add form will appear at the bottom
                    if (isEditingEducation === null) {
                      // Trigger add by setting a temporary index or flag if needed.
                      // For now, if no edit is active, clicking '+' will show the add form.
                    }
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-[12px] text-gray-500 hover:border-action-blue hover:text-action-blue transition"
                >
                  + Add Education
                </button>
                 {isEditingEducation === null && ( // Only show add form if not editing an existing one
                  <div className="border border-gray-200 rounded-[12px] p-4 space-y-3">
                    <h4 className="font-semibold">Add New Education</h4>
                    <input
                      type="text"
                      placeholder="Degree (e.g., B.S. Computer Science)"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <input
                      type="text"
                      placeholder="School (e.g., University of Technology)"
                      value={newEducation.school}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, school: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <input
                      type="text"
                      placeholder="Year (e.g., 2024)"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <button onClick={handleAddEducation} className="px-4 py-2 gradient-bg text-white rounded-[12px] text-sm">Add Education</button>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-[16px] shadow-md p-6">
              <h3 className="font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-grey text-deep-navy rounded-full text-sm flex items-center gap-1">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  list="skill-suggestions"
                  value={inputSkill}
                  onChange={(e) => setInputSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-action-blue"
                />
                <button
                  type="submit"
                  className="px-4 py-2 gradient-bg text-white rounded-[12px] font-semibold hover:opacity-90 transition"
                >
                  Add
                </button>
              </form>
              <datalist id="skill-suggestions">
                {skillSuggestions.map(skill => (
                  <option key={skill} value={skill} />
                ))}
              </datalist>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-[16px] shadow-md p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-400" />
                Projects
              </h3>
              <div className="space-y-4">
                {profile?.projects?.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer"
                             className="text-action-blue text-sm hover:text-deep-navy">
                            View Project
                          </a>
                        )}
                      </div>
                      <button onClick={() => handleEditProject(index)} className="text-action-blue text-sm">Edit</button>
                    </div>
                  </div>
                ))}
                {isEditingProject !== null && (
                  <div className="border border-action-blue rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold">Edit Project</h4>
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <textarea
                      placeholder="Description"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px] resize-none"
                      rows={3}
                    />
                    <input
                      type="text"
                      placeholder="Project Link (Optional)"
                      value={newProject.link}
                      onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleUpdateProject} className="px-4 py-2 gradient-bg text-white rounded-[12px] text-sm">Update</button>
                      <button onClick={handleCancelEditProject} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-[12px] text-sm">Cancel</button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setIsEditingProject(null); // Ensure not in edit mode when adding
                    setNewProject({ name: '', description: '', link: '' }); // Clear form
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-[12px] text-gray-500 hover:border-action-blue hover:text-action-blue transition"
                >
                  + Add Project
                </button>
                {isEditingProject === null && ( // Only show add form if not editing an existing one
                  <div className="border border-gray-200 rounded-[12px] p-4 space-y-3">
                    <h4 className="font-semibold">Add New Project</h4>
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <textarea
                      placeholder="Description"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px] resize-none"
                      rows={3}
                    />
                    <input
                      type="text"
                      placeholder="Project Link (Optional)"
                      value={newProject.link}
                      onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-[12px]"
                    />
                    <button onClick={handleAddProject} className="px-4 py-2 gradient-bg text-white rounded-[12px] text-sm">Add Project</button>
                  </div>
                )}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-white rounded-[16px] shadow-md p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-gray-400" />
                Resume / CV
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-8 text-center hover:border-action-blue transition cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Drag and drop your resume here, or</p>
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
                <label htmlFor="resume-upload" className="text-action-blue font-semibold cursor-pointer">
                  browse files
                </label>
                <p className="text-sm text-gray-400 mt-2">PDF, DOC up to 5MB</p>
              </div>
              {profile?.resume && (
                <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">Current Resume: {profile.resume.split('/').pop()}</span>
                  </div>
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-action-blue text-sm font-semibold">View</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default StudentProfile;