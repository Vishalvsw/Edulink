import { Application, ApplicationStatus, Course, DashboardStats, UserRole } from "./types";

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'B.Sc. Nursing',
    code: 'NUR-101',
    college: 'City Medical Institute',
    duration: '4 Years',
    fees: 450000,
    seats: 60,
    image: 'https://picsum.photos/400/250?random=1'
  },
  {
    id: 'c2',
    title: 'Computer Science Engineering',
    code: 'CSE-404',
    college: 'Tech Valley University',
    duration: '4 Years',
    fees: 600000,
    seats: 120,
    image: 'https://picsum.photos/400/250?random=2'
  },
  {
    id: 'c3',
    title: 'Master of Business Administration',
    code: 'MBA-202',
    college: 'Global School of Business',
    duration: '2 Years',
    fees: 800000,
    seats: 45,
    image: 'https://picsum.photos/400/250?random=3'
  },
  {
    id: 'c4',
    title: 'Diploma in Pharmacy',
    code: 'DPH-102',
    college: 'City Medical Institute',
    duration: '2 Years',
    fees: 250000,
    seats: 30,
    image: 'https://picsum.photos/400/250?random=4'
  }
];

export const MOCK_STATS: DashboardStats = {
  totalApplications: 1248,
  totalRevenue: 4500000,
  pendingReview: 34,
  activeAgents: 12
};

export const MOCK_APPLICATIONS: Application[] = [
  { id: 'app-001', studentName: 'Rahul Sharma', courseTitle: 'B.Sc. Nursing', appliedDate: '2023-10-15', status: ApplicationStatus.APPROVED, progress: 100 },
  { id: 'app-002', studentName: 'Priya Verma', courseTitle: 'MBA', appliedDate: '2023-10-18', status: ApplicationStatus.UNDER_REVIEW, progress: 60 },
  { id: 'app-003', studentName: 'Amit Patel', courseTitle: 'Computer Science', appliedDate: '2023-10-20', status: ApplicationStatus.SUBMITTED, progress: 40 },
  { id: 'app-004', studentName: 'Sneha Gupta', courseTitle: 'Diploma Pharmacy', appliedDate: '2023-10-21', status: ApplicationStatus.FEE_PENDING, progress: 90 },
  { id: 'app-005', studentName: 'Vikram Singh', courseTitle: 'B.Sc. Nursing', appliedDate: '2023-10-22', status: ApplicationStatus.REJECTED, progress: 100 },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 20 },
  { name: 'Apr', value: 27 },
  { name: 'May', value: 18 },
  { name: 'Jun', value: 23 },
  { name: 'Jul', value: 34 },
  { name: 'Aug', value: 60 },
  { name: 'Sep', value: 90 },
  { name: 'Oct', value: 120 },
];

export const SAMPLE_USER = {
  id: 'u1',
  name: 'Demo User',
  email: 'user@edulink.com',
  role: UserRole.GUEST,
  avatar: 'https://picsum.photos/100/100'
};