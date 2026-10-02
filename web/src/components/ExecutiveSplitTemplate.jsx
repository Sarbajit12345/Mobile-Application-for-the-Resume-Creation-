import React from 'react';
import { MapPin, Phone, Mail, Globe, Linkedin, Award, Briefcase, GraduationCap, Wrench, Rocket, CheckCircle2 } from 'lucide-react';

export default function ExecutiveSplitTemplate({ resumeData }) {
  const {
    personalDetails = {},
    expertise = [],
    categorizedSkills = [],
    toolsAndTech = [],
    technicalExposure = [],
    keyAchievements = [],
    experiences = [],
    projects = [],
    education = [],
    customSections = []
  } = resumeData;

  const headerAlign = personalDetails.alignment || 'center';
  const nameColor = personalDetails.nameColor || '#1e3a8a';

  return (
    <div className="resume-paper template-executive-split" id="resume-preview-document" style={{
      background: 'white', color: '#1e293b', padding: '2.5rem', borderRadius: '4px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)', fontFamily: "'Inter', sans-serif",
      minHeight: '1100px', display: 'flex', flexDirection: 'column', gap: '1.5rem'
    }}>
      {/* Header Banner */}
      <div style={{ textAlign: headerAlign, borderBottom: `2px solid ${nameColor}`, paddingBottom: '1rem' }}>
        <h1 style={{
          fontFamily: "'Outfit', 'Times New Roman', serif", fontSize: '2.4rem', fontWeight: 800,
          letterSpacing: '0.08em', color: nameColor, textTransform: 'uppercase', margin: 0
        }}>
          {personalDetails.fullName || 'SARBAJIT BEHERA'}
        </h1>
        <p style={{
          fontSize: '1rem', fontWeight: 600, color: nameColor, letterSpacing: '0.05em',
          marginTop: '0.4rem', textTransform: 'none'
        }}>
          {personalDetails.designation || personalDetails.jobTitle || 'Product Manager | ERP Specialist | Business Analyst | Agile & Digital Transformation'}
        </p>
      </div>

      {/* Main 2-Column Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '32% 65%', gap: '3%', width: '100%' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Contact Details with Icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: '#334155' }}>
            {personalDetails.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: nameColor, flexShrink: 0 }} />
                <span>{personalDetails.location}</span>
              </div>
            )}
            {personalDetails.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: nameColor, flexShrink: 0 }} />
                <span>{personalDetails.phone}</span>
              </div>
            )}
            {personalDetails.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                <Mail size={16} style={{ color: nameColor, flexShrink: 0 }} />
                <a href={`mailto:${personalDetails.email}`} style={{ color: nameColor, textDecoration: 'none' }}>{personalDetails.email}</a>
              </div>
            )}
            {personalDetails.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                <Linkedin size={16} style={{ color: nameColor, flexShrink: 0 }} />
                <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" style={{ color: nameColor, textDecoration: 'none' }}>{personalDetails.linkedin}</a>
              </div>
            )}
          </div>

          {/* EXPERTISE */}
          {expertise.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                EXPERTISE
              </h3>
              <ul style={{ paddingLeft: 0, listStyleType: 'none', fontSize: '0.82rem', lineHeight: 1.6, color: '#334155' }}>
                {expertise.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.2rem' }}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* SKILLS CATEGORIES */}
          {categorizedSkills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                SKILLS
              </h3>
              {categorizedSkills.map((cat, idx) => (
                <div key={idx} style={{ marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{cat.category}</h4>
                  <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.78rem', lineHeight: 1.5, color: '#334155' }}>
                    {cat.items?.map((sk, sIdx) => (
                      <li key={sIdx}>{sk}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* TOOLS & TECHNOLOGIES */}
          {toolsAndTech.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                TOOLS & TECHNOLOGIES
              </h3>
              <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.78rem', lineHeight: 1.5, color: '#334155' }}>
                {toolsAndTech.map((tool, idx) => (
                  <li key={idx}>{tool}</li>
                ))}
              </ul>
            </div>
          )}

          {/* TECHNICAL EXPOSURE */}
          {technicalExposure.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                TECHNICAL EXPOSURE
              </h3>
              <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.78rem', lineHeight: 1.5, color: '#334155' }}>
                {technicalExposure.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            </div>
          )}

          {/* KEY ACHIEVEMENTS */}
          {keyAchievements.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                KEY ACHIEVEMENTS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem', color: '#1e293b', fontWeight: 700 }}>
                {keyAchievements.map((ach, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                    <span>{ach.icon || '🚀'}</span>
                    <span>{ach.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                EDUCATION
              </h3>
              {education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 800, color: nameColor, textTransform: 'uppercase' }}>{edu.degree}</div>
                  <div style={{ color: '#475569', fontWeight: 600 }}>{edu.fieldOfStudy}</div>
                  <div style={{ color: '#64748b' }}>{edu.institution}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{edu.dates}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* SUMMARY */}
          {personalDetails.summary && (
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                SUMMARY
              </h2>
              <div style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line', textAlign: personalDetails.summaryAlign || 'left' }}>
                {personalDetails.summary}
              </div>
            </div>
          )}

          {/* PROFESSIONAL EXPERIENCE */}
          {experiences.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                PROFESSIONAL EXPERIENCE
              </h2>

              {experiences.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', textTransform: 'uppercase' }}>
                    {exp.role}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: nameColor, textTransform: 'uppercase', marginTop: '0.1rem' }}>
                    {exp.dates}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.6rem' }}>
                    {exp.company}
                  </div>

                  {/* Key Contributions */}
                  {exp.keyContributions?.length > 0 && (
                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a', marginBottom: '0.3rem' }}>Key Contributions</div>
                      <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#334155' }}>
                        {exp.keyContributions.map((kc, kIdx) => (
                          <li key={kIdx} style={{ marginBottom: '0.3rem' }}>{kc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Responsibilities */}
                  {exp.keyResponsibilities?.length > 0 && (
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a', marginBottom: '0.3rem' }}>Key Responsibilities</div>
                      <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#334155' }}>
                        {exp.keyResponsibilities.map((kr, rIdx) => (
                          <li key={rIdx} style={{ marginBottom: '0.3rem' }}>{kr}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROJECT EXPERIENCE */}
          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: nameColor, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem' }}>
                PROJECT EXPERIENCE
              </h2>

              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                    {proj.name} {proj.subtitle && <span style={{ fontWeight: 600, color: '#475569' }}>({proj.subtitle})</span>}
                  </div>

                  {proj.points?.length > 0 && (
                    <ul style={{ paddingLeft: '1.2rem', margin: '0.3rem 0 0 0', fontSize: '0.82rem', lineHeight: 1.5, color: '#334155' }}>
                      {proj.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: '0.25rem' }}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* DYNAMIC CUSTOM SECTIONS (Paragraph vs Bullet Points) */}
          {customSections.length > 0 && customSections.map((sec) => (
            <div key={sec.id}>
              <h2 style={{
                fontSize: '1.05rem', fontWeight: 800, color: sec.fontColor || nameColor,
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem',
                borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem',
                textAlign: sec.alignment || 'left'
              }}>
                {sec.heading}
              </h2>

              {sec.format === 'paragraph' ? (
                <div style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line', textAlign: sec.alignment || 'left' }}>
                  {sec.paragraphText}
                </div>
              ) : (
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#334155', textAlign: sec.alignment || 'left' }}>
                  {sec.bullets?.map((b, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '0.25rem' }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
