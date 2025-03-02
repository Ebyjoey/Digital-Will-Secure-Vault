// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';

function Dashboard() {
  const [secureData, setSecureData] = useState('');
  const { authTokens, logout } = React.useContext(AuthContext);

  useEffect(() => {
    if (authTokens) {
      // Fetch secure data from the backend
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/secure-data', {
            headers: {
              Authorization: `Bearer ${authTokens.token}`,
            },
          });
          setSecureData(response.data.secureData);
        } catch (error) {
          console.error('Error fetching secure data:', error);
        }
      };
      fetchData();
    }
  }, [authTokens]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Secure Data: {secureData}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
