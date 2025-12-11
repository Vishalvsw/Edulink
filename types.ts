export enum UserRole {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  STUDENT = 'STUDENT',
  GUEST = 'GUEST'
}

export enum ApplicationStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  FEE_PENDING = 'Fee Pending',
  ENROLLED = 'Enrolled'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  college: string;
  duration: string;
  fees: number;
  seats: number;
  image: string;
}

export interface Application {
  id: string;
  studentName: string;
  courseTitle: string;
  appliedDate: string;
  status: ApplicationStatus;
  progress: number; // 0-100
}

export interface DashboardStats {
  totalApplications: number;
  totalRevenue: number;
  pendingReview: number;
  activeAgents: number;
}