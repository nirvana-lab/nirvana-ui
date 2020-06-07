import Noty from 'noty';
import './noty.css';
import './dao.css';


const VueNoty = {
  options: {
    layout: 'topRight',
    theme: 'dao',
    timeout: 4000,
    progressBar: true,
    closeWith: ['click'],
  },

  show(text, type = 'alert') {
    const params = {
      ...this.options,
      type,
      text,
    };

    return new Noty(params).show();
  },

  closeAll(text = null) {
    if (text) {
      Noty.closeAll(text);
    } else {
      Noty.closeAll();
    }
  },

  setMaxVisible(num, text = null) {
    if (text) {
      Noty.setMaxVisible(num, text);
    } else {
      Noty.setMaxVisible(num);
    }
  },
};

window.$message = ({ message, type }) => {
  VueNoty.show(message, type);
};
