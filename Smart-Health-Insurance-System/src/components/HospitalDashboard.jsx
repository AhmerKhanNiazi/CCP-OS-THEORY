export default function HospitalDashboard({ setPage, claims, currentUser }) {
  const myClaims = claims.filter(claim => claim.hospital === currentUser);
  
  const getStatusColor = (status) => {
    if (status === 'Approved') return '#28a745';
    if (status === 'Rejected') return '#dc3545';
    return '#ff9800'; // default is pending
  };

  return (
    <div>
      <div className="navbar">
        <h1>Hospital Portal</h1>
        <div>
          <button onClick={() => setPage('claim_submission')}>New Claim</button> 
          <button onClick={() => setPage('login')}>Logout</button>
        </div>
      </div>
      <div className="container">
        <h2>Recent Claims</h2>
        <p>Welcome, {currentUser}. Here are your recently submitted claims.</p>
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
                  <td style={{color: getStatusColor(claim.status), fontWeight: 'bold'}}>{claim.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br/>
        <button className="btn" onClick={() => setPage('claim_submission')}>Submit a New Claim</button>
      </div>
    </div>
  );
}
