import React from 'react';
import ExecutiveSplitTemplate from './ExecutiveSplitTemplate';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export default function ResumePreview({ resumeData, templateId = 'executive-split' }) {
  // Use executive-split layout if specified or default
  if (templateId === 'executive-split' || templateId === 'modern-minimal') {
    return <ExecutiveSplitTemplate resumeData={resumeData} />;
  }

  const { personalDetails = {}, experiences = [], education = [], skills = [], projects = [] } = resumeData;

  return (
    <div className={`resume-paper template-${templateId}`} id="resume-preview-document">
      {/* Header */}
      <div className="resume-header">
        <h1 className="resume-name">{personalDetails.fullName || 'SARBAJIT BEHERA'}</h1>
        <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '1rem', marginTop: '0.2rem' }}>
          {personalDetails.designation || personalDetails.jobTitle || 'Professional Title'}
        </p>
        
        <div className="resume-contact">
          {personalDetails.email && <span><Mail size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.email}</span>}
          {personalDetails.phone && <span><Phone size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.phone}</span>}
          {personalDetails.location && <span><MapPin size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.location}</span>}
          {personalDetails.linkedin && <span><Linkedin size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails.summary && (
        <div>
          <h2 className="resume-section-title">Summary</h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
            {personalDetails.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div>
          <h2 className="resume-section-title">Professional Experience</h2>
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="resume-item">
              <div className="resume-item-header">
                <span>{exp.role || exp.position || 'Position Title'}</span>
                <span>{exp.dates}</span>
              </div>
              <div className="resume-item-sub">{exp.company}</div>
              {exp.keyContributions && (
                <ul className="resume-bullets">
                  {exp.keyContributions.map((kc, i) => <li key={i}>{kc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
