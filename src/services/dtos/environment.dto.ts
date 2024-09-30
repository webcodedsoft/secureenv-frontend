import { PaginatedListMeta } from 'types/general.type'
import { ProjectDaum } from './project.dto'
import { UserInfoDto } from './user.dto'

export interface EnvironmentDto {
  id: number
  enviromentId: string
  projectId: number
  workspaceId: number
  userId: number
  environmentName: string
  environmentSlug: string
  commitCount: number
  variables: any
  isActive: boolean
  isLocked: boolean
  createdAt: string
  updatedAt: any
  deletedAt: any
  project: ProjectDaum
}
export interface SaveEnvDto {
  environmentId: number
  projectId: number
  currentEnvVersion: number
  env: any
}

export type DecryptionPasswordDto = {
  environmentId: number
  projectId: number
  password: string;
};

export type CreateNoteDto = {
  text: string
  range: any
  note: string;
  environmentId: number
  projectId: number
};

export interface NoteType {
  data: NoteDaum[]
  meta: PaginatedListMeta
}

export interface NoteDaum {
  id: number
  noteId: string
  projectId: number
  workspaceId: number
  userId: number
  environmentId: number
  text: string
  range: string
  note: string
  createdAt: string
  updatedAt: any
  deletedAt: any
  user: UserInfoDto
}

export interface Meta {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
