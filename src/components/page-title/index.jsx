import React,{ Component } from 'react'

class PageTitle extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="row">
				<div className="col-md-12">
					<h1 className="page-header">{this.props.title}</h1>
					{this.props.children}
				</div>
			</div>
		)
	}
	componentWillMount(){
		document.title = this.props.title + '- Happy Mall';
	}
}

export default PageTitle;