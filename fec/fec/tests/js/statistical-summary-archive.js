'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var $ = require('jquery');
// var URI = require('urijs');
// var _ = require('underscore');

require('./setup')();

// _.extend(window, {
//   context: {
//     districts: {
//       NJ: { state: 'New Jersey', districts: 12 },
//       VA: { state: 'Virginia', districts: 11 }
//     }
//   }
// });

var search = require('../../static/js/pages/statistical-summary-archive');
// var map = require('../../static/js/modules/election-map');

describe('statistical-summary-archive', function() {
  before(function() {
    this.$fixture = $('<div id="fixtures"></div>');
    $('body').append(this.$fixture);
  });

 before(function() {
    sinon.stub(search.StatisticalSummaryArchive.prototype, 'showTable');
    //sinon.stub(map.ElectionMap.prototype, 'drawDistricts');
  });


  beforeEach(function() {
  console.log('beforeEach RAN')
  console.log('this.$fixture:', this.$fixture)
    this.$fixture
      .empty()
      .append(
'<div class="filter-controls">'+
'<div class="filter_year">'+
'<label for="year" class="label">Two-year period</label>'+
  '<select id="year" name="year">'+
    '<option selected value="1988">1987-1988</option>'+
    '<option  value="1986">1985-1986</option>'+
    '<option  value="1984">1983-1984</option>'+
    '<option  value="1982">1981-1982</option>'+
    '<option  value="1980">1979-1980</option>'+
    '<option  value="1978">1977-1978</option>'+
    '<option  value="1976">1975-1976</option>'+
  '</select>'+
'</div>'+
'<div class="filter_filer">'+
'<label for="filer" class="label">Filer type</label>'+
  '<select id="filer" name="filer">'+
    '<option selected value="congressional">Congressional candidates</option>'+
    '<option value="presidential">Presidential candidates</option>'+
    '<option value="party">Party committee</option>'+
    '<option value="pac">Political action committee</option>'+
    '<option value="expenditures">Independent expenditures</option>'+
  '</select>'+
'</div>'+
'</div>'+
'<h3 class="js-table-title u-padding--top"></h3>'
);
console.log('this.$fixture2:', this.$fixture)
//window.history.pushState({}, null, '/');
 //this.el = new search.StatisticalSummaryArchive('.filter-controls');
 this.el = new search(this.$fixture.find('.filter-controls'));
});

  // it('should memorize its selector', function() {
  //   expect(this.el.$elm.is($('#election-lookup'))).to.be.true;
  // });

  // it('should memorize its inputs', function() {
  //   expect(this.el.$zip.is($('#election-lookup [name="zip"]'))).to.be.true;
  //   expect(this.el.$state.is($('#election-lookup [name="state"]'))).to.be.true;
  //   expect(this.el.$district.is($('#election-lookup [name="district"]'))).to.be
  //     .true;
  // });

  // it('should disable the district select when state is not set', function() {
  //   this.el.$state.val('').change();
  //   expect(this.el.$district.prop('disabled')).to.be.true;
  // });

  // it('should disable the district select when state is set and the state does not have districts', function() {
  //   this.el.$state.val('AS').change();
  //   expect(this.el.$district.prop('disabled')).to.be.true;
  // });

  // it('should enable the district select when state is set and the state has districts', function() {
  //   this.el.$state.val('VA').change();
  //   expect(this.el.$district.prop('disabled')).to.be.false;
  // });

  // it('should clear the state select and disable the district select when the zip select is set', function() {
  //   this.el.$zip.val('19041').change();
  //   expect(this.el.$state.val()).to.equal('');
  //   expect(this.el.$district.prop('disabled')).to.be.true;
  // });

  // it('should serialize zip codes', function() {
  //   this.el.$zip.val('22902');
  //   expect(this.el.serialize()).to.deep.equal({ cycle: '2016', zip: '22902' });
  // });

  // it('should serialize state and district inputs', function() {
  //   this.el.$state.val('VA').change();
  //   this.el.$district.val('01');
  //   expect(this.el.serialize()).to.deep.equal({
  //     cycle: '2016',
  //     state: 'VA',
  //     district: '01'
  //   });
  // });

  // describe('drawing search results', function() {
  //   beforeEach(function() {
  //     this.drawItem = sinon.spy(search.ElectionSearch.prototype, 'drawResult');
  //     this.results = [
  //       { cycle: 2016, office: 'P', state: 'US' },
  //       { cycle: 2016, office: 'S', state: 'NJ' },
  //       { cycle: 2016, office: 'H', state: 'NJ', district: '09' }
  //     ];
  //     this.el.serialized = { cycle: '2016', state: 'NJ', district: '09' };
  //   });

  //   afterEach(function() {
  //     this.drawItem.restore();
  //   });

  //   it('should call drawResult', function() {
  //     this.el.draw(this.results);
  //     expect(this.drawItem).to.have.been.called;
  //   });
  // });


  describe('call showTable function', function() {
    beforeEach(function() {
      this.callShowTable = sinon.spy(search.ElectionSearch.prototype, 'handlePopState');
      

    it('should call showTable', function() {
      this.el.handlePopState();
      expect(this.showTable).to.have.been.called;
    });
  });

 });

});

 

//   it('disable non-presidential years when presidential is chosen', function() {
//     //this.el.serialized = { year: '1982', filer: 'presidential' };
//     this.el.chooseYear.value = '1982'
//     this.el.chooseFiler.value = 'presidential'
//     //expect(this.chooseYear.options[this.chooseYear.selectedIndex].textContent).to.equal("1984");
//     expect(this.el.chosenYear).to.equal('1984');
//   });
// });





//   it('should show no results warning on no results by state', function() {
//     this.el.serialized = { cycle: '2016', state: 'VI' };
//     this.el.draw([]);
//     expect(this.el.$resultsItems.text()).to.contain(
//       "We can't find any results for this location"
//     );
//     expect(this.el.$resultsTitle.text()).to.equal('');
//   });

//   describe('fetching ajax', function() {
//     beforeEach(function() {
//       this.response = {
//         results: [
//           { cycle: 2016, office: 'P', state: 'US' },
//           { cycle: 2016, office: 'S', state: 'NJ' },
//           { cycle: 2016, office: 'H', state: 'NJ', district: '09' }
//         ]
//       };
//       this.deferred = $.Deferred();
//       sinon.stub($, 'ajax').returns(this.deferred);
//       this.deferred.resolve(this.response);
//     });

//     afterEach(function() {
//       $.ajax.restore();
//     });

//     it('should fetch search results', function() {
//       sinon.stub(this.el, 'draw');
//       this.el.$zip.val('19041');
//       this.el.search();
//       expect($.ajax).to.have.been.called;
//       var call = $.ajax.getCall(0);
//       var uri = URI(call.args[0].url);
//       expect(uri.path()).to.equal('/v1/elections/search/');
//       expect(URI.parseQuery(uri.search())).to.deep.equal({
//         api_key: '12345',
//         per_page: '100',
//         cycle: '2016',
//         zip: '19041'
//       });
//       expect(URI.parseQuery(window.location.search)).to.deep.equal({
//         cycle: '2016',
//         zip: '19041'
//       });
//       expect(this.el.draw).to.have.been.calledWith(this.response.results);
//     });

//     it('should update form and search on popstate', function() {
//       sinon.stub(this.el, 'draw');
//       window.history.pushState({}, null, '?cycle=2016&zip=19041');
//       this.el.handlePopState();
//       expect(this.el.$zip.val()).to.equal('19041');
//       expect($.ajax).to.have.been.called;
//       var call = $.ajax.getCall(0);
//       var uri = URI(call.args[0].url);
//       expect(uri.path()).to.equal('/v1/elections/search/');
//       expect(URI.parseQuery(uri.search())).to.deep.equal({
//         api_key: '12345',
//         per_page: '100',
//         cycle: '2016',
//         zip: '19041'
//       });
//     });

//     it('should skip search if missing params', function() {
//       sinon.stub(this.el, 'draw');
//       this.el.search();
//       expect($.ajax).not.to.have.been.called;
//       expect(this.el.draw).not.to.have.been.called;
//     });
//   });

//   it('removes incorrect presidential elections', function() {
//     var raw = [{ cycle: 2018, office: 'P' }, { cycle: 2018, office: 'S' }];
//     var results = this.el.removeWrongPresidentialElections(raw, '2018');
//     expect(results).to.deep.equal([{ cycle: 2018, office: 'S' }]);
//   });
// });
