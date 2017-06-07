import BigInt from './bigInt';
import Prim from './Prim';
let big = new BigInt(0,2);
let prim = new Prim(800);


console.log( big.Miller_Rabin(23) );