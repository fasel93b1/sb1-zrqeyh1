import React, { useState } from 'react';
import { User, Lock, Facebook, Mail } from 'lucide-react';
import supabase from '../supabaseClient';

export const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log('User logged in:', data);
      // TODO: Redirect user or update UI
    } catch (error) {
      console.error('Error logging in:', error);
      // TODO: Show error message to user
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
      // Redirect will be handled by Supabase
    } catch (error) {
      console.error('Error logging in with Google:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Welcome to World of Birds</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center border-b border-blue-500 py-2">
            <Mail className="text-blue-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border-b border-blue-500 py-2">
            <Lock className="text-blue-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Or login with:</p>
          <div className="flex space-x-4">
            <button
              onClick={handleGoogleLogin}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <Mail size={16} className="mr-2" />
              Google
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">Forgot Password?</a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-blue-500 hover:text-blue-700">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};