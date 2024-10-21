import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bird, LogOut } from 'lucide-react';
import supabase from '../supabaseClient';

export const Navigation: React.FC<{ session: any }> = ({ session }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Bird size={24} />
          <span>World of Birds</span>
        </Link>
        {session && (
          <ul className="flex space-x-4 items-center">
            <li><Link to="/bird-types" className="hover:text-blue-200">Bird Types</Link></li>
            <li><Link to="/selected-birds" className="hover:text-blue-200">Selected Birds</Link></li>
            <li><Link to="/habitats-and-food" className="hover:text-blue-200">Habitats & Food</Link></li>
            <li><Link to="/bird-sounds" className="hover:text-blue-200">Bird Sounds</Link></li>
            <li><Link to="/bird-recognition" className="hover:text-blue-200">Bird Recognition</Link></li>
            <li><Link to="/forum" className="hover:text-blue-200">Forum</Link></li>
            <li>
              <button onClick={handleLogout} className="flex items-center hover:text-blue-200">
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};