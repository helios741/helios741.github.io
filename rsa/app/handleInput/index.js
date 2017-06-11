export default class HandleInput {
	inputToNum(str) {
		let sze = str.length;
		// 用户记录字符首次出现的位置
		let firstPos = [];
		let cnt = 1;
		for (let i = 0;i<sze;i++ ){
			if(firstPos[str[i]] != undefined) continue;
			firstPos[str[i]] = cnt++;
		}
		return firstPos;
	}

	inputGroup(text) {
		let numArr = this.inputToNum(text),
			textSze = text.length,
		    groupArr = [],
		    cnt = 0;
		for (let i = 0; i < textSze; i++) {
			if(i === textSze-1) {
				let tNum = numArr[text[i]].toString();
				tNum = tNum.length === 1 ? ('0' + tNum) : tNum;
				groupArr[cnt] = tNum;
				break;
			}
			let tmpNumCur = numArr[text[i]].toString();
			tmpNumCur = tmpNumCur.length === 1 ? ('0' + tmpNumCur) : tmpNumCur;
			let tmpNumNxt = numArr[text[i+1]].toString();
			tmpNumNxt = tmpNumNxt.length === 1 ? ('0' + tmpNumNxt) : tmpNumNxt;
			groupArr[cnt++] = tmpNumCur+tmpNumNxt;
			i++;
		}
		return groupArr;
	}
	/**
	* 快速计算 a^b%mod
	*/
	quick_pow(a,b,mod) {
		let ans = 1;
		for(; b; b =(b>>1) ,a = (a*a)%mod)
			if (b&1) ans = ( ans*a ) % mod;
		return ans;
	}
	// 得到加密后的明文
	getShowPwd(text,e,n) {
		let groupNumArr = this.inputGroup(text);
		let pwdArr = [];
		groupNumArr.forEach((item)=>{
			pwdArr.push(this.quick_pow( parseInt(item, 10) ,e,n) );
		} );
		// 进行base64加密
		return window.btoa(pwdArr);
		// return pwdArr;
	}
	getHidePwd(showPwdArr,d,n) {
		showPwdArr = window.atob(showPwdArr).split(',');
		let hidePwdArr = [];
		showPwdArr.forEach( (item)=>{
			hidePwdArr.push( this.quick_pow(parseInt(item, 10),d,n) );
		} );
		// TODO 这里存在bug 不知道为什么会有大的
		hidePwdArr.forEach( (item,index,arr) =>{
			item = item.toString();
			let sze = item.length;
			for (let i = sze;i<4;i++) item = '0' +item;
			arr[index] = item;
		} )
		// console.log(hidePwdArr)
		return hidePwdArr;
	}
	swapKeyValue(arr) {
		let ans = [];
		for(let i in arr) {
			ans[ arr[i] ] = i;
		}
		// debugger;
		if ( !ans[0] ) ans.unshift();
		return ans;
	}
	getDecodePwd(hidePwdArr,text) {
		let posArr = this.inputToNum(text),
			decodeArr = this.swapKeyValue(posArr);
		decodeArr[0] = '';
		let decodePwd = '';
		//console.log(posArr);
		//console.log(hidePwdArr)
		hidePwdArr.forEach( (item,index) => {
		// debugger;
			item = item.toString();
			let num1 = parseInt(item.slice(0,2), 10),
				num2 = parseInt(item.slice(2), 10);
			decodePwd+= ( decodeArr[num1] +''+decodeArr[num2]);
			// console.log(item,index)
		});
		return decodePwd;
	}
}