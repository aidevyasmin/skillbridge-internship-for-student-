// src/components/ProfileImpactMeter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { CheckCircle, Circle } from 'lucide-react'; // Icons for checklist

const ProfileImpactMeter = () => {
    const { user, profileImpactScore, profileCompletionPercentage, profileCompletionChecklist } = useData();

    if (!user || user.role !== 'student') {
        return null; // Only show for logged-in students
    }

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern-dots opacity-10"></div> {/* Subtle background pattern */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0 md:w-1/2">
                    <h2 className="text-3xl font-extrabold mb-2 leading-tight">
                        Your Profile Impact Score
                    </h2>
                    <p className="text-lg opacity-90 mb-4">
                        Boost your score to unlock 3x more matches and stand out to recruiters!
                    </p>
                    <Link
                        to="/student/profile" // Link to the student profile page
                        className="inline-flex items-center px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md"
                    >
                        Go to Profile
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>

                <div className="md:w-1/2 flex flex-col items-center md:items-end">
                    {/* Radial Progress Bar */}
                    <div className="relative w-32 h-32 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                className="text-white text-opacity-30"
                                strokeWidth="12"
                                stroke="currentColor"
                                fill="transparent"
                                r="50"
                                cx="64"
                                cy="64"
                            />
                            <circle
                                className="text-white transition-all duration-700 ease-in-out"
                                strokeWidth="12"
                                strokeDasharray={314.159} // 2 * PI * R (2 * 3.14159 * 50)
                                strokeDashoffset={314.159 - (profileCompletionPercentage / 100) * 314.159}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="50"
                                cx="64"
                                cy="64"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold">{profileCompletionPercentage}%</span>
                        </div>
                    </div>

                    {/* Checklist */}
                    <ul className="text-left text-sm space-y-2 w-full max-w-xs md:max-w-none md:w-auto">
                        {profileCompletionChecklist.map((item, index) => (
                            <li key={index} className="flex items-center">
                                {item.completed ? (
                                    <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                                ) : (
                                    <Circle className="w-5 h-5 text-white text-opacity-70 mr-2" />
                                )}
                                <span>{item.label}</span>
                                {!item.completed && (
                                    <Link to="/student/profile" className="ml-auto text-blue-200 hover:underline">
                                        {item.action}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileImpactMeter;
