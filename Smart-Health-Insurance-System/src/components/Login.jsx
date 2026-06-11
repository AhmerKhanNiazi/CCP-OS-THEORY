import { useState } from 'react';

const ROLES = {
  hospital: ['Jinnah Medical', 'hospital_dashboard'],
  officer: ['Admin Officer', 'officer_review'],
  policyholder: ['PAT-5542', 'policy_tracking'],
  admin: ['System Admin', 'audit_logs']
};

export default function Login({ setPage, setCurrentUser, addLog }) {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const login = (e) => {
    e.preventDefault();
    const roleMatch = pass === '123' && ROLES[id];
    
    if (roleMatch) { 
      setCurrentUser(roleMatch[0]); 
      addLog('LOGIN_SUCCESS', `User ${id} logged in as ${roleMatch[0]}`);
      setPage(roleMatch[1]); 
    } else {
      addLog('LOGIN_FAILED', `Failed login attempt for ID: ${id}`);
      alert('Invalid Credentials! Please check the IDs and try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        
        {/* Left Side: Premium Branding & OS Info */}
        <div className="login-info-panel">
          <div className="branding">
            <h2>OS-Integrated Health System</h2>
            <p>Advanced Operating System Concept Visualizer</p>
          </div>
          
          <div className="os-details">
            <h3>System Architecture Overview</h3>
            <p className="os-desc">This system simulates a high-concurrency OS environment to solve real-world claim bottlenecks.</p>
            
            <div className="role-card">
              <h4>🏥 Hospital (Producer Thread)</h4>
              <p><strong>Login ID:</strong> <code>hospital</code></p>
              <p>Acts as a Producer submitting claims to a <strong>Bounded Buffer</strong>. Governed by <strong>Banker's Algorithm</strong> to avoid financial deadlocks.</p>
            </div>
            
            <div className="role-card">
              <h4>👨‍⚖️ Officer (CPU & Consumer)</h4>
              <p><strong>Login ID:</strong> <code>officer</code></p>
              <p>Acts as the CPU Scheduler (FCFS, SJF, Priority) and Consumer. Utilizes <strong>LRU Page Replacement</strong> RAM Cache for claim tracking.</p>
            </div>
            
            <div className="role-card">
              <h4>🛡️ Admin (System Monitor)</h4>
              <p><strong>Login ID:</strong> <code>admin</code></p>
              <p>Tracks System Events, Semaphore Locks, and Page Faults.</p>
            </div>

            <div className="role-card">
              <h4>👥 Policyholder (Client)</h4>
              <p><strong>Login ID:</strong> <code>policyholder</code></p>
              <p>End-user dashboard to securely track the status of submitted claims.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-form-panel">
          <div className="form-header">
            <h2>System Login</h2>
            <p>Authenticate to access your OS Module</p>
          </div>

          <form onSubmit={login} className="auth-form">
            <div className="form-group">
              <label>System Role ID</label>
              <input 
                required 
                value={id} 
                onChange={e => setId(e.target.value.toLowerCase())} 
                placeholder="e.g., hospital, officer, admin" 
              />
            </div>
            
            <div className="form-group">
              <label>Authentication Key</label>
              <input 
                type="password" 
                required 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                placeholder="Enter password (123)" 
              />
            </div>
            
            <div className="form-hint">
              <span style={{color: 'var(--warning)'}}>Demo Password for all roles is <strong>123</strong></span>
            </div>

            <button type="submit" className="btn btn-login">
              Initialize Session
            </button>
          </form>
          
          <div className="security-badge">
            <span>🔒 Secured by Mutex Semaphores</span>
          </div>
        </div>

      </div>
    </div>
  );
}
