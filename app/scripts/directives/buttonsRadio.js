'use strict';

angular.module('sublConfigApp')
  .directive('buttonsRadio', function () {
    return {
      templateUrl: 'views/buttonsRadio.html',
      restrict: 'E',
      replace: true,
      scope: true,
      controller: ['$rootScope', '$scope', '$element', '$attrs', function ($rootScope, scope, element, attrs) {
        scope.name = attrs.name;
        scope.key = attrs.key;
        scope.buttons = [];

        var buttons = attrs.buttons.split(',');
        buttons.forEach(function(element){
          scope.buttons.push(element.trim());
        });

        if (attrs.link !== undefined ) {
          element.find('label').append(' <a href=" ' + attrs.link + ' " title=" ' + attrs.link + ' " target="_blank"><i class="icon-globe"></i></a>' );
        }

        if (attrs.tooltip !== undefined ) {
          element.find('label').append(' <i class="icon-info-sign" rel="tooltip"></i>' );
          $(element.find('i[rel="tooltip"]')).popover({
            trigger: 'hover',
            content: attrs.tooltip
          });
        }

      }]
    };
  });
