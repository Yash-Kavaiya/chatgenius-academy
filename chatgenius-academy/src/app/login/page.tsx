"use client";
import { auth, provider } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;
    await signInWithEmailAndPassword(auth, email.value, password.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">ChatGenius Academy</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => signInWithPopup(auth, provider)}
          className="w-full mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}