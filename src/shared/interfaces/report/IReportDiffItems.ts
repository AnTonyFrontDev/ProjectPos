export interface IReportDiffItems {
  idProd: number
  productName: string
  missingSizes: number[]
  missingColors: MissingColors
  completed: boolean
  itemsToComplete: number
  sizes: Size[]
}

export interface MissingColors {
  primary: number[]
  secondary: number[]
}

export interface Size {
  size: string
  fkcategorysize: number
  categorySize: any
  id: number
  createD_AT: string
  modifieD_AT: any
  useR_MOD: any
  useR_CREATED: number
  removed: boolean
}
