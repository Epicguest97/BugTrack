
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-gray-900 cursor-pointer" onClick={() => navigate('/')}>
                Issue Tracker
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium border-b-2 border-blue-500"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-gray-300"
                >
                  Projects
                </button>
                <button
                  onClick={() => navigate('/issues')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-gray-300"
                >
                  Issues
                </button>
                <button
                  onClick={() => navigate('/pull-requests')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-gray-300"
                >
                  Pull Requests
                </button>
                <button
                  onClick={() => navigate('/code')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-gray-300"
                >
                  Code
                </button>
                <button
                  onClick={() => navigate('/wiki')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-gray-300"
                >
                  Wiki
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-64 text-sm"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
