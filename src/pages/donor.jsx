const DonorDashboard = ({ user, onLogout }) => {
  const [showChat, setShowChat] = useState(false);
    
  // Mock donor data
  const donorData = {
    lastDonationDate: "2025-01-01",
    nextDonationDate: "2025-04-01",
    donationIntervalDays: 90,
    preferredDonationCenter: "City Hospital",
    totalDonations: 12,
    livesImpacted: 36
  };

  const previousDonations = [
    { id: 1, date: "2025-01-01", location: "City Hospital", units: 1 },
    { id: 2, date: "2024-10-01", location: "General Hospital", units: 1 },
    { id: 3, date: "2024-07-01", location: "City Hospital", units: 1 }
  ];

  const upcomingSchedule = [
    { id: 1, date: "2025-04-01", time: "10:00 AM", location: "City Hospital" },
    { id: 2, date: "2025-07-01", time: "2:00 PM", location: "City Hospital" }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Previous Donations
            </h3>
            <div className="space-y-3">
              {previousDonations.map(donation => (
                <div key={donation.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-semibold">{donation.date}</p>
                    <p className="text-sm text-gray-600">{donation.location}</p>
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
                <div key={schedule.id} className="flex justify-between items-center p-3 border rounded border-green-200 bg-green-50">
                  <div>
                    <p className="font-semibold">{schedule.date}</p>
                    <p className="text-sm text-gray-600">{schedule.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{schedule.time}</p>
                    <button className="text-sm bg-green-600 text-white px-3 py-1 rounded mt-1">
                      Confirm
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Schedule New Donation
            </button>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      
    _{ showChat && (<ChatPopup showChat={showChat}/>)}
    </div>
  );
};
export default DonorDashboard;