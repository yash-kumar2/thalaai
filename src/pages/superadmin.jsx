import React, { useState, useEffect, useCallback } from 'react';

// Define the API base URL in a constant for easier maintenance
const API_BASE_URL = "http://localhost:4000";

const SuperAdmin = () => {
    const [schedules, setSchedules] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Added for better UX

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Fetches all pending schedules from the new admin endpoint
    const fetchSchedules = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/schedules`, {
                headers: {
                    // Correctly format the Authorization header
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Provide more specific error feedback
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch schedules');
            }

            const data = await response.json();
            setSchedules(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [token]); // useCallback dependency

    // Effect hook to load schedules when the component mounts
    useEffect(() => {
        if (token) {
            fetchSchedules();
        } else {
            setError("No authorization token found. Please log in.");
            setIsLoading(false);
        }
    }, [fetchSchedules, token]);

    // Handles the approval of a donation schedule
    const handleApproveDonation = async (scheduleId) => {
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/schedules/${scheduleId}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // The body is not needed as the ID is in the URL
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to approve donation');
            }
            
            // Refresh the schedule list to reflect the change
            fetchSchedules(); 
        } catch (err) {
            setError(err.message);
        }
    };

    // Render loading state
    if (isLoading) {
        return <div className="text-center mt-10">Loading schedules...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Super Admin Panel
            </h1>

            {/* Display any errors that occur */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="space-y-4">
                {schedules.length > 0 ? (
                    // Filter out completed schedules before mapping
                    schedules.filter(schedule => !schedule.completed).map((schedule) => (
                        <div key={schedule._id} className="bg-white p-4 border border-gray-200 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-4 sm:mb-0">
                                <p className="text-lg font-semibold text-gray-700">Donor: {schedule.donor?.user?.name || 'N/A'}</p>
                                <p className="text-sm text-gray-600">Blood Group: <span className="font-medium text-red-600">{schedule.donor?.user?.bloodGroup}</span></p>
                                <p className="text-sm text-gray-600">Date: {new Date(schedule.scheduledDate).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">Location: {schedule.location}</p>
                            </div>
                            {/* The button is only rendered if the schedule is not completed */}
                            <button
                                onClick={() => handleApproveDonation(schedule._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                            >
                                Approve Donation
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No pending schedules found.</p>
                )}
            </div>
        </div>
    );
};

export default SuperAdmin;