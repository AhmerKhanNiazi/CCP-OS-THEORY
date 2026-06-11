import { useState, useEffect } from 'react';
import Login from './components/Login';
import HospitalDashboard from './components/HospitalDashboard';
import ClaimSubmission from './components/ClaimSubmission';
import OfficerReview from './components/OfficerReview';
import PolicyTracking from './components/PolicyTracking';
import AuditLogs from './components/AuditLogs';
import './index.css';

export default function App() {
  const [page, setPage] = useState('login');
  const [currentUser, setCurrentUser] = useState('');
  
  // SE + OS Data
  const [claims, setClaims] = useState([]);
  const [logs, setLogs] = useState([]);
  
  // Producer-Consumer Buffer
  const MAX_BUFFER_SIZE = 5;
  const [buffer, setBuffer] = useState([]); // Holding queue before officers see it
  
  // Banker's Algorithm State
  const [systemBudget, setSystemBudget] = useState({ total: 100000, available: 100000 });
  const [hospitalLimits] = useState({
    'Jinnah Medical': { max: 50000, allocated: 0 },
    'City Hospital': { max: 40000, allocated: 0 }
  });

  // Page Replacement Cache
  const CACHE_SIZE = 3;
  const [cache, setCache] = useState([]); 
  const [pageFaults, setPageFaults] = useState(0);

  const addLog = (action, detail) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ time, action, detail }, ...prev]);
  };

  const addClaim = (newClaim) => {
    setClaims(prev => [...prev, newClaim]);
    addLog('CLAIM_SUBMITTED', `Claim ${newClaim.id} submitted by ${newClaim.hospital}`);
  };

  const updateClaimStatus = (id, status) => {
    const updated = claims.map(c => {
      if (c.id === id) {
        return { ...c, status: status };
      }
      return c;
    });
    setClaims(updated);
    addLog('STATUS_UPDATED', `Claim ${id} status changed to ${status}`);
  };

  return (
    <>
      {page === 'login' && <Login setPage={setPage} setCurrentUser={setCurrentUser} addLog={addLog} />}
      {page === 'hospital_dashboard' && <HospitalDashboard setPage={setPage} claims={claims} currentUser={currentUser} buffer={buffer} MAX_BUFFER_SIZE={MAX_BUFFER_SIZE} />}
      {page === 'claim_submission' && <ClaimSubmission setPage={setPage} addClaim={addClaim} currentUser={currentUser} buffer={buffer} setBuffer={setBuffer} MAX_BUFFER_SIZE={MAX_BUFFER_SIZE} hospitalLimits={hospitalLimits} systemBudget={systemBudget} setSystemBudget={setSystemBudget} addLog={addLog} />}
      {page === 'officer_review' && <OfficerReview setPage={setPage} claims={claims} updateClaimStatus={updateClaimStatus} buffer={buffer} setBuffer={setBuffer} addLog={addLog} cache={cache} setCache={setCache} CACHE_SIZE={CACHE_SIZE} pageFaults={pageFaults} setPageFaults={setPageFaults} />}
      {page === 'policy_tracking' && <PolicyTracking setPage={setPage} claims={claims} currentUser={currentUser} />}
      {page === 'audit_logs' && <AuditLogs setPage={setPage} logs={logs} />}
    </>
  );
}
