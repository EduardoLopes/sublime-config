'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('sublConfigApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should set a new config', function () {

    scope.setConfig('spell_check', true);
    expect(scope.config.spell_check).toBe(true);
  });

  it('should remove a config', function () {

    scope.setConfig('spell_check', true);
    scope.removeConfig('spell_check');

    expect(scope.config.spell_check).toBeFalsy(angular.isDefined(scope.config.spell_check));
  });

  it('should remove a config if the value is "default"', function () {

    scope.setConfig('spell_check', true);
    scope.setConfig('spell_check', 'default');

    expect(scope.config.spell_check).toBeFalsy(angular.isDefined(scope.config.spell_check));
  });

  it('should set a new array options', function () {

    scope.setArrayOptions('font_options', 'bold');
    scope.setArrayOptions('font_options', 'italic');
    scope.setArrayOptions('font_options', 'gray_antialias');

    expect(scope.config.font_options).toContain('bold');
    expect(scope.config.font_options).toContain('italic');
    expect(scope.config.font_options).toContain('gray_antialias');
  });

  it('should set a new array options', function () {

    scope.setArrayOptions('font_options', 'bold');
    scope.setArrayOptions('font_options', 'italic');
    scope.setArrayOptions('font_options', 'gray_antialias');
    scope.removeArrayOptions('font_options', 'gray_antialias');

    expect(scope.config.font_options).toContain('bold');
    expect(scope.config.font_options).toContain('italic');
    expect(scope.config.font_options).toEqual([ 'bold', 'italic']);
  });

  it('should remove the config if remove the last option', function () {

    scope.setArrayOptions('font_options', 'bold');
    scope.removeArrayOptions('font_options', 'bold');

    expect(scope.config.font_options).toBeFalsy(angular.isDefined(scope.config.font_options));
  });

});
