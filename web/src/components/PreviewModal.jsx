import React, { useState } from 'react';
import { Download, Printer, X, ZoomIn, ZoomOut, RotateCcw, FileText, CheckCircle } from 'lucide-react';
import ResumePreview from './ResumePreview';

export default function PreviewModal({ isOpen, onClose, resumeData, templateId, onSelectTemplate }) {
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#090d16', // 100% Solid Opaque Background so zero elements bleed through
      display: 'flex', flexDirection: 'column', zIndex: 999999, overflow: 'hidden'
    }}>
      {/* Top Modal Controls Header Bar */}
      <header style={{
        height: '68px', background: '#0f172a', borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem',
        boxShadow: '0 6px 24px rgba(0,0,0,0.6)', flexShrink: 0
      }}>
        {/* Left Info Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <FileText size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Document Live Preview <CheckCircle size={15} style={{ color: '#10b981' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Standard A4 Executive Format • 1 Page Print-Ready
            </div>
          </div>
        </div>

        {/* Zoom & Action Controls */}
        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          {/* Zoom Controller */}
          <div style={{
            display: 'flex', alignItems: 'center', background: '#1e293b', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px', padding: '0.2rem 0.4rem', gap: '0.3rem'
          }}>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '0.3rem', borderRadius: '4px' }}>
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', minWidth: '45px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '0.3rem', borderRadius: '4px' }}>
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom"
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.3rem', borderRadius: '4px' }}>
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Template Switcher */}
          <select
            value={templateId}
            onChange={e => onSelectTemplate && onSelectTemplate(e.target.value)}
            style={{
              background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', color: 'white',
              padding: '0.45rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600
            }}>
            <option value="executive-split">Executive Split Layout (Sarbajit Target)</option>
            <option value="modern-minimal">Modern Minimalist Layout</option>
          </select>

          {/* Print Button */}
          <button
            className="btn btn-secondary"
            onClick={() => window.print()}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <Printer size={16} /> Print
          </button>

          {/* PDF Download Button */}
          <button
            className="btn btn-primary"
            onClick={() => window.print()}
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>
            <Download size={16} /> Download PDF
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            title="Close Preview"
            style={{
              background: 'rgba(239, 68, 68, 0.18)', border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', marginLeft: '0.3rem'
            }}>
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Document View Canvas */}
      <main style={{
        flex: 1, overflowY: 'auto', padding: '2.5rem 1.5rem', display: 'flex',
        justify: 'center', background: '#0f172a'
      }}>
        <div style={{
          transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center',
          transition: 'transform 0.2s ease-out', maxWidth: '850px', width: '100%',
          marginBottom: zoomLevel > 100 ? `${(zoomLevel - 100) * 8}px` : '0px'
        }}>
          <ResumePreview resumeData={resumeData} templateId={templateId} />
        </div>
      </main>
    </div>
  );
}
