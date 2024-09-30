import { PaginatedListMeta } from 'types/general.type'

export interface CreateTeamDto {
  teamMembers: TeamMember[]
}

export interface TeamMember {
  emailAddress: string
  role: Role
}

export interface Role {
  label: string
  value: string
}

export interface TeamType {
  data: TeamDaum[]
  meta: PaginatedListMeta
}

export interface TeamDaum {
  id: number
  accountId: string
  workspaceId: number
  name: string
  emailAddress: string
  accountType: string
  accountStatus: string
  accountRole: string
  accountVerify: boolean
  tnc: boolean
  rememberToken: string
  avatarColor: string
  twoFAEnabled: boolean
  isGoogle: boolean
  isMicrosoft: boolean
  createdAt: string
  updatedAt: any
  deletedAt: any
}

export type SetupInviteDto = {
  name: string
  emailAddress: string
  token: string
  password: string
}
