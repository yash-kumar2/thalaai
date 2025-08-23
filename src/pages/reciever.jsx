import React, { useState } from "react";
import { MessageCircle, Calendar, Heart, Droplets, Clock } from "lucide-react";
 import ChatPopup from '../Components/ChatPopUp.jsx';
const ReceiverDashboard = ({ user, onLogout }) => {
  const [showChat, setShowChat] = useState(false);
 

  // Mock receiver data
  const receiverData = {
    lastTransfusionDate: "2025-01-10",
    nextTransfusionDate: "2025-01-31",
    transfusionIntervalDays: 21,
    requiredUnits: 2,
    totalTransfusions: 45,
    hemoglobinLevel: 8.2
  };

  const previousTransfusions = [
    { id: 1, date: "2025-01-10", units: 2, hospital: "City Hospital", hemoglobin: 8.2 },
    { id: 2, date: "2024-12-20", units: 2, hospital: "General Hospital", hemoglobin: 7.8 },
    { id: 3, date: "2024-11-29", units: 2, hospital: "City Hospital", hemoglobin: 8.0 }
  ];

  const upcomingTransfusions = [
    { id: 1, date: "2025-01-31", time: "9:00 AM", hospital: "City Hospital", units: 2 },
    { id: 2, date: "2025-02-21", time: "10:00 AM", hospital: "City Hospital", units: 2 }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Warrior Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.name}</span>
            <button onClick={onLogout} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Droplets className="w-8 h-8 text-red-500 mb-2" />
            <h3 className="text-lg font-semibold">Total Transfusions</h3>
            <p className="text-3xl font-bold text-red-600">{receiverData.totalTransfusions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heart className="w-8 h-8 text-pink-500 mb-2" />
            <h3 className="text-lg font-semibold">Hemoglobin Level</h3>
            <p className="text-3xl font-bold text-pink-600">{receiverData.hemoglobinLevel} g/dL</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold">Next Transfusion</h3>
            <p className="text-lg font-semibold text-green-600">{receiverData.nextTransfusionDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Previous Transfusions
            </h3>
            <div className="space-y-3">
              {previousTransfusions.map(transfusion => (
                <div key={transfusion.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-semibold">{transfusion.date}</p>
                    <p className="text-sm text-gray-600">{transfusion.hospital}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{transfusion.units} units</p>
                    <p className="text-sm text-gray-600">Hb: {transfusion.hemoglobin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Transfusions
            </h3>
            <div className="space-y-3">
              {upcomingTransfusions.map(transfusion => (
                <div key={transfusion.id} className="flex justify-between items-center p-3 border rounded border-blue-200 bg-blue-50">
                  <div>
                    <p className="font-semibold">{transfusion.date}</p>
                    <p className="text-sm text-gray-600">{transfusion.hospital}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{transfusion.time}</p>
                    <p className="text-sm text-gray-600">{transfusion.units} units</p>
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded mt-1">
                      Confirm
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
              Schedule New Transfusion
            </button>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => {setShowChat(!showChat)
          console.log("Chat button clicked")   
        }}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

   
      {showChat && (<ChatPopup showChat={showChat}/>)}
    </div>
  );
};
export default ReceiverDashboard;