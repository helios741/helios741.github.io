import primBase from './primBase';
import BigInt from '../bigInt';

export default class Prim extends primBase{
	constructor(mx) {
		super(mx);

		this.bigInt = new BigInt();
	}
	createBigOddPrim() {
		
	}
	preTestAnGetPrim() {
		let oddPrim = this.bigInt.createRandBigOdd();
		const prim = this.prim,
			bigInt = this.bigInt,
			num = this.num;
		for (let i = 1; i < num; i++) {
			if( bigInt.mod(oddPrim,prim[i]) ) continue;
			return this.preTestAnGetPrim();
		}
		return oddPrim;
	}

	getBigPrim() {
		return this.prim[(this.num * Math.random())>>0];	
		/*let pseudoPrime = this.preTestAnGetPrim();
		console.log(pseudoPrime,455);
		let isPrime = this.bigInt.Miller_Rabin(pseudoPrime);
		console.log(pseudoPrime,isPrime)
		while(!isPrime) {
			pseudoPrime = this.preTestAnGetPrim();
			isPrime = this.bigInt.Miller_Rabin(pseudoPrime);
			console.log(pseudoPrime,isPrime);
		}
		return pseudoPrime;*/
	}
}
