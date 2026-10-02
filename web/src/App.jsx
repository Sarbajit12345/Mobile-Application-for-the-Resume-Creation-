import React, { useState } from 'react';
import { FileText, Sparkles, Download, Upload, Plus, Trash2, Layout, Smartphone } from 'lucide-react';
import ResumePreview from './components/ResumePreview';
import AIAssistantModal from './components/AIAssistantModal';

const initialResumeData = {
  personalDetails: {
    fullName: 'Sarbajit Roy',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'sarbajit@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://sarbajit.dev',
    linkedin: 'linkedin.com/in/sarbajit',
    summary: 'Experienced Full Stack Engineer specializing in modern JavaScript, React, Node.js, and cloud native architectures. Proven record of building high-performance web and mobile applications.'
  },
  experiences: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      description: '• Spearheaded architectural overhaul of high-traffic SaaS platform, boosting response times by 40%.\n• Mentored cross-functional team of 8 developers in agile practices and microservices.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Computer Science',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Engineering',
      startDate: '2018',
      endDate: '2022',
      grade: '3.9 GPA'
    }
  ],
  skills: ['React.js', 'Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs', 'Git'],
  projects: [
    {
      id: '1',
      name: 'AI Resume Creation Suite',
      description: 'Full stack AI-powered resume builder supporting web, mobile, and REST backend.',
      link: 'github.com/Sarbajit12345/Mobile-Application-for-the-Resume-Creation'
    }
  ]
};

export default function App() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeTab, setActiveTab] = useState('personal');
  const [templateId, setTemplateId] = useState('modern-minimal');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Personal details updates
  const handlePersonalChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  };

  // Experience handlers
  const handleAddExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }
      ]
    }));
  };

  const handleUpdateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const handleRemoveExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  // Education handlers
  const handleAddEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }
      ]
    }));
  };

  const handleUpdateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  // Skill handlers
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // JSON Export / Import
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(resumeData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `resume_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          setResumeData(parsed);
        } catch (err) {
          alert('Invalid JSON structure.');
        }
      };
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="brand">
          <FileText className="brand-icon" />
          <span>AI Resume Craft</span>
        </div>

        <div className="nav-actions">
          <button className="btn btn-ai" onClick={() => setIsAIModalOpen(true)}>
            <Sparkles size={16} /> AI Assistant
          </button>
          <button className="btn btn-secondary" onClick={handleExportJSON}>
            <Download size={16} /> Save JSON
          </button>
          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={16} /> Load JSON
            <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
          </label>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="main-workspace">
        {/* Editor Panel */}
        <section className="editor-panel">
          <div className="section-tabs">
            <button className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
              Personal Info
            </button>
            <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
              Experience
            </button>
            <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
              Education
            </button>
            <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
              Skills
            </button>
          </div>

          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input value={resumeData.personalDetails.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Job Title</label>
                  <input value={resumeData.personalDetails.jobTitle} onChange={(e) => handlePersonalChange('jobTitle', e.target.value)} />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Email</label>
                  <input value={resumeData.personalDetails.email} onChange={(e) => handlePersonalChange('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input value={resumeData.personalDetails.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Location</label>
                  <input value={resumeData.personalDetails.location} onChange={(e) => handlePersonalChange('location', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input value={resumeData.personalDetails.linkedin} onChange={(e) => handlePersonalChange('linkedin', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Professional Summary</label>
                <textarea value={resumeData.personalDetails.summary} onChange={(e) => handlePersonalChange('summary', e.target.value)} />
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div>
              {resumeData.experiences.map((exp, idx) => (
                <div key={exp.id} style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#a855f7' }}>Experience #{idx + 1}</strong>
                    <button onClick={() => handleRemoveExperience(exp.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Company</label>
                      <input value={exp.company} onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Position</label>
                      <input value={exp.position} onChange={(e) => handleUpdateExperience(exp.id, 'position', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input value={exp.startDate} onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input value={exp.endDate} onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description / Achievements</label>
                    <textarea value={exp.description} onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary" onClick={handleAddExperience} style={{ width: '100%' }}>
                <Plus size={16} /> Add Work Experience
              </button>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div>
              {resumeData.education.map((edu, idx) => (
                <div key={edu.id} style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Institution</label>
                      <input value={edu.institution} onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Degree</label>
                      <input value={edu.degree} onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary" onClick={handleAddEducation} style={{ width: '100%' }}>
                <Plus size={16} /> Add Education
              </button>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input placeholder="Add a skill (e.g. Python, AWS)..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} style={{ flex: 1 }} />
                <button className="btn btn-primary" onClick={handleAddSkill}>
                  <Plus size={16} /> Add
                </button>
              </div>
              <div className="skills-badge-container">
                {resumeData.skills.map((skill, i) => (
                  <span key={i} className="skill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }} onClick={() => handleRemoveSkill(skill)}>
                    {skill} <Trash2 size={12} style={{ color: '#ef4444' }} />
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Live Preview Panel */}
        <section className="preview-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>LIVE PREVIEW</span>
            <span style={{ fontSize: '0.8rem', color: '#a855f7' }}>A4 Document Format</span>
          </div>
          <ResumePreview resumeData={resumeData} templateId={templateId} />
        </section>
      </main>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        resumeData={resumeData}
        onApplySummary={(sum) => handlePersonalChange('summary', sum)}
        onApplyBullets={(bullets) => {
          if (resumeData.experiences.length > 0) {
            handleUpdateExperience(resumeData.experiences[0].id, 'description', bullets);
          }
        }}
      />
    </div>
  );
}
