'use strict';

angular.module('sublConfigApp')
  .filter('firstLetterUpperCase', function () {
    return function (input) {
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    };
  });
