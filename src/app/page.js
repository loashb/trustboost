// File: src/app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D0D0D',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#B57EDC' }}>
        Welcome to TrustBoost
      </h1>
      <p style={{ fontSize: '20px', color: '#ccc', marginTop: '20px', maxWidth: '600px' }}>
        The AI-powered review management platform for modern Swedish businesses.
      </p>
      <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
        <Link href="/auth/login" style={{
          background: '#B57EDC', color: 'white', padding: '12px 24px',
          borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold'
        }}>
          Business Login
        </Link>
        <Link href="/auth/register" style={{
          border: '1px solid #B57EDC', color: '#B57EDC', padding: '12px 24px',
          borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold'
        }}>
          Register
        </Link>
      </div>
    </div>
  );
}