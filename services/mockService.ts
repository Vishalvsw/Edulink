import { MOCK_APPLICATIONS, MOCK_CHART_DATA, MOCK_COURSES, MOCK_STATS, MOCK_AGENT_STATS, SAMPLE_USER } from "../constants";
import { User, UserRole, Application, Course, AgentStats, ApplicationStatus, DashboardStats } from "../types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'edulink_applications';

// Helper to get apps from storage or initialize with default
const getStoredApplications = (): Application[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize storage with mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_APPLICATIONS));
  return MOCK_APPLICATIONS;
};

export const authService = {
  login: async (role: UserRole): Promise<User> => {
    await delay(800);
    return {
      ...SAMPLE_USER,
      name: role === UserRole.ADMIN ? 'Super Admin' : role === UserRole.AGENT ? 'Agent Smith' : 'John Doe',
      role: role
    };
  },
  signupAgent: async (data: any): Promise<boolean> => {
    await delay(1200);
    console.log("Registered new agent:", data);
    return true;
  }
};

export const dataService = {
  getStats: async (): Promise<DashboardStats> => {
    await delay(500);
    const apps = getStoredApplications();
    
    // Dynamic calculation based on active data
    const pendingReview = apps.filter(a => a.status === ApplicationStatus.SUBMITTED || a.status === ApplicationStatus.UNDER_REVIEW).length;
    const totalApps = apps.length;
    // Estimate revenue based on approved apps (avg fee 1 Lakh for demo)
    const approvedCount = apps.filter(a => a.status === ApplicationStatus.APPROVED || a.status === ApplicationStatus.ENROLLED).length;
    const revenue = approvedCount * 50000 + 4500000; // Base + dynamic

    return {
      ...MOCK_STATS,
      totalApplications: totalApps,
      pendingReview: pendingReview,
      totalRevenue: revenue
    };
  },

  getRecentApplications: async (): Promise<Application[]> => {
    await delay(600);
    const apps = getStoredApplications();
    // Return most recent first
    return apps.slice(0, 10);
  },

  getAllApplications: async (): Promise<Application[]> => {
    await delay(800);
    return getStoredApplications();
  },

  createApplication: async (appData: Partial<Application>): Promise<boolean> => {
    await delay(1000);
    const apps = getStoredApplications();
    
    const newApp: Application = {
      id: `APP-${Math.floor(Math.random() * 10000)}`,
      studentName: appData.studentName || 'John Doe',
      courseTitle: appData.courseTitle || 'General Course',
      appliedDate: new Date().toISOString().split('T')[0],
      status: ApplicationStatus.SUBMITTED,
      progress: 20,
      ...appData
    } as Application;

    // Add to beginning of list
    const updatedApps = [newApp, ...apps];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    return true;
  },

  updateApplicationStatus: async (id: string, status: ApplicationStatus): Promise<boolean> => {
    await delay(600);
    const apps = getStoredApplications();
    const updatedApps = apps.map(app => {
      if (app.id === id) {
        // Update progress based on status
        let newProgress = app.progress;
        if (status === ApplicationStatus.UNDER_REVIEW) newProgress = 50;
        if (status === ApplicationStatus.APPROVED) newProgress = 80;
        if (status === ApplicationStatus.ENROLLED) newProgress = 100;
        if (status === ApplicationStatus.REJECTED) newProgress = 100;

        return { ...app, status, progress: newProgress };
      }
      return app;
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    return true;
  },

  getChartData: async () => {
    await delay(400);
    return MOCK_CHART_DATA;
  },

  getCourses: async (): Promise<Course[]> => {
    await delay(700);
    return MOCK_COURSES;
  },

  getAgentStats: async (): Promise<AgentStats> => {
    await delay(500);
    const apps = getStoredApplications();
    const totalLeads = apps.length; // Simplified for demo
    const conversions = apps.filter(a => a.status === ApplicationStatus.ENROLLED).length;

    return {
      ...MOCK_AGENT_STATS,
      totalLeads: Math.max(totalLeads, MOCK_AGENT_STATS.totalLeads),
      conversions: Math.max(conversions, MOCK_AGENT_STATS.conversions)
    };
  }
};