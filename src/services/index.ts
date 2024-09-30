import axios, { InternalAxiosRequestConfig } from 'axios'
import AuthService from './authentication'
import UserService from './user';
import WorkspaceService from './workspace';
import { Usage } from 'types/user.type';
import TeamService from './team';
import ProjectService from './project';
import EnvironmentService from './environment';
import SettingsService from './settings';

export const baseService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true,
  timeout: 40000,

})

baseService.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>) => {
    request.headers['Usage'] = Usage.API;
    return request;
  },
  (error) => error
);

export const services = {
  authService: new AuthService(baseService),
  userService: new UserService(baseService),
  workspaceService: new WorkspaceService(baseService),
  teamService: new TeamService(baseService),
  projectService: new ProjectService(baseService),
  environmentService: new EnvironmentService(baseService),
  settingsService: new SettingsService(baseService),
}
