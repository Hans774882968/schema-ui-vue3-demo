import {
  ComputedRef, Ref, computed, ref,
} from 'vue';
import { displayLocaleNumber } from './utils';
import { InfoCardSchema } from './components/infoCardSchema';

export type PageTypes = 'admin' | 'station' | 'agency';

interface AdminOverallData {
  value1: number
  value2: number
  value3: number
  value4: number
  value5: number
  value6: number
}

interface StationOverallData {
  value1: number
  value2: number
  value3: number
  value4: number
  value5: number
  value6: number
}

interface AgencyOverallData {
  value5: number
  value6: number
}

export interface DashboardSchema {
  overallData: Ref<AdminOverallData | StationOverallData | AgencyOverallData>
  loadOverallData: () => void
  loadingAssignmentCards?: Ref<boolean>
  assignmentCards: Array<ComputedRef<InfoCardSchema>>
}

export const getAdminDashboardSchema = (): DashboardSchema => {
  const overallData = ref<AdminOverallData>({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
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

  return {
    overallData,
    loadOverallData,
    loadingAssignmentCards,
    assignmentCards: [
      card1,
      card2,
      card3,
    ],
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

  return {
    overallData,
    loadOverallData,
    loadingAssignmentCards,
    assignmentCards: [
      card1,
      card2,
      card3,
    ],
  };
};

export const getAgencyDashboardSchema = (): DashboardSchema => {
  const overallData = ref<AgencyOverallData>({
    value5: 0,
    value6: 0,
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

  return {
    overallData,
    loadOverallData,
    loadingAssignmentCards,
    assignmentCards: [
      card3,
    ],
  };
};
