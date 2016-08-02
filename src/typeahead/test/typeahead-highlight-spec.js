import '../typeahead.js';

describe('typeaheadHighlight', function () {

  var highlightFilter, $log, $sce, logSpy;

  beforeEach(function () {
        angular.mock.module('tempura.typeahead');    
    });
  beforeEach(module('templates'));

  beforeEach(inject(function(_$sce_) {
    $sce = _$sce_;
  }));

  beforeEach(inject(function(ghsTypeaheadHighlightFilter) {
    highlightFilter = ghsTypeaheadHighlightFilter;
  }));

  it('should higlight a match', function() {
    expect($sce.getTrustedHtml(highlightFilter('before match after', 'match'))).toEqual('before <strong>match</strong> after');
  });

  it('should higlight a match with mixed case', function() {
    expect($sce.getTrustedHtml(highlightFilter('before MaTch after', 'match'))).toEqual('before <strong>MaTch</strong> after');
  });

  it('should higlight all matches', function() {
    expect($sce.getTrustedHtml(highlightFilter('before MaTch after match', 'match'))).toEqual('before <strong>MaTch</strong> after <strong>match</strong>');
  });

  it('should do nothing if no match', function() {
    expect($sce.getTrustedHtml(highlightFilter('before match after', 'nomatch'))).toEqual('before match after');
  });

  it('should do nothing if no or empty query', function() {
    expect($sce.getTrustedHtml(highlightFilter('before match after', ''))).toEqual('before match after');
    expect($sce.getTrustedHtml(highlightFilter('before match after', null))).toEqual('before match after');
    expect($sce.getTrustedHtml(highlightFilter('before match after', undefined))).toEqual('before match after');
  });

  it('issue 316 - should work correctly for regexp reserved words', function() {
    expect($sce.getTrustedHtml(highlightFilter('before (match after', '(match'))).toEqual('before <strong>(match</strong> after');
  });

  it('issue 1777 - should work correctly with numeric values', function() {
    expect($sce.getTrustedHtml(highlightFilter(123, '2'))).toEqual('1<strong>2</strong>3');
  });

});
