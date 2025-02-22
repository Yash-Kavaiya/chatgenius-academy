"use client";
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">ChatGenius Academy</h1>
          <button 
            onClick={() => auth.signOut()}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Welcome {user?.displayName || 'User'}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course cards would go here */}
        </div>
      </main>
    </div>
  );
}