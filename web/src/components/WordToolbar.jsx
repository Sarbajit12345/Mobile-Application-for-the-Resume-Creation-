import React, { useState } from 'react';
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Sparkles,
  Type, Palette, ChevronDown, RefreshCw, Zap
} from 'lucide-react';

export default function WordToolbar({ onAction, onAiPolish, fieldName }) {
  const [fontFamily, setFontFamily] = useState('Calibri');
  const [fontSize, setFontSize] = useState('11pt');
  const [textColor, setTextColor] = useState('#1e3a8a');
  const [showVerbs, setShowVerbs] = useState(false);

  const actionVerbs = [
    'Spearheaded', 'Architected', 'Engineered', 'Optimized',
    'Delivered', 'Managed', 'Mentored', 'Automated', 'Pioneered', 'Formulated'
  ];

  const handleAction = (type, val = null) => {
    if (onAction) {
      onAction(type, val);
    }
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap',
      background: '#090d16', border: '1px solid rgba(255, 255, 255, 0.15)',
      borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '0.45rem 0.75rem',
      marginBottom: '-1px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      {/* Ribbon Header Badge */}
      <span style={{
        fontSize: '0.7rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.08em',
        background: 'rgba(56, 189, 248, 0.12)', padding: '0.2rem 0.55rem', borderRadius: '4px',
        marginRight: '0.3rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem'
      }}>
        <Zap size={11} /> MS WORD RIBBON
      </span>

      {/* Font Family Selector */}
      <select
        value={fontFamily}
        onChange={(e) => {
          setFontFamily(e.target.value);
          handleAction('font-family', e.target.value);
        }}
        title="Font Family"
        style={{
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', color: 'white',
          fontSize: '0.75rem', padding: '0.2rem 0.4rem', borderRadius: '4px', cursor: 'pointer'
        }}>
        <option value="Calibri">Calibri</option>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Inter">Inter</option>
      </select>

      {/* Font Size Selector */}
      <select
        value={fontSize}
        onChange={(e) => {
          setFontSize(e.target.value);
          handleAction('font-size', e.target.value);
        }}
        title="Font Size"
        style={{
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', color: 'white',
          fontSize: '0.75rem', padding: '0.2rem 0.4rem', borderRadius: '4px', cursor: 'pointer'
        }}>
        <option value="10pt">10pt</option>
        <option value="11pt">11pt</option>
        <option value="12pt">12pt</option>
        <option value="14pt">14pt</option>
        <option value="16pt">16pt</option>
      </select>

      <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.18)', margin: '0 0.15rem' }} />

      {/* Bold */}
      <button
        type="button"
        title="Bold (Ctrl+B)"
        onClick={() => handleAction('bold')}
        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#f8fafc', cursor: 'pointer', padding: '0.25rem 0.4rem', borderRadius: '4px' }}>
        <Bold size={14} />
      </button>

      {/* Italic */}
      <button
        type="button"
        title="Italic (Ctrl+I)"
        onClick={() => handleAction('italic')}
        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#f8fafc', cursor: 'pointer', padding: '0.25rem 0.4rem', borderRadius: '4px' }}>
        <Italic size={14} />
      </button>

      {/* Underline */}
      <button
        type="button"
        title="Underline (Ctrl+U)"
        onClick={() => handleAction('underline')}
        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#f8fafc', cursor: 'pointer', padding: '0.25rem 0.4rem', borderRadius: '4px' }}>
        <Underline size={14} />
      </button>

      {/* Strikethrough */}
      <button
        type="button"
        title="Strikethrough"
        onClick={() => handleAction('strikethrough')}
        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#f8fafc', cursor: 'pointer', padding: '0.25rem 0.4rem', borderRadius: '4px' }}>
        <Strikethrough size={14} />
      </button>

      <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.18)', margin: '0 0.15rem' }} />

      {/* Bullet List */}
      <button
        type="button"
        title="Add Bullet Points"
        onClick={() => handleAction('bullet')}
        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#f8fafc', cursor: 'pointer', padding: '0.25rem 0.4rem', borderRadius: '4px' }}>
        <List size={14} />
      </button>

      {/* Numbered List */}
      <button
        type="button"
        title="Add Numbered List"
        onClick={() => handleAction('number')}
        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#f8fafc', cursor: 'pointer', padding: '0.25rem 0.4rem', borderRadius: '4px' }}>
        <ListOrdered size={14} />
      </button>

      <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.18)', margin: '0 0.15rem' }} />

      {/* Text Case Converter Dropdown */}
      <select
        onChange={(e) => handleAction('case', e.target.value)}
        title="Change Text Case"
        defaultValue=""
        style={{
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', color: 'white',
          fontSize: '0.75rem', padding: '0.2rem 0.4rem', borderRadius: '4px', cursor: 'pointer'
        }}>
        <option value="" disabled>Aa Case</option>
        <option value="uppercase">UPPERCASE</option>
        <option value="lowercase">lowercase</option>
        <option value="titlecase">Title Case</option>
      </select>

      {/* Action Verbs Menu */}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setShowVerbs(!showVerbs)}
          style={{
            background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#818cf8', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.5rem',
            borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem'
          }}>
          + Verb <ChevronDown size={11} />
        </button>

        {showVerbs && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: '#0f172a',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0.3rem',
            display: 'flex', flexDirection: 'column', gap: '0.2rem', zIndex: 100, minWidth: '130px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            {actionVerbs.map(verb => (
              <button
                key={verb}
                type="button"
                onClick={() => {
                  handleAction('insert-verb', verb);
                  setShowVerbs(false);
                }}
                style={{
                  background: 'transparent', border: 'none', color: '#e2e8f0', textAlign: 'left',
                  fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.target.style.background = 'transparent'}>
                {verb}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AI Polish Button */}
      {onAiPolish && (
        <button
          type="button"
          onClick={onAiPolish}
          style={{
            marginLeft: 'auto', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            border: 'none', color: 'white', padding: '0.25rem 0.65rem', borderRadius: '6px',
            fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex',
            alignItems: 'center', gap: '0.3rem', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
          }}>
          <Sparkles size={12} /> AI Sentence Polish
        </button>
      )}
    </div>
  );
}
