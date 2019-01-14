import React from 'react'

import PageTitle from 'components/page-title/index.jsx'

import { Link } from 'react-router-dom'

import Pagination from 'utils/pagination/index.jsx'

import MUtil from 'utils/mm.jsx'

import Order from 'service/order-service.jsx'

import TableList from 'utils/table-list/index.jsx'

import ListSearch from './index-list-search.jsx'

const _mm = new MUtil();

const _order = new Order();

class OrderList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			pageNum: 1,
			listType: 'list'
		}
	}
	componentWillMount() {
		this.loadOrderList();
	}
	loadOrderList() {
		let listParam = {};
		listParam.listType = this.state.listType;
		listParam.pageNum = this.state.pageNum;
		if(this.state.listType === 'search'){
			listParam.orderNo = this.state.orderNumber;
		}
		_order.getOrderList(listParam).then( res => {
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
			this.loadOrderList();
		})
	}
	//搜索
	onSearch(orderNumber) {
		let listType = orderNumber === '' ? 'list' : 'search';
		this.setState({
			listType: listType,
			pageNum: 1,
			orderNumber: orderNumber
		}, () => {
			this.loadOrderList();
		})
	}
	render(){
		let tableHeads = ['订单号','收件人','订单状态','订单总价','创建时间','操作'];
		return (
			<div id="page-wrapper">
				<PageTitle title="订单列表" />
				<ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}} />
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((order,index) => {
							return (
								<tr key={index}>
									<td>
										<Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
									</td>
									<td>{order.receiveName}</td>
									<td>{order.statusDesc}</td>
									<td>￥{order.payment}</td>
									<td>{order.createTime}</td>
									<td>
										<Link to={`/order/detail/${order.orderNo}`}>详情</Link>
									</td>
								</tr>
							)
						})
					}
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

export default OrderList;