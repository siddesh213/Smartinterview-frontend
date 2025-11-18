import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile');
      setProfile(res.data.user);
    } catch (error) {
      console.error('Error fetching profile');
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h1>Profile</h1>
        {profile && (
          <div className="profile-card">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>User Type:</strong> {profile.userType || 'Not set'}</p>
            <p><strong>Interview Date:</strong> {profile.interviewDate ? new Date(profile.interviewDate).toLocaleDateString() : 'Not set'}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
