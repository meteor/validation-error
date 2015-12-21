describe('ValidationError', () => {
  it('throws a useful error when the argument is not correct', () => {
    try {
      new ValidationError([{name: 'name'}]);
    } catch (error) {
      // Welcome to Bizarro World, where ValidationError constructor actually throws
      // a ValidationError when the arguments aren't correct.
      assert.equal(error.error, 'validation-error');
      assert.equal(error.details, error.errors);
      assert.equal(error.errors[0].name, 'errors.0.type');
      assert.equal(error.errors[0].type, 'required');
    }
  });

  it('allows message to be passed in', () => {
    // We need to make sure the that error printed at the top of the stack trace when
    // this is thrown contains the necessary information to deal with the error.
    // So we allow message to be passed in, which can contain the error message for the
    // first error in the array.
    try {
      throw new ValidationError([{
        name: 'name',
        type: 'required'
      }], 'Name is required');
    } catch (error) {
      assert.equal(error.error, 'validation-error');
      assert.equal(error.message, 'Name is required [validation-error]');
    }
  });
});
