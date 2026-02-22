// Types for Sequential Phase Locking System

export type PhaseStatus = 'active' | 'pending' | 'locked' | 'unlocked';

export interface PhaseState {
  id: string;
  project_id: string;
  phase_name: string;
  phase_order: number;
  status: PhaseStatus;
  freelancer_approved: boolean;  // Freelancer approval for locking (Submission)
  client_approved: boolean;      // Client approval for locking
  locked_at: string | null;
  locked_by: string | null;
  submission_message?: string | null;
  submission_attachments?: any[] | null;
  rejection_feedback?: string | null;
  submitted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
  activePhaseName?: string;
  activePhaseOrder?: number;
}
