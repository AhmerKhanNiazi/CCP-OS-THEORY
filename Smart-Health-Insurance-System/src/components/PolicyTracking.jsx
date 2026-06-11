import { useState } from 'react';

export default function PolicyTracking({ setPage, claims, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const myClaims = claims.filter(claim => claim.patientId === currentUser);
  
  const getStatusColor = (status) => {
    if (status === 'Approved') return 'var(--success)';
    if (status === 'Rejected') return 'var(--danger)';
    if (status === 'Info Requested') return 'var(--warning)';
    return '#4facfe'; // pending
  };

  const handleSearch = () => { 
    setHasSearched(true); 
    const found = claims.find(c => c.id === searchQuery.trim().toUpperCase());
    setSearchResult(found); 
  };

  return (
    <div>
      <div className="navbar">
        <h1>My Health Portal</h1> 
        <button className="btn btn-reject" onClick={() => setPage('login')}>Logout</button>
      </div>
      <div className="container">
        <h2>Track Claims</h2>
        <div className="os-panel">
          <h3 className="os-title">Client Tracking Portal</h3>
          <p className="os-tooltip-text">
            <strong>Concept:</strong> Provides the end-user (Policyholder) with a read-only view of their data, fulfilling the client tracking Software Engineering requirement without giving them write access to the OS buffer.
          </p>
        </div>
        
        <h3 style={{marginTop: '30px', marginBottom: '15px', color: 'var(--primary)'}}>Your Claim History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>ID</th>
              <th>Treatment</th>
              <th>Hospital</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myClaims.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center'}}>No claims found.</td></tr>
            ) : (
              myClaims.map(claim => (
                <tr key={claim.id}>
                  <td>{claim.date}</td>
                  <td>{claim.id}</td>
                  <td>{claim.treatment}</td>
                  <td>{claim.hospital}</td>
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

        <hr style={{margin: '40px 0', border: 'none', borderTop: '1px solid var(--surface-border)'}} />
        
        <h3 style={{color: 'var(--primary)'}}>Search Specific Claim</h3>
        <div className="form-group" style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          <input placeholder="Enter Claim ID" style={{flex: 1}} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className="btn" onClick={handleSearch}>Search</button>
        </div>

        {hasSearched && (
          <div className="os-panel" style={{marginTop: '20px'}}>
            {searchResult ? (
              <div>
                <h3 className="os-title" style={{marginBottom: '15px'}}>Search Result</h3>
                <p><strong>Claim ID:</strong> {searchResult.id}</p>
                <p><strong>Hospital:</strong> {searchResult.hospital}</p>
                <p><strong>Treatment:</strong> {searchResult.treatment}</p>
                <p><strong>Status:</strong> 
                  <span className="badge" style={{marginLeft: '10px', backgroundColor: `${getStatusColor(searchResult.status)}20`, color: getStatusColor(searchResult.status)}}>
                    {searchResult.status}
                  </span>
                </p>
              </div>
            ) : (
              <p style={{color: 'var(--danger)', fontWeight: 'bold'}}>No claim found with ID "{searchQuery}". Please check and try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
