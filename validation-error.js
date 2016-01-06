ValidationError = class extends Meteor.Error {
  constructor(errors, message = 'Validation failed') {
    check(errors, [{
      name: String,
      type: String,
      details: Match.Optional(Object)
    }]);

    super(ValidationError.ERROR_CODE, message, errors);

    this.errors = errors;
  }
};

// If people use this to check for the error code, we can change it
// in future versions
ValidationError.ERROR_CODE = 'validation-error';
