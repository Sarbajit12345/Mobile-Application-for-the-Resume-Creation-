import React from 'react';
import { LayoutDashboard, FileText, PlusCircle, Layout, BarChart2, User, Settings, LogOut, Sparkles, Layers } from 'lucide-react';

export default function Sidebar({ currentView, onNavigate, currentUser, onSignOut, onOpenRearranger }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'editor', label: 'Create / Edit Resume', icon: PlusCircle },
    { id: 'templates', label: 'Template Gallery', icon: Layout },
    { id: 'ats', label: 'ATS Score Scanner', icon: BarChart2 },
    { id: 'user-mgmt', label: 'User Profile & Security', icon: User },
    { id: 'config', label: 'System & DB Config', icon: Settings },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1.5rem 1rem'
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
        }}>
          <FileText size={22} />
        </div>
        <div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, color: 'white', lineHeight: 1.1 }}>
            AI Resume
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#a855f7', fontWeight: 600 }}>Craft Suite v1.2</span>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', padding: '0 0.75rem', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
          MAIN MENU
        </span>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 0.9rem',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))' : 'transparent',
                color: isActive ? '#f8fafc' : '#94a3b8',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent'
              }}>
              <Icon size={18} style={{ color: isActive ? '#a855f7' : '#64748b' }} />
              {item.label}
            </button>
          );
        })}

        {/* Section Rearranger Menu Button */}
        <button
          onClick={onOpenRearranger}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 0.9rem',
            marginTop: '0.5rem',
            borderRadius: '10px',
            border: '1px dashed rgba(168, 85, 247, 0.4)',
            background: 'rgba(168, 85, 247, 0.1)',
            color: '#c084fc',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
          <Layers size={18} style={{ color: '#c084fc' }} />
          Rearrange Sections
        </button>
      </nav>

      {/* Bottom User Card */}
      <div style={{
        marginTop: 'auto',
        background: '#1e293b',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '1rem'
          }}>
            {currentUser?.fullName ? currentUser.fullName.charAt(0) : 'S'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.fullName || 'Sarbajit Roy'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#a855f7', fontWeight: 600 }}>
              Role: {currentUser?.role || 'ADMIN'}
            </div>
          </div>
        </div>

        <button
          onClick={onSignOut}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            width: '100%', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5',
            borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer'
          }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
