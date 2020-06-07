const icons = require.context(
  './svgs',
  true,
  /(\w+)\.svg$/,
);

icons.keys().forEach((key) => {
  icons(key);
});
