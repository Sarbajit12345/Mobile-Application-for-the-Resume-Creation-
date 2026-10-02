import React from 'react';
import { Layout, Check, Sparkles, Edit3, Eye, FileText, ArrowRight } from 'lucide-react';

export default function TemplateGalleryView({ currentTemplate, onSelectTemplate, onNavigateEditor }) {
  const templates = [
    {
      id: 'executive-split',
      name: 'Executive Split Column (Target Layout)',
      description: 'Two-column executive design featuring left contact, expertise list, tech stack, and right timeline history.',
      badge: 'Executive Target',
      features: ['2-Column Executive Split', 'Side Contact & Expertise List', 'Clean Header Banner', 'Target Sarbajit Layout']
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimalist',
      description: 'Clean single-column layout with crisp typography, accent headings, and optimal white space.',
      badge: 'Popular',
      features: ['Single Column Layout', 'Minimalist Accent Lines', 'Clean Bullet Stack', 'ATS Optimized']
    },
    {
      id: 'tech-bold',
      name: 'Tech Innovator & Architect',
      description: 'Dark-accented modern layout tailored for developers, DevOps engineers, and product designers.',
      badge: 'Tech Stack',
      features: ['Tech Badges Header', 'Project Showcase Focus', 'Skills Grid', 'High Impact Layout']
    },
    {
      id: 'ats-classic',
      name: 'ATS High-Score Classic',
      description: 'Simple linear layout designed for 100% compliance with ATS resume screeners and corporate enterprise jobs.',
      badge: 'ATS 95%+',
      features: ['Sequential Section Order', 'Standard System Fonts', 'Clean Parser Hierarchy', 'Zero Parsing Friction']
    }
  ];

  const handleSelectAndEdit = (id) => {
    onSelectTemplate(id);
    if (onNavigateEditor) onNavigateEditor();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card-mobile" style={{ background: '#151d30', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Layout size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>Resume Template Gallery</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Select a layout structure — all content & MS Word formatting will update into that format instantly.</p>
            </div>
          </div>

          <span style={{ fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 700 }}>
            4 Professional Templates
          </span>
        </div>

        {/* Templates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {templates.map(tpl => {
            const isSelected = currentTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => onSelectTemplate(tpl.id)}
                style={{
                  background: isSelected ? 'rgba(99, 102, 241, 0.12)' : '#1e293b',
                  border: isSelected ? '2px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '260px'
                }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ background: isSelected ? '#6366f1' : 'rgba(236, 72, 153, 0.15)', color: isSelected ? 'white' : '#ec4899', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {tpl.badge}
                    </span>
                    {isSelected && (
                      <div style={{ background: '#10b981', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} />
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>{tpl.name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>{tpl.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {tpl.features.map((feat, fIdx) => (
                      <span key={fIdx} style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', fontSize: '0.72rem', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAndEdit(tpl.id);
                  }}
                  className={isSelected ? "btn btn-primary" : "btn btn-secondary"}
                  style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                  {isSelected ? <Check size={16} /> : <Edit3 size={16} />}
                  {isSelected ? 'Active Template • Edit in Word' : 'Select Template & Edit'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
