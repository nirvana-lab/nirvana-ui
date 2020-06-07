import dayjs from 'dayjs';

const content = (schema) => {
  if (!schema.type) return '';
  switch (schema.type) {
    case 'object':
      if (!schema.properties) return {};
      return (() => {
        const result = {};
        Object.keys(schema.properties).forEach((property) => {
          result[property] = content(schema.properties[property]);
        });
        return result;
      })();
    case 'array':
      if (!schema.items) return [];
      return [
        content(schema.items),
      ];
    case 'integer'
    || 'number':
      return 0;
    case 'boolean':
      return true;
    case 'string':
      if (!schema.format) return 'string';
      switch (schema.format) {
        case 'byte':
          return 'byte';
        case 'binary':
          return 'binary';
        case 'password':
          return 'password';
        case 'date':
          return dayjs().format('YYYY-MM-DD');
        case 'date-time':
          return dayjs().format('YYYY-MM-DD HH:mm:ss');
        default:
          return 'string';
      }
    default:
      return '';
  }
};

export default content;
