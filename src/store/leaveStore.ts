'use client';

import { create } from 'zustand';
import { LeaveRequest } from '@/types';

interface LeaveStore {
  leaves: LeaveRequest[];
  isLoading: boolean;
  error: string | null;
  fetchLeaves: () => Promise<void>;
  addLeave: (leave: Omit<LeaveRequest, 'id' | 'createdAt'>) => Promise<void>;
  removeLeave: (id: string) => Promise<void>;
  updateLeave: (id: string, leave: Partial<LeaveRequest>) => Promise<void>;
  getLeavesByDate: (date: string) => LeaveRequest[];
  getLeavesByMember: (name: string) => LeaveRequest[];
}

export const useLeaveStore = create<LeaveStore>()((set, get) => ({
  leaves: [],
  isLoading: false,
  error: null,

  fetchLeaves: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/leaves');
      if (!response.ok) throw new Error('Failed to fetch leaves');
      const leaves = await response.json();
      set({ leaves, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addLeave: async (leave) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leave),
      });
      if (!response.ok) throw new Error('Failed to create leave');
      const newLeave = await response.json();
      set((state) => ({
        leaves: [newLeave, ...state.leaves],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  removeLeave: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/leaves/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete leave');
      set((state) => ({
        leaves: state.leaves.filter((leave) => leave.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateLeave: async (id, updatedLeave) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/leaves/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLeave),
      });
      if (!response.ok) throw new Error('Failed to update leave');
      const updated = await response.json();
      set((state) => ({
        leaves: state.leaves.map((leave) =>
          leave.id === id ? updated : leave
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getLeavesByDate: (date) => {
    const leaves = get().leaves;
    return leaves.filter((leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const target = new Date(date);
      return target >= start && target <= end;
    });
  },

  getLeavesByMember: (name) => {
    return get().leaves.filter(
      (leave) => leave.name.toLowerCase() === name.toLowerCase()
    );
  },
}));
