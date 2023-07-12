<template>
  <div :style="infoCardStyleObject" class="info-card">
    <div class="title-container">
      <div class="title">
        <span class="title-text">
          {{ titleText }}
          <el-popover placement="top" :content="tipsText">
            <template #reference>
              <question-filled class="help-icon" />
            </template>
          </el-popover>
        </span>
      </div>
      <div v-if="linkText" class="link" @click="linkAction" @keypress="linkAction">
        <div>{{ linkText }}</div>
        <arrow-right-bold class="chevron-icon" />
      </div>
    </div>
    <div class="description-container">
      <div :class="descriptionNumberClass">{{ descriptionNumber }}</div>
      <div class="description-text">{{ descriptionText }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QuestionFilled, ArrowRightBold } from '@element-plus/icons-vue';
import { ComputedRef, PropType, computed } from 'vue';
import { displayLocaleNumber } from '../utils';
import { InfoCardSchema } from './infoCardSchema';

const props = defineProps({
  schema: {
    type: Object as PropType<ComputedRef<InfoCardSchema>>,
    required: true,
  },
});

const titleText = computed(() => props.schema.value.title?.text || '');
const tipsText = computed(() => props.schema.value.title?.tips || '');
const linkText = computed(() => props.schema.value.link?.text || '');
// eslint-disable-next-line @typescript-eslint/no-empty-function
const linkAction = computed(() => props.schema.value.link?.action || (() => {}));
const descriptionNumber = computed(() => {
  const value = props.schema.value.description?.number?.value;
  return displayLocaleNumber(value);
});
const isDescriptionNumberStrong = computed(() => props.schema.value.description?.number?.strong || true);
const descriptionNumberClass = computed(() => ({
  'number-strong': isDescriptionNumberStrong,
  'description-text': !isDescriptionNumberStrong.value,
}));
const descriptionText = computed(() => props.schema.value.description?.text || '');
const infoCardStyleObject = computed(() => props.schema.value.style || {});
</script>

<style lang="less" scoped>
.info-card {
  border: 1px solid #E2E6EC;
  border-radius: 4px;
  padding: 16px;

  .title-container {
    display: flex;
    justify-content: space-between;
    gap: 4px;

    .title {
      display: flex;

      .title-text {
        display: flex;
        gap: 4px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #303844;

        & > span {
          display: flex;
        }
      }
      .help-icon {
        width: 16px;
        height: 16px;
        color: #999999;
      }
    }

    .link {
      cursor: pointer;
      display: flex;
      gap: 4px;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #7E8692;

      .chevron-icon {
        width: 16px;
        height: 16px;
        color: #959BA4;
      }
    }
  }
  .description-container {
    margin-top: 8px;
    display: flex;
    align-items: baseline;
    .number-strong {
      font-weight: 500;
      font-size: 22px;
      line-height: 24px;
      color: #303844;
    }
    .description-text {
      margin-left: 4px;
      font-size: 14px;
      line-height: 16px;
      color: #959BA4;
    }
  }
}
</style>
