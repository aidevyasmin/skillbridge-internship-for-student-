// src/components/RecruiterActivityStream.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Briefcase, UserPlus, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const RecruiterActivityStream = ({ limit = 10 }) => {
    const { user, internships = [], users = [], applications = [] } = useData();
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const generateActivity = useMemo(() => {
        return () => {
            if (!user || !user.companyId || internships.length === 0 || applications.length === 0 || users.length === 0) return null;

            const possibleActivities = [];
            const myCompanyInternships = internships.filter(i => i.companyId === user.companyId);
            if (myCompanyInternships.length === 0) return null;

            const myInternshipIds = myCompanyInternships.map(i => i.id);
            const relevantApplications = applications.filter(app => myInternshipIds.includes(app.internshipId));

            // Activity Type 1: A student applied
            if (relevantApplications.length > 0) {
                const randomApp = relevantApplications[Math.floor(Math.random() * relevantApplications.length)];
                const student = users.find(u => u.id === randomApp.studentId);
                const internship = internships.find(i => i.id === randomApp.internshipId);
                if (student && internship) {
                    possibleActivities.push({
                        id: `app-${randomApp.id}`,
                        type: 'new_application',
                        icon: <UserPlus className="w-5 h-5 text-blue-500" />,
                        message: `${student.name} applied for ${internship.title}.`,
                        link: `/recruiter/dashboard`,
                        timestamp: new Date(randomApp.appliedDate),
                    });
                }
            }

            // Activity Type 2: New internship posted
            const randomInternship = myCompanyInternships[Math.floor(Math.random() * myCompanyInternships.length)];
            possibleActivities.push({
                id: `new-int-${randomInternship.id}`,
                type: 'new_internship',
                icon: <FilePlus className="w-5 h-5 text-green-500" />,
                message: `A new internship was posted: ${randomInternship.title}.`,
                link: `/internship/${randomInternship.id}`,
                timestamp: new Date(randomInternship.posted),
            });

            // Activity Type 3: Application status updated
            const updatedApps = relevantApplications.filter(app => app.status !== 'pending' && app.status !== 'Applied');
            if (updatedApps.length > 0) {
                const randomUpdate = updatedApps[Math.floor(Math.random() * updatedApps.length)];
                const student = users.find(u => u.id === randomUpdate.studentId);
                const internship = internships.find(i => i.id === randomUpdate.internshipId);
                if (student && internship) {
                    possibleActivities.push({
                        id: `update-${randomUpdate.id}`,
                        type: 'application_update',
                        icon: <Briefcase className="w-5 h-5 text-purple-500" />,
                        message: `Application for ${student.name} to ${internship.title} was updated to '${randomUpdate.status}'.`,
                        link: `/recruiter/dashboard`,
                        timestamp: new Date(), // Simulate update time
                    });
                }
            }

            return possibleActivities.length > 0 ? possibleActivities[Math.floor(Math.random() * possibleActivities.length)] : null;
        };
    }, [user, internships, users, applications]);

    useEffect(() => {
        if (!user || user.role !== 'recruiter' || internships.length === 0 || applications.length === 0) {
            setIsLoading(false);
            return;
        }

        // --- Safer Initial Activity Generation ---
        const initialActivities = new Map();
        let attempts = 0;
        const maxAttempts = limit * 5; // Prevent infinite loop

        while (initialActivities.size < limit && attempts < maxAttempts) {
            const activity = generateActivity();
            if (activity && !initialActivities.has(activity.id)) {
                initialActivities.set(activity.id, activity);
            }
            attempts++;
        }

        const sortedActivities = Array.from(initialActivities.values()).sort((a, b) => b.timestamp - a.timestamp);
        setActivities(sortedActivities);
        setIsLoading(false);

        // --- Safer Interval ---
        const interval = setInterval(() => {
            const newActivity = generateActivity();
            if (newActivity) {
                setActivities(prev => {
                    // Add if not already present
                    if (!prev.some(a => a.id === newActivity.id)) {
                        const updated = [newActivity, ...prev];
                        return updated.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
                    }
                    return prev;
                });
            }
        }, 8000); // New activity every 8 seconds

        return () => clearInterval(interval);
    }, [generateActivity, limit, user, internships, applications]);

    if (!user || user.role !== 'recruiter') {
        return null;
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 border flex justify-center items-center h-48">
                <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 border">
                <h3 className="font-semibold mb-4 text-lg">Activity Stream</h3>
                <div className="text-gray-500 text-center py-4">
                    No recent activity to show.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 border">
            <h3 className="font-semibold mb-4 text-lg">Activity Stream</h3>
            <div className="space-y-4">
                {activities.map(activity => (
                    <Link
                        key={activity.id + activity.timestamp} // Add timestamp to key for re-renders on update
                        to={activity.link || '#'}
                        className="flex items-center p-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className="flex-shrink-0 mr-3">{activity.icon}</div>
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(activity.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecruiterActivityStream;
