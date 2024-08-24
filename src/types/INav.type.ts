export interface INav {
  name: string
  path: string
}

export interface IUserNav {
  name: string
  path: string
  main: string
  icon: any
  hasChild: boolean
  child?: INav[]
}
