import { useState } from 'react';

export default function OfficerReview({ setPage, claims, updateClaimStatus, buffer, setBuffer, addLog, cache, setCache, CACHE_SIZE, pageFaults, setPageFaults }) {
  const [algo, setAlgo] = useState('FCFS');
  const [schedule, setSchedule] = useState([]);
  
  // OS Module: CPU Scheduling
  const runScheduler = () => {
    let sortedBuffer = [...buffer];
    if (algo === 'FCFS') {
      sortedBuffer.sort((a, b) => a.arrivalTime - b.arrivalTime);
    } else if (algo === 'SJF') {
      sortedBuffer.sort((a, b) => a.burstTime - b.burstTime);
    } else if (algo === 'Priority') {
      sortedBuffer.sort((a, b) => b.riskScore - a.riskScore); // Highest risk first
    }
    
    // Calculate Times for Gantt Chart
    let currentTime = 0;
    let newSchedule = sortedBuffer.map(process => {
      const waitTime = currentTime;
      currentTime += process.burstTime;
      const turnaroundTime = currentTime;
      return { ...process, waitTime, turnaroundTime };
    });
    
    setSchedule(newSchedule);
    addLog('SCHEDULER_RUN', `CPU Scheduler ran with ${algo} algorithm.`);
  };

  // OS Module: Consumer & Mutex
  const handleAction = (claimId, actionToTake) => {
    // Consume from buffer
    const updatedBuffer = buffer.filter(c => c.id !== claimId);
    setBuffer(updatedBuffer);
    updateClaimStatus(claimId, actionToTake);
    
    // Remove from schedule if exists
    setSchedule(schedule.filter(c => c.id !== claimId));
    
    alert(`Semaphore Acquired! Claim ${claimId} has been ${actionToTake}!`);
  };

  // OS Module: Page Replacement Cache (LRU)
  const handleViewDetails = (claim) => {
    const isHit = cache.find(c => c.id === claim.id);
    if (isHit) {
      // LRU: Move to front
      const newCache = [claim, ...cache.filter(c => c.id !== claim.id)];
      setCache(newCache);
      addLog('PAGE_HIT', `Cache Hit for Claim ${claim.id}`);
      alert(`Page Hit! Fast retrieval from RAM Cache.`);
    } else {
      // Page Fault
      setPageFaults(prev => prev + 1);
      let newCache = [claim, ...cache];
      if (newCache.length > CACHE_SIZE) {
        newCache.pop(); // Evict LRU
      }
      setCache(newCache);
      addLog('PAGE_FAULT', `Cache Miss! Evicted old page. Loaded ${claim.id}`);
      alert(`Page Fault! Loaded into RAM Cache.`);
    }
  };

  return (
    <div>
      <div className="navbar">
        <h1>Officer Consumer Portal</h1> 
        <button className="btn btn-reject" onClick={() => setPage('login')}>Logout</button>
      </div>
      <div className="container">
        
        {/* Memory Management UI */}
        <div className="os-panel" style={{ borderColor: 'var(--secondary)'}}>
          <div className="flex-row" style={{justifyContent:'space-between'}}>
            <h3 className="os-title">OS Module: Page Replacement (LRU Cache)</h3>
            <span style={{color: 'var(--danger)'}}>Total Page Faults: {pageFaults}</span>
          </div>
          <p className="os-tooltip-text">
            <strong>Concept:</strong> Simulates RAM space limitation. When a claim is viewed, it loads into memory. If the cache is full, the <em>Least Recently Used (LRU)</em> page is evicted (Page Fault) to make room for the new claim data.
          </p>
          <div className="memory-cache">
            {[...Array(CACHE_SIZE)].map((_, i) => (
              <div key={i} className={`memory-block ${cache[i] ? 'filled' : ''}`}>
                {cache[i] ? (
                  <>
                    <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>{cache[i].id}</span>
                    <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>RAM Block {i}</span>
                  </>
                ) : (
                  <span style={{color: 'var(--surface-border)'}}>Empty</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CPU Scheduling UI */}
        <div className="os-panel">
          <h3 className="os-title">OS Module: CPU Task Scheduler</h3>
          <p className="os-tooltip-text">
            <strong>Concept:</strong> Claims act as Process Control Blocks (PCBs) with specific Burst Times and Priorities. The OS Scheduler sorts the Ready Queue to maximize throughput and generates a Gantt Chart illustrating execution timeline.
          </p>
          <div className="flex-row">
            <select value={algo} onChange={e => setAlgo(e.target.value)} style={{width: '200px'}}>
              <option value="FCFS">First Come First Serve</option>
              <option value="SJF">Shortest Job First</option>
              <option value="Priority">Priority (High Risk First)</option>
            </select>
            <button className="btn" onClick={runScheduler}>Run Scheduler</button>
          </div>
          
          {schedule.length > 0 && (
            <div className="gantt-chart">
              {schedule.map(proc => (
                <div key={proc.id} className="gantt-block" style={{ width: `${(proc.burstTime / schedule[schedule.length-1].turnaroundTime) * 100}%`, background: `hsl(${proc.riskScore * 1.5}, 70%, 50%)` }} title={`Burst: ${proc.burstTime} | Wait: ${proc.waitTime}`}>
                  {proc.id}
                </div>
              ))}
            </div>
          )}
        </div>

        <h2>Pending Claims Queue</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hospital</th>
              <th>Burst Time</th>
              <th>Priority (Risk)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buffer.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center'}}>No claims! Consumer is Sleeping (Blocked).</td></tr>
            ) : (
              (schedule.length > 0 ? schedule : buffer).map(claim => (
                <tr key={claim.id}>
                  <td>
                    <a href="#" style={{color: 'var(--primary)'}} onClick={(e) => {e.preventDefault(); handleViewDetails(claim);}}>{claim.id}</a>
                  </td>
                  <td>{claim.hospital}</td>
                  <td>{claim.burstTime} ms</td>
                  <td>
                    <span className={claim.riskScore > 50 ? 'badge badge-high' : 'badge badge-low'}>
                      {claim.riskText} ({claim.riskScore})
                    </span>
                  </td>
                  <td>
                    <div style={{display:'flex', gap:'5px'}}>
                      <button className="btn" style={{padding: '0.4rem 0.8rem', fontSize:'0.8rem'}} onClick={() => handleAction(claim.id, 'Approved')}>Approve</button>
                      <button className="btn btn-warning" style={{padding: '0.4rem 0.8rem', fontSize:'0.8rem'}} onClick={() => handleAction(claim.id, 'Info Requested')}>Req Info</button>
                      <button className="btn btn-reject" style={{padding: '0.4rem 0.8rem', fontSize:'0.8rem'}} onClick={() => handleAction(claim.id, 'Rejected')}>Reject</button>
                    </div>
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
