Package.describe({
  name: 'mdg:validation-error',
  version: '0.1.0',
  summary: 'A standard validation error to be used by form/method/validation packages',
  git: 'https://github.com/meteor/validation-error'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'aldeed:simple-schema@1.3.3',
    'check'
  ]);

  api.addFiles('validation-error.js');

  api.export('ValidationError');
});
