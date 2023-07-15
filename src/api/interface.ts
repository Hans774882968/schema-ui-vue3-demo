export type CommonResp<T> = {
  retcode: number,
  message: string,
  data: T
}

export type CommonTableResp<T> = CommonResp<{
  list: T,
  total: number
}>
