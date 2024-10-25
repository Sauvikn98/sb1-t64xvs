import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { User as UserType } from '../types';

const mockUser: UserType = {
  name: 'Sarah Wilson',
  email: 'sarah.wilson@company.com',
  department: 'Engineering',
  role: 'employee',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
};

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button type="button" className="text-gray-500 hover:text-gray-600 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <h1 className="text-xl font-bold text-gray-900">TalentBridge</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button type="button" className="text-gray-500 hover:text-gray-600">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={mockUser.avatar}
                alt={mockUser.name}
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">{mockUser.name}</p>
                <p className="text-xs text-gray-500">{mockUser.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}