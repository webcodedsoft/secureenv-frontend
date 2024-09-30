export interface INav {
  name: string
  path: string
  id: number
}

export interface IUserNav {
  id: number
  name: string
  path: string
  main: string
  icon: any
  hasChild: boolean
  child?: INav[]
  isGeneral: boolean
}
