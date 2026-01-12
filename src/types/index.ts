export interface LeaveRequest {
  id: string;
  name: string;
  contact: string;
  startDate: string;
  endDate: string;
  reason?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  contact: string;
  leaves: LeaveRequest[];
}

export type ViewMode = 'calendar' | 'list';

