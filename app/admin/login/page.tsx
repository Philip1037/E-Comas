'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { setAdminAuthenticated, getStoredSettings, saveStoredSettings } from '@/lib/storage';
import { sendAdminPasswordResetEmail } from '@/lib/email';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Store, KeyRound, CheckCircle2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password flow states
  const [mode, setMode] = useState<'login' | 'forgot' | 'verify'>('login');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [activePin, setActivePin] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    const settings = getStoredSettings();
    setRecoveryEmail(settings.admin_recovery_email || 'philipbangura1037@gmail.com');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const settings = getStoredSettings();
    const validUsername = (settings.admin_username || 'admin@boutique.sl').toLowerCase().trim();
    const validPassword = settings.admin_password || 'admin123';

    if (
      email.toLowerCase().trim() === validUsername &&
      password === validPassword
    ) {
      setAdminAuthenticated(true);
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setError('Invalid admin credentials. Please verify your username/email and password.');
      setLoading(false);
    }
  };

  const handleRequestResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const settings = getStoredSettings();
    const registeredRecovery = (settings.admin_recovery_email || settings.admin_username || 'admin@boutique.sl').toLowerCase().trim();

    if (recoveryEmail.toLowerCase().trim() !== registeredRecovery && recoveryEmail.toLowerCase().trim() !== (settings.admin_username || '').toLowerCase().trim()) {
      setError(`Email "${recoveryEmail}" does not match the registered admin recovery email.`);
      setLoading(false);
      return;
    }

    // Generate 6-digit PIN
    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
    setActivePin(generatedPin);

    // Save token to settings
    settings.admin_reset_token = generatedPin;
    settings.admin_reset_expires = (Date.now() + 15 * 60 * 1000).toString();
    saveStoredSettings(settings);

    // Send reset email via API
    try {
      await sendAdminPasswordResetEmail(recoveryEmail.trim(), generatedPin, settings.brand_name);
      setSuccessMsg(`Verification code sent to ${recoveryEmail}. Please check your inbox.`);
      setMode('verify');
    } catch (err: any) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    const settings = getStoredSettings();
    if (inputPin.trim() !== activePin && inputPin.trim() !== settings.admin_reset_token) {
      setError('Invalid verification code. Please check your email and try again.');
      return;
    }

    // Update admin password
    settings.admin_password = newPassword.trim();
    delete settings.admin_reset_token;
    delete settings.admin_reset_expires;
    saveStoredSettings(settings);

    setPassword(newPassword.trim());
    setSuccessMsg('Password updated successfully! You can now log in with your new secret password.');
    setMode('login');
  };

  return (
    <div className="min-h-screen bg-[#121013] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <header className="p-6 flex items-center justify-between relative z-10 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-xs font-semibold">
          <Store className="w-4 h-4 text-[#c5a059]" />
          <span>&larr; Back to Storefront</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-[#c5a059]">
          <ShieldCheck className="w-4 h-4" />
          <span>Restricted Portal</span>
        </div>
      </header>

      {/* Login / Reset Card */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md bg-white/[0.06] border border-white/15 p-8 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center mx-auto">
              {mode === 'login' ? <ShieldCheck className="w-6 h-6" /> : <KeyRound className="w-6 h-6" />}
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#f5ebd7]">
              {mode === 'login' ? 'Maison Lumière Admin' : mode === 'forgot' ? 'Reset Admin Password' : 'Enter Verification PIN'}
            </h2>
            <p className="text-xs text-stone-400">
              {mode === 'login'
                ? 'Sign in to manage inventory, VIP broadcasts, and orders'
                : mode === 'forgot'
                ? 'We will send a 6-digit reset code to your admin recovery email'
                : 'Check your email inbox for your 6-digit verification code'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs text-center">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Mode 1: Standard Login */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
              {/* Dummy inputs to trap aggressive browser password managers (Chrome/Edge/Safari) */}
              <input type="text" name="fake_username_remember" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" readOnly />
              <input type="password" name="fake_password_remember" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" readOnly />

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Admin Email / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="admin_user_input_field"
                    required
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setSuccessMsg('');
                      setMode('forgot');
                    }}
                    className="text-[11px] text-[#c5a059] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    name="admin_secret_pass_field"
                    required
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secret password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
              </div>


              <button

                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#c5a059] hover:bg-[#ecd09f] text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#c5a059]/20 active:scale-98 cursor-pointer mt-2"
              >
                <span>{loading ? 'Authenticating...' : 'Enter Admin Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Mode 2: Request Reset PIN Email */}
          {mode === 'forgot' && (
            <form onSubmit={handleRequestResetCode} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Registered Recovery Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="admin@boutique.sl"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#c5a059] hover:bg-[#ecd09f] text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#c5a059]/20 active:scale-98 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{loading ? 'Sending Code...' : 'Send Password Reset PIN'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
                className="w-full text-xs text-stone-400 hover:text-white transition-colors text-center pt-1"
              >
                &larr; Back to Login
              </button>
            </form>
          )}

          {/* Mode 3: Verify PIN & Set New Password */}
          {mode === 'verify' && (
            <form onSubmit={handleConfirmResetPassword} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  placeholder="e.g. 884920"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Enter New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new secret password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-600/30 active:scale-98 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Save New Password &amp; Log In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
                className="w-full text-xs text-stone-400 hover:text-white transition-colors text-center pt-1"
              >
                &larr; Back to Login
              </button>
            </form>
          )}

          {/* Quick Demo Credentials Info */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-400 space-y-1">
            <div className="flex items-center gap-1 text-[#c5a059] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Security Reset Feature Active</span>
            </div>
            <p className="text-[11px] text-stone-400">
              Click &quot;Forgot Password?&quot; above to test sending a 6-digit recovery code to your email.
            </p>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="p-6 text-center text-xs text-stone-600">
        &copy; {new Date().getFullYear()} Maison Lumière &bull; Protected Management System
      </footer>
    </div>
  );
}
