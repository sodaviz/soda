module.exports = {
  mode: "production",
  target: 'node',
  entry: {
    main: __dirname + "/dist/index.js",
  },
  output: {
    path: __dirname, // this can be any path and directory you want
    filename: 'bundle.js',
    library: 'soda',
    libraryTarget: 'var'
  },
  optimization: {
    minimize: false, // enabling this reduces file size and readability
  },
};
