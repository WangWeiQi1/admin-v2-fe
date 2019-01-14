import React from 'react'

import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'

import ProductSave from 'page/product/index/save.jsx'

import ProductDetail from 'page/product/index/detail.jsx'

import CategoryList from 'page/product/category/index.jsx'

import CategoryAdd from 'page/product/category/add.jsx'

class ProductRouter extends React.Component{
	render(){
		return (
			<Switch>
				<Route path="/product/index" component={ProductList}></Route>
				<Route path="/product/save/:pid?" component={ProductSave}></Route>
				<Route path="/product/detail/:pid" component={ProductDetail}></Route>
				<Route path="/product-category/index/:categoryId?" component={CategoryList}></Route>
				<Route path="/product-category/add" component={CategoryAdd}></Route>
				<Redirect exact from="/product" to="/product/index" />
				<Redirect exact from="/product-category" to="/product/index" />
			</Switch>
		)
	}
}

export default ProductRouter;