module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowUndefined": true
      }],
      ["@babel/plugin-transform-class-properties", { "loose": true }], // Añade el modo 'loose'
      ["@babel/plugin-transform-private-methods", { "loose": true }], // Añade el modo 'loose'
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }] // Añade el modo 'loose'
    ]    
  };
};
