import React, { useState, useEffect } from 'react';
import { MessageCircle, Calendar, User, Heart, Droplets, Clock, Phone, MapPin, Mail } from 'lucide-react';
import ChatPopup from './Components/ChatPopUp';
import LoginForm from './pages/login';
import RegisterForm from './pages/register';
import UserTypeSelection from './pages/usertype';
import DonorDashboard from './pages/donor';
import ReceiverDashboard from './pages/reciever';
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