export default function OfficerReview({ setPage, claims, updateClaimStatus }) {
  const pendingClaims = claims.filter(claim => claim.status === 'Pending Review');
  
  const handleActionClick = (claimId, actionToTake) => { 
    updateClaimStatus(claimId, actionToTake); 
    alert(`Claim ${claimId} has been ${actionToTake}!`); 
  };

  return (
    <div>
      <div className="navbar">
        <h1>Insurance Admin Portal</h1> 
        <button onClick={() => setPage('login')}>Logout</button>
      </div>
      <div className="container">
        <h2>Claims Needing Review</h2>
        <p>Review flagged claims below.</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hospital</th>
              <th>Amount</th>
              <th>Fraud Risk</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingClaims.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center'}}>No pending claims! You are all caught up.</td></tr>
            ) : (
              pendingClaims.map(claim => (
                <tr key={claim.id}>
                  <td>{claim.id}</td>
                  <td>{claim.hospital}</td>
                  <td>${claim.amount.toLocaleString()}</td>
                  <td>
                    <span className={claim.riskScore.includes('HIGH') ? 'badge-high' : 'badge-low'}>
                      {claim.riskScore}
                    </span>
                  </td>
                  <td>
                    <button className="btn" style={{marginRight: '10px'}} onClick={() => handleActionClick(claim.id, 'Approved')}>Approve</button>
                    <button className="btn btn-reject" onClick={() => handleActionClick(claim.id, 'Rejected')}>Reject</button>
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
