/**
* please use `npm instal` install devDependencies
* make sure the global installation of mocha
* idea
*+	Some data structures
*	- list indicates each key corresponds to a node  {key:Object(node)}
*	- set[i] indicates all key/value pairs with a frequency of `i`
*	- Min indicates the minimum number of times to use is Min
*+	operation
*	- get(key)，get the node through list,use the node frequency +1,then perform `touch` operation(the touch operation principle is introduced later)
*	- put(key,value),if the node exists,update this node,then perform `touch` operation
*	- if the node not exists,Insert a new node({key,value}) into list,then adding {key,value} in set[1]
*	- Once exceeded capacity,randomly removes a key pair in set[Min] by Min,then update Min to 1
*+	touch operation
*	- If it is a new node inserted,adding {key,value} in set[1]
*	- If put(key,value) key exist or get(key)，the node frequency +1，then adding {key,value} in set[current's frequency +1]
*	- If the current operation node's frequency is equal to Min,and there is only one left in the set[Min]，then Min = Min+1
*+ sample capacity = 2
*	put('name','helios')   name' frequency is 1 Min = 1
*	put('age','20')   age' frequency is 1       Min = 1
*	put('age','21')   age' frequency is 2       Min = 1
*	put('name','nan')   name' frequency is 2    Min = 2   because set[1] = null,Min = Min + 1
*	put('sex','max')   sex' frequency is 1      Min = 1   randomly removes set[Min] a node, because insert new node ,node' frequency is 1,update Min = 1
*/


/**
 * @constructor
 */
function Node(key, val) {
	this.key = key;
	this.val = val;
	this.sum = 0;
}
/**
 * @constructor
 */
function Cache(capacity) {
	this.list = {};
	this.set = [];
	this.Min = 1;
	this.capacity = capacity;
	this.sze = 0;
}
/**
 * @param {object} node
 * @desc Maintain the value of `Min` , update frequency of node 
 * @returns {void}
 */
Cache.prototype.touch = function(node) {
	
	var oldSum = node.sum - 1,
		preItem = this.set[oldSum],
		curItem = this.set[oldSum+1]?this.set[oldSum+1]:{};
	// If the node does exist
	if(oldSum) { 
		// debugger;
		delete preItem[node.key];
		preItem.length--;
		if (!preItem.length) {
			this.set[oldSum] = undefined;
			if (this.Min === oldSum) { // If the frequency is equal to `Min`,update `Min`
				this.Min++;
			}
		}
	} 

	curItem.length = curItem.length || 0;
	curItem.length++;
	curItem[node.key] = node.val;
	this.set[oldSum+1] = curItem;
}
/**
 * @desc Delete any node whose frequency is Min
 * @returns {void}
 */
Cache.prototype.delItem = function() {
	var item = this.set[this.Min],
		o = Object.keys(item),
		sze = o.length,
		randonNum = (sze * Math.random())>>0,
		key = o[randonNum];
	if (o[randonNum] === 'length' && randonNum>0) {
		key = o[randonNum - 1];
	} else if (o[randonNum] === 'length' && randonNum< (sze-1) ) {
		key = o[randonNum + 1];
	}
	
	delete item[key];

	item.length--;
	delete this.list[key];
	if(!item.length) {
		this.set[this.Min] = undefined;
	}
	this.Min = 1;

}
/**
 * @param {string} key
 * @desc get value by key 
 * @returns {string}
 */
Cache.prototype.get = function(key) {
	var item = this.list[key];
	if(!item) return;
	item.sum++;
	this.touch(item);
	return item.val;
}

Cache.prototype.put = function(key,val) {

	if (val === undefined ) {
		return;
	}
	var newNode = new Node(key,val),
		oldNode = this.list[key];
	// If the node does exist,update value of node ,
	if (oldNode) {
		oldNode.sum++;
		oldNode.val = val;
		// console.log(oldNode);
		this.touch(oldNode);
		return;
	}
	this.sze++;
	if (this.sze > this.capacity) {
		this.delItem();
		this.sze--;
	}
	this.set[1] = this.set[1] || {};

	this.set[1][key] = val;
	newNode.sum = 1;
	this.Min = 1;
	this.touch(newNode);
	this.list[key] = newNode;
}

var cache = new Cache( 3 );
/*
cache.put('name','helios');
cache.put('age','20');
console.log(cache.get('name'));
console.log(cache.get('age'));
cache.put('name','helios1');
cache.put('age','201');cache.put('age','201');
console.log(cache.get('name'));
console.log(cache.get('age'));
cache.put('addr','helios');
cache.put('fa','20');

console.group('sample test');
console.log(cache.get('fa'));
console.log(cache.get('addr'));
console.log(cache.get('name'));
console.log(cache.get('age'));
console.groupEnd();*/
/*
console.log ( cache.get('any') );
cache.put('name','helios');cache.put('name','helios1');cache.put('name','helios2');
cache.put('age','22');
cache.put('sex','man');

console.group('test1');
console.log( cache.get('name') );
console.log( cache.get('age') );
console.log( cache.get('sex') );
console.groupEnd();


cache.put('aa','aaa');
console.group('test2');
console.log( cache.get('name') );
console.log( cache.get('age') );
console.log( cache.get('sex') );
console.log( cache.get('aa') );
console.log( cache.get('aa') );
console.groupEnd();
cache.put('bb','bbb');

console.group('test3');
console.log( cache.get('name') );
console.log( cache.get('age') );
console.log( cache.get('sex') );
console.log( cache.get('aa') );
console.log( cache.get('bb') );
console.groupEnd();
*/
 module.exports = Cache;