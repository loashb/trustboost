// File: src/app/auth/update-password/page.js
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    // Supabase knows who the user is because they arrived from the secure email link.
    // This link contains a special token that authenticates them for this one action.
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      toast.error(`Error updating password: ${error.message}`);
    } else {
      toast.success('Password updated successfully! Redirecting to login...');
      // After a successful password update, it's good practice to log the user out
      // and have them log in again with their new password.
      await supabase.auth.signOut();
      router.push('/auth/login');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D0D0D', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '100%', maxWidth: '400px', background: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid #B57EDC30', borderRadius: '12px', padding: '30px'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '25px', textAlign: 'center' }}>Create a New Password</h2>
        <form onSubmit={handleUpdatePassword}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.taget.value)}
              required
              style={{
                width: '100%', background: '#1A2A38', border: '1px solid #B57EDC',
                borderRadius: '8px', padding: '10px', color: 'white'
              }}
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px' }}>Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}