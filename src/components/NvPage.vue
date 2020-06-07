<template>
<span class="nv-page">
  <span class="dao-btn-group">
    <vue-button class="icon-button black mr-5 round" iconLeft="chevron_left" @click="pre" :disabled="this.current == 1"/>
    <vue-button class="icon-button black round" iconLeft="chevron_right" @click="next"
    :disabled="total=== 0 || this.current == Math.ceil(this.total / this.currentSize)"/>
  </span><span class="nv-page-info"><span v-if="total">{{currentPage===1?1:((currentPage-1)*currentSize+1)}} -
    {{last}}</span> | {{total}}</span>
</span>
</template>
<script>
export default {
  name: 'NvPage',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    currentSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    last() {
      if (this.currentPage * this.currentSize > this.total) {
        return this.total;
      }
      return this.currentPage * this.currentSize;
    },
  },
  data() {
    return {
      current: '',
    };
  },
  watch: {
    currentPage() { this.current = this.currentPage; },
  },
  beforeMount() {
    this.current = this.currentPage;
  },
  mounted() {
    this.$emit('changePage', this.current);
  },
  methods: {
    next() {
      if (this.current !== Math.ceil(this.total / this.currentSize)) {
        this.current += 1;
        this.$emit('changePage', this.current);
      }
    },
    pre() {
      if (this.current !== 1) {
        this.current -= 1;
        this.$emit('changePage', this.current);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.nv-page-info{
  margin-left: 10px;
  line-height: 16px;
  color: #9ba3af;
}
</style>
