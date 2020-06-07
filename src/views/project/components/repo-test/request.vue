<template>
  <div>
    <div class="title mb-5">
      <span class="name">BODY</span>
    </div>
    <codemirror
      class="test-request"
      :value="value"
      @input="handleChange"
      :options="options"
    ></codemirror>
  </div>
</template>
<script>
export default {
  name: 'Request',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e);
    },
  },
  data() {
    return {
      options: {
        lineNumbers: true,
        theme: 'one-dark',
        mode: 'application/json',
        foldGutter: true,
        indentUnit: 2, // 缩进单位，默认2
        smartIndent: true, // 是否智能缩进
        matchBrackets: true,
        gutters: ['CodeMirror-foldgutter'],
        lint: true,
        extraKeys: {
          Tab: (cm) => {
            if (cm.somethingSelected()) {
              // 存在文本选择
              cm.indentSelection('add'); // 正向缩进文本
            } else {
              // 无文本选择
              // cm.indentLine(cm.getCursor().line, "add");  // 整行缩进 不符合预期
              cm.replaceSelection(Array(cm.getOption('indentUnit') + 1).join(' '), 'end', '+input'); // 光标处插入 indentUnit 个空格
            }
          },
          'Shift-Tab': (cm) => {
            // 反向缩进
            if (cm.somethingSelected()) {
              cm.indentSelection('subtract'); // 反向缩进
            } else {
              // cm.indentLine(cm.getCursor().line, "subtract");  // 直接缩进整行
              const cursor = cm.getCursor();
              cm.setCursor({ line: cursor.line, ch: cursor.ch - 4 }); // 光标回退 indexUnit 字符
            }
          },
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.title {
  font-size: 13px;
  padding: 5px;
  font-weight: 600;
  border-style: solid;
  border-width: 1px 0 0;
  margin-top: 10px;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
  .name {
    vertical-align: text-bottom;
  }
}
.test-request {
  // margin-right: 20px;
  // min-height: 100px;
  border-radius: 4px;
  background-color: #282c34;
}
</style>
