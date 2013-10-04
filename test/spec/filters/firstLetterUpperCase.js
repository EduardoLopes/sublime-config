'use strict';

describe('Filter: firstLetterUpperCase', function () {

  // load the filter's module
  beforeEach(module('sublConfigApp'));

  // initialize a new instance of the filter before each test
  var firstLetterUpperCase;
  beforeEach(inject(function ($filter) {
    firstLetterUpperCase = $filter('firstLetterUpperCase');
  }));

  it('should return the input with the first letter upcase', function () {
    var text = 'angularjs';
    expect(firstLetterUpperCase(text)).toBe('Angularjs');
  });

});
