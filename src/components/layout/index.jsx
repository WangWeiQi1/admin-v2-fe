import React,{ Component } from 'react'

import TopNav from 'components/top-nav/index.jsx'

import SideNav from 'components/side-nav/index.jsx'

import './theme.css'

class Layout extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div id="wrapper">
				<TopNav></TopNav>
				<SideNav></SideNav>
				{this.props.children}
			</div>
		)
	}
}

export default Layout;