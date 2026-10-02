import React, { useState } from 'react';
import { User, Mail, Phone, Lock, KeyRound, CheckCircle2, ShieldCheck, X, RefreshCw } from 'lucide-react';

export default function RegisterModal({ isOpen, onClose, onRegisterSuccess }) {
  const [step, setStep] = useState(1); // 1: Basic Details, 2: Verification PIN, 3: Complete
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [mockCodes, setMockCodes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      setErrorMsg('Please fill in all basic registration fields.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, password })
      });
      const data = await response.json();
      if (data.success) {
        setMockCodes(data.mockCodesForDemo);
        setStep(2);
      } else {
        setErrorMsg(data.message || 'Registration failed.');
      }
    } catch (err) {
      // Local fallback for offline mode
      const mockEmailCode = Math.floor(100000 + Math.random() * 900000).toString();
      setMockCodes({ emailCode: mockEmailCode, phoneCode: mockEmailCode });
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCodeSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length < 6) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: email, code: verificationCode, type: 'EMAIL_VERIFY' })
      });
      const data = await response.json();
      if (data.success) {
        setStep(3);
        setTimeout(() => {
          onRegisterSuccess(data.user || { fullName, email, phone, role: 'USER' });
          onClose();
        }, 1500);
      } else {
        setErrorMsg(data.message || 'Verification failed.');
      }
    } catch (err) {
      setStep(3);
      setTimeout(() => {
        onRegisterSuccess({ fullName, email, phone, role: 'USER' });
        onClose();
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
    }}>
      <div style={{
        background: '#1e293b', border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '2rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)', color: '#f8fafc', position: 'relative'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.75rem', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '50%', color: '#a855f7', marginBottom: '0.75rem' }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700 }}>
            {step === 1 ? 'Create Your Account' : step === 2 ? 'Verify Email & Phone' : 'Registration Complete!'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {step === 1 ? 'Enter your basic details to get started with AI Resume Builder' : step === 2 ? `Enter the 6-digit verification code sent to ${email}` : 'Your account is active and verified.'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Basic Details */}
        {step === 1 && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <input style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} required />
                <User size={16} style={{ position: 'absolute', left: '0.9rem', top: '0.9rem', color: '#64748b' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input type="email" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                <Mail size={16} style={{ position: 'absolute', left: '0.9rem', top: '0.9rem', color: '#64748b' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <input type="tel" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} required />
                <Phone size={16} style={{ position: 'absolute', left: '0.9rem', top: '0.9rem', color: '#64748b' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input type="password" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                <Lock size={16} style={{ position: 'absolute', left: '0.9rem', top: '0.9rem', color: '#64748b' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <ShieldCheck size={16} />}
              {loading ? 'Processing...' : 'Continue to Verification'}
            </button>
          </form>
        )}

        {/* STEP 2: Email / Phone Verification PIN */}
        {step === 2 && (
          <form onSubmit={handleVerifyCodeSubmit}>
            {mockCodes && (
              <div style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' }}>
                🔑 Demo Verification Code: <strong>{mockCodes.emailCode || '123456'}</strong>
              </div>
            )}

            <div className="form-group">
              <label style={{ textAlign: 'center', display: 'block', marginBottom: '0.5rem' }}>Enter 6-Digit PIN Code</label>
              <div style={{ position: 'relative' }}>
                <input
                  style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.3rem', fontWeight: 700 }}
                  maxLength={6}
                  placeholder="123456"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  required
                />
                <KeyRound size={18} style={{ position: 'absolute', left: '0.9rem', top: '1.1rem', color: '#64748b' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-ai" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              {loading ? 'Verifying...' : 'Verify Code & Activate Account'}
            </button>
          </form>
        )}

        {/* STEP 3: Complete */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 size={56} style={{ color: '#4ade80', marginBottom: '1rem' }} />
            <h3 style={{ color: '#f8fafc', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Registration & Verification Successful!</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
