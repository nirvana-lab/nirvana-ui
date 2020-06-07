import 'codemirror/lib/codemirror.css';
import '../assets/styles/one-dark.scss';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';

import CodeMirror from 'vue-codemirror';

export default {
  install: (vm) => {
    vm.use(CodeMirror);
  },
};
