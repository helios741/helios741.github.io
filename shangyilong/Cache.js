function Node(key, val) {
	this.key = key;
	this.val = val;
	this.nxt = null;
	this.pre = null;
}

function Cache(capacity) {
	this.list = {};
	this.head = null;
	this.tail = null;
	this.capacity = capacity;
	this.sze = 0;
}

Cache.prototype.get = function(key) {
	var node = this.list[key];
	if ( !node ) {
		return undefined;
	}

	this.touch(node);

	return node.val;
}

Cache.prototype.touch = function( node ){
	if ( node === this.head ) {
		return;
	}
	debugger;
	if ( node === this.tail ) {
		this.tail.pre.nxt = null;
		this.tail = this.tail.pre;
	} else {
		node.pre.nxt = node.nxt;
		node.nxt.pre = node.pre;
	}

	node.nxt = this.head;
	this.head.pre = node;
	this.head = node;
}

Cache.prototype.insert = function(key, val) {
	var newNode = new Node(key, val);

	if ( !this.sze ) {
		this.tail  =newNode;
	} else {
		newNode.nxt = this.head;
		this.head.pre  = newNode;
	}

	this.head = newNode;

	var oldNode = this.list[key];

	if ( oldNode ) {
		// remove node
        if (oldNode === this.tail) {
            this.tail = this.tail.pre;
            this.tail.nxt = null;
        } else {
            oldNode.pre.nxt = oldNode.nxt;
            oldNode.nxt.pre = oldNode.pre;
        }
        this.list[key] = newNode;
        return;
	}
	this.sze ++;
	if ( this.sze > this.capacity ) {
		delete this.list[key];
		this.tail = this.tail.pre;
		this.tail.nxt = null;
		this.sze--;
	}
	this.list[key] = newNode;
}

var cache = new Cache(2);

console.log ( cache.get('name') );
cache.insert('name','helios');
cache.insert('age','20');	

console.log ( cache.get('name') );
console.log( cache.get('age') );
cache.insert('sex','man');
console.log( cache.get('name') );


// module.exports = Cache;