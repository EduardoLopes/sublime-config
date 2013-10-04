'use strict';

angular.module('sublConfigApp')
  .controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $rootScope.config = {};

    $scope.tooltipInit = function() {
      $('i[rel="tooltip"]').popover({
        trigger: 'hover'
      });
    };

    $scope.rulerValidation = function(arg) {
      var index;

      if('rulers' in $rootScope.config){
        index = $rootScope.config.rulers.indexOf(arg);
      }

      if( index > -1 ){
        $('#rulers').addClass('invalid');
      } else {
        $('#rulers').removeClass('invalid');
      }

    };

    $rootScope.setConfig = function(what, arg) {
      if(arg === 'default'){
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
      var index;
      if(what in $rootScope.config){
        index = $rootScope.config[what].indexOf(arg);
      }

      if (!(what in $rootScope.config) && arg) {
        $rootScope.config[what] = [];
      }

      //add this to the checkbox: ng-false-value="remove_this"
      if (arg === 'remove_this'){
        $rootScope.removeArrayOptions(what, arg);
      } else if(index > -1 || !arg){
        $('#rulers').addClass('invalid');
      } else {
        $('#rulers').removeClass('invalid');
        $scope.rulers = '';
        $rootScope.config[what].push(arg);
      }

      $rootScope.$broadcast('setConfig');
    };

    $rootScope.removeArrayOptions = function(what, arg) {
      var index = $rootScope.config[what].indexOf(arg);

      $rootScope.config[what].splice(index, 1);

      if ($rootScope.config[what].length === 0) {
        delete $rootScope.config[what];
      }

      $rootScope.$broadcast('setConfig');
    };

    $scope.$on('setConfig', function () {
      var json = JSON.stringify($rootScope.config, null, '\t');

      $rootScope.configJson = json.replace(/\"(\d*.\d+|[\d+]|false|true)\"/g, '$1');
    });

  }]);