<script lang="ts" setup>
import type { DepartmentInfo } from '#/api/sys/model/departmentModel';

import { useVbenForm } from '#/adapter/form';
import { createDepartment, updateDepartment } from '#/api/sys/department';
import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { message } from 'ant-design-vue';
import { ref } from 'vue';

import { dataFormSchemas } from './schemas';

defineOptions({
  name: 'DepartmentForm',
});

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();

async function onSubmit(values: Record<string, any>) {
  const result = isUpdate.value
    ? await updateDepartment(values as DepartmentInfo)
    : await createDepartment(values as DepartmentInfo);
  if (result.code === 0) {
    message.success(result.msg);
    gridApi.value.reload();
  }
}

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [...(dataFormSchemas.schema as any)],
  showDefaultActions: false,
  layout: 'vertical',
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    const validationResult = await formApi.validate();
    if (validationResult.valid) {
      await formApi.submitForm();
      modalApi.close();
    }
  },
  onOpenChange(isOpen: boolean) {
    isUpdate.value = modalApi.getData()?.isUpdate;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen) {
      formApi.setValues(record.value);
    }
    modalApi.setState({
      title: isUpdate.value
        ? $t('sys.department.editDepartment')
        : $t('sys.department.addDepartment'),
    });
  },
});

defineExpose(modalApi);
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
