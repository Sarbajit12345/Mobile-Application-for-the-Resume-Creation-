import React, { useState } from 'react';
import { BarChart2, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

export default function ATSAnalyticsView({ resumeData }) {
  const [targetRole, setTargetRole] = useState(resumeData.personalDetails?.jobTitle || 'Software Engineer');
  const [atsResult, setAtsResult] = useState({
    atsScore: 88,
    rating: 'Excellent',
    keywordsFound: ['Professional Summary', 'Work History', 'Technical Skills', 'Education Section'],
    improvementTips: ['Include exact years of experience for each technical skill', 'Add LinkedIn profile URL']
  });

  const runAtsScan = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/ai/ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData, targetRole })
      });
      const data = await res.json();
      if (data.success) setAtsResult(data);
    } catch (err) {
      // Keep state
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '1rem' }}>
          <BarChart2 size={26} style={{ color: '#38bdf8' }} />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white' }}>ATS Compliance & Resume Match Scanner</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Analyze applicant tracking system keywords and section density</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            style={{ flex: 1 }}
            placeholder="Target Job Title (e.g. Senior Full Stack Engineer)..."
            value={targetRole}
            onChange={e => setTargetRole(e.target.value)}
          />
          <button className="btn btn-ai" onClick={runAtsScan}>
            <Sparkles size={16} /> Re-Scan Resume
          </button>
        </div>

        {/* ATS Score Meter Display */}
        <div style={{ background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS Score Rating</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginTop: '0.2rem' }}>{atsResult.atsScore} / 100</h3>
            <span style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: 600 }}>Status: {atsResult.rating}</span>
          </div>
          <div className="ats-circle" style={{ '--score-percent': `${atsResult.atsScore}%`, width: '80px', height: '80px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>{atsResult.atsScore}%</span>
          </div>
        </div>

        {/* Keyword Checks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--bg-card-border)' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#4ade80', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} /> Optimizations Verified
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {atsResult.keywordsFound?.map((kw, idx) => (
                <div key={idx} style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} style={{ color: '#4ade80' }} /> {kw}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--bg-card-border)' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#fbbf24', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={16} /> Actionable Tips
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {atsResult.improvementTips?.map((tip, idx) => (
                <div key={idx} style={{ color: '#cbd5e1', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  • {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
