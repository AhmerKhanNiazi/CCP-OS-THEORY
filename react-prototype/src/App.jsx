import { useState } from 'react';
import Login from './components/Login';
import HospitalDashboard from './components/HospitalDashboard';
import ClaimSubmission from './components/ClaimSubmission';
import OfficerReview from './components/OfficerReview';
import PolicyTracking from './components/PolicyTracking';
import './index.css';

export default function App() {
  const [page, setPage] = useState('login');
  const [currentUser, setCurrentUser] = useState('');
  
  const [claims, setClaims] = useState([]);

  const addClaim = (newClaim) => {
    setClaims([newClaim, ...claims]);
  };

  const updateClaimStatus = (id, status) => {
    const updated = claims.map(c => {
      if (c.id === id) {
        return { ...c, status: status };
      }
      return c;
    });
    setClaims(updated);
  };

  return (
    <>
      {page === 'login' && <Login setPage={setPage} setCurrentUser={setCurrentUser} />}
      {page === 'hospital_dashboard' && <HospitalDashboard setPage={setPage} claims={claims} currentUser={currentUser} />}
      {page === 'claim_submission' && <ClaimSubmission setPage={setPage} addClaim={addClaim} currentUser={currentUser} />}
      {page === 'officer_review' && <OfficerReview setPage={setPage} claims={claims} updateClaimStatus={updateClaimStatus} />}
      {page === 'policy_tracking' && <PolicyTracking setPage={setPage} claims={claims} currentUser={currentUser} />}
    </>
  );
}
