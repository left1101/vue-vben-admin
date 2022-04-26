<template>
  <PageWrapper title="自定义表单展示">
    <template #extra>
      <Button preIcon="ant-design:close-circle-outlined">关闭</Button>
      <Button preIcon="ant-design:reload-outlined">重置</Button>
      <Button preIcon="ant-design:save-outlined">保存</Button>
      <Button preIcon="ant-design:send-outlined" type="primary">确认发送</Button>
    </template>
    <div style="min-height: 1085px">
      <BasicForm
        :labelWidth="140"
        :actionColOptions="{ span: 24 }"
        :schemas="schemas"
        :show-action-button-group="true"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm } from '/@/components/Form';
  import { Button } from '/@/components/Button';
  import { PageWrapper } from '/@/components/Page';

  import schemas from './schemas';

  export default defineComponent({
    components: { BasicForm, Button, PageWrapper },
    setup() {
      return {
        schemas: schemas,
      };
    },
  });
</script>
