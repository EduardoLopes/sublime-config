'use strict';

describe('Directive: superInput', function () {

  // load the directive's module
  beforeEach(module('sublConfigApp'));
  beforeEach(module('views/superInput.html'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;

    element = angular.element('<super-input name="Font Size"'+
                                           'key="font_size"'+
                                           'a-type="number"'+
                                           'a-min="1"'+
                                           'a-max="50"'+
                                           'a-step="0.1"'+
                                           'tooltip="Sets size of the font for text area."'+
                                           'link="http://www.sublimetext.com/docs/2/font.html">'+
                              '</super-input>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('scope.name should to be "Font Size"', inject(function () {

    expect(element.scope().name).toBe('Font Size');
  }));

  it('scope.key should to be "font_size"', inject(function () {

    expect(element.scope().key).toBe('font_size');
  }));

  it('should to 4 attributes that are prefixed with "a-" in directive', inject(function () {
    var attrs = {};
    attrs.type = element.find('input[type="number"]');
    attrs.min = element.find('input[min="1"]');
    attrs.max = element.find('input[max="50"]');
    attrs.step = element.find('input[step="0.1"]');

    expect(attrs.type.length).toBe(1);
    expect(attrs.min.length).toBe(1);
    expect(attrs.max.length).toBe(1);
    expect(attrs.step.length).toBe(1);
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
