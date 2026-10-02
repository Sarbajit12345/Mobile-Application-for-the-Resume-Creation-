import React, { useState } from 'react';
import { Plus, X, AlignLeft, AlignCenter, AlignRight, Type, List, AlignJustify, Palette } from 'lucide-react';

export default function AddHeadingModal({ isOpen, onClose, onAddSection }) {
  const [heading, setHeading] = useState('');
  const [format, setFormat] = useState('bullets'); // 'paragraph' or 'bullets'
  const [paragraphText, setParagraphText] = useState('');
  const [bullets, setBullets] = useState(['']);
  const [alignment, setAlignment] = useState('left');
  const [fontColor, setFontColor] = useState('#1e3a8a');

  if (!isOpen) return null;

  const handleAddBullet = () => {
    setBullets([...bullets, '']);
  };

  const handleUpdateBullet = (idx, val) => {
    const updated = bullets.map((b, i) => i === idx ? val : b);
    setBullets(updated);
  };

  const handleRemoveBullet = (idx) => {
    setBullets(bullets.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!heading.trim()) return;

    const newSection = {
      id: `sec_${Date.now()}`,
      heading: heading.trim().toUpperCase(),
      format,
      paragraphText: paragraphText.trim(),
      bullets: bullets.filter(b => b.trim().length > 0),
      alignment,
      fontColor,
      fontSize: '0.85rem'
    };

    onAddSection(newSection);
    // Reset
    setHeading('');
    setFormat('bullets');
    setParagraphText('');
    setBullets(['']);
    onClose();
  };

  const colorOptions = [
    { label: 'Navy Blue', value: '#1e3a8a' },
    { label: 'Classic Black', value: '#0f172a' },
    { label: 'Dark Indigo', value: '#4f46e5' },
    { label: 'Emerald Green', value: '#059669' },
    { label: 'Crimson', value: '#dc2626' }
  ];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem'
    }}>
      <div style={{
        background: '#1e293b', border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh',
        overflowY: 'auto', padding: '1.75rem', boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        color: '#f8fafc', position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', fontWeight: 700 }}>
            <Plus size={20} /> Add Custom Section & Heading
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Heading Name */}
          <div className="form-group">
            <label>Heading Name / Title</label>
            <input
              placeholder="e.g. CERTIFICATIONS, LANGUAGES, VOLUNTEER WORK..."
              value={heading}
              onChange={e => setHeading(e.target.value)}
              required
            />
          </div>

          {/* Format Selector: Paragraph vs Bullet Points */}
          <div className="form-group">
            <label>Content Display Format</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
              <button
                type="button"
                onClick={() => setFormat('paragraph')}
                style={{
                  flex: 1, padding: '0.6rem', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  background: format === 'paragraph' ? '#6366f1' : '#0f172a',
                  color: format === 'paragraph' ? 'white' : '#94a3b8',
                  fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                }}>
                <Type size={16} /> Paragraph Format
              </button>
              <button
                type="button"
                onClick={() => setFormat('bullets')}
                style={{
                  flex: 1, padding: '0.6rem', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  background: format === 'bullets' ? '#6366f1' : '#0f172a',
                  color: format === 'bullets' ? 'white' : '#94a3b8',
                  fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                }}>
                <List size={16} /> Bullet Points Format
              </button>
            </div>
          </div>

          {/* Content Inputs based on format */}
          {format === 'paragraph' ? (
            <div className="form-group">
              <label>Paragraph Details</label>
              <textarea
                rows={5}
                placeholder="Write formatted paragraph details for this section..."
                value={paragraphText}
                onChange={e => setParagraphText(e.target.value)}
              />
            </div>
          ) : (
            <div className="form-group">
              <label>Bullet Points List</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {bullets.map((b, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      placeholder={`Bullet point #${idx + 1}...`}
                      value={b}
                      onChange={e => handleUpdateBullet(idx, e.target.value)}
                      style={{ flex: 1 }}
                    />
                    {bullets.length > 1 && (
                      <button type="button" onClick={() => handleRemoveBullet(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddBullet} style={{ marginTop: '0.3rem', padding: '0.4rem' }}>
                  <Plus size={14} /> Add Bullet Point
                </button>
              </div>
            </div>
          )}

          {/* Section Alignment & Font Color */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Text Alignment</label>
              <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.3rem' }}>
                <button
                  type="button"
                  onClick={() => setAlignment('left')}
                  style={{ flex: 1, padding: '0.5rem', background: alignment === 'left' ? '#6366f1' : '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  <AlignLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setAlignment('center')}
                  style={{ flex: 1, padding: '0.5rem', background: alignment === 'center' ? '#6366f1' : '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  <AlignCenter size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setAlignment('right')}
                  style={{ flex: 1, padding: '0.5rem', background: alignment === 'right' ? '#6366f1' : '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  <AlignRight size={16} />
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Heading Font Color</label>
              <select value={fontColor} onChange={e => setFontColor(e.target.value)}>
                {colorOptions.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.8rem' }}>
            <Plus size={16} /> Create Custom Section
          </button>
        </form>
      </div>
    </div>
  );
}
