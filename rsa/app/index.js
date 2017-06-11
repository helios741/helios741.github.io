import React from 'react';
import {render} from 'react-dom';
import BigInt from './bigInt';
import Prim from './Prim';
import HandleInput from './handleInput'
let big = new BigInt();
let prim = new Prim(20002);
let HandleInputIns = new HandleInput();

// console.log(big.bigIntBinary(1000000250001,1));
// 得到两个大素数
let bigPrimP = prim.getBigPrim(),
	bigPrimQ = prim.getBigPrim();

// 计算n
let n = bigPrimP * bigPrimQ;
// 计算n的欧拉函数

let eulerValue = (bigPrimP - 1) * (bigPrimQ - 1);

// 得到公钥中的一个参数e
let e;
for(let i = 2; i<eulerValue;i++) {
	if (big.gcd(i,eulerValue) === 1) {
		e = i;
		break;
	}
}

// 计算私钥总的参数d

let d=1;
while( (d*e)%eulerValue !==1 )d++;

// 公钥为{e,n}
// 私钥为{d,n}

let password = 'dnakldfa2';
let pwdToNumArr = HandleInputIns.inputGroup(password);
console.log(pwdToNumArr);
