<template>
  <div :style="styleObject">
    <info-card :schema="infoCardSchema" />
    <div class="multi-progress-container">
      <div class="multi-progress-title">
        <span v-show="progressTitleText" class="multi-progress-title-text">
          {{ progressTitleText }}
          <el-popover v-if="progressTipsText" placement="top" :content="progressTipsText">
            <template #reference>
              <question-filled class="help-icon" />
            </template>
          </el-popover>
        </span>
        <span v-show="shouldDisplayProgressTitleData">{{ displayLocaleNumber(progressTitleData) }}</span>
      </div>
      <multi-progress :percents="progressSchema.value.progress" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, computed } from 'vue';
import { QuestionFilled } from '@element-plus/icons-vue';
import { displayLocaleNumber, isNotNANNumber } from '../utils';
import { InfoCardSchema } from './infoCardSchema';
import InfoCard from './InfoCard.vue';
import MultiProgress from './MultiProgress.vue';
import { ProgressSchema } from './cardWithProgressSchema';

const props = defineProps({
  style: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
  infoCardSchema: {
    type: Object as PropType<ComputedRef<InfoCardSchema>>,
    required: true,
  },
  progressSchema: {
    type: Object as PropType<ComputedRef<ProgressSchema>>,
    required: true,
  },
});

const styleObject = computed(() => props.style || {});
const progressTitleText = computed(() => props.progressSchema.value?.title?.text || '-');
const progressTipsText = computed(() => props.progressSchema.value?.title?.tips || '');
const progressTitleData = computed(() => props.progressSchema.value?.title?.data || '-');
const shouldDisplayProgressTitleData = computed(() => isNotNANNumber(progressTitleData.value));
</script>

<style lang="less" scoped>
.multi-progress-container {
  border-top: 1px dashed #E2E6EC;
  padding-top: 16px;

  .multi-progress-title {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    margin-bottom: 8px;
    color: #303844;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    .multi-progress-title-text {
      display: flex;
      gap: 4px;

      .help-icon {
        width: 16px;
        height: 16px;
        color: #999999;
      }

      & > span {
        display: flex;
      }
    }
  }
}
</style>
