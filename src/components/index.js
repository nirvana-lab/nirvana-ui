import './message';

const requireComponent = require.context('./', true, /\.vue$/);
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function validateFileName(str) {
  return /^\S+\.vue$/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1));
}
export default {
  install: (vm) => {
    requireComponent.keys().forEach((filePath) => {
      const componentConfig = requireComponent(filePath);
      const fileName = validateFileName(filePath);
      const componentName = componentConfig.default.name
        ? componentConfig.default.name
        : fileName;
      vm.component(componentName, componentConfig.default || componentConfig);
    });
  },
};
