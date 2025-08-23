const API_BASE = "http://localhost:4000";
import React, { useState } from "react";
import { Heart, Droplets } from "lucide-react";         

const UserTypeSelection = ({ onSuccess,setCurrentView }) => {
  const [role, setRole] = useState(null); // donor | receiver
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // auth token from login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (role === "donor") {
      if (!formData.lastDonationDate || !formData.donationIntervalDays || !formData.preferredDonationCenter) {
        return "All donor fields are required!";
      }
    } else if (role === "receiver") {
      if (!formData.lastTransfusionDate || !formData.transfusionIntervalDays || !formData.requiredUnits) {
        return "All receiver fields are required!";
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to register role");
      }
      else setCurrentView(role === "donor" ? "donorDashboard" : "receiverDashboard");

      const data = await res.json();
      onSuccess && onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Choose Your Role
      </h2>

      {!role && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donor Card */}
          <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-red-500 transition duration-200">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Blood Donor</h3>
            <p className="text-gray-600 mb-4">
              Help save lives by donating blood to thalassemia patients
            </p>
            <button
              onClick={() => setRole("donor")}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
            >
              I want to Donate
            </button>
          </div>

          {/* Receiver Card */}
          <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:border-red-500 transition duration-200">
            <Droplets className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Thalassemia Warrior</h3>
            <p className="text-gray-600 mb-4">
              Manage your blood transfusion schedule and treatment
            </p>
            <button
              onClick={() => setRole("receiver")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              I need Blood
            </button>
          </div>
        </div>
      )}

      {/* Donor Form */}
      {role === "donor" && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-gray-700 mb-1">Last Donation Date</label>
            <input
              type="date"
              name="lastDonationDate"
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Donation Interval (Days)</label>
            <input
              type="number"
              name="donationIntervalDays"
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="e.g. 90"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Preferred Donation Center</label>
            <input
              type="text"
              name="preferredDonationCenter"
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter hospital/center name"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
            >
              {loading ? "Submitting..." : "Submit Donor Info"}
            </button>
            <button
              type="button"
              onClick={() => setRole(null)}
              className="border px-6 py-2 rounded"
            >
              Back
            </button>
          </div>
        </form>
      )}

      {/* Receiver Form */}
      {role === "receiver" && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-gray-700 mb-1">Last Transfusion Date</label>
            <input
              type="date"
              name="lastTransfusionDate"
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Transfusion Interval (Days)</label>
            <input
              type="number"
              name="transfusionIntervalDays"
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="e.g. 21"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Required Units</label>
            <input
              type="number"
              name="requiredUnits"
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="e.g. 2"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Submitting..." : "Submit Receiver Info"}
            </button>
            <button
              type="button"
              onClick={() => setRole(null)}
              className="border px-6 py-2 rounded"
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default UserTypeSelection;