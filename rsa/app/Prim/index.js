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
	preTestPrim() {
		let oddPrim = createBigOddPrim();
		const prim = this.prim,
			bigInt = this.bigInt,
			num = this.num;
		for (let i = 0; i < num; i++) {
			if( bigInt.mod(oddPrim,prim[i]) ) continue;
			return this.preTestPrim();
		}
		return oddPrim;
	}
	
}
