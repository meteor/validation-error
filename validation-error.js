// The "details" property of the ValidationError must be an array of objects
// containing at least two properties. The "name" and "type" properties are
// required.
const errorsPattern = [Match.ObjectIncluding({
  name: String,
  type: String
})];

class ValidationError extends Meteor.Error {
  constructor(errors, reason = ValidationError.DEFAULT_REASON) {
    check(errors, errorsPattern);
    check(reason, String);

    return super(ValidationError.ERROR_CODE, reason, errors);
  }

  // Static method checking if a given Meteor.Error is an instance of
  // ValidationError.
  static is(err) {
    return err &&
      err instanceof Meteor.Error &&
      err.error === ValidationError.ERROR_CODE;
  };
};

// Universal validation error code to be use in applications and packages.
ValidationError.ERROR_CODE = 'validation-error';
// Default validation error message that can be changed globally.
ValidationError.DEFAULT_REASON = 'Validation failed';
