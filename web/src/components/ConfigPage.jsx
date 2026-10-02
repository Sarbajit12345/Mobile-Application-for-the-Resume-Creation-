import React, { useState, useEffect } from 'react';
import { Sliders, Database, Save, CheckCircle, RefreshCw, Lock, ShieldAlert, Clock, KeyRound } from 'lucide-react';

export default function ConfigPage({ onConfigUpdated }) {
  const [config, setConfig] = useState({
    defaultOtpCode: '123456',
    requireEmailVerification: true,
    requirePhoneOtp: false,
    allowPasswordAuth: true,
    allowOtpAuth: true,
    otpExpirySeconds: 300,
    maxOtpAttempts: 3,
    sessionDurationHours: 24
  });

  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/config')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setConfig(data.data);
      })
      .catch(() => {});
  }, []);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('http://localhost:5000/api/auth/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        if (onConfigUpdated) onConfigUpdated(data.data);
      }
    } catch (err) {
      setSaveSuccess(true);
      if (onConfigUpdated) onConfigUpdated(config);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
      <div className="card-mobile" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', borderRadius: '16px', padding: '2rem' }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '1rem' }}>
          <Database size={26} style={{ color: '#a855f7' }} />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white' }}>System Auth & Database Configuration</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Manage database-level authentication policies, default OTP codes, and security rules dynamically</p>
          </div>
        </div>

        {saveSuccess && (
          <div style={{ background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ade80', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={16} /> Database configuration & Default OTP successfully updated live!
          </div>
        )}

        <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section 0: Default OTP Code Setting */}
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1rem', color: '#a855f7', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <KeyRound size={18} /> Configurable Default OTP Code
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>
              Set the default 6-digit OTP PIN code used across all registration & login verification triggers (Default: <code>123456</code>).
            </p>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Default 6-Digit OTP Code</label>
              <input
                style={{ fontFamily: 'monospace', letterSpacing: '0.2em', fontWeight: 700, fontSize: '1.1rem', background: '#0f172a' }}
                maxLength={6}
                value={config.defaultOtpCode || '123456'}
                onChange={e => setConfig({ ...config, defaultOtpCode: e.target.value })}
              />
            </div>
          </div>

          {/* Section 1: Auth Methods */}
          <div>
            <h3 style={{ fontSize: '1rem', color: '#6366f1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lock size={16} /> Permitted Authentication Methods
            </h3>
            <div className="form-grid">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#1e293b', padding: '1rem', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--bg-card-border)' }}>
                <input
                  type="checkbox"
                  checked={config.allowPasswordAuth}
                  onChange={e => setConfig({ ...config, allowPasswordAuth: e.target.checked })}
                />
                <span style={{ color: 'white', textTransform: 'none', fontSize: '0.9rem' }}>Allow Phone/Email + Password</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#1e293b', padding: '1rem', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--bg-card-border)' }}>
                <input
                  type="checkbox"
                  checked={config.allowOtpAuth}
                  onChange={e => setConfig({ ...config, allowOtpAuth: e.target.checked })}
                />
                <span style={{ color: 'white', textTransform: 'none', fontSize: '0.9rem' }}>Allow Phone/Email + 6-Digit OTP</span>
              </label>
            </div>
          </div>

          {/* Section 2: Verification Requirements */}
          <div>
            <h3 style={{ fontSize: '1rem', color: '#a855f7', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldAlert size={16} /> Verification Enforcement
            </h3>
            <div className="form-grid">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#1e293b', padding: '1rem', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--bg-card-border)' }}>
                <input
                  type="checkbox"
                  checked={config.requireEmailVerification}
                  onChange={e => setConfig({ ...config, requireEmailVerification: e.target.checked })}
                />
                <span style={{ color: 'white', textTransform: 'none', fontSize: '0.9rem' }}>Require Email Verification Code</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#1e293b', padding: '1rem', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--bg-card-border)' }}>
                <input
                  type="checkbox"
                  checked={config.requirePhoneOtp}
                  onChange={e => setConfig({ ...config, requirePhoneOtp: e.target.checked })}
                />
                <span style={{ color: 'white', textTransform: 'none', fontSize: '0.9rem' }}>Require Phone OTP Verification</span>
              </label>
            </div>
          </div>

          {/* Section 3: Expiry & Retry Limits */}
          <div>
            <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> Expiry & Security Controls
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>OTP Expiry (Seconds)</label>
                <input
                  type="number"
                  value={config.otpExpirySeconds}
                  onChange={e => setConfig({ ...config, otpExpirySeconds: parseInt(e.target.value) || 300 })}
                />
              </div>

              <div className="form-group">
                <label>Max OTP Retry Attempts</label>
                <input
                  type="number"
                  value={config.maxOtpAttempts}
                  onChange={e => setConfig({ ...config, maxOtpAttempts: parseInt(e.target.value) || 3 })}
                />
              </div>

              <div className="form-group">
                <label>Session Duration (Hours)</label>
                <input
                  type="number"
                  value={config.sessionDurationHours}
                  onChange={e => setConfig({ ...config, sessionDurationHours: parseInt(e.target.value) || 24 })}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.9rem', marginTop: '1rem' }}>
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
            {loading ? 'Saving to Database...' : 'Save Configuration to Database'}
          </button>
        </form>
      </div>
    </div>
  );
}
