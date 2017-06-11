var Cache = require('../Cache'),
	expect = require('chai').expect;

// sample test:

describe('capacity =2 sample:', function() {
	var cache = new Cache(2);
	it ("get('name')",function() {
		expect(cache.get('name')).to.be.equal(undefined);
	});
	it ("put('name','helios'),put('age','20'),get('name'),get('age') ",function() {
		cache.put('name','helios');
		cache.put('age','20');
		expect(cache.get('name')).to.be.equal('helios');
		expect(cache.get('age')).to.be.equal('20');
	});
	it ("put('sex','man'),cache.get('name')",function() {
		cache.put('age','20');cache.put('sex','man');
		expect(cache.get('name')).to.be.equal(undefined);
	});
});
// test when you reach the capacity, delete the one that uses the least frequency
describe('capacity =3 sample:', function() {
	var cache = new Cache(3);
	it ("get('name')",function() {
		expect(cache.get('name')).to.be.equal(undefined);
	});
	it ("put('name','helios'),put('age','20'),get('name'),get('age') ",function() {
		cache.put('name','helios');
		cache.put('age','20');
		expect(cache.get('name')).to.be.equal('helios');
		expect(cache.get('age')).to.be.equal('20');
	});
	it ("put('name','helios1'),put('age','201'),get('name'),get('age') ",function() {
		cache.put('name','helios1');
		cache.put('age','201');cache.put('age','201');
		expect(cache.get('name')).to.be.equal('helios1');
		expect(cache.get('age')).to.be.equal('201');
	});
	it ("put('addr','helios'),put('fa','20'),get('addr'),get('fa'),get('name') ",function() {
		cache.put('addr','helios');
		cache.put('fa','20');
		expect(cache.get('addr')).to.be.equal(undefined);
		expect(cache.get('fa')).to.be.equal('20');
	});

});

// test random deletion of least frequency 

describe('capacity = 3 sample',function(){
	var cache = new Cache(3);
	it ("put name three times,put age and sex , then get it",function(){
		cache.put('name','helios');cache.put('name','helios1');cache.put('name','helios2');
		cache.put('age','22');
		cache.put('sex','man');
		expect( cache.get('name') ).to.be.equal('helios2');
		expect( cache.get('age') ).to.be.equal('22');
		expect( cache.get('sex') ).to.be.equal('man');
	});
	it ('put aa random remove age or sex',function(){
		cache.put('aa','aaa');
		var arr = [];
		arr[0] = cache.get('sex');
		arr[1] = cache.get('age');
		expect( cache.get('name') ).to.be.equal('helios2');
		expect( arr ).to.include(undefined);
		expect( cache.get('aa') ).to.be.equal('aaa');
		expect( cache.get('aa') ).to.be.equal('aaa');
	});
});