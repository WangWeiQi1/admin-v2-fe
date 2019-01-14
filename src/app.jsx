import React from 'react'

import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'

import Layout from 'components/layout/index.jsx'

import Home from 'page/home/index.jsx';

import Login from 'page/login/index.jsx'

import ErrorPage from 'page/error/index.jsx'

import UserList from 'page/user/index.jsx'

import ProductRouter from 'page/product/router.jsx'

import OrderList from 'page/order/index.jsx'

import OrderDetail from 'page/order/detail.jsx'

class App extends React.Component{
	render(){
		let LayoutRouter = (
			<Layout>
				{/*Switch只匹配到第一个符合的*/}
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route path="/product" component={ProductRouter}></Route>
					<Route path="/product-category" component={ProductRouter}></Route>
					<Route path="/order/index" component={OrderList}></Route>
					<Route path="/order/detail/:orderNumber" component={OrderDetail}></Route>
					<Route path="/user/index" component={UserList}></Route>
					<Redirect exact from="/user" to="/user/index"></Redirect>
					<Redirect exact from="/order" to="/order/index"></Redirect>
					<Route component={ErrorPage}></Route>
				</Switch>
			</Layout>
		)
		return (
			<Router>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/" render={ props => LayoutRouter} />
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)