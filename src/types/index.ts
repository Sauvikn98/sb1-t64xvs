export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  status: 'active' | 'closed';
}

export interface Referral {
  id: string;
  candidateName: string;
  position: string;
  status: 'pending' | 'reviewing' | 'interviewed' | 'hired' | 'rejected';
  date: string;
  resume: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  department: string;
  role: 'employee' | 'hr' | 'admin';
  avatar?: string;
  invitedBy?: string;
  inviteAccepted: boolean;
  createdAt: string;
}

export interface Invite {
  id: string;
  email: string;
  role: User['role'];
  department: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
  expiresAt: string;
}