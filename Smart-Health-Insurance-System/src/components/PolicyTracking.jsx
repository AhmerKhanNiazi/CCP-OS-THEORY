import { useState } from 'react';

export default function PolicyTracking({ setPage, claims, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const myClaims = claims.filter(claim => claim.patientId === currentUser);
  
  const getStatusColor = (status) => {
    if (status === 'Approved') return '#28a745';
    if (status === 'Rejected') return '#dc3545';
    return '#ff9800';
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
        <button onClick={() => setPage('login')}>Logout</button>
      </div>
      <div className="container">
        <h2>Track Claims</h2>
        <p>Welcome, <strong>({currentUser})</strong>. Your claims:</p>
        
        <h3 style={{marginTop: '30px', marginBottom: '15px', color: '#004494'}}>Your Claim History</h3>
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
                  <td style={{color: getStatusColor(claim.status), fontWeight: 'bold'}}>{claim.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <hr style={{margin: '40px 0', border: 'none', borderTop: '1px solid #ddd'}} />
        
        <h3>Search Specific Claim</h3>
        <div className="form-group" style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          <input placeholder="Enter Claim ID" style={{flex: 1}} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className="btn" onClick={handleSearch}>Search</button>
        </div>

        {hasSearched && (
          <div style={{marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd'}}>
            {searchResult ? (
              <div>
                <h3 style={{color: '#004494', marginBottom: '15px'}}>Search Result</h3>
                <p><strong>Claim ID:</strong> {searchResult.id}</p>
                <p><strong>Hospital:</strong> {searchResult.hospital}</p>
                <p><strong>Treatment:</strong> {searchResult.treatment}</p>
                <p><strong>Status:</strong> <span style={{marginLeft: '10px', color: getStatusColor(searchResult.status), fontWeight: 'bold'}}>{searchResult.status}</span></p>
              </div>
            ) : (
              <p style={{color: '#dc3545', fontWeight: 'bold'}}>No claim found with ID "{searchQuery}". Please check and try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
