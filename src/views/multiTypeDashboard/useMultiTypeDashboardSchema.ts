import {
  ComputedRef, Ref, computed, ref,
} from 'vue';
import { displayLocaleNumber } from './utils';
import { InfoCardSchema } from './components/infoCardSchema';
import { ProgressSchema } from './components/cardWithProgressSchema';

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
}

export const getAdminDashboardSchema = (): DashboardSchema => {
  const overallData = ref<AdminOverallData>({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
    value10: 0,
    value11: 0,
    value12: 0,
    percentValue1: 0,
    percentValue2: 0,
    percentValue3: 0,
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
  });
  const loadingAssignmentCards = ref(false);

  const loadOverallData = async () => {
    loadingAssignmentCards.value = true;
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    overallData.value = {
      value1: 1231,
      value2: 1232,
      value3: 1233,
      value4: 1234,
      value5: 1235,
      value6: 1236,
      value7: 1237,
      value8: 1238,
      value9: 1239,
      value10: 1240,
      value11: 1241,
      value12: 1242,
      percentValue1: 1231,
      percentValue2: 1232,
      percentValue3: 1233,
      percent1: 10,
      percent2: 100,
      percent3: 20,
      percent4: 0,
      percent5: 0,
      percent6: 30,
    };
    loadingAssignmentCards.value = false;
  };

  const card1: ComputedRef<InfoCardSchema> = computed(() => ({
    title: {
      text: 'admin card1 text1',
      tips: 'admin card1 tips1',
    },
    description: {
      number: {
        value: overallData.value.value1,
      },
      text: `text (${displayLocaleNumber(overallData.value.value2)} text)`,
    },
  }));
  const card2: ComputedRef<InfoCardSchema> = computed(() => ({
    title: {
      text: 'admin card2 text2',
      tips: 'admin card2 tips2',
    },
    description: {
      number: {
        value: overallData.value.value3,
      },
      text: `text (${displayLocaleNumber(overallData.value.value4)} text)`,
    },
  }));
  const card3: ComputedRef<InfoCardSchema> = computed(() => ({
    title: {
      text: 'admin card3 text3',
      tips: 'admin card3 tips3',
    },
    description: {
      number: {
        value: overallData.value.value5,
      },
      text: `text (${displayLocaleNumber(overallData.value.value6)} text)`,
    },
  }));

  const card4 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'admin card4 text4',
      tips: 'admin card4 tips4',
    },
    description: {
      number: {
        value: overallData.value.value7,
      },
      text: `text (${displayLocaleNumber(overallData.value.value8)} text)`,
    },
  }));
  const progressSchema1 = computed(() => ({
    title: {
      text: 'Admin Percent title1 此行过长时卡片会被撑高，左侧两个卡片的进度条的下方就不再能与分界线的底部对齐了，但效果看上去也还能接受',
      data: overallData.value.percentValue1,
    },
    progress: [
      { percent: overallData.value.percent1, text: 'Admin Percent1' },
      { percent: overallData.value.percent2, text: 'Admin Percent2' },
    ],
  }));

  const card5 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'admin card5 text5',
      tips: 'admin card5 tips5',
    },
    description: {
      number: {
        value: overallData.value.value9,
      },
      text: `text (${displayLocaleNumber(overallData.value.value10)} text)`,
    },
  }));
  const progressSchema2 = computed(() => ({
    title: {
      text: 'Admin Percent title2',
      data: overallData.value.percentValue2,
    },
    progress: [
      { percent: overallData.value.percent3, text: 'Admin Percent3' },
      { percent: overallData.value.percent4, text: 'Admin Percent4' },
    ],
  }));

  const card6 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'admin card6 text6',
      tips: 'admin card6 tips6',
    },
    description: {
      number: {
        value: overallData.value.value11,
      },
      text: `text (${displayLocaleNumber(overallData.value.value12)} text)`,
    },
  }));
  const progressSchema3 = computed(() => ({
    title: {
      text: 'Admin Percent title3 long long long long long long long long long long long long title',
      tips: 'Admin Percent tips3',
      data: overallData.value.percentValue3,
    },
    progress: [
      { percent: overallData.value.percent5, text: 'Admin Percent5' },
      { percent: overallData.value.percent6, text: 'Admin Percent6' },
    ],
  }));

  return {
    overallData,
    loadOverallData,
    loadingAssignmentCards,
    assignmentCards: [
      card1,
      card2,
      card3,
    ],
    cardWithProgressSchema1: {
      style: {
        flex: '1',
        padding: '0 16px',
        borderRight: '1px solid #E2E6EC',
      },
      infoCardSchema: card4,
      progressSchema: progressSchema1,
    },
    cardWithProgressSchema2: {
      style: {
        flex: '1',
        padding: '0 16px',
      },
      infoCardSchema: card5,
      progressSchema: progressSchema2,
    },
    cardWithProgressSchema3: {
      infoCardSchema: card6,
      progressSchema: progressSchema3,
    },
  };
};

export const getStationDashboardSchema = (): DashboardSchema => {
  const overallData = ref<StationOverallData>({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
    value10: 0,
    value11: 0,
    value12: 0,
    percentValue1: 0,
    percentValue2: 0,
    percentValue3: 0,
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
  });
  const loadingAssignmentCards = ref(false);

  const loadOverallData = async () => {
    loadingAssignmentCards.value = true;
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    overallData.value = {
      value1: 1241,
      value2: 1242,
      value3: 1243,
      value4: 1244,
      value5: 1245,
      value6: 1246,
      value7: 1247,
      value8: 1248,
      value9: 1249,
      value10: 1250,
      value11: 1251,
      value12: 1252,
      percentValue1: 1241,
      percentValue2: 1242,
      percentValue3: 1243,
      percent1: 11,
      percent2: 101,
      percent3: 21,
      percent4: 0,
      percent5: 0,
      percent6: 31,
    };
    loadingAssignmentCards.value = false;
  };

  const card1: ComputedRef<InfoCardSchema> = computed(() => ({
    title: {
      text: 'station card1 text1',
      tips: 'station card1 tips1',
    },
    link: {
      text: 'station card1 link',
      action: () => {
        console.info('station card1');
      },
    },
    description: {
      number: {
        value: overallData.value.value1,
      },
      text: `text (${displayLocaleNumber(overallData.value.value2)} text)`,
    },
  }));
  const card2: ComputedRef<InfoCardSchema> = computed(() => ({
    title: {
      text: 'station card2 text2',
      tips: 'station card2 tips2',
    },
    link: {
      text: 'station card2 link',
      action: () => {
        console.info('station card2');
      },
    },
    description: {
      number: {
        value: overallData.value.value3,
      },
      text: `text (${displayLocaleNumber(overallData.value.value4)} text)`,
    },
  }));
  const card3: ComputedRef<InfoCardSchema> = computed(() => ({
    title: {
      text: 'station card3 text3',
      tips: 'station card3 tips3',
    },
    link: {
      text: 'station card3 link',
      action: () => {
        console.info('station card3');
      },
    },
    description: {
      number: {
        value: overallData.value.value5,
      },
      text: `text (${displayLocaleNumber(overallData.value.value6)} text)`,
    },
  }));

  const card4 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'station card4 text4',
      tips: 'station card4 tips4',
    },
    description: {
      number: {
        value: overallData.value.value7,
      },
      text: `text (${displayLocaleNumber(overallData.value.value8)} text)`,
    },
  }));
  const progressSchema1 = computed(() => ({
    title: {
      text: 'Station Percent title1',
      tips: 'Station Percent tips1',
      data: overallData.value.percentValue1,
    },
    progress: [
      { percent: overallData.value.percent1, text: 'Station Percent1' },
      { percent: overallData.value.percent2, text: 'Station Percent2' },
    ],
  }));

  const card5 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'station card5 text5',
      tips: 'station card5 tips5',
    },
    description: {
      number: {
        value: overallData.value.value9,
      },
      text: `text (${displayLocaleNumber(overallData.value.value10)} text)`,
    },
  }));
  const progressSchema2 = computed(() => ({
    title: {
      text: 'Station Percent title2',
      data: overallData.value.percentValue2,
    },
    progress: [
      { percent: overallData.value.percent3, text: 'Station Percent3' },
      { percent: overallData.value.percent4, text: 'Station Percent4' },
    ],
  }));

  const card6 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'station card6 text6',
      tips: 'station card6 tips6',
    },
    description: {
      number: {
        value: overallData.value.value11,
      },
      text: `text (${displayLocaleNumber(overallData.value.value12)} text)`,
    },
  }));
  const progressSchema3 = computed(() => ({
    title: {
      text: 'Station Percent title3',
      data: overallData.value.percentValue3,
    },
    progress: [
      { percent: overallData.value.percent5, text: 'Station Percent5' },
      { percent: overallData.value.percent6, text: 'Station Percent6' },
    ],
  }));

  return {
    overallData,
    loadOverallData,
    loadingAssignmentCards,
    assignmentCards: [
      card1,
      card2,
      card3,
    ],
    cardWithProgressSchema1: {
      style: {
        flex: '1',
        padding: '0 16px',
        borderRight: '1px solid #E2E6EC',
      },
      infoCardSchema: card4,
      progressSchema: progressSchema1,
    },
    cardWithProgressSchema2: {
      style: {
        flex: '1',
        padding: '0 16px',
      },
      infoCardSchema: card5,
      progressSchema: progressSchema2,
    },
    cardWithProgressSchema3: {
      infoCardSchema: card6,
      progressSchema: progressSchema3,
    },
  };
};

export const getAgencyDashboardSchema = (): DashboardSchema => {
  const overallData = ref<AgencyOverallData>({
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
    value10: 0,
    value11: 0,
    value12: 0,
    percentValue1: 0,
    percentValue2: 0,
    percentValue3: 0,
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
  });
  const loadingAssignmentCards = ref(false);

  const loadOverallData = async () => {
    loadingAssignmentCards.value = true;
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    overallData.value = {
      value5: 1255,
      value6: 1256,
      value7: 1257,
      value8: 1258,
      value9: 1259,
      value10: 1260,
      value11: 1261,
      value12: 1262,
      percentValue1: 1251,
      percentValue2: 1252,
      percentValue3: 1253,
      percent1: 12,
      percent2: 102,
      percent3: 22,
      percent4: 0,
      percent5: 0,
      percent6: 32,
    };
    loadingAssignmentCards.value = false;
  };

  const card3: ComputedRef<InfoCardSchema> = computed(() => ({
    title: {
      text: 'agency card3 text3',
      tips: 'agency card3 tips3',
    },
    link: {
      text: 'agency card3 link',
      action: () => {
        console.info('agency card3');
      },
    },
    description: {
      number: {
        value: overallData.value.value5,
      },
      text: `text (${displayLocaleNumber(overallData.value.value6)} text)`,
    },
  }));

  const card4 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'agency card4 text4',
      tips: 'agency card4 tips4',
    },
    description: {
      number: {
        value: overallData.value.value7,
      },
      text: `text (${displayLocaleNumber(overallData.value.value8)} text)`,
    },
  }));
  const progressSchema1 = computed(() => ({
    title: {
      text: 'Agency Percent title1',
      data: overallData.value.percentValue1,
    },
    progress: [
      { percent: overallData.value.percent1, text: 'Agency Percent1' },
      { percent: overallData.value.percent2, text: 'Agency Percent2' },
    ],
  }));

  const card5 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'agency card5 text5',
      tips: 'agency card5 tips5',
    },
    description: {
      number: {
        value: overallData.value.value9,
      },
      text: `text (${displayLocaleNumber(overallData.value.value10)} text)`,
    },
  }));
  const progressSchema2 = computed(() => ({
    title: {
      text: 'Agency Percent title2',
      tips: 'Agency Percent tips2',
      data: overallData.value.percentValue2,
    },
    progress: [
      { percent: overallData.value.percent3, text: 'Agency Percent3' },
      { percent: overallData.value.percent4, text: 'Agency Percent4' },
    ],
  }));

  const card6 = computed(() => ({
    style: {
      border: '0',
      padding: '0 0 16px 0',
    },
    title: {
      text: 'agency card6 text6',
      tips: 'agency card6 tips6',
    },
    description: {
      number: {
        value: overallData.value.value11,
      },
      text: `text (${displayLocaleNumber(overallData.value.value12)} text)`,
    },
  }));
  const progressSchema3 = computed(() => ({
    title: {
      text: 'Agency Percent title3',
      data: overallData.value.percentValue3,
    },
    progress: [
      { percent: overallData.value.percent5, text: 'Agency Percent5' },
      { percent: overallData.value.percent6, text: 'Agency Percent6' },
    ],
  }));

  return {
    overallData,
    loadOverallData,
    loadingAssignmentCards,
    assignmentCards: [
      card3,
    ],
    cardWithProgressSchema1: {
      style: {
        flex: '1',
        padding: '0 16px',
        borderRight: '1px solid #E2E6EC',
      },
      infoCardSchema: card4,
      progressSchema: progressSchema1,
    },
    cardWithProgressSchema2: {
      style: {
        flex: '1',
        padding: '0 16px',
      },
      infoCardSchema: card5,
      progressSchema: progressSchema2,
    },
    cardWithProgressSchema3: {
      infoCardSchema: card6,
      progressSchema: progressSchema3,
    },
  };
};
