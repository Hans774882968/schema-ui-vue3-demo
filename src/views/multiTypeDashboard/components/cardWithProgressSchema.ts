import { Percent } from './multiProgress';

export interface ProgressSchema {
  title: {
    text?: string | number
    tips?: string | number
    data?: string | number
  }
  progress?: Percent[]
}
