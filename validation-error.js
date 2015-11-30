/* global ValidationError:true */
/* global SimpleSchema */

// This is exactly what comes out of SS.
const errorSchema = new SimpleSchema({
  name: {type: String},
  type: {type: String},
  details: {type: Object, blackbox: true, optional: true}
});

const errorsSchema = new SimpleSchema({
  errors: {type: Array},
  'errors.$': {type: errorSchema}
});

ValidationError = class extends Meteor.Error {
  constructor(errors) {
    check({errors}, errorsSchema);

    super(ValidationError.ERROR_CODE, 'Validation Failed', errors);

    this.errors = errors;
  }
};

// If people use this to check for the error code, we can change it
// in future versions
ValidationError.ERROR_CODE = 'validation-error';
