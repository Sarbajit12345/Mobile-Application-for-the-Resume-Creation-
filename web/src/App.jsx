import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Download, Plus, Trash2, User, LogIn, UserPlus, Settings, BarChart2, Layout, LogOut, AlignLeft, AlignCenter, AlignRight, Type, List, PlusCircle } from 'lucide-react';
import ResumePreview from './components/ResumePreview';
import AIAssistantModal from './components/AIAssistantModal';
import AuthModal from './components/AuthModal';
import RegisterModal from './components/RegisterModal';
import UserManagementPage from './components/UserManagementPage';
import ConfigPage from './components/ConfigPage';
import LandingPage from './components/LandingPage';
import ATSAnalyticsView from './components/ATSAnalyticsView';
import TemplateGalleryView from './components/TemplateGalleryView';
import DashboardOverview from './components/DashboardOverview';
import Sidebar from './components/Sidebar';
import AddHeadingModal from './components/AddHeadingModal';

// Complete default data state matching the Sarbajit Behera target resume layout
const initialResumeData = {
  personalDetails: {
    fullName: 'SARBAJIT BEHERA',
    designation: 'Product Manager | ERP Specialist | Business Analyst | Agile & Digital Transformation',
    jobTitle: 'Product Manager',
    email: 'sarbajitbehera67@gmail.com',
    phone: '7008706674, 8908930068',
    location: 'Bengaluru, Karnataka, India',
    linkedin: 'https://www.linkedin.com/in/sarbajit-behera-b15948188',
    summary: `Dynamic and results-oriented Business Analyst, Product Owner, and Product Manager (ERP) with 4+ years of experience in delivering enterprise-scale digital and ERP transformation programs. Proven expertise in end-to-end product lifecycle management, Agile delivery, stakeholder engagement, and business process optimization.

Currently leading ERP initiatives as a Product Manager, owning product roadmap, backlog prioritization, and release planning while ensuring alignment with business goals and ROI. Experienced in managing and mentoring a team of 7+ Business Analysts, driving performance, standardization, and continuous improvement.`,
    alignment: 'center',
    nameColor: '#1e3a8a'
  },
  expertise: [
    'Product Management',
    'Business Analysis',
    'ERP Systems',
    'Agile Delivery',
    'Requirements Engineering',
    'Stakeholder Management',
    'Backlog Prioritization',
    'Process Optimization'
  ],
  categorizedSkills: [
    {
      category: 'DATA & ANALYTICS',
      items: ['ADVANCED EXCEL', 'SQL', 'POWER BI', 'DATA ANALYSIS', 'REPORTING']
    },
    {
      category: 'BUSINESS ANALYSIS',
      items: ['BRD,SRS,FRS,USER STORIES', 'GAP ANALYSIS', 'UAT', 'CHANGE MANAGEMENT']
    }
  ],
  toolsAndTech: [
    'JIRA', 'MS PROJECT', 'FIGMA', 'BALSAMIQ', 'AXURE', 'POSTMAN', 'ChatGPT', 'Gemini', 'Copilot'
  ],
  technicalExposure: [
    'Microservices', 'API Integration', 'AWS', 'Azure', 'IoT'
  ],
  keyAchievements: [
    { icon: '🚀', text: '30% FASTER PROJECT DELIVERY.' },
    { icon: '📊', text: '20% IMPROVEMENT IN PRODUCT QUALITY.' },
    { icon: '⚙️', text: '70% REDUCTION IN MANUAL EFFORT.' }
  ],
  experiences: [
    {
      id: '1',
      role: 'ASSISTANT MANAGER – BUSINESS ANALYST / PRODUCT OWNER',
      dates: 'APRIL 2022 – PRESENT',
      company: 'Idea Infinity IT Solutions Pvt. Ltd.',
      keyContributions: [
        'Led end-to-end ERP product delivery as Product Owner across modules including HRMS, FMS, SCM, MMS, DTLMS, PMS, TRM, and BI for enterprise and government clients.',
        'Successfully delivered 4+ large-scale ERP implementations, impacting 10,000+ users with scalable and business-aligned solutions.',
        'Managed and mentored a team of 7 Business Analysts, improving delivery quality, productivity, and adherence to BA standards.'
      ],
      keyResponsibilities: [
        'Managed multiple projects/modules, ensuring alignment with business strategy, scope, and timelines.',
        'Elicited, analyzed, and documented business & functional requirements (BRD, SRS, FRS, RTM, user stories).',
        'Owned product backlog, prioritization, and release planning with stakeholders.'
      ]
    }
  ],
  projects: [
    {
      id: 'p1',
      name: 'ERP (Enterprise Resource Planning System)',
      subtitle: 'FMS, HRMS, MMS, PMS, BI',
      points: [
        'Owned product roadmap across FMS, HRMS, MMS, PMS, BI',
        'Prioritized backlog based on business value & ROI',
        'Led end-to-end product lifecycle and releases'
      ]
    }
  ],
  education: [
    {
      degree: 'MASTER’S DEGREE',
      fieldOfStudy: 'Power Electronic',
      institution: 'GIET University, Odisha.',
      dates: '2020 – 2022'
    }
  ],
  customSections: [
    {
      id: 'sec_cert',
      heading: 'CERTIFICATIONS & LICENSES',
      format: 'bullets',
      paragraphText: '',
      bullets: [
        'Certified Scrum Product Owner (CSPO) - Scrum Alliance',
        'PMI Agile Certified Practitioner (PMI-ACP) - PMI',
        'Professional Scrum Master (PSM I) - Scrum.org'
      ],
      alignment: 'left',
      fontColor: '#1e3a8a'
    }
  ]
};

export default function App() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'expertise', 'experience', 'projects', 'achievements', or custom section ID
  const [templateId, setTemplateId] = useState('executive-split');
  
  // Auth & Modal States
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAddHeadingOpen, setIsAddHeadingOpen] = useState(false);
  const [dbConfig, setDbConfig] = useState(null);

  // New item inputs
  const [newExpertise, setNewExpertise] = useState('');

  useEffect(() => {
    fetch('http://localhost:5050/api/auth/config')
      .then(res => res.json())
      .then(data => { if (data.success) setDbConfig(data.data); })
      .catch(() => {});
  }, []);

  const handlePersonalChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  };

  const handleAddExpertise = () => {
    if (!newExpertise.trim()) return;
    setResumeData(prev => ({ ...prev, expertise: [...prev.expertise, newExpertise.trim()] }));
    setNewExpertise('');
  };

  const handleRemoveExpertise = (idx) => {
    setResumeData(prev => ({ ...prev, expertise: prev.expertise.filter((_, i) => i !== idx) }));
  };

  const handleAddCustomSection = (newSection) => {
    setResumeData(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
    setActiveTab(newSection.id);
  };

  const handleRemoveCustomSection = (secId) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(s => s.id !== secId)
    }));
    setActiveTab('personal');
  };

  const handleUpdateCustomSection = (secId, field, val) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(s => s.id === secId ? { ...s, [field]: val } : s)
    }));
  };

  return (
    <div className="app-container">
      {/* Unauthenticated Landing View */}
      {!currentUser ? (
        <div>
          <header className="navbar">
            <div className="brand" style={{ cursor: 'pointer' }}>
              <FileText className="brand-icon" />
              <span>AI Resume Craft</span>
            </div>
            <div className="nav-actions">
              <button className="btn btn-secondary" onClick={() => setIsRegisterModalOpen(true)}>
                <UserPlus size={16} /> Register
              </button>
              <button className="btn btn-primary" onClick={() => setIsAuthModalOpen(true)}>
                <LogIn size={16} /> Sign In
              </button>
            </div>
          </header>

          <LandingPage
            onOpenRegister={() => setIsRegisterModalOpen(true)}
            onOpenLogin={() => setIsAuthModalOpen(true)}
          />
        </div>
      ) : (
        /* Authenticated Left Sidebar Dashboard Layout */
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          {/* Left Sidebar Navigation */}
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            currentUser={currentUser}
            onSignOut={() => setCurrentUser(null)}
          />

          {/* Right Main Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {/* Top Bar for Authenticated User */}
            <div style={{
              height: '64px', borderBottom: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0 2rem', position: 'sticky', top: 0, zIndex: 90
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white', textTransform: 'capitalize' }}>
                {currentView.replace('-', ' ')}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button className="btn btn-ai" onClick={() => setIsAIModalOpen(true)} style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  <Sparkles size={16} /> AI Prompt Studio
                </button>
              </div>
            </div>

            {/* View Content Components */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {currentView === 'dashboard' && (
                <DashboardOverview
                  currentUser={currentUser}
                  onNavigate={setCurrentView}
                  onEditResume={() => setCurrentView('editor')}
                />
              )}

              {currentView === 'user-mgmt' && (
                <UserManagementPage currentUser={currentUser} onUserUpdate={u => setCurrentUser(u)} />
              )}

              {currentView === 'config' && (
                <ConfigPage onConfigUpdated={cfg => setDbConfig(cfg)} />
              )}

              {currentView === 'ats' && (
                <ATSAnalyticsView resumeData={resumeData} />
              )}

              {currentView === 'templates' && (
                <TemplateGalleryView currentTemplate={templateId} onSelectTemplate={id => { setTemplateId(id); setCurrentView('editor'); }} />
              )}

              {currentView === 'editor' && (
                <main className="main-workspace" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  
                  {/* Editor Panel with Vertical Left Tabs Layout */}
                  <section className="editor-panel" style={{ display: 'flex', flexDirection: 'row', padding: 0, overflow: 'hidden' }}>
                    
                    {/* Vertical Left Tabs Stack */}
                    <div style={{
                      width: '210px', background: '#0f172a', borderRight: '1px solid rgba(255,255,255,0.08)',
                      padding: '1rem 0.6rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0
                    }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', padding: '0 0.5rem', marginBottom: '0.3rem' }}>
                        SECTION TABS
                      </span>

                      <button
                        onClick={() => setActiveTab('personal')}
                        className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                        style={{ textAlign: 'left', width: '100%', borderRadius: '8px', padding: '0.65rem 0.8rem', fontSize: '0.85rem' }}>
                        Header & Contact
                      </button>

                      <button
                        onClick={() => setActiveTab('expertise')}
                        className={`tab-btn ${activeTab === 'expertise' ? 'active' : ''}`}
                        style={{ textAlign: 'left', width: '100%', borderRadius: '8px', padding: '0.65rem 0.8rem', fontSize: '0.85rem' }}>
                        Expertise & Skills
                      </button>

                      <button
                        onClick={() => setActiveTab('experience')}
                        className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                        style={{ textAlign: 'left', width: '100%', borderRadius: '8px', padding: '0.65rem 0.8rem', fontSize: '0.85rem' }}>
                        Professional Exp
                      </button>

                      <button
                        onClick={() => setActiveTab('projects')}
                        className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        style={{ textAlign: 'left', width: '100%', borderRadius: '8px', padding: '0.65rem 0.8rem', fontSize: '0.85rem' }}>
                        Projects
                      </button>

                      <button
                        onClick={() => setActiveTab('achievements')}
                        className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
                        style={{ textAlign: 'left', width: '100%', borderRadius: '8px', padding: '0.65rem 0.8rem', fontSize: '0.85rem' }}>
                        Key Achievements
                      </button>

                      {/* Custom Section Tabs added by user */}
                      {resumeData.customSections?.map(sec => (
                        <button
                          key={sec.id}
                          onClick={() => setActiveTab(sec.id)}
                          className={`tab-btn ${activeTab === sec.id ? 'active' : ''}`}
                          style={{ textAlign: 'left', width: '100%', borderRadius: '8px', padding: '0.65rem 0.8rem', fontSize: '0.85rem', color: '#c084fc' }}>
                          ✨ {sec.heading}
                        </button>
                      ))}

                      {/* Button to add custom heading */}
                      <button
                        onClick={() => setIsAddHeadingOpen(true)}
                        style={{
                          marginTop: 'auto', background: 'rgba(99, 102, 241, 0.15)', border: '1px dashed #6366f1',
                          color: '#818cf8', borderRadius: '8px', padding: '0.65rem', fontSize: '0.8rem',
                          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                        }}>
                        <PlusCircle size={14} /> Add Heading
                      </button>
                    </div>

                    {/* Active Tab Form Container */}
                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                      
                      {/* Section 1: Header & Contact Info */}
                      {activeTab === 'personal' && (
                        <div>
                          {/* Styling & Alignment Bar */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: '#0f172a', padding: '0.6rem 1rem', borderRadius: '8px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Header Alignment:</span>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                              <button onClick={() => handlePersonalChange('alignment', 'left')} style={{ padding: '0.35rem', background: resumeData.personalDetails.alignment === 'left' ? '#6366f1' : 'transparent', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                <AlignLeft size={14} />
                              </button>
                              <button onClick={() => handlePersonalChange('alignment', 'center')} style={{ padding: '0.35rem', background: resumeData.personalDetails.alignment === 'center' ? '#6366f1' : 'transparent', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                <AlignCenter size={14} />
                              </button>
                              <button onClick={() => handlePersonalChange('alignment', 'right')} style={{ padding: '0.35rem', background: resumeData.personalDetails.alignment === 'right' ? '#6366f1' : 'transparent', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                <AlignRight size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="form-grid">
                            <div className="form-group">
                              <label>Full Name</label>
                              <input value={resumeData.personalDetails.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label>Designation / Subtitle</label>
                              <input value={resumeData.personalDetails.designation} onChange={(e) => handlePersonalChange('designation', e.target.value)} />
                            </div>
                          </div>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Email</label>
                              <input value={resumeData.personalDetails.email} onChange={(e) => handlePersonalChange('email', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label>Phone Numbers</label>
                              <input value={resumeData.personalDetails.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} />
                            </div>
                          </div>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Location</label>
                              <input value={resumeData.personalDetails.location} onChange={(e) => handlePersonalChange('location', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label>LinkedIn URL</label>
                              <input value={resumeData.personalDetails.linkedin} onChange={(e) => handlePersonalChange('linkedin', e.target.value)} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Executive Summary</label>
                            <textarea rows={6} value={resumeData.personalDetails.summary} onChange={(e) => handlePersonalChange('summary', e.target.value)} />
                          </div>
                        </div>
                      )}

                      {/* Section 2: Expertise & Skills */}
                      {activeTab === 'expertise' && (
                        <div>
                          <h4 style={{ color: '#a855f7', fontSize: '0.9rem', marginBottom: '0.75rem' }}>EXPERTISE LIST</h4>
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <input placeholder="Add Expertise (e.g. ERP Systems)..." value={newExpertise} onChange={(e) => setNewExpertise(e.target.value)} style={{ flex: 1 }} />
                            <button className="btn btn-primary" onClick={handleAddExpertise}>
                              <Plus size={16} /> Add
                            </button>
                          </div>
                          <div className="skills-badge-container" style={{ marginBottom: '1.5rem' }}>
                            {resumeData.expertise.map((item, i) => (
                              <span key={i} className="skill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }} onClick={() => handleRemoveExpertise(i)}>
                                {item} <Trash2 size={12} style={{ color: '#ef4444' }} />
                              </span>
                            ))}
                          </div>

                          <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>TOOLS & TECHNOLOGIES</h4>
                          <div className="skills-badge-container">
                            {resumeData.toolsAndTech.map((t, i) => (
                              <span key={i} className="skill-badge">{t}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section 3: Professional Experience */}
                      {activeTab === 'experience' && (
                        <div>
                          {resumeData.experiences.map((exp, idx) => (
                            <div key={exp.id || idx} style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                              <div className="form-grid">
                                <div className="form-group">
                                  <label>Role Title</label>
                                  <input value={exp.role} onChange={(e) => {
                                    const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, role: e.target.value } : x);
                                    setResumeData(prev => ({ ...prev, experiences: updated }));
                                  }} />
                                </div>
                                <div className="form-group">
                                  <label>Dates (e.g. APRIL 2022 – PRESENT)</label>
                                  <input value={exp.dates} onChange={(e) => {
                                    const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, dates: e.target.value } : x);
                                    setResumeData(prev => ({ ...prev, experiences: updated }));
                                  }} />
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Company Name</label>
                                <input value={exp.company} onChange={(e) => {
                                  const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, company: e.target.value } : x);
                                  setResumeData(prev => ({ ...prev, experiences: updated }));
                                }} />
                              </div>
                              <div className="form-group">
                                <label>Key Contributions (One bullet per line)</label>
                                <textarea rows={6} value={exp.keyContributions?.join('\n')} onChange={(e) => {
                                  const lines = e.target.value.split('\n');
                                  const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, keyContributions: lines } : x);
                                  setResumeData(prev => ({ ...prev, experiences: updated }));
                                }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Section 4: Projects */}
                      {activeTab === 'projects' && (
                        <div>
                          {resumeData.projects.map((proj, idx) => (
                            <div key={proj.id || idx} style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                              <div className="form-grid">
                                <div className="form-group">
                                  <label>Project Name</label>
                                  <input value={proj.name} onChange={(e) => {
                                    const updated = resumeData.projects.map((p, i) => i === idx ? { ...p, name: e.target.value } : p);
                                    setResumeData(prev => ({ ...prev, projects: updated }));
                                  }} />
                                </div>
                                <div className="form-group">
                                  <label>Subtitle / Modules</label>
                                  <input value={proj.subtitle || ''} onChange={(e) => {
                                    const updated = resumeData.projects.map((p, i) => i === idx ? { ...p, subtitle: e.target.value } : p);
                                    setResumeData(prev => ({ ...prev, projects: updated }));
                                  }} />
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Project Bullet Points (One per line)</label>
                                <textarea rows={4} value={proj.points?.join('\n')} onChange={(e) => {
                                  const lines = e.target.value.split('\n');
                                  const updated = resumeData.projects.map((p, i) => i === idx ? { ...p, points: lines } : p);
                                  setResumeData(prev => ({ ...prev, projects: updated }));
                                }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Section 5: Key Achievements */}
                      {activeTab === 'achievements' && (
                        <div>
                          {resumeData.keyAchievements.map((ach, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                              <input style={{ width: '60px', textAlign: 'center' }} value={ach.icon} onChange={(e) => {
                                const updated = resumeData.keyAchievements.map((a, i) => i === idx ? { ...a, icon: e.target.value } : a);
                                setResumeData(prev => ({ ...prev, keyAchievements: updated }));
                              }} />
                              <input style={{ flex: 1 }} value={ach.text} onChange={(e) => {
                                const updated = resumeData.keyAchievements.map((a, i) => i === idx ? { ...a, text: e.target.value } : a);
                                setResumeData(prev => ({ ...prev, keyAchievements: updated }));
                              }} />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* DYNAMIC CUSTOM SECTION FORM */}
                      {resumeData.customSections?.map(sec => {
                        if (activeTab !== sec.id) return null;
                        return (
                          <div key={sec.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                              <h3 style={{ color: '#c084fc', fontSize: '1.1rem', fontWeight: 700 }}>{sec.heading}</h3>
                              <button onClick={() => handleRemoveCustomSection(sec.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Trash2 size={14} /> Remove Heading
                              </button>
                            </div>

                            {/* Format Choice: Paragraph vs Bullets */}
                            <div className="form-group">
                              <label>Format Choice</label>
                              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCustomSection(sec.id, 'format', 'paragraph')}
                                  style={{
                                    flex: 1, padding: '0.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
                                    background: sec.format === 'paragraph' ? '#6366f1' : '#0f172a', color: 'white', fontWeight: 600, fontSize: '0.85rem'
                                  }}>
                                  Paragraph Format
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCustomSection(sec.id, 'format', 'bullets')}
                                  style={{
                                    flex: 1, padding: '0.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
                                    background: sec.format === 'bullets' ? '#6366f1' : '#0f172a', color: 'white', fontWeight: 600, fontSize: '0.85rem'
                                  }}>
                                  Bullet Points Format
                                </button>
                              </div>
                            </div>

                            {sec.format === 'paragraph' ? (
                              <div className="form-group">
                                <label>Paragraph Content</label>
                                <textarea rows={6} value={sec.paragraphText} onChange={e => handleUpdateCustomSection(sec.id, 'paragraphText', e.target.value)} />
                              </div>
                            ) : (
                              <div className="form-group">
                                <label>Bullet Points (One per line)</label>
                                <textarea rows={6} value={sec.bullets?.join('\n')} onChange={e => handleUpdateCustomSection(sec.id, 'bullets', e.target.value.split('\n'))} />
                              </div>
                            )}

                            {/* Section Alignment & Font Color */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                              <div className="form-group">
                                <label>Section Alignment</label>
                                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.3rem' }}>
                                  <button onClick={() => handleUpdateCustomSection(sec.id, 'alignment', 'left')} style={{ flex: 1, padding: '0.4rem', background: sec.alignment === 'left' ? '#6366f1' : '#0f172a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    <AlignLeft size={14} />
                                  </button>
                                  <button onClick={() => handleUpdateCustomSection(sec.id, 'alignment', 'center')} style={{ flex: 1, padding: '0.4rem', background: sec.alignment === 'center' ? '#6366f1' : '#0f172a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    <AlignCenter size={14} />
                                  </button>
                                  <button onClick={() => handleUpdateCustomSection(sec.id, 'alignment', 'right')} style={{ flex: 1, padding: '0.4rem', background: sec.alignment === 'right' ? '#6366f1' : '#0f172a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    <AlignRight size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Live Preview Panel */}
                  <section className="preview-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>LIVE PREVIEW</span>
                      <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => window.print()}>
                        <Download size={14} /> Download PDF
                      </button>
                    </div>
                    <ResumePreview resumeData={resumeData} templateId={templateId} />
                  </section>
                </main>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddHeadingModal
        isOpen={isAddHeadingOpen}
        onClose={() => setIsAddHeadingOpen(false)}
        onAddSection={handleAddCustomSection}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={(user) => { setCurrentUser(user); setCurrentView('dashboard'); }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => { setCurrentUser(user); setCurrentView('dashboard'); }}
        dbConfig={dbConfig}
      />

      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        resumeData={resumeData}
        onApplySummary={(sum) => handlePersonalChange('summary', sum)}
        onApplyBullets={(bullets) => {
          if (resumeData.experiences.length > 0) {
            const lines = bullets.split('\n').filter(l => l.trim().length > 0);
            setResumeData(prev => ({
              ...prev,
              experiences: prev.experiences.map((exp, i) => i === 0 ? { ...exp, keyContributions: lines } : exp)
            }));
          }
        }}
        onApplyCustomText={(text) => {
          if (activeTab === 'personal') handlePersonalChange('summary', text);
        }}
      />
    </div>
  );
}
