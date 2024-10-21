import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { BirdTypes } from './components/BirdTypes';
import { SelectedBirds } from './components/SelectedBirds';
import { HabitatsAndFood } from './components/HabitatsAndFood';
import { BirdSounds } from './components/BirdSounds';
import { BirdRecognition } from './components/BirdRecognition';
import { Forum } from './components/Forum';
import { Navigation } from './components/Navigation';
import supabase from './supabaseClient';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation session={session} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={!session ? <Home /> : <Navigate to="/bird-types" />} />
            <Route path="/bird-types" element={session ? <BirdTypes /> : <Navigate to="/" />} />
            <Route path="/selected-birds" element={session ? <SelectedBirds /> : <Navigate to="/" />} />
            <Route path="/habitats-and-food" element={session ? <HabitatsAndFood /> : <Navigate to="/" />} />
            <Route path="/bird-sounds" element={session ? <BirdSounds /> : <Navigate to="/" />} />
            <Route path="/bird-recognition" element={session ? <BirdRecognition /> : <Navigate to="/" />} />
            <Route path="/forum" element={session ? <Forum /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;