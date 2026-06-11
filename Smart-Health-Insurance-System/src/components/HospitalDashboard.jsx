export default function HospitalDashboard({ setPage, claims, currentUser, buffer, MAX_BUFFER_SIZE }) {
  const myClaims = claims.filter(claim => claim.hospital === currentUser);
  
  const getStatusColor = (status) => {
    if (status === 'Approved') return 'var(--success)';
    if (status === 'Rejected') return 'var(--danger)';
    if (status === 'Info Requested') return 'var(--warning)';
    return '#4facfe'; // default is pending
  };

  return (
    <div>
      <div className="navbar">
        <h1>Hospital Producer Portal</h1>
        <div className="flex-row">
          <button className="btn" onClick={() => setPage('claim_submission')}>New Claim</button> 
          <button className="btn btn-reject" onClick={() => setPage('login')}>Logout</button>
        </div>
      </div>
      <div className="container">
        
        <div className="os-panel">
          <h3 className="os-title">OS Module: Producer-Consumer Buffer</h3>
          <p className="os-tooltip-text">
            <strong>Concept:</strong> Hospitals act as <strong>Producers</strong> adding claims (data) to a shared <strong>Bounded Buffer</strong> queue. Officers consume them. If the buffer is full (Size: {MAX_BUFFER_SIZE}), the producer is <em>Blocked (Sleeps)</em> using OS Semaphores to prevent memory overflow and Race Conditions.
          </p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{color: 'var(--text-secondary)'}}>Buffer Status [{buffer.length}/{MAX_BUFFER_SIZE}]: </span>
            <div style={{ display: 'flex', gap: '5px', flex: 1, background: 'rgba(0,0,0,0.4)', padding: '5px', borderRadius: '4px' }}>
              {[...Array(MAX_BUFFER_SIZE)].map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: '20px', borderRadius: '2px',
                  background: i < buffer.length ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.3s'
                }}></div>
              ))}
            </div>
            {buffer.length >= MAX_BUFFER_SIZE && <span style={{color: 'var(--danger)', fontWeight: 'bold'}}>Full (Blocked)</span>}
          </div>
        </div>

        <h2>My Claims History</h2>
        <p>Welcome, {currentUser}. Here are your submitted claims.</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Treatment</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myClaims.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center'}}>No claims submitted yet.</td></tr>
            ) : (
              myClaims.map(claim => (
                <tr key={claim.id}>
                  <td>{claim.id}</td>
                  <td>{claim.patientId}</td>
                  <td>{claim.treatment}</td>
                  <td>${claim.amount.toLocaleString()}</td>
                  <td>
                    <span className="badge" style={{backgroundColor: `${getStatusColor(claim.status)}20`, color: getStatusColor(claim.status)}}>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
