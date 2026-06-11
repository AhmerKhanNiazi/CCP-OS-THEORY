export default function AuditLogs({ setPage, logs }) {
  return (
    <div>
      <div className="navbar">
        <h1>System Audit & Reporting</h1>
        <button onClick={() => setPage('login')} className="btn btn-reject">Logout</button>
      </div>
      <div className="container">
        <div className="os-panel">
          <h3 className="os-title">System Activity Logs</h3>
          <p className="os-tooltip-text">
            <strong>Concept:</strong> Fulfills the Audit Trail requirement. It tracks all Software Engineering events (Logins, Status updates) and Operating System events (Semaphores blocking, Page Faults, and Deadlock Avoidance triggers).
          </p>
        </div>
        
        <table style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Action / Event</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr><td colSpan="3" style={{textAlign: 'center'}}>No logs generated yet.</td></tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index}>
                  <td style={{ color: 'var(--secondary)' }}>{log.time}</td>
                  <td><span className="badge badge-low">{log.action}</span></td>
                  <td>{log.detail}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br />
        <button className="btn" onClick={() => setPage('login')}>Back to Login</button>
      </div>
    </div>
  );
}
