import React from 'react';
import { Layout, Check, Sparkles } from 'lucide-react';

export default function TemplateGalleryView({ currentTemplate, onSelectTemplate }) {
  const templates = [
    {
      id: 'modern-minimal',
      name: 'Modern Minimalist',
      description: 'Clean single-column layout with crisp typography, purple accent headings, and optimal white space.',
      badge: 'Popular'
    },
    {
      id: 'executive-split',
      name: 'Executive Split Column',
      description: 'Two-column corporate design featuring side contact details, skills column, and timeline history.',
      badge: 'Corporate'
    },
    {
      id: 'tech-bold',
      name: 'Tech Innovator',
      description: 'Dark-accented modern layout tailored for developers, DevOps engineers, and product designers.',
      badge: 'Tech'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '16px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '1rem' }}>
          <Layout size={26} style={{ color: '#ec4899' }} />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white' }}>Resume Template Gallery</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Select a layout structure for your live document preview & PDF exports</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {templates.map(tpl => {
            const isSelected = currentTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => onSelectTemplate(tpl.id)}
                style={{
                  background: isSelected ? 'rgba(99, 102, 241, 0.15)' : '#1e293b',
                  border: isSelected ? '2px solid #6366f1' : '1px solid var(--bg-card-border)',
                  borderRadius: '14px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s ease',
                  position: 'relative'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {tpl.badge}
                  </span>
                  {isSelected && (
                    <div style={{ background: '#6366f1', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} />
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{tpl.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{tpl.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
