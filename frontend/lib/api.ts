import axios from 'axios';
import { TeamMember, TeamMemberCreate, TeamMemberUpdate } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL + '/api',
});

export const api = {
  async getTeamMembers(): Promise<TeamMember[]> {
    const response = await axiosInstance.get('/team');
    return response.data;
  },

  async createTeamMember(data: TeamMemberCreate): Promise<TeamMember> {
    const response = await axiosInstance.post('/team', data);
    return response.data;
  },

  async updateTeamMember(
    id: string,
    data: TeamMemberUpdate,
  ): Promise<TeamMember> {
    const response = await axiosInstance.put(`/team/${id}`, data);
    return response.data;
  },

  async deleteTeamMember(id: string): Promise<void> {
    await axiosInstance.delete(`/team/${id}`);
  },
};
