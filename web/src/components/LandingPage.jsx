import React from 'react';
import { Sparkles, FileText, ShieldCheck, Zap, Award, ArrowRight, CheckCircle2, Star, Download, BarChart2 } from 'lucide-react';

export default function LandingPage({ onOpenRegister, onOpenLogin }) {
  return (
    <div style={{ background: '#0f172a', color: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{
        padding: '5rem 2rem 4rem 2rem',
        textAlign: 'center',
        background: 'radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.25) 0px, transparent 60%)',
        maxWidth: '1200px', margin: '0 auto', width: '100%'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#a855f7', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <Sparkles size={16} /> Next-Gen AI Resume Engine v1.2
        </div>

        <h1 style={{ fontFamily: 'Outfit', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Build High-Impact Resumes <br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Powered by Artificial Intelligence
          </span>
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Transform plain job details into action-oriented bullet points, generate role-tailored summaries, and run real-time ATS scanners to land your dream job faster.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }} onClick={onOpenRegister}>
            Get Started Free <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }} onClick={onOpenLogin}>
            Sign In to Account
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 700 }}>Everything You Need to Win Interviews</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>Enterprise features packaged into an intuitive glassmorphic interface</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Feature 1 */}
          <div className="card-mobile" style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI Professional Summaries</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Auto-generate compelling executive summaries tailored to your target job title and key technical competencies.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card-mobile" style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Action-Verb Bullet Polish</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Rewrite plain job duties into high-impact, quantified achievement statements that grab recruiters' attention.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card-mobile" style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <BarChart2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>ATS Match & Scoring</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Analyze resume formatting, section structure, and keyword density with real-time score ratings (0-100%).
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card-mobile" style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Download size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Multi-Template PDF Export</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Choose between clean Minimalist, Executive Split, or Tech Innovator designs and download print-ready PDFs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        AI Resume Builder Application • Integrated Web, Mobile & Backend REST System
      </footer>
    </div>
  );
}
