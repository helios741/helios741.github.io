/**
* please use `npm instal` install devDependencies
* make sure the global installation of mocha
* idea
* 	+ apply list,The head of the list represents the most recently used one
*   + once there is operation(get/insert),move node to the head  of list
*	+ Once exceeded the capacity,invalidate tail of list
*	+ using object as data structures,format:{string:Object}
*	+ in this way,the  time complexity of the operation is O(1)
*	+ removes the property of an object through the object's key
*/

function Node(key, val) {
	this.key = key;
	this.val = val;
	this.nxt = null;
	this.pre = null;
}
/**
 * @constructor
 */
function Cache(capacity) {
	this.list = {};
	this.head = null;
	this.tail = null;
	this.capacity = capacity;
	this.sze = 0;
}
/**
 * @param {string} key
 * @desc get value by key 
 * @returns {string}
 */
Cache.prototype.get = function(key) {
	var node = this.list[key];
	if ( !node ) {
		return;
	}
	this.touch(node);

	return node.val;
}

/**
 * @param {object} node
 * @desc move the node of the current opertion(get/insert) to the head
 * @returns {void}
 */
Cache.prototype.touch = function( node ){
	
	if ( node === this.head ) {
			return;
	}
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

/**
 * @param {string} key
 * @param {string} value
 * @desc insert new node
 * @returns {void}
 */
Cache.prototype.insert = function(key, val) {
	if (val === undefined) {
		return ;
	}
	var newNode = new Node(key, val),
		oldNode = this.list[key];

	// update old node value  if it exist
	if (oldNode) {
		oldNode.val = val;
		this.touch(oldNode);
		return;
	}

	// insert head if list === null
	// else insert tail
	if ( !this.sze ) {
		this.tail  = newNode;
	} else {
		newNode.nxt = this.head;
		this.head.pre  = newNode;
	}

	this.head = newNode;

	this.sze ++;
	if ( this.sze > this.capacity ) {
		// remove the least frequently used
		delete this.list[this.tail.key];
		this.tail = this.tail.pre;
		this.tail.nxt = null;
		this.sze--;
	}
	this.list[key] = newNode;
}

module.exports = Cache;