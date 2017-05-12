var Cache = require('../Cache'),
	expect = require('chai').expect;

describe('capacity =2 sample:', function() {
	var cache = new Cache(2);
	it ("get('name') : undefined",function() {
		expect(cache.get('name')).to.be.equal(undefined);
	});
	it ("insert('name','helios'),insert('age','20'),get('name'),get('age') ",function() {
		cache.insert('name','helios');
		cache.insert('age','20');
		expect(cache.get('name')).to.be.equal('helios');
		expect(cache.get('age')).to.be.equal('20');
	});
	it ("insert('sex','man'),cache.get('name')",function() {
		cache.insert('sex','man');
		expect(cache.get('name')).to.be.equal(undefined);
	});
});