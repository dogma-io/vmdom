module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-object-rest-spread',
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '4',
        },
      },
    ],
    '@babel/flow',
    '@babel/react',
  ],
}
