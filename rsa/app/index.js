import React from 'react';
import {render} from 'react-dom';
import BigInt from './bigInt';
import Prim from './Prim';
import HandleInput from './handleInput';
import { Input,Button,Card  } from 'antd';
import './antd.css';
let big = new BigInt();
let prim = new Prim(20002);
let HandleInputIns = new HandleInput();



class App extends React.Component {
	constructor(props) {
		super(props);
		// 得到两个大素数
		let bigPrimP = prim.getBigPrim(),
			bigPrimQ = prim.getBigPrim();

		// 计算n
		let n = bigPrimP * bigPrimQ;
		let tmpN = n.toString();
		while(tmpN.length>=9) {
			// 得到两个大素数
			bigPrimP = prim.getBigPrim(),
				bigPrimQ = prim.getBigPrim();
			// 计算n
			n = bigPrimP * bigPrimQ;
			tmpN = n.toString();
		} 

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
		this.state = {
			e,
			n,
			d,
			showPwd:'',
			hidePwd:'',
			isShowHidePwd:'none',
			DecodePwd:''
		}
		
	}
	render() {
		return (
			<div>
				<Input onPressEnter={this.onPressEnter.bind(this)} placeholder="Basic usage" />
				加密之后为：
				<Input type="textarea" rows={4} disabled value={this.state.showPwd}  />
				<br /><br /><br /><br /><br />
				<Button type="primary" onClick = {this.clickHandle.bind(this)}>点击展示密钥</Button><br /><br />
				 <Card title="Card title" 
				 	extra={<a href="#">More</a>} 
				 	style={{ width: 300,display:this.state.isShowHidePwd }}>
				    <p>{this.state.hidePwd}</p>
				    <p>解密之后为：{this.state.DecodePwd}</p>
				</Card>
			</div>
		)
	}
	clickHandle(){
		this.setState({
			isShowHidePwd: 'block'
		})
	}
	onPressEnter(ev) {
		let value  = ev.target.value;
		const e  = this.state.e,
			d = this.state.d,
			n = this.state.n;
		let password = value;
		// 得到加密后的明文
		let showPwd = HandleInputIns.getShowPwd(password,e,n);
		// console.log(window.atob(showPwd) )
		// 用密钥解密加密后的明文
		let hidePwd = HandleInputIns.getHidePwd(showPwd,d,n);

		let DecodePwd = HandleInputIns.getDecodePwd(hidePwd,password);	
		this.setState({
			showPwd,
			hidePwd:window.btoa(hidePwd),
			DecodePwd
		})
	}
}
render(<App />, document.getElementById('root'))