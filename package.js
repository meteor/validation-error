Package.describe({
  name: 'mdg:validation-error',
  version: '0.2.0',
  summary: 'A standard validation error to be used by form/method/validation packages',
  git: 'https://github.com/meteor/validation-error'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'check',
  ]);

  api.addFiles('validation-error.js');

  api.export('ValidationError');
});

Package.onTest(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript@0.1.5',
    'practicalmeteor:mocha@2.1.0_6',
    'practicalmeteor:chai@2.1.0_1',
    'mdg:validation-error',
  ]);

  api.addFiles('validation-error-tests.js');
});
