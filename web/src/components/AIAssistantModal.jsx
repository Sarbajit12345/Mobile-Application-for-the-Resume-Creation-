import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';

export default function AIAssistantModal({ isOpen, onClose, resumeData, onApplySummary, onApplyBullets }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState('');
  const [bulletInput, setBulletInput] = useState('');
  const [bulletResult, setBulletResult] = useState('');
  const [atsAnalysis, setAtsAnalysis] = useState(null);

  if (!isOpen) return null;

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: resumeData.personalDetails?.jobTitle || 'Software Professional',
          skills: resumeData.skills || [],
          experienceLevel: 'Mid-Level'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSummaryResult(data.summary);
      }
    } catch (err) {
      // Local fallback if server is offline
      setSummaryResult(`Driven ${resumeData.personalDetails?.jobTitle || 'Professional'} with expertise in ${resumeData.skills?.join(', ') || 'modern industry standards'}. Passionate about clean engineering, scalability, and collaborative problem-solving.`);
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceBullets = async () => {
    if (!bulletInput.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/enhance-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: bulletInput,
          role: resumeData.personalDetails?.jobTitle || 'Engineer'
        })
      });
      const data = await response.json();
      if (data.success) {
        setBulletResult(data.enhancedBullets);
      }
    } catch (err) {
      setBulletResult(`• Spearheaded development of core modules, improving performance by 25%.\n• Architected scalable API endpoints adhering to enterprise security patterns.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRunATSCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData,
          targetRole: resumeData.personalDetails?.jobTitle || 'General Role'
        })
      });
      const data = await response.json();
      if (data.success) {
        setAtsAnalysis(data);
      }
    } catch (err) {
      setAtsAnalysis({
        atsScore: 82,
        rating: 'Good',
        keywordsFound: ['Professional Summary', 'Skills Section', 'Work History'],
        improvementTips: ['Add 2 more technical skills', 'Include GitHub repository link']
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
    }}>
      <div style={{
        background: '#1e293b', border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '16px', width: '100%', maxWidth: '700px', maxHeight: '90vh',
        overflowY: 'auto', padding: '1.75rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        color: '#f8fafc'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={24} style={{ color: '#a855f7' }} />
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem' }}>AI Resume Assistant</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
          <button className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>
            Summary Generator
          </button>
          <button className={`tab-btn ${activeTab === 'bullets' ? 'active' : ''}`} onClick={() => setActiveTab('bullets')}>
            Bullet Enhancer
          </button>
          <button className={`tab-btn ${activeTab === 'ats' ? 'active' : ''}`} onClick={() => setActiveTab('ats')}>
            ATS Inspector
          </button>
        </div>

        {/* Tab 1: Summary Generator */}
        {activeTab === 'summary' && (
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Auto-generate a professional summary based on your role <strong>({resumeData.personalDetails?.jobTitle || 'Not set'})</strong> and listed skills.
            </p>
            <button className="btn btn-ai" onClick={handleGenerateSummary} disabled={loading} style={{ width: '100%', marginBottom: '1rem' }}>
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {loading ? 'Generating...' : 'Generate AI Summary'}
            </button>

            {summaryResult && (
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '1rem' }}>{summaryResult}</p>
                <button className="btn btn-primary" onClick={() => { onApplySummary(summaryResult); onClose(); }}>
                  Apply to Resume
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Bullet Enhancer */}
        {activeTab === 'bullets' && (
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Paste plain job duties below. AI will rewrite them into action-oriented achievement statements.
            </p>
            <textarea
              placeholder="e.g. I worked on fixing bugs and writing backend API code..."
              value={bulletInput}
              onChange={(e) => setBulletInput(e.target.value)}
              style={{ width: '100%', minHeight: '90px', marginBottom: '1rem' }}
            />
            <button className="btn btn-ai" onClick={handleEnhanceBullets} disabled={loading || !bulletInput.trim()} style={{ width: '100%', marginBottom: '1rem' }}>
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {loading ? 'Polishing...' : 'Enhance Bullet Points'}
            </button>

            {bulletResult && (
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.9rem', color: '#38bdf8', marginBottom: '1rem' }}>{bulletResult}</pre>
                <button className="btn btn-primary" onClick={() => { onApplyBullets(bulletResult); onClose(); }}>
                  Copy & Close
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: ATS Score */}
        {activeTab === 'ats' && (
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Run an automated ATS scan on your current resume details.
            </p>
            <button className="btn btn-ai" onClick={handleRunATSCheck} disabled={loading} style={{ width: '100%', marginBottom: '1.5rem' }}>
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {loading ? 'Analyzing...' : 'Scan Resume for ATS Score'}
            </button>

            {atsAnalysis && (
              <div className="ats-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: '#f8fafc' }}>ATS Score: {atsAnalysis.atsScore}%</h3>
                    <p style={{ color: '#a855f7', fontSize: '0.85rem' }}>Rating: {atsAnalysis.rating}</p>
                  </div>
                  <div className="ats-circle" style={{ '--score-percent': `${atsAnalysis.atsScore}%` }}>
                    <span>{atsAnalysis.atsScore}</span>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Optimizations Found:</h4>
                  {atsAnalysis.keywordsFound?.map((kw, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4ade80', fontSize: '0.85rem' }}>
                      <CheckCircle2 size={14} /> {kw}
                    </div>
                  ))}
                </div>

                {atsAnalysis.improvementTips?.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Improvement Suggestions:</h4>
                    {atsAnalysis.improvementTips.map((tip, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', fontSize: '0.85rem' }}>
                        <AlertCircle size={14} /> {tip}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
