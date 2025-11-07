// File: src/app/auth/forgot-password/page.js
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const supabase = createClientComponentClient();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    // This is the page the user will be sent to after clicking the email link
    const redirectTo = `${window.location.origin}/auth/update-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });

    setLoading(false);

    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      // For security, we show a success message even if the email doesn't exist
      setSubmitted(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D0D0D', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '100%', maxWidth: '400px', background: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid #B57EDC30', borderRadius: '12px', padding: '30px'
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Check your email</h2>
            <p style={{ color: '#ccc' }}>
              If an account with that email exists, we have sent a link to reset your password.
            </p>
            <Link href="/auth/login" style={{
              display: 'inline-block', marginTop: '20px', color: '#B57EDC',
              textDecoration: 'none'
            }}>
              &larr; Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '24px', marginBottom: '10px', textAlign: 'center' }}>Forgot Password</h2>
            <p style={{ color: '#ccc', textAlign: 'center', marginBottom: '25px' }}>
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handlePasswordReset}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%', background: '#1A2A38', border: '1px solid #B57EDC',
                    borderRadius: '8px', padding: '10px', color: 'white'
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', background: loading ? '#555' : '#B57EDC',
                  color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '500'
                }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}