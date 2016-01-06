describe('ValidationError', () => {
  it('throws a useful error when the argument is not correct', () => {
    assert.throws(() => {
      new ValidationError([{name: 'name'}]);
    }, /Missing key/);
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
