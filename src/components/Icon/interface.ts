export interface IconProps {
  name: Icons
  height?: number
  width?: number
  fill?: string
  stroke?: string
}

export enum Icons {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Cancel = 'cancel',
  ActivityIndicator = 'activity-indicator',
  AddProject = 'add-project',
  NodeJs = 'nodejs',
  React = 'react',
  Python = 'python',
  Ruby = 'ruby',
  Go = 'go',
  PHP = 'php',
  CPlus = 'cplus',
  Swift = 'swift',
  TypeScript = 'typescript',
  Elixir = 'elixir',
  DotNet = 'dotnet',
  CSharp = 'csharp',
  Kotlin = 'kotlin',
  Java = 'java',
  Scala = 'scala',
  Required = 'required',
  Filter = 'filter',
  LongBackArrow = 'loan-back-arrow',
  Info = 'info',
  TwoFa = 'twofa',
  Integration = 'integration',
  Logout = 'logout',
  Settings = 'settings',
  Project = 'project'
}
