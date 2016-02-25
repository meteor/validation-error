# ValidationError

```
meteor add mdg:validation-error
```

Use a validation error to indicate that a method call has failed and the client can fix it by changing specific arguments. Examples:

1. An argument isn't of the right type
1. A number argument isn't in the right range
1. A username wasn't found in the database

This kind of error is tied to a specific field so that you can display it next to an input in a form currently being filled by the user.

This error format is based on the error output of [`aldeed:simple-schema`](https://github.com/aldeed/meteor-simple-schema) and is also compatible with the error output of [`jagi:astronomy`](https://github.com/jagi/meteor-astronomy).

## API

### new ValidationError(errors: Array, [message: String])

`errors` must be an array with keys of the form:

```js
[
  {
    // Name of the field this error is about.
    name: String,

    // Type of error, can be mapped to a nice message on the client.
    type: String,

    // Any kind of details that depends on the type of error can be added as
    // an extra object's property (eg. `message` with a per field error message
    // or `value` that contains the invalid value passed from the client).
    ...
  }
  ...
]
```

`message` is an optional string to use for the error message so that the text printed at the top of the stack trace when the error is thrown is more useful. For example, if you pass in the error `{name: 'name', type: 'required'}`, you may want to also pass in the message "Name is required".

### ValidationError.is(error: Meteor.Error)

The static `ValidationError.is` method is a helper for checking if an error thrown by a server and catched on the client is an instance of `ValidationError`.

```js
Meteor.call('method', (err) => {
  if (ValidationError.is(err)) {
    ...
  }
});
```

### Usage example

```js
// Inside a method definition
saveProduct({ name, cost, category }) {
  if (cost > 1000) {
    throw new ValidationError([
      {
        name: 'cost',
        type: 'out-of-range',
        value: cost,
        min: 0,
        max: 100
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
      if (ValidationError.is(err)) {
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
meteor test-packages --driver-package practicalmeteor:mocha ./
```
