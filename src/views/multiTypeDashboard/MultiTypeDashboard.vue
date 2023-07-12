<template>
  <div class="page-wrapper">
    <div v-loading="loadingAssignmentCards" class="assignment-cards-wrapper">
      <info-card
        v-for="(assignmentCard, index) in multiTypeDashboardSchema.assignmentCards"
        :key="index"
        :schema="assignmentCard"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref, watch, computed,
} from 'vue';
import { useRoute } from 'vue-router';
import InfoCard from './components/InfoCard.vue';
import {
  getStationDashboardSchema,
  getAgencyDashboardSchema,
  getAdminDashboardSchema,
  DashboardSchema,
  PageTypes,
} from './useMultiTypeDashboardSchema';

const route = useRoute();

const getMultiTypeDashboardSchema = () => {
  const schemaMap: Record<PageTypes, () => DashboardSchema> = {
    admin: getAdminDashboardSchema,
    station: getStationDashboardSchema,
    agency: getAgencyDashboardSchema,
  };

  const { dashboardType } = route.params;
  if (typeof dashboardType !== 'string' || !(dashboardType in schemaMap)) return schemaMap.admin();
  return schemaMap[dashboardType as PageTypes]();
};

const multiTypeDashboardSchema = ref(getMultiTypeDashboardSchema());

const loadingAssignmentCards = computed(() => multiTypeDashboardSchema.value.loadingAssignmentCards || false);

watch(
  () => route.params,
  () => {
    multiTypeDashboardSchema.value = getMultiTypeDashboardSchema();
    multiTypeDashboardSchema.value.loadOverallData();
  },
  {
    immediate: true,
  },
);
</script>

<style lang="less" scoped>
.page-wrapper {
  padding: 0 24px;

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
}
</style>
