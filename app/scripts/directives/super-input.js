'use strict';

angular.module('sublConfigApp')
  .directive('superInput', [function () {
    return {
      templateUrl: 'views/superInput.html',
      restrict: 'E',
      replace: true,
      scope: true,
      controller: ['$rootScope', '$scope', '$element', '$attrs', function ($rootScope, scope, element, attrs) {
        scope.name = attrs.name;
        scope.key = attrs.key;
        scope.type = attrs.type;

        var attr = (function() {
          var attribute = {
            id: attrs.key
          };

          for (var prop in attrs.$attr) {

            if(/a-\w*/g.exec(attrs.$attr[prop])){
              attribute[attrs.$attr[prop].replace('a-', '')] = attrs[prop];
            }

          };

          return attribute;
        }());

        $(element.find("input")).attr(attr);

        if (attrs.link !== undefined ) {
          element.find('label').append('<a href=" ' + attrs.link + ' " title=" ' + attrs.link + ' " target="_blank"><i class="icon-globe"></i></a>' );
        };

        if (attrs.tooltip !== undefined ) {
          element.find('label').append('<i class="icon-info-sign" rel="tooltip"></i>' );
          $(element.find("i[rel='tooltip']")).popover({
            trigger: 'hover',
            content: attrs.tooltip
          });
        };

      }]
    };
  }]);
