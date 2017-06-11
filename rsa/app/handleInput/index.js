export default class HandleInput {
	inputToNum(str) {
		let sze = str.length;
		// 用户记录字符首次出现的位置
		let firstPos = [];
		let cnt = 0;
		for (let i = 0;i<sze;i++ ){
			if(firstPos[str[i]]) continue;
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
}