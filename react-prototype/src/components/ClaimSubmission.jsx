import { useState } from 'react';

export default function ClaimSubmission({ setPage, addClaim, currentUser }) {
  const [patientId, setPatientId] = useState('');
  const [treatment, setTreatment] = useState('');
  const [amount, setAmount] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newClaimId = `#CLM-${randomNum}`;
    
    let riskScore = 'LOW (10/100)';
    if (amount > 10000) {
      riskScore = 'HIGH (85/100) - Unusually High Amount';
    } else if (amount > 5000) {
      riskScore = 'MEDIUM (40/100)';
    }

    const claimData = {
      id: newClaimId,
      patientId: patientId,
      treatment: treatment,
      amount: parseInt(amount),
      status: 'Pending Review',
      hospital: currentUser,
      date: new Date().toLocaleDateString('en-GB'),
      riskScore: riskScore
    };

    addClaim(claimData);
    alert(`Claim ${newClaimId} submitted successfully! Risk Score calculated.`);
    setPage('hospital_dashboard');
  };

  return (
    <div>
      <div className="navbar">
        <h1>Hospital Portal</h1> 
        <div>
          <button onClick={() => setPage('hospital_dashboard')}>Dashboard</button> 
          <button onClick={() => setPage('login')}>Logout</button>
        </div>
      </div>
      <div className="container">
        <h2>Submit a New Claim</h2>
        <p>Please fill out the details carefully. Automated validation will check the policy coverage.</p>
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
            <input required value={treatment} onChange={e => setTreatment(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Amount ($):</label>
            <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Document (PDF):</label>
            <input type="file" accept=".pdf" />
          </div>
          <button type="submit" className="btn">Submit Claim</button>
        </form>
      </div>
    </div>
  );
}
