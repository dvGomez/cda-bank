'use strict';

describe('Service: UserHash', function () {

  // load the service's module
  beforeEach(module('frontEndApp'));

  // instantiate service
  var UserHash;
  beforeEach(inject(function (_UserHash_) {
    UserHash = _UserHash_;
  }));

  it('should do something', function () {
    expect(!!UserHash).toBe(true);
  });

});
