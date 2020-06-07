<template>
  <table class="table" :class="[{odd, even}]">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'NvTable',
  props: {
    odd: {
      type: Boolean,
      default: false,
    },
    even: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/colors";
.table th {
  padding: 0 7px;
  font-weight: 400;
  height: 30px;
  text-align: left;
  color: $vue-ui-grey-400;
}
.table td {
  height: 30px;
  padding: 0 3px;
  text-align: left;
}
.table {
  width: 100%;
  text-align: center;
  table-layout:fixed;
  border-collapse:collapse
}
.odd > tbody > tr:nth-child(odd),
.even > tbody > tr:nth-child(even) {
  background-color: #eff4f9;
}

.table[class*="hover"] > tbody > tr:hover {
  background-color: #eee;
}
</style>
