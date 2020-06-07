<template>
  <div class="repo-info mb-10">
    <div class="mb-15">
      <vue-button
        small
        class="icon-button round mr-10"
        @click="handleBack"
        iconLeft="chevron_left"
      />
      <span class="repo-test-method vm" :class="$route.query.method">
        {{ $route.query.method }}
      </span>
    </div>
    <span class="repo-test-path">
      {{ $route.query.path }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'RepoInfo',
  props: ['paths'],
  computed: {
    method() {
      const { method } = this.$route.query;
      if (method) {
        return method.toLowerCase();
      }
      return '';
    },
  },
  methods: {
    handleBack() {
      this.$router.push({
        name: 'RepoDetail',
        params: { id: this.$route.params.id },
        query: {
          file: this.$route.query.file,
          ref: this.$route.query.ref,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-info {
  flex-shrink: 0;
  padding: 12px 12px 16px 12px;
  border-radius: 4px;
  background-color: #2d3444;
  color: #fff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  .title {
    font-weight: 500;
    vertical-align: text-bottom;
  }
}
.repo-test-method {
  font-size: 13px;
  font-weight: 900;
  min-width: 57px;
  padding: 5px 10px;
  display: inline-block;
  font-family: sans-serif;
  color: #fff;
  &.POST {
    color: #49cc90;
  }
  &.PUT {
    color: #fca130;
  }
  &.DELETE {
    color: #f93e3e;
  }
  &.GET {
    color: #4d9ae7;
  }
  &.PATCH {
    color: #50e3c2;
  }
  &.HEAD {
    color: #9012fe;
  }
  &.OPTIONS {
    color: #0d5aa7;
  }
  &.DEPRECATED {
    color: #ebebeb;
  }
}
.repo-test-path {
  font-size: 13px;
  display: inline-block;
  word-break: break-word;
  font-family: monospace;
  font-weight: 600;
}
</style>
