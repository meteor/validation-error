# ValidationError

Use a validation error to indicate that a method has failed because of incorrect input.

Typically, you'd display the information contained in the validation error marked up within a form that the user was entering.

## Usage

```js
throw new ValidationError([
  {
    name: 'field',
    type: 'code-that-identifies-the-error',
    details: {store: 'details', about: 'the-error'}
  }
]);
```

You might catch the error returned by a method call and display it in the UI:
```js
Template.foo.events({
  'submit': (event, instance) => {
    Meteor.call('method', (err) => {
      if (err && err.error === 'validation-error') {
        _.each(err.errors, function(error) {
          instance.state.set(`error-${error.name}`: error.type);
        });
      }
    });
  }
});
```
