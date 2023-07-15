import {
  AdminDetailParams,
  AdminDetailResp,
  AgencyDetailParams,
  AgencyDetailResp,
  StationDetailParams,
  StationDetailResp,
  loadAdminDetailData,
  loadAdminOverallData,
  loadAgencyDetailData,
  loadAgencyOverallData,
  loadStationDetailData,
  loadStationOverallData,
} from '@/api/multiTypeDashboard';
import {
  ComputedRef, Ref, computed, ref,
} from 'vue';
import { ElMessage } from 'element-plus';
import { InfoCardSchema } from './components/infoCardSchema';
import { ProgressSchema } from './components/cardWithProgressSchema';
import { Vue3ProTable } from '@/components/Vue3ProTable/interface';
import { displayLocaleNumber } from './utils';
import retryable from './requestRetry';

export type PageTypes = 'admin' | 'station' | 'agency';

interface AdminOverallData {
  value1: number
  value2: number
  value3: number
  value4: number
  value5: number
  value6: number
  value7: number
  value8: number
  value9: number
  value10: number
  value11: number
  value12: number
  percentValue1: number
  percentValue2: number
  percentValue3: number
  percent1: number
  percent2: number
  percent3: number
  percent4: number
  percent5: number
  percent6: number
}

interface StationOverallData {
  value1: number
  value2: number
  value3: number
  value4: number
  value5: number
  value6: number
  value7: number
  value8: number
  value9: number
  value10: number
  value11: number
  value12: number
  percentValue1: number
  percentValue2: number
  percentValue3: number
  percent1: number
  percent2: number
  percent3: number
  percent4: number
  percent5: number
  percent6: number
}

interface AgencyOverallData {
  value5: number
  value6: number
  value7: number
  value8: number
  value9: number
  value10: number
  value11: number
  value12: number
  percentValue1: number
  percentValue2: number
  percentValue3: number
  percent1: number
  percent2: number
  percent3: number
  percent4: number
  percent5: number
  percent6: number
}

interface CardWithProgressSchema {
  style?: Record<string, string>
  infoCardSchema: ComputedRef<InfoCardSchema>
  progressSchema: ComputedRef<ProgressSchema>
}

export interface DashboardSchema {
  overallData: Ref<AdminOverallData | StationOverallData | AgencyOverallData>
  loadOverallData: () => void
  loadingAssignmentCards?: Ref<boolean>
  assignmentCards: Array<ComputedRef<InfoCardSchema>>
  cardWithProgressSchema1: CardWithProgressSchema
  cardWithProgressSchema2: CardWithProgressSchema
  cardWithProgressSchema3: CardWithProgressSchema
  detailTableProps: Vue3ProTable
  onClickView?: (row: any) => unknown
}

export const getAdminDashboardSchema = (): DashboardSchema => {
  const overallData = ref<AdminOverallData>({
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
    percentValue1: 0,
    percentValue2: 0,
    percentValue3: 0,
    value1: 0,
    value10: 0,
    value11: 0,
    value12: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
  });
  const loadingAssignmentCards = ref(false);

  const loadOverallData = async () => {
    const action = async () => {
      overallData.value = await loadAdminOverallData();
    };
    await retryable(action, {
      afterRequest: () => { loadingAssignmentCards.value = false; },
      beforeRequest: () => { loadingAssignmentCards.value = true; },
      customErrorHandler: (e: unknown) => { ElMessage.error('admin overall加载失败'); console.error('loadOverallData error', e); },
      errorMsg: 'loadOverallData error',
    });
  };

  const card1: ComputedRef<InfoCardSchema> = computed(() => ({
    description: {
      number: {
        value: overallData.value.value1,
      },
      text: `text (${displayLocaleNumber(overallData.value.value2)} text)`,
    },
    title: {
      text: 'admin card1 text1',
      tips: 'admin card1 tips1',
    },
  }));
  const card2: ComputedRef<InfoCardSchema> = computed(() => ({
    description: {
      number: {
        value: overallData.value.value3,
      },
      text: `text (${displayLocaleNumber(overallData.value.value4)} text)`,
    },
    title: {
      text: 'admin card2 text2',
      tips: 'admin card2 tips2',
    },
  }));
  const card3: ComputedRef<InfoCardSchema> = computed(() => ({
    description: {
      number: {
        value: overallData.value.value5,
      },
      text: `text (${displayLocaleNumber(overallData.value.value6)} text)`,
    },
    title: {
      text: 'admin card3 text3',
      tips: 'admin card3 tips3',
    },
  }));

  const card4 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value7,
      },
      text: `text (${displayLocaleNumber(overallData.value.value8)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'admin card4 text4',
      tips: 'admin card4 tips4',
    },
  }));
  const progressSchema1 = computed(() => ({
    progress: [
      { percent: overallData.value.percent1, text: 'Admin Percent1' },
      { percent: overallData.value.percent2, text: 'Admin Percent2' },
    ],
    title: {
      data: overallData.value.percentValue1,
      text: 'Admin Percent title1 此行过长时卡片会被撑高，左侧两个卡片的进度条的下方就不再能与分界线的底部对齐了，但效果看上去也还能接受',
    },
  }));

  const card5 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value9,
      },
      text: `text (${displayLocaleNumber(overallData.value.value10)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'admin card5 text5',
      tips: 'admin card5 tips5',
    },
  }));
  const progressSchema2 = computed(() => ({
    progress: [
      { percent: overallData.value.percent3, text: 'Admin Percent3' },
      { percent: overallData.value.percent4, text: 'Admin Percent4' },
    ],
    title: {
      data: overallData.value.percentValue2,
      text: 'Admin Percent title2',
    },
  }));

  const card6 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value11,
      },
      text: `text (${displayLocaleNumber(overallData.value.value12)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'admin card6 text6',
      tips: 'admin card6 tips6',
    },
  }));
  const progressSchema3 = computed(() => ({
    progress: [
      { percent: overallData.value.percent5, text: 'Admin Percent5' },
      { percent: overallData.value.percent6, text: 'Admin Percent6' },
    ],
    title: {
      data: overallData.value.percentValue3,
      text: 'Admin Percent title3 long long long long long long long long long long long long title',
      tips: 'Admin Percent tips3',
    },
  }));

  const detailTableProps = {
    columns: [
      { label: 'admin字段1', prop: 'field1' },
      { label: 'admin字段2', prop: 'field2' },
      { label: 'admin字段3', prop: 'field3' },
      { label: 'admin字段4', prop: 'field4' },
    ],
    pagination: {
      pageSizes: [10, 24, 40, 50, 100],
    },
    request: async (params: AdminDetailParams) => {
      console.log('admin params', params); // dbg
      let res = { list: [] as AdminDetailResp, total: 0 };
      const action = async () => {
        const { data } = await loadAdminDetailData(params);
        res = { list: data.list, total: data.total };
      };
      await retryable(action, {
        customErrorHandler: (e: unknown) => { ElMessage.error('admin detail加载失败'); console.error('loadAdminDetailData error', e); },
      });
      return {
        data: res.list,
        total: res.total,
      };
    },
    search: {
      fields: [
        {
          label: 'admin字段1',
          name: 'field1',
          type: 'text',
        },
        {
          label: 'admin字段2',
          name: 'field2',
          type: 'text',
        },
        {
          label: 'admin字段3',
          name: 'field3',
          type: 'text',
        },
        {
          label: 'admin字段4',
          name: 'field4',
          type: 'text',
        },
      ],
    },
  };

  return {
    assignmentCards: [
      card1,
      card2,
      card3,
    ],
    cardWithProgressSchema1: {
      infoCardSchema: card4,
      progressSchema: progressSchema1,
      style: {
        borderRight: '1px solid #E2E6EC',
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema2: {
      infoCardSchema: card5,
      progressSchema: progressSchema2,
      style: {
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema3: {
      infoCardSchema: card6,
      progressSchema: progressSchema3,
    },
    detailTableProps,
    loadOverallData,
    loadingAssignmentCards,
    overallData,
  };
};

export const getStationDashboardSchema = (): DashboardSchema => {
  const overallData = ref<StationOverallData>({
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
    percentValue1: 0,
    percentValue2: 0,
    percentValue3: 0,
    value1: 0,
    value10: 0,
    value11: 0,
    value12: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
  });
  const loadingAssignmentCards = ref(false);

  const loadOverallData = async () => {
    const action = async () => {
      overallData.value = await loadStationOverallData();
    };
    await retryable(action, {
      afterRequest: () => { loadingAssignmentCards.value = false; },
      beforeRequest: () => { loadingAssignmentCards.value = true; },
      customErrorHandler: (e: unknown) => { ElMessage.error('station overall加载失败'); console.error('loadOverallData error', e); },
      errorMsg: 'loadOverallData error',
    });
  };

  const card1: ComputedRef<InfoCardSchema> = computed(() => ({
    description: {
      number: {
        value: overallData.value.value1,
      },
      text: `text (${displayLocaleNumber(overallData.value.value2)} text)`,
    },
    link: {
      action: () => {
        ElMessage('station card1');
      },
      text: 'station card1 link',
    },
    title: {
      text: 'station card1 text1',
      tips: 'station card1 tips1',
    },
  }));
  const card2: ComputedRef<InfoCardSchema> = computed(() => ({
    description: {
      number: {
        value: overallData.value.value3,
      },
      text: `text (${displayLocaleNumber(overallData.value.value4)} text)`,
    },
    link: {
      action: () => {
        ElMessage('station card2');
      },
      text: 'station card2 link',
    },
    title: {
      text: 'station card2 text2',
      tips: 'station card2 tips2',
    },
  }));
  const card3: ComputedRef<InfoCardSchema> = computed(() => ({
    description: {
      number: {
        value: overallData.value.value5,
      },
      text: `text (${displayLocaleNumber(overallData.value.value6)} text)`,
    },
    link: {
      action: () => {
        ElMessage('station card3');
      },
      text: 'station card3 link',
    },
    title: {
      text: 'station card3 text3',
      tips: 'station card3 tips3',
    },
  }));

  const card4 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value7,
      },
      text: `text (${displayLocaleNumber(overallData.value.value8)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'station card4 text4',
      tips: 'station card4 tips4',
    },
  }));
  const progressSchema1 = computed(() => ({
    progress: [
      { percent: overallData.value.percent1, text: 'Station Percent1' },
      { percent: overallData.value.percent2, text: 'Station Percent2' },
    ],
    title: {
      data: overallData.value.percentValue1,
      text: 'Station Percent title1',
      tips: 'Station Percent tips1',
    },
  }));

  const card5 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value9,
      },
      text: `text (${displayLocaleNumber(overallData.value.value10)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'station card5 text5',
      tips: 'station card5 tips5',
    },
  }));
  const progressSchema2 = computed(() => ({
    progress: [
      { percent: overallData.value.percent3, text: 'Station Percent3' },
      { percent: overallData.value.percent4, text: 'Station Percent4' },
    ],
    title: {
      data: overallData.value.percentValue2,
      text: 'Station Percent title2',
    },
  }));

  const card6 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value11,
      },
      text: `text (${displayLocaleNumber(overallData.value.value12)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'station card6 text6',
      tips: 'station card6 tips6',
    },
  }));
  const progressSchema3 = computed(() => ({
    progress: [
      { percent: overallData.value.percent5, text: 'Station Percent5' },
      { percent: overallData.value.percent6, text: 'Station Percent6' },
    ],
    title: {
      data: overallData.value.percentValue3,
      text: 'Station Percent title3',
    },
  }));

  const detailTableProps = {
    columns: [
      { label: 'station字段1', prop: 'field1' },
      { label: 'station字段2', prop: 'field2' },
      { label: 'station字段5', prop: 'field5' },
      { label: 'station字段6', prop: 'field6' },
    ],
    pagination: {
      pageSizes: [10, 24, 40, 50, 100],
    },
    request: async (params: StationDetailParams) => {
      console.log('station params', params); // dbg
      let res = { list: [] as StationDetailResp, total: 0 };
      const action = async () => {
        const { data } = await loadStationDetailData(params);
        res = { list: data.list, total: data.total };
      };
      await retryable(action, {
        customErrorHandler: (e: unknown) => { ElMessage.error('station detail加载失败'); console.error('loadStationDetailData error', e); },
      });
      return {
        data: res.list,
        total: res.total,
      };
    },
    search: {
      fields: [
        {
          label: 'station字段1',
          name: 'field1',
          type: 'text',
        },
        {
          label: 'station字段2',
          name: 'field2',
          type: 'text',
        },
        {
          label: 'station字段5',
          name: 'field5',
          type: 'text',
        },
        {
          label: 'station字段6',
          name: 'field6',
          type: 'text',
        },
      ],
    },
  };

  return {
    assignmentCards: [
      card1,
      card2,
      card3,
    ],
    cardWithProgressSchema1: {
      infoCardSchema: card4,
      progressSchema: progressSchema1,
      style: {
        borderRight: '1px solid #E2E6EC',
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema2: {
      infoCardSchema: card5,
      progressSchema: progressSchema2,
      style: {
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema3: {
      infoCardSchema: card6,
      progressSchema: progressSchema3,
    },
    detailTableProps,
    loadOverallData,
    loadingAssignmentCards,
    overallData,
  };
};

export const getAgencyDashboardSchema = (): DashboardSchema => {
  const overallData = ref<AgencyOverallData>({
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
    percentValue1: 0,
    percentValue2: 0,
    percentValue3: 0,
    value10: 0,
    value11: 0,
    value12: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
  });
  const loadingAssignmentCards = ref(false);

  const loadOverallData = async () => {
    const action = async () => {
      overallData.value = await loadAgencyOverallData();
    };
    await retryable(action, {
      afterRequest: () => { loadingAssignmentCards.value = false; },
      beforeRequest: () => { loadingAssignmentCards.value = true; },
      customErrorHandler: (e: unknown) => { ElMessage.error('agency overall加载失败'); console.error('loadOverallData error', e); },
      errorMsg: 'loadOverallData error',
    });
  };

  const card3: ComputedRef<InfoCardSchema> = computed(() => ({
    description: {
      number: {
        value: overallData.value.value5,
      },
      text: `text (${displayLocaleNumber(overallData.value.value6)} text)`,
    },
    link: {
      action: () => {
        ElMessage('agency card3');
      },
      text: 'agency card3 link',
    },
    title: {
      text: 'agency card3 text3',
      tips: 'agency card3 tips3',
    },
  }));

  const card4 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value7,
      },
      text: `text (${displayLocaleNumber(overallData.value.value8)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'agency card4 text4',
      tips: 'agency card4 tips4',
    },
  }));
  const progressSchema1 = computed(() => ({
    progress: [
      { percent: overallData.value.percent1, text: 'Agency Percent1' },
      { percent: overallData.value.percent2, text: 'Agency Percent2' },
    ],
    title: {
      data: overallData.value.percentValue1,
      text: 'Agency Percent title1',
    },
  }));

  const card5 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value9,
      },
      text: `text (${displayLocaleNumber(overallData.value.value10)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'agency card5 text5',
      tips: 'agency card5 tips5',
    },
  }));
  const progressSchema2 = computed(() => ({
    progress: [
      { percent: overallData.value.percent3, text: 'Agency Percent3' },
      { percent: overallData.value.percent4, text: 'Agency Percent4' },
    ],
    title: {
      data: overallData.value.percentValue2,
      text: 'Agency Percent title2',
      tips: 'Agency Percent tips2',
    },
  }));

  const card6 = computed(() => ({
    description: {
      number: {
        value: overallData.value.value11,
      },
      text: `text (${displayLocaleNumber(overallData.value.value12)} text)`,
    },
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'agency card6 text6',
      tips: 'agency card6 tips6',
    },
  }));
  const progressSchema3 = computed(() => ({
    progress: [
      { percent: overallData.value.percent5, text: 'Agency Percent5' },
      { percent: overallData.value.percent6, text: 'Agency Percent6' },
    ],
    title: {
      data: overallData.value.percentValue3,
      text: 'Agency Percent title3',
    },
  }));

  const detailTableProps = {
    columns: [
      { label: 'agency字段3', prop: 'field3' },
      { label: 'agency字段4', prop: 'field4' },
      { label: 'agency字段5', prop: 'field5' },
      { label: 'agency字段6', prop: 'field6' },
      {
        fixed: 'right',
        label: '操作',
        tdSlot: 'operate',
        width: 180, // 自定义单元格内容的插槽名称
      },
    ],
    pagination: {
      pageSizes: [10, 24, 40, 50, 100],
    },
    request: async (params: AgencyDetailParams) => {
      console.log('agency params', params); // dbg
      let res = { list: [] as AgencyDetailResp, total: 0 };
      const action = async () => {
        const { data } = await loadAgencyDetailData(params);
        res = { list: data.list, total: data.total };
      };
      await retryable(action, {
        customErrorHandler: (e: unknown) => { ElMessage.error('agency detail加载失败'); console.error('loadAgencyDetailData error', e); },
      });
      return {
        data: res.list,
        total: res.total,
      };
    },
    search: {
      fields: [
        {
          label: 'agency字段3',
          name: 'field3',
          type: 'text',
        },
        {
          label: 'agency字段4',
          name: 'field4',
          type: 'text',
        },
        {
          label: 'agency字段5',
          name: 'field5',
          type: 'text',
        },
        {
          label: 'agency字段6',
          name: 'field6',
          type: 'text',
        },
      ],
    },
  };
  interface AgencyTableItem {
    field3: string
    field4: string
    field5: string
    field6: string
  }
  const onClickView = (row: AgencyTableItem) => {
    ElMessage(`模拟查看${row.field3}详情`);
  };

  return {
    assignmentCards: [
      card3,
    ],
    cardWithProgressSchema1: {
      infoCardSchema: card4,
      progressSchema: progressSchema1,
      style: {
        borderRight: '1px solid #E2E6EC',
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema2: {
      infoCardSchema: card5,
      progressSchema: progressSchema2,
      style: {
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema3: {
      infoCardSchema: card6,
      progressSchema: progressSchema3,
    },
    detailTableProps,
    loadOverallData,
    loadingAssignmentCards,
    onClickView,
    overallData,
  };
};
