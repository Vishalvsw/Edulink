import { MOCK_APPLICATIONS, MOCK_CHART_DATA, MOCK_COURSES, MOCK_STATS, SAMPLE_USER } from "../constants";
import { User, UserRole, Application, Course } from "../types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (role: UserRole): Promise<User> => {
    await delay(800);
    return {
      ...SAMPLE_USER,
      name: role === UserRole.ADMIN ? 'Super Admin' : role === UserRole.AGENT ? 'Agent Smith' : 'Rahul Student',
      role: role
    };
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
  getChartData: async () => {
    await delay(400);
    return MOCK_CHART_DATA;
  },
  getCourses: async (): Promise<Course[]> => {
    await delay(700);
    return MOCK_COURSES;
  }
};