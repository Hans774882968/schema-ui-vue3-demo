interface Title {
  text: string | number
  tips?: string
}

interface Link {
  text: string | number
  action?: () => unknown
}

interface Description {
  text: string | number
  number?: {
    value: string | number,
    strong?: boolean
  }
}

export interface InfoCardSchema {
  title?: Title
  link?: Link
  description?: Description
  style?: Record<string, string>
}
