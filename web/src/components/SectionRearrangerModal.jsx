import React, { useState } from 'react';
import {
  ArrowUp, ArrowDown, Move, Eye, EyeOff, Trash2, RotateCcw, Sparkles,
  Layers, CheckCircle, GripVertical, FileText, LayoutGrid, Zap
} from 'lucide-react';

export default function SectionRearrangerModal({
  isOpen,
  onClose,
  sectionOrder,
  onUpdateSectionOrder,
  customSections = [],
  onApplyPreset
}) {
  if (!isOpen) return null;

  // Standard core sections + custom sections
  const defaultSections = [
    { id: 'summary', name: 'Executive Summary', category: 'main', icon: '📝' },
    { id: 'expertise', name: 'Core Expertise Badges', category: 'sidebar', icon: '⚡' },
    { id: 'categorizedSkills', name: 'Categorized Skills', category: 'sidebar', icon: '🧠' },
    { id: 'toolsAndTech', name: 'Tools & Technologies', category: 'sidebar', icon: '🛠️' },
    { id: 'technicalExposure', name: 'Technical Exposure', category: 'sidebar', icon: '💻' },
    { id: 'experiences', name: 'Professional Work Experience', category: 'main', icon: '💼' },
    { id: 'projects', name: 'Key Projects & Implementations', category: 'main', icon: '🚀' },
    { id: 'keyAchievements', name: 'Key Achievements', category: 'sidebar', icon: '🏆' },
    { id: 'education', name: 'Education & Degrees', category: 'sidebar', icon: '🎓' },
    ...customSections.map(c => ({
      id: c.id,
      name: `✨ ${c.heading}`,
      category: 'custom',
      icon: '✨'
    }))
  ];

  // Current active list state
  const activeOrder = sectionOrder && sectionOrder.length > 0
    ? sectionOrder
    : defaultSections.map(s => ({ ...s, visible: true }));

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...activeOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    onUpdateSectionOrder(newOrder);
  };

  const handleMoveDown = (index) => {
    if (index === activeOrder.length - 1) return;
    const newOrder = [...activeOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    onUpdateSectionOrder(newOrder);
  };

  const handleMoveTop = (index) => {
    if (index === 0) return;
    const item = activeOrder[index];
    const remaining = activeOrder.filter((_, i) => i !== index);
    onUpdateSectionOrder([item, ...remaining]);
  };

  const handleMoveBottom = (index) => {
    if (index === activeOrder.length - 1) return;
    const item = activeOrder[index];
    const remaining = activeOrder.filter((_, i) => i !== index);
    onUpdateSectionOrder([...remaining, item]);
  };

  const handleToggleVisibility = (index) => {
    const newOrder = activeOrder.map((sec, i) =>
      i === index ? { ...sec, visible: sec.visible === false } : sec
    );
    onUpdateSectionOrder(newOrder);
  };

  const handleResetDefault = () => {
    onUpdateSectionOrder(defaultSections.map(s => ({ ...s, visible: true })));
  };

  // Smart Format Suggestions Presets
  const presets = [
    {
      id: 'executive',
      title: 'Executive & Management (Default Target)',
      desc: 'Optimized for Product Managers, ERP Specialists & Leaders. Prioritizes Executive Summary, Core Expertise, and Work Experience.',
      orderIds: ['summary', 'expertise', 'experiences', 'projects', 'toolsAndTech', 'categorizedSkills', 'keyAchievements', 'education']
    },
    {
      id: 'technical',
      title: 'Technical & Software Developer Format',
      desc: 'Highlights Tools & Tech Stack first, followed by Engineering Projects and Work Experience.',
      orderIds: ['summary', 'toolsAndTech', 'technicalExposure', 'projects', 'experiences', 'expertise', 'categorizedSkills', 'education']
    },
    {
      id: 'ats',
      title: 'ATS High-Score Standard Format',
      desc: 'Strictly sequential format optimized for maximum ATS parsing accuracy.',
      orderIds: ['summary', 'experiences', 'projects', 'expertise', 'toolsAndTech', 'categorizedSkills', 'education', 'keyAchievements']
    },
    {
      id: 'academic',
      title: 'Graduate & Career Transition Format',
      desc: 'Puts Education and Projects at the top, followed by Skills and Work Experience.',
      orderIds: ['summary', 'education', 'projects', 'toolsAndTech', 'expertise', 'experiences', 'categorizedSkills', 'keyAchievements']
    }
  ];

  const applyPresetLayout = (preset) => {
    const presetMap = new Map();
    activeOrder.forEach(sec => presetMap.set(sec.id, sec));

    const reordered = [];
    preset.orderIds.forEach(id => {
      if (presetMap.has(id)) {
        reordered.push({ ...presetMap.get(id), visible: true });
        presetMap.delete(id);
      }
    });

    // Add remaining custom or unlisted sections
    presetMap.forEach(sec => reordered.push({ ...sec, visible: true }));
    onUpdateSectionOrder(reordered);
    if (onApplyPreset) onApplyPreset(preset.id);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#090d16', backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200, padding: '1.5rem'
    }}>
      <div style={{
        background: '#151d30', border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '16px', width: '100%', maxWidth: '850px', maxHeight: '90vh',
        overflowY: 'auto', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
        color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '1.5rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={22} style={{ color: '#818cf8' }} /> Section Order & Rearrange Manager
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Drag, move top/bottom, or re-order headings. All changes auto-adjust the live resume layout & PDF download.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', padding: '0.5rem 0.9rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
            Done / Close
          </button>
        </div>

        {/* SMART FORMAT SUGGESTIONS SECTION */}
        <div style={{ background: '#0f172a', border: '1px dashed rgba(168, 85, 247, 0.4)', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#c084fc', fontWeight: 800, fontSize: '0.95rem' }}>
            <Sparkles size={18} /> SMART FORMAT SUGGESTIONS (AUTO-ARRANGE)
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '1rem' }}>
            Select any optimal format suggestion below to automatically arrange all headings and content into an ATS-friendly layout:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '0.75rem' }}>
            {presets.map(p => (
              <div
                key={p.id}
                onClick={() => applyPresetLayout(p)}
                style={{
                  background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
                  padding: '0.85rem', cursor: 'pointer', transition: 'all 0.2s ease'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#a855f7'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', marginBottom: '0.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{p.title}</span>
                  <Zap size={13} style={{ color: '#a855f7' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DRAG & REARRANGE LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.05em' }}>
              CUSTOM REARRANGE HEADINGS ({activeOrder.length} SECTIONS)
            </span>

            <button
              onClick={handleResetDefault}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <RotateCcw size={13} /> Reset Default
            </button>
          </div>

          {activeOrder.map((sec, idx) => {
            const isVisible = sec.visible !== false;
            return (
              <div
                key={sec.id || idx}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: isVisible ? '#1e293b' : 'rgba(15, 23, 42, 0.6)',
                  border: isVisible ? '1px solid rgba(255, 255, 255, 0.12)' : '1px dashed rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px', padding: '0.75rem 1rem', opacity: isVisible ? 1 : 0.55
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: '#64748b', cursor: 'grab' }}>
                    <GripVertical size={16} />
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#818cf8', width: '22px' }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isVisible ? 'white' : '#94a3b8' }}>
                    {sec.icon || '📌'} {sec.name}
                  </span>
                </div>

                {/* Move & Action Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {/* Top */}
                  <button
                    onClick={() => handleMoveTop(idx)}
                    disabled={idx === 0}
                    title="Move to Top"
                    style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: idx === 0 ? '#475569' : '#38bdf8', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === 0 ? 'default' : 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                    Top
                  </button>

                  {/* Up */}
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    title="Move Up"
                    style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: idx === 0 ? '#475569' : 'white', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === 0 ? 'default' : 'pointer' }}>
                    <ArrowUp size={14} />
                  </button>

                  {/* Down */}
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === activeOrder.length - 1}
                    title="Move Down"
                    style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: idx === activeOrder.length - 1 ? '#475569' : 'white', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === activeOrder.length - 1 ? 'default' : 'pointer' }}>
                    <ArrowDown size={14} />
                  </button>

                  {/* Bottom */}
                  <button
                    onClick={() => handleMoveBottom(idx)}
                    disabled={idx === activeOrder.length - 1}
                    title="Move to Bottom"
                    style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: idx === activeOrder.length - 1 ? '#475569' : '#38bdf8', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: idx === activeOrder.length - 1 ? 'default' : 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
                    Bottom
                  </button>

                  <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)', margin: '0 0.2rem' }} />

                  {/* Hide / Show */}
                  <button
                    onClick={() => handleToggleVisibility(idx)}
                    title={isVisible ? "Hide Section" : "Show Section"}
                    style={{ background: isVisible ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: 'none', color: isVisible ? '#10b981' : '#ef4444', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    {isVisible ? <Eye size={13} /> : <EyeOff size={13} />} {isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
