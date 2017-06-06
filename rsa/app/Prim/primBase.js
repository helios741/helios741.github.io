
export default class PrimBase {
	constructor(mx) {
		this.vis = [];
		this.prim = [];
		this.num = 0;
		this.init(mx);
		this.execPrim(mx,this.prim);
	}
	init(mx) {
		for(let i =0 ;i<=mx;i++) this.vis[i] = true;
	} 
	execPrim(mx,prim) {
		for (let i=2;i<= mx;i++) {
			if(this.vis[i]) {
				this.num++;
				prim[this.num] = i;
			}
			for(let j = 1;j<=this.num&&(i*prim[j]<=mx);j++) {
				this.vis[ i*prim[j] ] = false;
				if (i % prim[j] === 0) break; 
			}
		}
	}
	getPrim() {
		return this.prim;
	}
	getPrimSum() {
		return this.num;
	}
}