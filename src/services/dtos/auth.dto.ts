export interface LoginDto {
  emailAddress: string
  password: string
}

export interface ValidateEmailDto {
  emailAddress: string
}

export interface PersonalInfoDto {
  emailAddress: string
  firstName: string
  lastName: string
  policyNumber: string
  gender: string
  dateOfBirth: Date
}

export interface SetupDto {
  emailAddress: string
  password: string
  name: string
  accountType: string
}

export interface ResetPasswordDto {
  emailAddress: string
  password: string
  token: string
}
