import React from 'react';
import { Search, Filter } from 'lucide-react';

interface JobFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

const departments = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
const locations = ['All', 'Remote', 'New York, NY', 'San Francisco, CA', 'London, UK'];

export default function JobFilters({
  searchTerm,
  onSearchChange,
  department,
  onDepartmentChange,
  location,
  onLocationChange,
}: JobFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search positions..."
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="w-48">
            <select
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="w-48">
            <select
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <Filter className="h-4 w-4 mr-1" />
        <span>Showing {department === 'All' ? 'all departments' : department} in {location === 'All' ? 'all locations' : location}</span>
      </div>
    </div>
  );
}