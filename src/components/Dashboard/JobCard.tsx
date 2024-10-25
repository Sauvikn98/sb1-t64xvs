import React from 'react';
import { Job } from '../../types';
import { MapPin, Clock, Building, ChevronRight } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onRefer: (jobId: string) => void;
}

export default function JobCard({ job, onRefer }: JobCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {job.title}
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Building className="h-4 w-4 mr-2 text-gray-400" />
              {job.department}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {job.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              Posted {job.postedDate}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center
          ${job.status === 'active' 
            ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20' 
            : 'bg-gray-100 text-gray-800 ring-1 ring-gray-600/20'}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
      <div className="mt-4">
        <button
          onClick={() => onRefer(job.id)}
          className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md border-2 border-indigo-600 
            hover:bg-indigo-600 hover:text-white transition-all duration-200 ease-in-out text-sm font-medium
            flex items-center justify-center group"
        >
          Refer a Candidate
          <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}