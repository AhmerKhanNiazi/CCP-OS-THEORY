import { useState } from 'react';

const ROLES = {
  hospital: ['Jinnah Medical', 'hospital_dashboard'],
  officer: ['Admin Officer', 'officer_review'],
  policyholder: ['PAT-5542', 'policy_tracking']
};

export default function Login({ setPage, setCurrentUser }) {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');

  const login = (e) => {
    e.preventDefault();
    
    const roleMatch = pass === '123' && ROLES[id];
    
    if (roleMatch) { 
      setCurrentUser(roleMatch[0]); 
      setPage(roleMatch[1]); 
    } else {
      alert('Invalid Credentials! Please use the demo logins provided.');
    }
  };

  return (
    <div className="container">
      <h2>System Login</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        <strong>Demo Logins (Pass: 123)</strong><br />
        IDs: hospital | officer | policyholder
      </p>

      <form onSubmit={login}>
        <div className="form-group">
          <label>User ID:</label>
          <input required value={id} onChange={e => setId(e.target.value)} placeholder="Enter User ID" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" required value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter Password" />
        </div>
        <button type="submit" className="btn">Login Securely</button>
      </form>
    </div>
  );
}
