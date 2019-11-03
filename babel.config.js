module.exports = function() {

  const productionConfig = {
    'plugins': [
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-transform-property-literals'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      [
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        {
          'useBuiltIns': true
        }
      ]
    ],
    'presets': [
      [
        require.resolve('@babel/preset-env'),
        {
          'targets': {
            'browsers': [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4'
            ]
          }
        }
      ],
      require.resolve('@babel/preset-react')
    ]
  };

  return productionConfig;
};
