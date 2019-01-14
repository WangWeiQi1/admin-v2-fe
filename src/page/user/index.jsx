import React from 'react'

import PageTitle from 'components/page-title/index.jsx'

import { Link } from 'react-router-dom'

import Pagination from 'utils/pagination/index.jsx'

import TableList from 'utils/table-list/index.jsx'

import MUtil from 'utils/mm.jsx'

import User from 'service/user-service.jsx'

const _mm = new MUtil();

const _user = new User();

class UserList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNum: 1
		}
	}
	componentWillMount() {
		this.loadUserList();
	}
	loadUserList() {
		_user.getUserList(this.state.pageNum).then( res => {
			this.setState(res)
		}, errMsg => {
			this.setState({
				list: []
			})
			_mm.errorTips(errMsg)
		})
	}
	onPageNumChange(pageNum) {
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadUserList();
		})
	}
	render(){
		let listBody = this.state.list.map((item,index) => {
			return (
				<tr key={index}>
					<td>{item.id}</td>
					<td>{item.username}</td>
					<td>{item.email}</td>
					<td>{item.phone}</td>
					<td>{_mm.formatTime(item.createTime)}</td>
				</tr>
			)
		})
		return (
			<div id="page-wrapper">
				<PageTitle title="用户列表"></PageTitle>
				<TableList tableHeads={['ID','用户名','邮箱','电话','注册时间']}>
					{listBody}
				</TableList>
				<Pagination 
					current={this.state.pageNum} 
					total={this.state.total} 
					onChange={(pageNum) => this.onPageNumChange(pageNum)}>
				</Pagination>
			</div>
		)
	}
}

export default UserList;