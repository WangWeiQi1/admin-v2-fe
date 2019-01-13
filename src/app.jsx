import React from 'react'

import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'

import Layout from 'components/layout/index.jsx'

import Home from 'page/home/index.jsx';

import Login from 'page/login/index.jsx'

import ErrorPage from 'page/error/index.jsx'

import UserList from 'page/user/index.jsx'

class App extends React.Component{
	render(){
		let LayoutRouter = (
			<Layout>
				{/*Switch只匹配到第一个符合的*/}
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route path="/product" component={Home}></Route>
					<Route path="/product-category" component={Home}></Route>
					<Route path="/order" component={Home}></Route>
					<Route path="/user/index" component={UserList}></Route>
					<Redirect exact from="/user" to="/user/index"></Redirect>
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