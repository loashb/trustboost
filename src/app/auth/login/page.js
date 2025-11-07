// File: src/app/auth/login/page.js
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // <-- IMPORT LINK

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login to TrustBoost</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            {/* ... email input ... */}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password" name="password" type="password" required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)} value={password}
            />
            {/* --- ADD THIS LINK --- */}
            <div className="text-right mt-2">
              <Link href="/auth/forgot-password" legacyBehavior>
                <a className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
              </Link>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}