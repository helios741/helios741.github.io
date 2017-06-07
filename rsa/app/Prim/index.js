import primBase from './primBase';
import BigInt from '../bigInt';
const PRIMBYTESUM = 1e20;
export default class Prim extends primBase{
	constructor(mx) {
		super(mx);

		this.bigInt = new BigInt();
	}
	createBigOddPrim() {
		let oddNum = Math.random() * PRIMBYTESUM;
		while(oddNum%2) oddNum = Math.random() * PRIMBYTESUM;
		return oddNum;
	}
	preTestAnGetPrim() {
		let oddPrim = this.createBigOddPrim();
		const prim = this.prim,
			bigInt = this.bigInt,
			num = this.num;
		for (let i = 0; i < num; i++) {
			if( bigInt.mod(oddPrim,prim[i]) ) continue;
			return this.preTestPrim();
		}
		return oddPrim;
	}
	__Miller_Rabin(n) {
		const TIMES = 8;
		if(n == 2) return true;
		if(n<2) return false;
		for (let i = 0 ;i < TIMES; i++) {
			
		}
	}
	getBigPrim() {
		let pseudoPrime = this.preTestAnGetPrim();
		let isPrime = this.__Miller_Rabin(pseudoPrime);
		while(!isPrime) {
			pseudoPrime = this.preTestAnGetPrim();
			isPrime = this.__Miller_Rabin(pseudoPrime);
		}
		return pseudoPrime;
	}
}
