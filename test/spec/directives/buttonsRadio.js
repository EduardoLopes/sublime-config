'use strict';

describe('Directive: buttonsRadio', function () {

  // load the directive's module
  beforeEach(module('sublConfigApp'));
  beforeEach(module('views/buttonsRadio.html'));

  var element,
      scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<buttons-radio name="Spell Check"'+
                                             'key="spell_check"' +
                                             'buttons="false, true, default"'+
                                             'tooltip="Set to true to turn spell checking on by default."'+
                                             'link="http://www.sublimetext.com/docs/2/spell_checking.html">'+
                              '</buttons-radio>');


    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('scope.name should to be "Spell Check"', inject(function () {

    expect(element.scope().name).toBe('Spell Check');
  }));

  it('scope.key should to be "spell_check"', inject(function () {

    expect(element.scope().key).toBe('spell_check');
  }));

  it('scope.buttons should to be a array and contain "false", "true", "default"', inject(function () {

    expect(element.scope().buttons).toContain('false');
    expect(element.scope().buttons).toContain('true');
    expect(element.scope().buttons).toContain('default');
  }));

  it('should to have a link element', inject(function () {
    var a = element.find('a');
    expect(a.length).toBe(1);
  }));

  it('should to have 2 tooltip', inject(function () {
    var tooltip = element.find('i[rel="tooltip"]');

    expect(tooltip.length).toBe(1);
  }));

});
