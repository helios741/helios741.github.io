function _reverseStr(str) {
	return str.split('').reverse().join('');
}
function _replaceCharFromStr(str,index,replaceChar) {
	if(!str[index]) return str+replaceChar;
	return str.slice(0,index) + replaceChar +str.slice(index+1);
}
const UPPERBOUND = 2000000000;
class BigIntBase {

	add(num1,num2) {
		const a = num1.toString(),
			b = num2.toString();
		let tmpSum = '',
		    szeA = a.length,
			szeB = b.length,
			i = szeA - 1,
			j = szeB - 1,
			isCarry = 0;
		while(i>=0 || j>=0) {
			let num1 = i>=0 ? a[i] : 0,
				num2 = j>=0 ? b[j] : 0,
			    sum = parseInt(num1, 10) + parseInt(num2, 10) + parseInt(isCarry, 10);
			if(sum<=9) {
				tmpSum += sum.toString();
				isCarry = 0;
			} else {
				tmpSum += (sum%10).toString();
				isCarry = 1;
			}
			i -- ;j--;
		}
		tmpSum = isCarry ? (tmpSum+'1') : tmpSum;
		
		return _reverseStr(tmpSum);
	}
	multiply(num1,num2) {
		num1 = num1.toString();
		num2 = num2.toString();
		const a = _reverseStr(num1),
			b = _reverseStr(num2),
			szeA = a.length,
			szeB = b.length;
		let addCarry = 0,
			multiCarry = 0,
			multiplySumStr = '';
		for (let i = 0; i < szeA ; i++) {
			addCarry = 0;
			multiCarry = 0;		
			for (let j = 0 ;j < szeB ; j++) {
				// 两位相乘计算出乘积
				let mulSum = parseInt(a[i], 10) * parseInt(b[j], 10) + multiCarry;
				// 计算出进位
				multiCarry = (mulSum/10)>>0;
				// 和以前的进行相加
				//console.group(i+j);
				//console.log(multiplySumStr[i+j]);
				let existValue = !multiplySumStr[i+j] ? 0 : multiplySumStr[i+j];
				let preAddSum = parseInt(existValue, 10) + addCarry + (mulSum%10);
				//console.log(preAddSum);
				//console.groupEnd();
				// 得到加法的进位
				addCarry = (preAddSum / 10)>>0;
				// 更改第i+j位置的值
				multiplySumStr = _replaceCharFromStr(multiplySumStr,i+j,preAddSum%10);
				// debugger;
				
			}
			let replaceChar = parseInt(multiCarry, 10) + parseInt(addCarry, 10);
			multiplySumStr = _replaceCharFromStr(multiplySumStr,i+szeB,replaceChar);
			
		}
		let ret = _reverseStr(multiplySumStr);
		return ret[0] === '0' ? ret.slice(1) : ret;
	}
	mod(num,mod) {
		let ans = 0;
		num = num.toString();
		const sze = num.length;
		for(let i = 0; i < sze; i++ ) {
			ans = (ans*10 + parseInt(num[i], 10)) % mod;
		}
		return ans;
	}
	/**
	* 比较两个大整数的带下
	* @return true表示num1 > num2
	*/
	_cmpBigInt(num1,num2) {
		num1 = num1.toString();
		num2 = num2.toString();
		const sze1 = num1.length,
			sze2 = num2.length;
		if (sze1 > sze2) return true;
		else if(sze1 < sze2) return false;
		for (let i = 0;i < sze2; i++) {
			if(num1[i] === num2[i]) continue;
			return num1[i] > num2[i];
		}
	}
	
	subtract(minuend,subtrahend) {
		minuend = minuend.toString();
		subtrahend = subtrahend.toString();
		if(subtrahend === minuend) return '0';
		let isMinuendGreaterSubtrahend = this._cmpBigInt(minuend, subtrahend);
		if (!isMinuendGreaterSubtrahend) {
			let t = minuend;
			minuend = subtrahend;
			subtrahend = t;
		}
		const minuendSze = minuend.length,
			subtrahendSze = subtrahend.length;
		let	subCarry = 0,
			subRes = '';
		minuend = _reverseStr(minuend);
		subtrahend = _reverseStr(subtrahend);
		//debugger;
		for (let i = 0;i < minuendSze; i++) {
			let tmpSubtrahend = (i >= subtrahendSze) ? 0 : parseInt(subtrahend[i],10) ;
			if ( parseInt(minuend[i],10) >= ( tmpSubtrahend + parseInt(subCarry,10) ) ) {
				subRes += (parseInt(minuend[i], 10) - tmpSubtrahend - subCarry ).toString();
				subCarry = 0;
				continue;
			}
			subRes += ( parseInt(minuend[i], 10) - subCarry - tmpSubtrahend + 10 ).toString();
			subCarry = 1;
		}
		let subResLen = subRes.length;
		for(let i = subResLen - 1;i>=0;i--) {
			if(subRes[i] === '0') continue;
			subRes = subRes.slice(0,i+1);
			break;
		}

		subRes = isMinuendGreaterSubtrahend ? subRes : subRes + '-';
		return _reverseStr(subRes);
	}
	/**
	* 检查 q = m - n * t 中的q是小于n的
	*/
	check(mid,m,n) {
		let divisorMultiplyOver = this.multiply(mid,n);
		let remainder = this.subtract(m,divisorMultiplyOver);
		// console.log(mid,m,n,remainder,divisorMultiplyOver,n==remainder);
		if(remainder[0] === '-') return 1;
		if(n == remainder) return 0;
		return this._cmpBigInt(n,remainder) ? 2 : 0;
	}
	/**
	* 二分找到q = m - n * t 中的q是小于n的，中的t
	* 也就是找打余数
	*/
	binarySearchOver(m,n) {
		let l = 0,
			r = UPPERBOUND;
		while(l <= r) {
			let mid = (l + r) >>1;
			// debugger;
			let endNo = this.check(mid,m,n);
			if(endNo === 1) {
				r = mid - 1;
			} else if (endNo === 0) {
				l = mid + 1;
			}else {
				return mid;
			}
		} 
		return 0;
	}
	div(dividend,divisor) {
		if (divisor === dividend ) return '1';
		else if(!this._cmpBigInt(dividend,divisor)) return '0';

		/**
		* 设被除数是m，除数是n，商为t，余数为q
		* 那么m = n * t + q
		* 经过变形 q = m - n * t
		* 所以我们要二分t的值，来计算q<n的情况，就能够算出答案
		*/
		return this.binarySearchOver(dividend,divisor);
	}
	rand(num) {
		return 4;
	}
}

export default BigIntBase;