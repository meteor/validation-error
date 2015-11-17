# ValidationError

Use a validation error to indicate that a method has failed because of incorrect input.

Typically, you'd display the information contained in the validation error marked up within a form that the user was entering.

## Usage

```js
throw new ValidationError([
  {name: 'field', type: 'code-that-identifies-the-error', details: {store: 'details', about: 'the-error'}}
]);
```

Typically, you'd catch the error and display each error in the list in the UI:

```js
try {
  doSomething();
} catch (ValidationError e) {
  _.each(e.errors, (e) => {
    alert(`Problem with ${e.name}! ${e.error}`);
  });
}
```
