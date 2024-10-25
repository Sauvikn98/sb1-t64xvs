import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ReferralStats from './components/Dashboard/ReferralStats';
import JobCard from './components/Dashboard/JobCard';
import ReferralTable from './components/Dashboard/ReferralTable';
import ReferralModal from './components/Dashboard/ReferralModal';
import ReferralProgress from './components/Dashboard/ReferralProgress';
import JobFilters from './components/Dashboard/JobFilters';
import LoginPage from './components/Auth/LoginPage';
import OnboardingModal from './components/Auth/OnboardingModal';
import { Job, Referral } from './types';

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '2 days ago',
    status: 'active',
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    postedDate: '1 week ago',
    status: 'active',
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    postedDate: '3 days ago',
    status: 'active',
  },
];

const initialReferrals: Referral[] = [
  {
    id: '1',
    candidateName: 'John Smith',
    position: 'Senior Frontend Developer',
    status: 'reviewing',
    date: 'Mar 10, 2024',
    resume: '#',
  },
  {
    id: '2',
    candidateName: 'Emma Johnson',
    position: 'Product Manager',
    status: 'hired',
    date: 'Mar 8, 2024',
    resume: '#',
  },
  {
    id: '3',
    candidateName: 'Michael Brown',
    position: 'UX Designer',
    status: 'pending',
    date: 'Mar 7, 2024',
    resume: '#',
  },
];

function App() {
  const { user, isLoading } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedReferral, setSelectedReferral] = useState<string | null>('1'); // For demo, showing first referral

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const handleRefer = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsModalOpen(true);
    }
  };

  const handleSubmitReferral = (candidateName: string, resume: File) => {
    if (selectedJob) {
      const newReferral: Referral = {
        id: String(Date.now()),
        candidateName,
        position: selectedJob.title,
        status: 'pending',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        resume: URL.createObjectURL(resume),
      };

      setReferrals([newReferral, ...referrals]);
      setIsModalOpen(false);
      setSelectedJob(null);
      setSelectedReferral(newReferral.id);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const stats = {
    total: referrals.length,
    hired: referrals.filter((r) => r.status === 'hired').length,
    inProgress: referrals.filter((r) => ['pending', 'reviewing', 'interviewed'].includes(r.status)).length,
    rejected: referrals.filter((r) => r.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <main className="lg:pl-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
            
            <div className="mt-6">
              <ReferralStats stats={stats} />
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Open Positions</h2>
                <span className="text-sm text-gray-500">{filteredJobs.length} positions available</span>
              </div>
              
              <JobFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                department={selectedDepartment}
                onDepartmentChange={setSelectedDepartment}
                location={selectedLocation}
                onLocationChange={setSelectedLocation}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onRefer={handleRefer} />
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ReferralTable referrals={referrals} />
              </div>
              <div className="lg:col-span-1">
                {selectedReferral && <ReferralProgress referralId={selectedReferral} />}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReferral}
        job={selectedJob}
      />
      
      <OnboardingModal />
    </div>
  );
}

export default App;