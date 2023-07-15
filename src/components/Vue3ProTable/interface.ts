export interface Vue3ProTable {
  request?: (...args: any[]) => Promise<{ data: object[], total: number }>
  // 表格标题
  title?: string
  // 是否隐藏标题栏
  hideTitleBar?: boolean
  // 搜索表单配置，false表示不显示搜索表单
  search?: boolean | object
  border?: boolean
  // 表头配置
  columns?: object[]
  // 行数据的Key，同elementUI的table组件的row-key
  rowKey?: string
  // 分页配置，false表示不显示分页
  pagination?: boolean | object
  tree?: object
  loadTableDataBeforeMount?: boolean
  blockRedundantRequestOnReset?: boolean
}
