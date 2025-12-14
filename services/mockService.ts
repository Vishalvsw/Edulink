import { MOCK_APPLICATIONS, MOCK_CHART_DATA, MOCK_COURSES, MOCK_STATS, MOCK_AGENT_STATS, SAMPLE_USER } from "../constants";
import { User, UserRole, Application, Course, AgentStats, ApplicationStatus } from "../types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (role: UserRole): Promise<User> => {
    await delay(800);
    return {
      ...SAMPLE_USER,
      name: role === UserRole.ADMIN ? 'Super Admin' : role === UserRole.AGENT ? 'Agent Smith' : 'Rahul Student',
      role: role
    };
  },
  signupAgent: async (data: any): Promise<boolean> => {
    await delay(1200);
    // In a real application, you would POST to an API here
    console.log("Registered new agent:", data);
    return true;
  }
};

export const dataService = {
  getStats: async () => {
    await delay(500);
    return MOCK_STATS;
  },
  getRecentApplications: async (): Promise<Application[]> => {
    await delay(600);
    return MOCK_APPLICATIONS;
  },
  getAllApplications: async (): Promise<Application[]> => {
    await delay(800);
    // Returning the same mock data, but in a real app this might be paginated
    return [...MOCK_APPLICATIONS, ...MOCK_APPLICATIONS]; 
  },
  updateApplicationStatus: async (id: string, status: ApplicationStatus): Promise<boolean> => {
    await delay(600);
    console.log(`Updated app ${id} to ${status}`);
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
    return MOCK_AGENT_STATS;
  }
};