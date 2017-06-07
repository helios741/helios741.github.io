import BigIntBase from './BigIntBase';
const TIMES = 8; // 做随机检查的次数
export default class BigInt extends BigIntBase {

	/**
	* 快速计算 (a^b) % mod
	*/
	q_pow(a,b,mod) {
		let ans = 1;
		while(b!=0) {
			if(this.mod(b,2)) {
				b = this.subtract(b,1);
				ans = this.multiply(ans,a);
			}
			b = this.div(b,2);
			a = this.multiply(a,a);
		}
		return ans;
	}

	witness(a,n) {
		// debugger;
		let saveN = this.subtract(n,1);
		let tmp = saveN;
		let count = 0;
		while (!this.mod(tmp,2)) {
			tmp = this.div(tmp,2);
			count++;
		}
		let x = this.q_pow(a,tmp);
		x = this.mod(x,n);
		if (x==1 || x == saveN ) return true;
		while(count--) {
			x = this.multiply(x,x);
			x = this.mod(x,n);
			if (x == saveN) return true;
		}
		return false;
	}

	Miller_Rabin(n) {
		if (n < 2) return false;
		if (n === 2) return true;
		for (let i = 0;i < TIMES; i++) {
			let a =  this.rand(n - 2) + 1;

			if(!this.witness(a,n)) return false;
		}
		return true;
	}

}
