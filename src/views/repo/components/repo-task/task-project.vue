<template>
  <VueModal title="TestCases" @close="$emit('update:show', false)">
    <div class="body">
       <VueSelect
          v-model="current"
          button-class="white mb-10"
          class="long"
        >
        <VueSelectButton v-for="(p, index) in data" :key="p.id" :value="index" :label="p.file_name" />
      </VueSelect>
      <ApiNode v-for="i in apis" :value="selectArray" @update="(value) => selectArray = value" :key="i.key" :data="i"/>
    </div>
    <div slot="footer" class="actions">
      <div class="space"></div>
      <VueButton class="red round" @click="handleConfirm">Confirm</VueButton>
      <VueButton class="flat round" @click="$emit('update:show', false)">Cancel</VueButton>
    </div>
  </VueModal>
</template>

<script>
import * as taskService from '@/services/taskService';
import ApiNode from './api-node.vue';

export default {
  name: 'TaskProject',
  components: { ApiNode },
  data() {
    return {
      data: [],
      selectArray: [],
      current: -1,
    };
  },
  methods: {
    handleConfirm() {
      this.$emit('handleAdd', this.selectArray);
      this.selectArray = [];
      this.$emit('update:show', false);
    },
  },
  computed: {
    apis() {
      if (this.current === -1) return [];
      return Object.keys(this.data[this.current].testcases).map((i) => ({ key: i, cases: this.data[this.current].testcases[i] }));
    },
  },
  mounted() {
    const { id } = this.$route.params;
    taskService.getAllTestCases(id).then(({ data }) => {
      this.data = data.data;
    });
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.body {
  padding: 0 24px;
  min-width: 450px;
  max-width: 700px;
}
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
</style>
