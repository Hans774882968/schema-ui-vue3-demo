<template>
  <div class="page-wrapper">
    <div v-loading="loadingAssignmentCards" class="assignment-cards-wrapper">
      <info-card
        v-for="(assignmentCard, index) in assignmentCards"
        :key="index"
        :schema="assignmentCard"
      />
    </div>

    <div v-loading="loadingAssignmentCards" class="progress-cards-wrapper">
      <div class="merged-card-wrapper">
        <card-with-progress
          :style="cardWithProgressSchema1.style"
          :info-card-schema="cardWithProgressSchema1.infoCardSchema"
          :progress-schema="cardWithProgressSchema1.progressSchema"
        />
        <card-with-progress
          :style="cardWithProgressSchema2.style"
          :info-card-schema="cardWithProgressSchema2.infoCardSchema"
          :progress-schema="cardWithProgressSchema2.progressSchema"
        />
      </div>
      <card-with-progress
        class="card-wrapper"
        :style="cardWithProgressSchema3.style"
        :info-card-schema="cardWithProgressSchema3.infoCardSchema"
        :progress-schema="cardWithProgressSchema3.progressSchema"
      />
    </div>

    <div>
      <!-- 使用 v-bind 会报类型错误 -->
      <vue3-pro-table
        ref="detailTable"
        :columns="detailTableProps.columns"
        :pagination="detailTableProps.pagination"
        :request="detailTableProps.request"
        :search="detailTableProps.search"
      >
        <template v-if="typeof onClickView === 'function'" #operate="scope">
          <el-link :underline="false" @click="onClickView(scope.row)">View</el-link>
        </template>
      </vue3-pro-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  DashboardSchema,
  PageTypes,
  getAdminDashboardSchema,
  getAgencyDashboardSchema,
  getStationDashboardSchema,
} from './useMultiTypeDashboardSchema';
import {
  nextTick, onBeforeMount, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import CardWithProgress from './components/CardWithProgress.vue';
import InfoCard from './components/InfoCard.vue';

const route = useRoute();

const getMultiTypeDashboardSchema = () => {
  const schemaMap: Record<PageTypes, () => DashboardSchema> = {
    admin: getAdminDashboardSchema,
    agency: getAgencyDashboardSchema,
    station: getStationDashboardSchema,
  };

  const { dashboardType } = route.params;
  if (typeof dashboardType !== 'string' || !(dashboardType in schemaMap)) return schemaMap.admin();
  return schemaMap[dashboardType as PageTypes]();
};

let {
  loadOverallData,
  loadingAssignmentCards,
  assignmentCards,
  cardWithProgressSchema1,
  cardWithProgressSchema2,
  cardWithProgressSchema3,
  detailTableProps,
  onClickView,
} = getMultiTypeDashboardSchema();

const detailTable = ref(null);

type loadTypes = 'init' | 'routeChange' | 'autoRefresh';

const loadWholePage = ({ loadType }: { loadType: loadTypes }) => {
  loadOverallData();
  if (loadType === 'init') {
    nextTick(() => {
      detailTable.value && (detailTable.value as any).refresh();
    });
    return;
  }
  if (loadType === 'routeChange') {
    // 踩坑：修改 schema 后， refresh, handleReset 等方法都必须等到下一次渲染再执行，这样才能拿到最新的 props，才不会出现陈旧值问题
    nextTick(() => {
      detailTable.value && (detailTable.value as any).handleReset();
    });
  }
};

onBeforeMount(() => {
  loadWholePage({ loadType: 'init' });
});

watch(
  () => route.params,
  async () => {
    ({
      loadOverallData,
      loadingAssignmentCards,
      assignmentCards,
      cardWithProgressSchema1,
      cardWithProgressSchema2,
      cardWithProgressSchema3,
      detailTableProps,
      onClickView,
    } = getMultiTypeDashboardSchema());
    loadOverallData();
    loadWholePage({ loadType: 'routeChange' });
  },
);
</script>

<style lang="less" scoped>
.page-wrapper {
  padding: 0 24px;
  text-align: left;

  @card-item-gap: 16px;
  @card-item-count-per-row: 3;
  @card-item-max-width: calc(100% / @card-item-count-per-row - @card-item-gap * (@card-item-count-per-row - 1) / @card-item-count-per-row);

  .assignment-cards-wrapper, .progress-cards-wrapper {
    display: flex;
    gap: @card-item-gap;

    & > * {
      flex: 1;
    }
  }
  .assignment-cards-wrapper {
    margin: 16px 0 24px 0;

    & > * {
      max-width: @card-item-max-width;
    }
  }
  .progress-cards-wrapper {
    .merged-card-wrapper {
      display: flex;
      border: 1px solid #E2E6EC;
      border-radius: 4px;
      padding: 16px 0;
    }

    .card-wrapper {
      border: 1px solid #E2E6EC;
      border-radius: 4px;
      padding: 16px;
      max-width: @card-item-max-width;
    }
  }
}
</style>
