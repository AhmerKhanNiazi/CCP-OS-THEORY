import { useState } from 'react';

export default function ClaimSubmission({ setPage, addClaim, currentUser, buffer, setBuffer, MAX_BUFFER_SIZE, hospitalLimits, systemBudget, setSystemBudget, addLog }) {
  const [patientId, setPatientId] = useState('');
  const [treatment, setTreatment] = useState('');
  const [amount, setAmount] = useState('');
  const [fileName, setFileName] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    
    // OS Module: Producer-Consumer (Semaphore Check)
    if (buffer.length >= MAX_BUFFER_SIZE) {
      addLog('PRODUCER_BLOCKED', `${currentUser} blocked. Buffer is full.`);
      alert('OS Error: Bounded Buffer is FULL. Producer must wait (Sleep) until Consumer processes claims.');
      return;
    }

    const claimAmt = parseInt(amount);

    // OS Module: Banker's Algorithm (Deadlock Avoidance)
    const myLimit = hospitalLimits[currentUser];
    if (myLimit && (myLimit.allocated + claimAmt > myLimit.max)) {
      addLog('DEADLOCK_AVOIDED', `Claim rejected via Banker's Algo. Exceeds Max Resource Matrix for ${currentUser}.`);
      alert(`Banker's Algorithm Alert: Unsafe State! Approving this $${claimAmt} claim exceeds your maximum allowable resource matrix ($${myLimit.max}). Request Denied.`);
      return;
    }
    
    if (claimAmt > systemBudget.available) {
      addLog('DEADLOCK_AVOIDED', `Unsafe State! System Available Budget ($${systemBudget.available}) insufficient for $${claimAmt}.`);
      alert(`Banker's Algorithm Alert: System is entering an Unsafe State. Not enough available system resources (budget).`);
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newClaimId = `#CLM-${randomNum}`;
    
    // OS Context Data
    const burstTime = Math.floor(Math.random() * 5) + 1; // 1 to 5 ms/units
    const arrivalTime = new Date().getTime();
    
    let riskScore = 10;
    let riskText = 'LOW';
    if (claimAmt > 10000) { riskScore = 85; riskText = 'HIGH'; }
    else if (claimAmt > 5000) { riskScore = 40; riskText = 'MEDIUM'; }

    const claimData = {
      id: newClaimId,
      patientId: patientId,
      treatment: treatment,
      amount: claimAmt,
      status: 'Pending Review',
      hospital: currentUser,
      date: new Date().toLocaleDateString('en-GB'),
      riskScore: riskScore,
      riskText: riskText,
      burstTime: burstTime,
      arrivalTime: arrivalTime,
      fileName: fileName || 'No document'
    };

    // Mutex acquired implicitly in React setState
    addClaim(claimData);
    setBuffer([...buffer, claimData]);
    
    alert(`Claim ${newClaimId} submitted! Uploaded: ${claimData.fileName}. Banker's Algo: State is SAFE.`);
    setPage('hospital_dashboard');
  };

  return (
    <div>
      <div className="navbar">
        <h1>Hospital Producer Portal</h1> 
        <div>
          <button className="btn" onClick={() => setPage('hospital_dashboard')}>Dashboard</button> 
        </div>
      </div>
      <div className="container" style={{maxWidth: '800px'}}>
        
        <div className="os-panel">
          <h3 className="os-title">OS Module: Banker's Algorithm (Deadlock Avoidance)</h3>
          <p className="os-tooltip-text">
            <strong>Concept:</strong> Before allocating resources (approving a claim), the OS simulates the allocation. If granting the funds exceeds the Hospital's <em>Max Matrix</em> or the <em>System Available Resources</em>, the system detects an impending Deadlock (Unsafe State) and explicitly blocks the transaction.
          </p>
          <div className="flex-row" style={{justifyContent: 'space-between', color: 'var(--text-secondary)'}}>
            <div>
              <p><strong>System Resources (Available Budget):</strong> ${systemBudget.available.toLocaleString()}</p>
              <p><strong>Your Max Claim Limit:</strong> ${hospitalLimits[currentUser]?.max?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <p>Requests exceeding resources lead to <strong style={{color:'var(--danger)'}}>Unsafe State</strong>.</p>
            </div>
          </div>
        </div>

        <h2>Produce New Claim</h2>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Patient ID:</label>
            <select required value={patientId} onChange={e => setPatientId(e.target.value)}>
              <option value="" disabled>Select...</option>
              <option value="PAT-5542">PAT-5542</option>
              <option value="PAT-1123">PAT-1123</option>
              <option value="PAT-9999">PAT-9999</option>
            </select>
          </div>
          <div className="form-group">
            <label>Treatment:</label>
            <input required value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="e.g. Heart Bypass" />
          </div>
          <div className="form-group">
            <label>Amount ($):</label>
            <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Medical Document (PDF):</label>
            <input type="file" accept=".pdf" onChange={e => setFileName(e.target.files[0]?.name)} />
            {fileName && <small style={{color:'var(--success)'}}>File attached: {fileName}</small>}
          </div>
          <button type="submit" className="btn" style={{width: '100%'}}>
            {buffer.length >= MAX_BUFFER_SIZE ? 'Blocked (Buffer Full)' : 'Produce Claim (Acquire Mutex)'}
          </button>
        </form>
      </div>
    </div>
  );
}
