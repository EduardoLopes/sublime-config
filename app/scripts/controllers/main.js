'use strict';

angular.module('sublConfigApp')
  .controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $rootScope.config = {};
      $rootScope.configArray = [
        'font_options',
        'rulers',
        'indent_guide_options',
        'auto_complete_triggers',
        'folder_exclude_patterns',
        'file_exclude_patterns',
        'binary_file_patterns',
        'ignored_packages'
      ];

      $scope.tooltipInit = function() {
        $("i[rel='tooltip']").popover({
          trigger: 'hover'
        });
      };

      $rootScope.setConfig = function(what, arg) {
        if(arg == 'default'){
          $rootScope.removeConfig(what);
        } else {
          $rootScope.config[what] = arg;
        }

        $rootScope.$broadcast('setConfig');
      };

      $rootScope.removeConfig = function(what) {
        delete $rootScope.config[what];
      };

      $rootScope.setArrayOptions = function(what, arg) {

        if(what in $rootScope.config){
          var index = $rootScope.config[what].indexOf(arg);
        };

        if (!(what in $rootScope.config) && arg) {
            $rootScope.config[what] = [];
        }

        //add this to the checkbox: ng-false-value="remove_this"
        if (arg == "remove_this"){
          $rootScope.removeArrayOptions(what, arg);
        } else if(index > -1 || !arg){
          $('#rulers').addClass('invalid');
        } else {
          $('#rulers').removeClass('invalid');
          $rootScope.config[what].push(arg);
        }

        $rootScope.$broadcast('setConfig');
      };

      $rootScope.removeArrayOptions = function(what, arg) {
        var index = $rootScope.config[what].indexOf(arg);

        $rootScope.config[what].splice(index, 1);

        if ($rootScope.config[what].length == 0) {
            delete $rootScope.config[what];
        }

        $rootScope.$broadcast('setConfig');
      };

      $scope.$on('setConfig', function () {
        var json = JSON.stringify($rootScope.config, null, '\t');

        $rootScope.configJson = json.replace(/\"(\d*.\d+|[\d+]|false|true)\"/g, "$1");
      });

    }]);
