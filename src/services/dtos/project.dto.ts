import { PaginatedListMeta } from 'types/general.type'
import { UserInfoDto } from './user.dto'
import { EnvironmentDto } from './environment.dto'

export interface CreateProjectDto {
  language: string
  projectName: string
  repositoryUrl: string
  isRequireEncyptPassword: boolean
}

export interface ProjectDto {
  data: ProjectDaum[]
  meta: PaginatedListMeta
}

export interface ProjectDaum {
  id: number
  projectId: string
  workspaceId: number
  userId: number
  contributorIds: any[]
  projectName: string
  envFileName: string
  projectSlug: string
  language: string
  repositoryUrl: string
  token: string
  isActive: boolean
  isLocked: boolean
  isRequireEncyptPassword: boolean
  createdAt: string
  updatedAt: any
  deletedAt: any
  environments: EnvironmentDto[]
  workspace: Workspace
  user: UserInfoDto
  comparison: {
    [key: string]: string[]
  }[]
}

export interface Workspace {
  id: number
  workspaceId: string
  workspaceName: string
  emailAddress: string
  slug: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Contributors {
  users: UserInfoDto[]
  total: number
  pageNum: number
  pageSize: number
  totalPages: number
}

export interface UpdateProjectDto {
  repositoryUrl: string
}
