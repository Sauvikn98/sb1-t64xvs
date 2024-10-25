import React from 'react';
import { CheckCircle, Clock, User, FileText, CalendarCheck } from 'lucide-react';

interface Step {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'complete' | 'current' | 'upcoming';
}

interface ReferralProgressProps {
  referralId: string;
}

export default function ReferralProgress({ referralId }: ReferralProgressProps) {
  // Mock steps - in production, fetch from API based on referralId
  const steps: Step[] = [
    {
      id: '1',
      name: 'Referral Submitted',
      description: 'You referred John Smith for Senior Frontend Developer',
      icon: User,
      status: 'complete',
    },
    {
      id: '2',
      name: 'Resume Review',
      description: 'HR team is reviewing the candidate\'s qualifications',
      icon: FileText,
      status: 'complete',
    },
    {
      id: '3',
      name: 'Interview Process',
      description: 'Technical and cultural fit interviews',
      icon: Clock,
      status: 'current',
    },
    {
      id: '4',
      name: 'Decision',
      description: 'Final hiring decision and offer',
      icon: CalendarCheck,
      status: 'upcoming',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Referral Progress</h3>
      <div className="relative">
        {steps.map((step, stepIdx) => (
          <div key={step.id} className={`relative pb-8 ${stepIdx === steps.length - 1 ? '' : 'border-l-2'} ${
            step.status === 'complete' ? 'border-indigo-600' : 'border-gray-200'
          }`}>
            <div className="relative flex items-start group">
              <span className="h-9 flex items-center">
                <span className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full ${
                  step.status === 'complete' ? 'bg-indigo-600' :
                  step.status === 'current' ? 'bg-white border-2 border-indigo-600' :
                  'bg-white border-2 border-gray-300'
                }`}>
                  <step.icon className={`w-5 h-5 ${
                    step.status === 'complete' ? 'text-white' :
                    step.status === 'current' ? 'text-indigo-600' :
                    'text-gray-500'
                  }`} />
                </span>
              </span>
              <div className="ml-4 min-w-0">
                <div className="text-sm font-medium text-gray-900">{step.name}</div>
                <p className="text-sm text-gray-500">{step.description}</p>
                {step.status === 'complete' && (
                  <span className="inline-flex items-center mt-1 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}