import React, { useState } from 'react';
import { User, Briefcase, Award, Eye, Sparkles, Download, Share2, Plus, Trash2, X, Check } from 'lucide-react';

const initialMobileData = {
  personal: {
    fullName: 'Sarbajit Roy',
    title: 'Mobile & Web Developer',
    email: 'sarbajit@example.com',
    phone: '+1 555-0199',
    summary: 'Passionate developer skilled in React, React Native, and cross-platform mobile app development.'
  },
  experiences: [
    { id: '1', role: 'Mobile App Lead', company: 'AppWorks', duration: '2023 - Present', desc: 'Engineered cross-platform mobile apps with offline caching.' }
  ],
  skills: ['React Native', 'JavaScript', 'Android Studio', 'Node.js', 'UI/UX Design']
};

export default function App() {
  const [data, setData] = useState(initialMobileData);
  const [currentTab, setCurrentTab] = useState('profile');
  const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handlePersonalUpdate = (field, val) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: val } }));
  };

  const handleAddExperience = () => {
    setData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now().toString(), role: '', company: '', duration: '', desc: '' }
      ]
    }));
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill('');
  };

  const triggerMobileAI = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: data.personal.title || 'Developer',
          skills: data.skills,
          experienceLevel: 'Mid-Level'
        })
      });
      const resData = await res.json();
      setAiOutput(resData.summary);
    } catch (err) {
      setAiOutput(`Results-driven ${data.personal.title || 'Developer'} specialized in ${data.skills.join(', ')}. Expert in designing touch-friendly UI and modern scalable apps.`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="mobile-device-frame">
      {/* Mobile Top Bar */}
      <header className="mobile-header">
        <div className="mobile-title">📄 Resume Craft Mobile</div>
        <button
          onClick={() => window.print()}
          style={{ background: '#334155', border: 'none', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Download size={14} /> PDF
        </button>
      </header>

      {/* Screen Content */}
      <main className="mobile-content">
        {/* Profile Tab */}
        {currentTab === 'profile' && (
          <div className="card-mobile">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#a855f7' }}>Personal Details</h3>
            <div className="m-input-group">
              <span className="m-label">Full Name</span>
              <input className="m-input" value={data.personal.fullName} onChange={e => handlePersonalUpdate('fullName', e.target.value)} />
            </div>
            <div className="m-input-group">
              <span className="m-label">Professional Title</span>
              <input className="m-input" value={data.personal.title} onChange={e => handlePersonalUpdate('title', e.target.value)} />
            </div>
            <div className="m-input-group">
              <span className="m-label">Email</span>
              <input className="m-input" value={data.personal.email} onChange={e => handlePersonalUpdate('email', e.target.value)} />
            </div>
            <div className="m-input-group">
              <span className="m-label">Phone</span>
              <input className="m-input" value={data.personal.phone} onChange={e => handlePersonalUpdate('phone', e.target.value)} />
            </div>
            <div className="m-input-group">
              <span className="m-label">Summary</span>
              <textarea className="m-textarea" value={data.personal.summary} onChange={e => handlePersonalUpdate('summary', e.target.value)} />
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {currentTab === 'experience' && (
          <div>
            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="card-mobile" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#a855f7', fontWeight: 'bold' }}>Job #{idx + 1}</span>
                </div>
                <div className="m-input-group">
                  <span className="m-label">Role Title</span>
                  <input className="m-input" value={exp.role} onChange={e => {
                    const updated = data.experiences.map(x => x.id === exp.id ? { ...x, role: e.target.value } : x);
                    setData(prev => ({ ...prev, experiences: updated }));
                  }} />
                </div>
                <div className="m-input-group">
                  <span className="m-label">Company</span>
                  <input className="m-input" value={exp.company} onChange={e => {
                    const updated = data.experiences.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x);
                    setData(prev => ({ ...prev, experiences: updated }));
                  }} />
                </div>
              </div>
            ))}
            <button onClick={handleAddExperience} style={{ width: '100%', background: 'rgba(255,255,255,0.08)', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '10px', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}

        {/* Skills Tab */}
        {currentTab === 'skills' && (
          <div className="card-mobile">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#a855f7' }}>Skills</h3>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input className="m-input" placeholder="Add Skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)} />
              <button onClick={handleAddSkill} style={{ background: '#a855f7', border: 'none', color: 'white', padding: '0.8rem 1.2rem', borderRadius: '10px' }}>
                <Plus size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {data.skills.map((s, i) => (
                <span key={i} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Preview Tab */}
        {currentTab === 'preview' && (
          <div style={{ background: 'white', color: '#0f172a', padding: '1.5rem', borderRadius: '12px', minHeight: '400px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{data.personal.fullName}</h2>
            <p style={{ color: '#6366f1', fontWeight: '600', fontSize: '0.9rem' }}>{data.personal.title}</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>{data.personal.email} • {data.personal.phone}</p>

            <div style={{ marginTop: '1.2rem' }}>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: '#4f46e5', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.2rem' }}>Summary</h4>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, marginTop: '0.4rem' }}>{data.personal.summary}</p>
            </div>

            <div style={{ marginTop: '1.2rem' }}>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: '#4f46e5', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.2rem' }}>Experience</h4>
              {data.experiences.map((e, i) => (
                <div key={i} style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{e.role}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{e.company}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) for AI */}
      <button className="fab-ai" onClick={() => { setIsAiSheetOpen(true); triggerMobileAI(); }}>
        <Sparkles size={24} />
      </button>

      {/* Bottom Action Sheet for AI */}
      {isAiSheetOpen && (
        <div className="action-sheet">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a855f7', fontWeight: 'bold' }}>
              <Sparkles size={18} /> Mobile AI Generator
            </div>
            <button onClick={() => setIsAiSheetOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8' }}>
              <X size={18} />
            </button>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            {aiLoading ? 'AI is crafting your summary...' : 'Suggested AI Professional Summary:'}
          </p>

          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
            {aiOutput || 'Tap generate to create summary.'}
          </div>

          {aiOutput && (
            <button onClick={() => { handlePersonalUpdate('summary', aiOutput); setIsAiSheetOpen(false); }} style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none', color: 'white', padding: '0.8rem', borderRadius: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <Check size={18} /> Apply to Resume
            </button>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`} onClick={() => setCurrentTab('profile')}>
          <User size={18} /> Profile
        </button>
        <button className={`nav-item ${currentTab === 'experience' ? 'active' : ''}`} onClick={() => setCurrentTab('experience')}>
          <Briefcase size={18} /> Experience
        </button>
        <button className={`nav-item ${currentTab === 'skills' ? 'active' : ''}`} onClick={() => setCurrentTab('skills')}>
          <Award size={18} /> Skills
        </button>
        <button className={`nav-item ${currentTab === 'preview' ? 'active' : ''}`} onClick={() => setCurrentTab('preview')}>
          <Eye size={18} /> Preview
        </button>
      </nav>
    </div>
  );
}
