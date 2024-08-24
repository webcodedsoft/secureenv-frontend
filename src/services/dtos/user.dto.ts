import { PaginatedListMeta } from 'types/general.type'
import { CompanyDto } from './company.dto'

export interface CreateUserResponseDto {
  authorization_url: string
  access_code: string
  reference: string
}

export interface UserInfoDto {
  id: number | null
  accountId: number | null
  companyId: number | null
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
  company: CompanyDto
}

export interface UserType {
  data: UserInfoDto[]
  meta: PaginatedListMeta
}

export const initialUserValue = {
  id: null,
  accountId: null,
  companyId: null,
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
  createdAt: '',
  avatarColor: '',
  updatedAt: '',
  deletedAt: '',
  company: {
    id: null,
    companyId: "",
    name: "",
    emailAddress: "",
    companyUrl: "",
    address: "",
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
