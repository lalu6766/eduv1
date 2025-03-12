import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { useStore } from './lib/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Auth from './components/Auth';

function App() {
  const { user, setUser, setProfile } = useStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 w-full">
          <div className="p-4 md:p-8 pt-20 md:pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/forum"
                element={user ? <Forum /> : <Navigate to="/auth" replace />}
              />
              <Route path="/resources" element={<Resources />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;