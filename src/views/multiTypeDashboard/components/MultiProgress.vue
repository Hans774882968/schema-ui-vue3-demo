<template>
  <div class="multi-progress">
    <div class="multi-progress-text-container">
      <div
        v-for="(item, index) in filteredPercents"
        :key="index"
        class="multi-progress-text-item-container"
      >
        <div class="multi-progress-info">
          <span :style="getItemPercentStyle(index)" class="multi-progress-number">{{ displayLocalePercent(item.percent) }}</span>
          <span class="multi-progress-text">{{ item.text }}</span>
        </div>
        <div v-if="index < filteredPercents.length - 1" class="separate" />
      </div>
    </div>
    <div :style="styleObject" />
  </div>
</template>

<script lang="ts" setup>
import { Percent } from './multiProgress';
import { PropType, computed } from 'vue';
import { displayLocalePercent } from '../utils';
import reduce from 'lodash/reduce';

const nonLastColors = ['#3274F7', '#FFB014'];
const lastColor = '#F5F6F9';

function getNonLastColor(i: number) {
  return nonLastColors[i % nonLastColors.length];
}

const props = defineProps({
  borderRadius: {
    default: 4,
    type: Number,
  },
  height: {
    default: 4,
    type: Number,
  },
  percents: {
    default: () => [],
    type: Array as PropType<Array<Percent>>,
  },
});

const filteredPercents = computed(() => (props.percents || []).filter((item: Percent) => !Number.isNaN(item.percent) && item.percent >= 0));

const prefixSumPercents = computed(() => [
  0,
  ...reduce(filteredPercents.value.map((item: Percent) => item.percent), (acc, v) => {
    acc.push(Math.min(100, (acc.length > 0 ? acc[acc.length - 1] : 0) + v));
    return acc;
  }, [] as number[]),
]);

const linearGradientStr = computed(() => prefixSumPercents.value.reduce((res, val, i) => {
  res.push(`${i < prefixSumPercents.value.length - 1 ? getNonLastColor(i) : lastColor} ${val}%`);
  const nextItem = i < prefixSumPercents.value.length - 1 ? prefixSumPercents.value[i + 1] : 100;
  res.push(`${i < prefixSumPercents.value.length - 1 ? getNonLastColor(i) : lastColor} ${nextItem}%`);
  return res;
}, [] as string[]).join(', '));

const styleObject = computed(() => ({
  background: `linear-gradient(to right, ${linearGradientStr.value})`,
  borderRadius: `${props.borderRadius || props.height}px`,
  height: `${props.height || 4}px`,
}));

const getItemPercentStyle = (index: number) => ({
  color: getNonLastColor(index),
});
</script>

<style lang="less" scoped>
.multi-progress {
  .multi-progress-text-container {
    display: flex;
    margin-bottom: 4px;

    .multi-progress-text-item-container {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 16px;

      .separate {
        width: 1px;
        height: 12px;
        background: #E2E6EC;
        margin: 0 8px;
      }
      .multi-progress-info {
        display: flex;
        gap: 4px;

        .multi-progress-number {
          font-weight: 500;
        }
        .multi-progress-text {
          color: #959BA4;
        }
      }
    }
  }
}
</style>
