import React, { useState, useEffect } from "react";
import { Heart, User, Clock, Calendar, MessageCircle, Shield } from "lucide-react";
import ChatPopup from '../Components/ChatPopUp.jsx';

const API_BASE = "http://localhost:4000";

const DonorDashboard = ({ user, onLogout }) => {
  const [showChat, setShowChat] = useState(false);
  const [donorData, setDonorData] = useState({
    totalDonations: 0,
    livesImpacted: 0,
    nextDonationDate: "N/A",
    points: 0,
    badge: "New Donor",
  });
  const [previousDonations, setPreviousDonations] = useState([]);
  const [upcomingSchedule, setUpcomingSchedule] = useState([]);
  const [schedule, setSchedule] = useState({
    location: '',
    scheduledDate: '',
  });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDonorData = async () => {
    try {
      const [donationsRes, schedulesRes] = await Promise.all([
        fetch(`${API_BASE}/api/auth/my-donations`, {
          headers: { authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/api/auth/my-schedules`, {
          headers: { authorization: `Bearer ${token}` },
        }),
      ]);

      const donations = await donationsRes.json();
      const schedules = await schedulesRes.json();

      if (donationsRes.ok) {
        setPreviousDonations(donations);
        const totalDonations = donations.length;
        const points = totalDonations * 10;
        let badge = "New Donor";
        if (points >= 100) badge = "Gold Donor";
        else if (points >= 50) badge = "Silver Donor";
        else if (points >= 20) badge = "Bronze Donor";

        setDonorData({
          totalDonations,
          livesImpacted: totalDonations * 3,
          points,
          badge,
          nextDonationDate: schedules.length > 0 ? schedules[0].scheduledDate : "N/A"
        });
      }

      if (schedulesRes.ok) {
        setUpcomingSchedule(schedules);
      }

    } catch (err) {
      setError(err.message);
    }
  };


  useEffect(() => {
    fetchDonorData();
  }, []);

  const handleScheduleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/create/donation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(schedule),
      });

      if (!res.ok) {
        throw new Error("Failed to schedule donation");
      }
      fetchDonorData(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Donor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.name}</span>
            <button onClick={onLogout} className="bg-red-700 px-4 py-2 rounded hover:bg-red-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heart className="w-8 h-8 text-red-500 mb-2" />
            <h3 className="text-lg font-semibold">Total Donations</h3>
            <p className="text-3xl font-bold text-red-600">{donorData.totalDonations}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <User className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold">Lives Impacted</h3>
            <p className="text-3xl font-bold text-blue-600">{donorData.livesImpacted}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold">Next Donation</h3>
            <p className="text-lg font-semibold text-green-600">{donorData.nextDonationDate}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold">Badge</h3>
            <p className="text-lg font-bold text-yellow-600">{donorData.badge} ({donorData.points} pts)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Previous Donations
            </h3>
            <div className="space-y-3">
              {previousDonations.map(donation => (
                <div key={donation._id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-semibold">{new Date(donation.donationDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{donation.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{donation.units} unit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Schedule
            </h3>
            <div className="space-y-3">
              {upcomingSchedule.map(schedule => (
                <div key={schedule._id} className="flex justify-between items-center p-3 border rounded border-green-200 bg-green-50">
                  <div>
                    <p className="font-semibold">{new Date(schedule.scheduledDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{schedule.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleScheduleSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={schedule.location}
                onChange={handleScheduleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="scheduledDate"
                value={schedule.scheduledDate}
                onChange={handleScheduleChange}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Schedule New Donation
              </button>
            </form>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {showChat && (<ChatPopup showChat={showChat}/>)}
    </div>
  );
};
export default DonorDashboard;