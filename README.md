# ValidationError

```
meteor add mdg:validation-error
```

Use a validation error to indicate that a method call has failed and the client can fix it by changing specific arguments. Examples:

1. An argument isn't of the right type
1. A number argument isn't in the right range
1. A username wasn't found in the database

This kind of error is tied to a specific field so that you can display it next to an input in a form currently being filled by the user.

This error format is based on the error output of [`aldeed:simple-schema`](https://github.com/aldeed/meteor-simple-schema).

## API

### new ValidationError(errors: Array, [message: String])

`errors` must be a array with keys of the form:

```js
[
  {
    // Name of the field this error is about
    name: String,

    // Type of error, can be mapped to a nice message
    // on the client
    type: String,

    // Any kind of details, depends on the type of error.
    // Should probably include a `value` field that
    // contains the invalid value passed from the client.
    details: Object
  }
  ...
]
```

`message` is an optional string to use for the error message so that the text printed at the top of the stack trace when the error is thrown is more useful. For example, if you pass in the error `{name: 'name', type: 'required'}`, you may want to also pass in the message "Name is required".

### Usage example

```js
// Inside a method definition
saveProduct({ name, cost, category }) {
  if (cost > 1000) {
    throw new ValidationError([
      {
        name: 'cost',
        type: 'out-of-range',
        details: {
          value: cost,
          min: 0,
          max: 100
        }
      }
    ]);
  }

  // ... the rest of the method
}
```

You might catch the error returned by a method call and display it in the UI:

```js
Template.foo.events({
  'submit': (event, instance) => {
    Meteor.call('method', (err) => {
      if (err && err.error === ValidationError.ERROR_CODE) {
        err.details.forEach((fieldError) => {
          instance.state.set(`error-${fieldError.name}`: fieldError.type);
        });
      }
    });
  }
});
```

### Works out of the box with mdg:method

This type of error is automatically thrown for invalid arguments if you use the [`mdg:method`](https://github.com/meteor/method) package, where you can specify a schema for the arguments of your method.

### Running tests

```bash
$ meteor test-packages --driver-package practicalmeteor:mocha ./
```