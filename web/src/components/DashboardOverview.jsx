import React from 'react';
import { Plus, FileText, Sparkles, BarChart2, ShieldCheck, Download, Edit3, Eye, ArrowRight, TrendingUp } from 'lucide-react';

export default function DashboardOverview({ currentUser, onNavigate, onEditResume }) {
  const recentResumes = [
    {
      id: 'res_1',
      title: 'Senior Full Stack Engineer Resume',
      updatedAt: 'Just now',
      template: 'Modern Minimalist',
      atsScore: 88,
      status: 'Ready'
    },
    {
      id: 'res_2',
      title: 'Lead Software Architect Resume',
      updatedAt: '2 days ago',
      template: 'Executive Split',
      atsScore: 92,
      status: 'Ready'
    },
    {
      id: 'res_3',
      title: 'DevOps & Cloud Engineer Resume',
      updatedAt: '5 days ago',
      template: 'Tech Innovator',
      atsScore: 81,
      status: 'Draft'
    }
  ];

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '16px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#a855f7', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <Sparkles size={16} /> AI Resume Dashboard
          </div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 700, color: 'white' }}>
            Welcome back, {currentUser?.fullName || 'Sarbajit Roy'}!
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '0.3rem' }}>
            You have 3 active resumes. Your top resume has an ATS Compliance Score of 92%.
          </p>
        </div>

        <button className="btn btn-primary" style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem' }} onClick={() => onNavigate('editor')}>
          <Plus size={18} /> Create New Resume
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>TOTAL RESUMES</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>3</h3>
          <span style={{ color: '#4ade80', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.25rem' }}>
            <TrendingUp size={12} /> Active documents
          </span>
        </div>

        <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>AVG ATS SCORE</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>88%</h3>
          <span style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '0.25rem' }}>Excellent Rating</span>
        </div>

        <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>AI GENERATIONS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>14</h3>
          <span style={{ color: '#a855f7', fontSize: '0.8rem', marginTop: '0.25rem' }}>Summaries & Bullets</span>
        </div>

        <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>ACCOUNT STATUS</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>Verified</h3>
          <span style={{ color: '#4ade80', fontSize: '0.8rem', marginTop: '0.25rem' }}>Role: {currentUser?.role || 'ADMIN'}</span>
        </div>
      </div>

      {/* Resumes Grid / List */}
      <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '16px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>My Resumes</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Manage, edit, and preview your created resume documents</p>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => onNavigate('editor')}>
            <Plus size={14} /> Create Resume
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentResumes.map(res => (
            <div
              key={res.id}
              style={{
                background: '#1e293b', border: '1px solid var(--bg-card-border)',
                borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{res.title}</h3>
                  <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    <span>Template: {res.template}</span>
                    <span>•</span>
                    <span>Updated: {res.updatedAt}</span>
                    <span>•</span>
                    <span style={{ color: '#4ade80', fontWeight: 600 }}>ATS: {res.atsScore}%</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => onNavigate('editor')}>
                  <Edit3 size={14} /> Edit & Preview
                </button>
                <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => window.print()}>
                  <Download size={14} /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
