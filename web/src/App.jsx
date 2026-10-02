import React, { useState, useEffect } from 'react';
import {
  FileText, Sparkles, Download, Plus, Trash2, User, LogIn, UserPlus,
  Settings, BarChart2, Layout, LogOut, AlignLeft, AlignCenter, AlignRight,
  Type, List, PlusCircle, Eye, CheckCircle2, Briefcase, Award, GraduationCap,
  Wrench, FolderPlus, HelpCircle, Layers
} from 'lucide-react';
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
import WordToolbar from './components/WordToolbar';
import PreviewModal from './components/PreviewModal';
import SectionRearrangerModal from './components/SectionRearrangerModal';

// Initial default state matching Sarbajit Behera target resume layout
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
  ],
  sectionOrder: []
};

export default function App() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('personal');
  const [templateId, setTemplateId] = useState('executive-split');
  
  // Auth & Modal States
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAddHeadingOpen, setIsAddHeadingOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isRearrangerOpen, setIsRearrangerOpen] = useState(false);
  const [dbConfig, setDbConfig] = useState(null);

  // New item inputs
  const [newExpertise, setNewExpertise] = useState('');
  const [newTool, setNewTool] = useState('');

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

  const handleAddTool = () => {
    if (!newTool.trim()) return;
    setResumeData(prev => ({ ...prev, toolsAndTech: [...prev.toolsAndTech, newTool.trim()] }));
    setNewTool('');
  };

  const handleRemoveTool = (idx) => {
    setResumeData(prev => ({ ...prev, toolsAndTech: prev.toolsAndTech.filter((_, i) => i !== idx) }));
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

  // MS Word formatting engine logic
  const handleWordFormatting = (currentVal, setter, actionType, param) => {
    let newVal = currentVal || '';
    if (actionType === 'bold') {
      newVal = newVal ? `${newVal} **bold text**` : '**bold text**';
    } else if (actionType === 'italic') {
      newVal = newVal ? `${newVal} *italic text*` : '*italic text*';
    } else if (actionType === 'underline') {
      newVal = newVal ? `${newVal} <u>underlined text</u>` : '<u>underlined text</u>';
    } else if (actionType === 'strikethrough') {
      newVal = newVal ? `${newVal} ~~strikethrough~~` : '~~strikethrough~~';
    } else if (actionType === 'bullet') {
      const lines = newVal.split('\n');
      newVal = lines.map(l => l.trim().startsWith('• ') ? l : `• ${l.trim()}`).join('\n');
    } else if (actionType === 'number') {
      const lines = newVal.split('\n');
      newVal = lines.map((l, i) => `${i + 1}. ${l.replace(/^(\d+\.|\•)\s*/, '')}`).join('\n');
    } else if (actionType === 'case') {
      if (param === 'uppercase') newVal = newVal.toUpperCase();
      if (param === 'lowercase') newVal = newVal.toLowerCase();
      if (param === 'titlecase') newVal = newVal.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    } else if (actionType === 'insert-verb') {
      newVal = newVal ? `${newVal} ${param}` : param;
    }
    setter(newVal);
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
            onOpenRearranger={() => setIsRearrangerOpen(true)}
          />

          {/* Right Main Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: '#0b0f19' }}>
            {/* Top Bar for Authenticated User */}
            <div style={{
              height: '64px', borderBottom: '1px solid rgba(255,255,255,0.08)',
              background: '#0f172a', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 90
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'white', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#818cf8' }}>●</span> {currentView.replace('-', ' ')}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsRearrangerOpen(true)}
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', border: '1px dashed rgba(168, 85, 247, 0.4)', color: '#c084fc' }}>
                  <Layers size={16} /> Rearrange Headings
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsPreviewModalOpen(true)}
                  style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}>
                  <Eye size={16} /> Live Preview Resume
                </button>
                <button
                  className="btn btn-ai"
                  onClick={() => setIsAIModalOpen(true)}
                  style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
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
                  onOpenRearranger={() => setIsRearrangerOpen(true)}
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
                <TemplateGalleryView
                  currentTemplate={templateId}
                  onSelectTemplate={id => setTemplateId(id)}
                  onNavigateEditor={() => setCurrentView('editor')}
                />
              )}

              {/* CLEAN, ELEGANT, UNCLUTTERED RESUME EDITOR VIEW */}
              {currentView === 'editor' && (
                <main style={{ padding: '2rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                  
                  {/* Editor Header Bar */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '1.5rem', background: '#151d30', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', padding: '1.25rem 1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                  }}>
                    <div>
                      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Executive Resume Form Editor
                        <span style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 700 }}>
                          MS Word Rich Toolbar
                        </span>
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                        Fill in your resume sections below. Click "Rearrange Headings" to reorder top to bottom or apply format suggestions.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setIsRearrangerOpen(true)}
                        style={{ padding: '0.65rem 1rem', fontSize: '0.88rem', border: '1px dashed #a855f7', color: '#c084fc' }}>
                        <Layers size={16} /> Rearrange Headings
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setIsPreviewModalOpen(true)}
                        style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                        <Eye size={18} /> Preview Document
                      </button>
                    </div>
                  </div>

                  {/* Clean Horizontal Section Navigator Tabs */}
                  <div style={{
                    display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem',
                    marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {[
                      { id: 'personal', label: '1. Header & Contact', icon: User },
                      { id: 'expertise', label: '2. Expertise & Tech', icon: Wrench },
                      { id: 'experience', label: '3. Work Experience', icon: Briefcase },
                      { id: 'projects', label: '4. Projects', icon: FolderPlus },
                      { id: 'achievements', label: '5. Key Achievements', icon: Award }
                    ].map(tab => {
                      const IconComp = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          style={{
                            background: isActive ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : '#151d30',
                            border: isActive ? 'none' : '1px solid rgba(255,255,255,0.08)',
                            color: isActive ? 'white' : '#94a3b8',
                            padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem',
                            fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center',
                            gap: '0.45rem', whiteSpace: 'nowrap', transition: 'all 0.2s ease'
                          }}>
                          <IconComp size={15} />
                          {tab.label}
                        </button>
                      );
                    })}

                    {/* Custom User Headings Tabs */}
                    {resumeData.customSections?.map(sec => {
                      const isActive = activeTab === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => setActiveTab(sec.id)}
                          style={{
                            background: isActive ? '#8b5cf6' : '#151d30',
                            border: isActive ? 'none' : '1px solid rgba(139, 92, 246, 0.3)',
                            color: isActive ? 'white' : '#c084fc',
                            padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem',
                            fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center',
                            gap: '0.4rem', whiteSpace: 'nowrap'
                          }}>
                          ✨ {sec.heading}
                        </button>
                      );
                    })}

                    {/* Add Custom Heading Button */}
                    <button
                      onClick={() => setIsAddHeadingOpen(true)}
                      style={{
                        background: 'rgba(99, 102, 241, 0.12)', border: '1px dashed #6366f1',
                        color: '#818cf8', borderRadius: '8px', padding: '0.65rem 1rem', fontSize: '0.85rem',
                        fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center',
                        gap: '0.4rem', whiteSpace: 'nowrap'
                      }}>
                      <PlusCircle size={15} /> + Add Heading
                    </button>
                  </div>

                  {/* ACTIVE FORM SECTION CONTENT CONTAINER */}
                  <div style={{
                    background: '#151d30', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px', padding: '2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                  }}>
                    
                    {/* SECTION 1: HEADER & CONTACT INFO */}
                    {activeTab === 'personal' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Header & Personal Details</h3>
                          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Provide your full name, target title, contact info, and executive summary.</p>
                        </div>

                        <div className="form-grid">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              value={resumeData.personalDetails.fullName}
                              onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                              placeholder="e.g. SARBAJIT BEHERA"
                            />
                          </div>
                          <div className="form-group">
                            <label>Target Title / Subtitle</label>
                            <input
                              value={resumeData.personalDetails.designation}
                              onChange={(e) => handlePersonalChange('designation', e.target.value)}
                              placeholder="e.g. Product Manager | ERP Specialist"
                            />
                          </div>
                        </div>

                        <div className="form-grid">
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              value={resumeData.personalDetails.email}
                              onChange={(e) => handlePersonalChange('email', e.target.value)}
                              placeholder="e.g. sarbajitbehera67@gmail.com"
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone Numbers</label>
                            <input
                              value={resumeData.personalDetails.phone}
                              onChange={(e) => handlePersonalChange('phone', e.target.value)}
                              placeholder="e.g. 7008706674, 8908930068"
                            />
                          </div>
                        </div>

                        <div className="form-grid">
                          <div className="form-group">
                            <label>Location</label>
                            <input
                              value={resumeData.personalDetails.location}
                              onChange={(e) => handlePersonalChange('location', e.target.value)}
                              placeholder="e.g. Bengaluru, Karnataka, India"
                            />
                          </div>
                          <div className="form-group">
                            <label>LinkedIn Profile URL</label>
                            <input
                              value={resumeData.personalDetails.linkedin}
                              onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                              placeholder="e.g. https://www.linkedin.com/in/sarbajit-behera"
                            />
                          </div>
                        </div>

                        {/* EXECUTIVE SUMMARY WITH MS WORD TOOLBAR */}
                        <div className="form-group" style={{ marginTop: '0.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <label>Executive Summary</label>
                            <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
                              MS Word Toolbar Attached
                            </span>
                          </div>

                          <WordToolbar
                            fieldName="summary"
                            onAction={(act, val) => handleWordFormatting(
                              resumeData.personalDetails.summary,
                              (newText) => handlePersonalChange('summary', newText),
                              act, val
                            )}
                            onAiPolish={() => setIsAIModalOpen(true)}
                          />

                          <textarea
                            rows={7}
                            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, fontSize: '0.9rem', lineHeight: 1.6 }}
                            value={resumeData.personalDetails.summary}
                            onChange={(e) => handlePersonalChange('summary', e.target.value)}
                            placeholder="Write your professional summary here..."
                          />
                        </div>
                      </div>
                    )}

                    {/* SECTION 2: EXPERTISE & TECH STACK */}
                    {activeTab === 'expertise' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Expertise & Technical Stack</h3>
                          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Manage core expertise badges, tools, and technical domain exposures.</p>
                        </div>

                        {/* Expertise List */}
                        <div>
                          <label style={{ color: '#a855f7', marginBottom: '0.5rem', display: 'block' }}>CORE EXPERTISE BADGES</label>
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                            <input
                              placeholder="Type expertise (e.g. Agile Delivery)..."
                              value={newExpertise}
                              onChange={(e) => setNewExpertise(e.target.value)}
                              style={{ flex: 1 }}
                            />
                            <button className="btn btn-primary" onClick={handleAddExpertise}>
                              <Plus size={16} /> Add Expertise
                            </button>
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {resumeData.expertise.map((item, i) => (
                              <span
                                key={i}
                                style={{
                                  background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)',
                                  color: '#e9d5ff', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem',
                                  fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                {item}
                                <Trash2
                                  size={13}
                                  style={{ color: '#ef4444', cursor: 'pointer' }}
                                  onClick={() => handleRemoveExpertise(i)}
                                />
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tools & Technologies */}
                        <div style={{ marginTop: '1rem' }}>
                          <label style={{ color: '#38bdf8', marginBottom: '0.5rem', display: 'block' }}>TOOLS & TECHNOLOGIES</label>
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                            <input
                              placeholder="Type tool name (e.g. ChatGPT, JIRA)..."
                              value={newTool}
                              onChange={(e) => setNewTool(e.target.value)}
                              style={{ flex: 1 }}
                            />
                            <button className="btn btn-secondary" onClick={handleAddTool}>
                              <Plus size={16} /> Add Tool
                            </button>
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {resumeData.toolsAndTech.map((tool, i) => (
                              <span
                                key={i}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)',
                                  color: '#7dd3fc', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem',
                                  fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                {tool}
                                <Trash2
                                  size={13}
                                  style={{ color: '#ef4444', cursor: 'pointer' }}
                                  onClick={() => handleRemoveTool(i)}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECTION 3: PROFESSIONAL EXPERIENCE */}
                    {activeTab === 'experience' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Professional Work Experience</h3>
                          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Format job roles and bullet-point accomplishments using the MS Word ribbon.</p>
                        </div>

                        {resumeData.experiences.map((exp, idx) => (
                          <div
                            key={exp.id || idx}
                            style={{
                              background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'
                            }}>
                            <div className="form-grid">
                              <div className="form-group">
                                <label>Role / Position Title</label>
                                <input
                                  value={exp.role}
                                  onChange={(e) => {
                                    const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, role: e.target.value } : x);
                                    setResumeData(prev => ({ ...prev, experiences: updated }));
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label>Dates (e.g. APRIL 2022 – PRESENT)</label>
                                <input
                                  value={exp.dates}
                                  onChange={(e) => {
                                    const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, dates: e.target.value } : x);
                                    setResumeData(prev => ({ ...prev, experiences: updated }));
                                  }}
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Company / Organization Name</label>
                              <input
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, company: e.target.value } : x);
                                  setResumeData(prev => ({ ...prev, experiences: updated }));
                                }}
                              />
                            </div>

                            {/* KEY CONTRIBUTIONS WITH MS WORD TOOLBAR */}
                            <div className="form-group">
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                <label>Key Contributions (One bullet per line)</label>
                                <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600 }}>MS Word Formatting</span>
                              </div>

                              <WordToolbar
                                fieldName="keyContributions"
                                onAction={(act, val) => handleWordFormatting(
                                  exp.keyContributions?.join('\n') || '',
                                  (newText) => {
                                    const lines = newText.split('\n');
                                    const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, keyContributions: lines } : x);
                                    setResumeData(prev => ({ ...prev, experiences: updated }));
                                  },
                                  act, val
                                )}
                                onAiPolish={() => setIsAIModalOpen(true)}
                              />

                              <textarea
                                rows={6}
                                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, fontSize: '0.88rem', lineHeight: 1.6 }}
                                value={exp.keyContributions?.join('\n')}
                                onChange={(e) => {
                                  const lines = e.target.value.split('\n');
                                  const updated = resumeData.experiences.map((x, i) => i === idx ? { ...x, keyContributions: lines } : x);
                                  setResumeData(prev => ({ ...prev, experiences: updated }));
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* SECTION 4: PROJECTS */}
                    {activeTab === 'projects' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Key Projects & Enterprise Implementations</h3>
                          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Detail project achievements and deliverables.</p>
                        </div>

                        {resumeData.projects.map((proj, idx) => (
                          <div
                            key={proj.id || idx}
                            style={{
                              background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'
                            }}>
                            <div className="form-grid">
                              <div className="form-group">
                                <label>Project Title</label>
                                <input
                                  value={proj.name}
                                  onChange={(e) => {
                                    const updated = resumeData.projects.map((p, i) => i === idx ? { ...p, name: e.target.value } : p);
                                    setResumeData(prev => ({ ...prev, projects: updated }));
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label>Modules / Subtitle</label>
                                <input
                                  value={proj.subtitle || ''}
                                  onChange={(e) => {
                                    const updated = resumeData.projects.map((p, i) => i === idx ? { ...p, subtitle: e.target.value } : p);
                                    setResumeData(prev => ({ ...prev, projects: updated }));
                                  }}
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Project Highlights (One per line)</label>
                              <WordToolbar
                                fieldName="projects"
                                onAction={(act, val) => handleWordFormatting(
                                  proj.points?.join('\n') || '',
                                  (newText) => {
                                    const lines = newText.split('\n');
                                    const updated = resumeData.projects.map((p, i) => i === idx ? { ...p, points: lines } : p);
                                    setResumeData(prev => ({ ...prev, projects: updated }));
                                  },
                                  act, val
                                )}
                                onAiPolish={() => setIsAIModalOpen(true)}
                              />

                              <textarea
                                rows={5}
                                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, fontSize: '0.88rem', lineHeight: 1.6 }}
                                value={proj.points?.join('\n')}
                                onChange={(e) => {
                                  const lines = e.target.value.split('\n');
                                  const updated = resumeData.projects.map((p, i) => i === idx ? { ...p, points: lines } : p);
                                  setResumeData(prev => ({ ...prev, projects: updated }));
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* SECTION 5: KEY ACHIEVEMENTS */}
                    {activeTab === 'achievements' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Key Achievements</h3>
                          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Quantifiable outcomes and metric wins.</p>
                        </div>

                        {resumeData.keyAchievements.map((ach, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <input
                              style={{ width: '60px', textAlign: 'center', fontSize: '1.1rem' }}
                              value={ach.icon}
                              onChange={(e) => {
                                const updated = resumeData.keyAchievements.map((a, i) => i === idx ? { ...a, icon: e.target.value } : a);
                                setResumeData(prev => ({ ...prev, keyAchievements: updated }));
                              }}
                            />
                            <input
                              style={{ flex: 1 }}
                              value={ach.text}
                              onChange={(e) => {
                                const updated = resumeData.keyAchievements.map((a, i) => i === idx ? { ...a, text: e.target.value } : a);
                                setResumeData(prev => ({ ...prev, keyAchievements: updated }));
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* DYNAMIC CUSTOM USER SECTIONS */}
                    {resumeData.customSections?.map(sec => {
                      if (activeTab !== sec.id) return null;
                      return (
                        <div key={sec.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                            <h3 style={{ color: '#c084fc', fontSize: '1.2rem', fontWeight: 800 }}>✨ {sec.heading}</h3>
                            <button
                              onClick={() => handleRemoveCustomSection(sec.id)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'none',
                                padding: '0.45rem 0.9rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem'
                              }}>
                              <Trash2 size={14} /> Remove Section
                            </button>
                          </div>

                          <div className="form-group">
                            <label>Content Layout Style</label>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.3rem' }}>
                              <button
                                type="button"
                                onClick={() => handleUpdateCustomSection(sec.id, 'format', 'paragraph')}
                                style={{
                                  flex: 1, padding: '0.6rem', border: 'none', borderRadius: '8px', cursor: 'pointer',
                                  background: sec.format === 'paragraph' ? '#6366f1' : '#0f172a', color: 'white', fontWeight: 700, fontSize: '0.85rem'
                                }}>
                                Paragraph Text
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateCustomSection(sec.id, 'format', 'bullets')}
                                style={{
                                  flex: 1, padding: '0.6rem', border: 'none', borderRadius: '8px', cursor: 'pointer',
                                  background: sec.format === 'bullets' ? '#6366f1' : '#0f172a', color: 'white', fontWeight: 700, fontSize: '0.85rem'
                                }}>
                                Bullet Points List
                              </button>
                            </div>
                          </div>

                          {sec.format === 'paragraph' ? (
                            <div className="form-group">
                              <label>Paragraph Content</label>
                              <WordToolbar
                                fieldName="customParagraph"
                                onAction={(act, val) => handleWordFormatting(
                                  sec.paragraphText || '',
                                  (newText) => handleUpdateCustomSection(sec.id, 'paragraphText', newText),
                                  act, val
                                )}
                                onAiPolish={() => setIsAIModalOpen(true)}
                              />
                              <textarea
                                rows={6}
                                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, fontSize: '0.88rem' }}
                                value={sec.paragraphText}
                                onChange={e => handleUpdateCustomSection(sec.id, 'paragraphText', e.target.value)}
                              />
                            </div>
                          ) : (
                            <div className="form-group">
                              <label>Bullet Points (One per line)</label>
                              <WordToolbar
                                fieldName="customBullets"
                                onAction={(act, val) => handleWordFormatting(
                                  sec.bullets?.join('\n') || '',
                                  (newText) => handleUpdateCustomSection(sec.id, 'bullets', newText.split('\n')),
                                  act, val
                                )}
                                onAiPolish={() => setIsAIModalOpen(true)}
                              />
                              <textarea
                                rows={6}
                                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, fontSize: '0.88rem' }}
                                value={sec.bullets?.join('\n')}
                                onChange={e => handleUpdateCustomSection(sec.id, 'bullets', e.target.value.split('\n'))}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </main>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SOLID, PRINT-READY FULL-SCREEN PREVIEW MODAL */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        resumeData={resumeData}
        templateId={templateId}
        onSelectTemplate={(id) => setTemplateId(id)}
      />

      {/* SECTION REARRANGER & AUTO FORMAT SUGGESTIONS MODAL */}
      <SectionRearrangerModal
        isOpen={isRearrangerOpen}
        onClose={() => setIsRearrangerOpen(false)}
        sectionOrder={resumeData.sectionOrder}
        customSections={resumeData.customSections}
        onUpdateSectionOrder={(newOrder) => setResumeData(prev => ({ ...prev, sectionOrder: newOrder }))}
      />

      {/* Auxiliary Modals */}
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
