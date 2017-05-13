var Cache = require('../Cache'),
	expect = require('chai').expect;

// test 1: 

describe('capacity =2 sample:', function() {
	var cache = new Cache(2);
	it ("get('name')",function() {
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

// test 2

describe('capacity =5 sample:', function() {
	var cache = new Cache(5);
	it ("get('name')",function() {
		expect(cache.get('name')).to.be.equal(undefined);
	});
	it ("insert('name','helios'),insert('age','20'),get('name'),get('age') ",function() {
		cache.insert('name','helios');
		cache.insert('age','20');
		expect(cache.get('name')).to.be.equal('helios');
		expect(cache.get('age')).to.be.equal('20');
	});
	it ("insert('name','helios'),insert('age','20'),get('name'),get('age') ",function() {
		cache.insert('name','helios1');
		cache.insert('age','201');
		expect(cache.get('name')).to.be.equal('helios1');
		expect(cache.get('age')).to.be.equal('201');
	});
	it ("insert('addr','helios'),insert('fa','20'),get('addr'),get('fa') ",function() {
		cache.insert('addr','helios');
		cache.insert('fa','20');
		expect(cache.get('addr')).to.be.equal('helios');
		expect(cache.get('fa')).to.be.equal('20');
	});
});

// test 3

describe('capacity = random sample:',function() {
	var capacity = (Math.random()*50)>>0;
		cache = new Cache( capacity );	
	for (var i=0;i<capacity*2;i++) {
		it ("random test"+i,function() {
			var key = 'test_'+(i%capacity),
				val = 'test_'+(Math.random()*200)>>0;
			
			cache.insert(key,val );
			expect( cache.get(key) ).to.be.equal(val);
		})
	}
});