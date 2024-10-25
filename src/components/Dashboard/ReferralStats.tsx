import React from 'react';
import { Users, CheckCircle, Clock, XCircle, TrendingUp, DollarSign } from 'lucide-react';

interface ReferralStatsProps {
  stats: {
    total: number;
    hired: number;
    inProgress: number;
    rejected: number;
  };
}

const statConfigs = [
  { 
    name: 'Total Referrals', 
    key: 'total', 
    icon: Users, 
    color: 'bg-blue-500',
    ringColor: 'ring-blue-600/20',
    iconBg: 'bg-blue-100',
    trend: '+12% from last month'
  },
  { 
    name: 'Hired', 
    key: 'hired', 
    icon: CheckCircle, 
    color: 'bg-green-500',
    ringColor: 'ring-green-600/20',
    iconBg: 'bg-green-100',
    trend: '+5% success rate'
  },
  { 
    name: 'In Progress', 
    key: 'inProgress', 
    icon: Clock, 
    color: 'bg-yellow-500',
    ringColor: 'ring-yellow-600/20',
    iconBg: 'bg-yellow-100',
    trend: '7 day avg. time'
  },
  { 
    name: 'Rewards Earned', 
    key: 'rewards',
    value: '$3,500',
    icon: DollarSign, 
    color: 'bg-purple-500',
    ringColor: 'ring-purple-600/20',
    iconBg: 'bg-purple-100',
    trend: '+$1,200 this quarter'
  },
];

export default function ReferralStats({ stats }: ReferralStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statConfigs.map((stat) => (
        <div 
          key={stat.name} 
          className="bg-white overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-200 
            hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-xl ${stat.iconBg} p-3 ring-1 ${stat.ringColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value || stats[stat.key as keyof typeof stats]}
                    </div>
                  </dd>
                  <dd className="flex items-center text-xs text-gray-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    {stat.trend}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}