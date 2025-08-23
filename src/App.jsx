import React, { useState, useEffect } from 'react';
import { MessageCircle, Calendar, User, Heart, Droplets, Clock, Phone, MapPin, Mail } from 'lucide-react';
import ChatPopup from './Components/ChatPopUp';
// Components
const LoginForm = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app would make API call
    const mockResponse = {
      token: 'mock-jwt-token',
      user: {
        id: 1,
        name: 'John Doe',
        email: formData.email,
        isDonor: false,
        isReceiver: false
      }
    };
    onLogin(mockResponse);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Login</h2>
      <div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          Login
        </button>
      </div>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <button onClick={switchToRegister} className="text-red-600 hover:underline">
          Register
        </button>
      </p>
    </div>
  );
};

// const RegisterForm = ({ onRegister, switchToLogin }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     bloodGroup: '',
//     city: '',
//     email: '',
//     phone: '',
//     password: ''
//   });

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:4000/api/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     // Parse JSON safely
//     const data = await response.json();

//     if (response.ok) {
//       // ✅ Success
//       onRegister({ success: true, status: response.status, data });
//     } else {
//       // ❌ Error (400, 409, etc.)
//       onRegister({ success: false, status: response.status, error: data.message || "Registration failed" });
//     }
//   } catch (error) {
//     // ⚠️ Network / unexpected errors
//     onRegister({ success: false, status: 500, error: error.message });
//   }
// };


//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Register</h2>
//       <div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
//             <input
//               type="number"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//               value={formData.age}
//               onChange={(e) => setFormData({...formData, age: e.target.value})}
//               required
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
//             <select
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//               value={formData.gender}
//               onChange={(e) => setFormData({...formData, gender: e.target.value})}
//               required
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Blood Group</label>
//             <select
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//               value={formData.bloodGroup}
//               onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
//               required
//             >
//               <option value="">Select</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//             </select>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//             value={formData.city}
//             onChange={(e) => setFormData({...formData, city: e.target.value})}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//           <input
//             type="email"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//             value={formData.email}
//             onChange={(e) => setFormData({...formData, email: e.target.value})}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
//           <input
//             type="tel"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//             value={formData.phone}
//             onChange={(e) => setFormData({...formData, phone: e.target.value})}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//           <input
//             type="password"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//             value={formData.password}
//             onChange={(e) => setFormData({...formData, password: e.target.value})}
//             required
//           />
//         </div>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
//         >
//           Register
//         </button>
//       </div>
//       <p className="mt-4 text-center">
//         Already have an account?{' '}
//         <button onClick={switchToLogin} className="text-red-600 hover:underline">
//           Login
//         </button>
//       </p>
//     </div>
//   );
// };


const RegisterForm = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    city: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation rules
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || formData.age <= 0) newErrors.age = "Enter valid age";
    if (!formData.gender) newErrors.gender = "Select gender";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Select blood group";
    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // ❌ Stop if invalid

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onRegister({ success: true, status: response.status, data });
      } else {
        onRegister({
          success: false,
          status: response.status,
          error: data.message || "Registration failed",
        });
      }
    } catch (error) {
      onRegister({ success: false, status: 500, error: error.message });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-red-600">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name + Age */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Age
            </label>
            <input
              type="number"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>
        </div>

        {/* Gender + Blood Group */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Gender
            </label>
            <select
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.bloodGroup ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.bloodGroup}
              onChange={(e) =>
                setFormData({ ...formData, bloodGroup: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500 text-xs mt-1">{errors.bloodGroup}</p>
            )}
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            City
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Phone
          </label>
          <input
            type="tel"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 font-semibold shadow-md"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-red-600 font-medium hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};





const API_BASE = "http://localhost:4000";

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

      {/* Chat Window */}
      {/* {showChat && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border">
          <div className="bg-red-600 text-white p-3 rounded-t-lg">
            <h4 className="font-semibold">Chat Support</h4>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="mb-3">
              <div className="bg-gray-100 p-2 rounded text-sm">
                Hello! How can I help you today?
              </div>
            </div>
          </div>
          <div className="p-3 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
        </div>
      )} */}
    _{ showChat && (<ChatPopup showChat={showChat}/>)}
    </div>
  );
};

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

      {/* Chat Window */}
      {/* {showChat && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg">
            <h4 className="font-semibold">Chat Support</h4>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="mb-3">
              <div className="bg-gray-100 p-2 rounded text-sm">
                Hello! How can I help you with your treatment today?
              </div>
            </div>
          </div>
          <div className="p-3 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
        </div>
      )} */}
      {showChat && (<ChatPopup showChat={showChat}/>)}
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = (response) => {
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem('token', response.token);
    
    // Check if user has already selected their type
    if (response.user.isDonor) {
      setCurrentView('donorDashboard');
    } else if (response.user.isReceiver) {
      setCurrentView('receiverDashboard');
    } else {
      setCurrentView('userTypeSelection');
    }
  };

  const handleRegister = (response) => {
    setUser(response.data.user);
    setToken(response.data.token);
    console.log(response)
    localStorage.setItem('token', response.data.token);  
    setCurrentView('userTypeSelection');
    console.log(localStorage.getItem('token'));
  };

  const handleTypeSelection = (type) => {
    // Mock API call to set user type
    const updatedUser = {
      ...user,
      isDonor: type === 'donor',
      isReceiver: type === 'receiver'
    };
    setUser(updatedUser);
    
    if (type === 'donor') {
      setCurrentView('donorDashboard');
    } else {
      setCurrentView('receiverDashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'login' && (
        <LoginForm 
          onLogin={handleLogin} 
          switchToRegister={() => setCurrentView('register')} 
        />
      )}
      
      {currentView === 'register' && (
        <RegisterForm 
          onRegister={handleRegister} 
          switchToLogin={() => setCurrentView('login')} 
        />
      )}
      
      {currentView === 'userTypeSelection' && (
        <UserTypeSelection onSelectType={handleTypeSelection} setCurrentView={setCurrentView} />
      )}
      
      {currentView === 'donorDashboard' && (
        <DonorDashboard user={user} onLogout={handleLogout} />
      )}
      
      {currentView === 'receiverDashboard' && (
        <ReceiverDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;