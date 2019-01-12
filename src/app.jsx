import React from 'react'

import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'

import Layout from 'components/layout/index.jsx'

import Home from 'page/home/index.jsx';

class App extends React.Component{
	render(){
		return (
			<Router>
				<Layout>
					{/*Switch只匹配到第一个符合的*/}
					<Switch>
						<Route exact path="/" component={Home}></Route>
						<Route path="/product" component={Home}></Route>
						<Route path="/product-category" component={Home}></Route>
						<Route path="/order" component={Home}></Route>
						<Route path="/user" component={Home}></Route>
					</Switch>
				</Layout>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)