function _reverseStr(str) {
	return str.split('').reverse().join('');
}
function _replaceCharFromStr(str,index,replaceChar) {
	if(!str[index]) return str+replaceChar;
	return str.slice(0,index) + replaceChar +str.slice(index+1);
}
class BigInt {
	

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
				multiCarry = mulSum/10;
				// 和以前的进行相加
				//console.group(i+j);
				//console.log(multiplySumStr[i+j]);
				let existValue = !multiplySumStr[i+j] ? 0 : multiplySumStr[i+j];
				let preAddSum = parseInt(existValue, 10) + addCarry + (mulSum%10);
				//console.log(preAddSum);
				//console.groupEnd();
				// 得到加法的进位
				addCarry = preAddSum / 10;
				// 更改第i+j位置的值
				multiplySumStr = _replaceCharFromStr(multiplySumStr,i+j,preAddSum%10);
				
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
}

export default BigInt;