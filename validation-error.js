/* global ValidationError:true */

// This is exactly what comes out of SS.
const errorPattern = [{
  name: String,
  type: String,
  details: Match.Optional(Object)
}];

ValidationError = class extends Meteor.Error {
  constructor(errors, message = 'Validation Failed') {
    check(errors, errorPattern);
    check(message, String);

    return super(ValidationError.ERROR_CODE, message, errors);
  }
  
  static isInstance(err) {
    return err && err instanceof Meteor.Error && err.error === ValidationError.ERROR_CODE;
  }
};

// If people use this to check for the error code, we can change it
// in future versions
ValidationError.ERROR_CODE = 'validation-error';
