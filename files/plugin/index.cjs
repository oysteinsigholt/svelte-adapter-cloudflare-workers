const PLUGIN_NAME = 'AdapterPlugin';

class AdapterPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (factory) => {
      factory.hooks.parser
        .for('javascript/auto')
        .tap(PLUGIN_NAME, (parser, options) => {
          parser.hooks.import.tap(PLUGIN_NAME, (statement, source) => {
            // prevent importing URLSearchParams from url module
            if (source === 'url') {
              statement.specifiers = statement.specifiers.filter(
                (specifier) =>
                  specifier.type !== 'ImportSpecifier' ||
                  specifier.imported.name !== 'URLSearchParams'
              );
            }
          });
        });
    });
  }
}

module.exports = AdapterPlugin;
