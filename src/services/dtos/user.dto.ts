import { PaginatedListMeta } from 'types/general.type'
import { WorkspaceDto } from './workspace.dto'

export interface CreateUserResponseDto {
  authorization_url: string
  access_code: string
  reference: string
}

export interface UserInfoDto {
  id: number | null
  accountId: number | null
  workspaceId: number | null
  name: string
  emailAddress: string
  accountType: string
  accountStatus: string
  accountRole: string
  avatarColor: string
  accountVerify: boolean
  tnc: boolean
  twoFAEnabled: boolean
  isGoogle: boolean
  isMicrosoft: boolean
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  isDecryptionPassword: boolean,
  workspace: WorkspaceDto
}

export interface UserType {
  data: UserInfoDto[]
  meta: PaginatedListMeta
}

export const initialUserValue = {
  id: null,
  accountId: null,
  workspaceId: null,
  name: '',
  emailAddress: '',
  accountType: '',
  accountStatus: '',
  accountRole: '',
  accountVerify: false,
  tnc: false,
  twoFAEnabled: false,
  isGoogle: false,
  isMicrosoft: false,
  isDecryptionPassword: false,
  createdAt: '',
  avatarColor: '',
  updatedAt: '',
  deletedAt: '',
  workspace: {
    id: null,
    workspaceId: "",
    workspaceName: "",
    emailAddress: "",
    slug: "",
    createdAt: "",
    updatedAt: '',
    deletedAt: ''
  }
}

export interface CreateUserDto {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  branchId: number
  businessId: number
}
export interface CreateBulkUserDto {
  users: {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    branchId: number
    businessId: number
  }[]
}

export interface Activity {
  id: number
  userId: number
  userName: string
  message: string
  link: string
  createdAt: string
}

export interface PersonalInfoDto {
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface UserPasswordDto {
  password: string
  oldPassword: string
}

export interface UpdateUserDataDto {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  branchId: string
}

export interface BulkUsersDto {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  branch: string
  branchId: number
}

export type UpdateInformationDto = {
  name: string;
};

export type ResetPasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
