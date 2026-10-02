import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function ResumePreview({ resumeData, templateId }) {
  const { personalDetails = {}, experiences = [], education = [], skills = [], projects = [] } = resumeData;

  return (
    <div className={`resume-paper template-${templateId}`} id="resume-preview-document">
      {/* Header */}
      <div className="resume-header">
        <h1 className="resume-name">{personalDetails.fullName || 'Your Full Name'}</h1>
        <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '1rem', marginTop: '0.2rem' }}>
          {personalDetails.jobTitle || 'Professional Title'}
        </p>
        
        <div className="resume-contact">
          {personalDetails.email && <span><Mail size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.email}</span>}
          {personalDetails.phone && <span><Phone size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.phone}</span>}
          {personalDetails.location && <span><MapPin size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.location}</span>}
          {personalDetails.website && <span><Globe size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.website}</span>}
          {personalDetails.linkedin && <span><Linkedin size={13} style={{ inlineSize: '13px', verticalAlign: 'middle', marginRight: 4 }} />{personalDetails.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails.summary && (
        <div>
          <h2 className="resume-section-title">Professional Summary</h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#334155' }}>
            {personalDetails.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div>
          <h2 className="resume-section-title">Work Experience</h2>
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="resume-item">
              <div className="resume-item-header">
                <span>{exp.position || 'Position Title'}</span>
                <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className="resume-item-sub">{exp.company}</div>
              {exp.description && (
                <div className="resume-bullets" style={{ whiteSpace: 'pre-line' }}>
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="resume-section-title">Education</h2>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="resume-item">
              <div className="resume-item-header">
                <span>{edu.degree} in {edu.fieldOfStudy}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="resume-item-sub">{edu.institution} {edu.grade && `• Grade: ${edu.grade}`}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="resume-section-title">Skills & Competencies</h2>
          <div className="skills-badge-container">
            {skills.map((skill, idx) => (
              <span key={idx} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="resume-section-title">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} className="resume-item">
              <div className="resume-item-header">
                <span>{proj.name}</span>
                {proj.link && <span style={{ fontSize: '0.8rem', color: '#6366f1' }}>{proj.link}</span>}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginTop: '0.2rem' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
