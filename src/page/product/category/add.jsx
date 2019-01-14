import React from 'react'

import PageTitle from 'components/page-title/index.jsx'

import MUtil from 'utils/mm.jsx'

import Product from 'service/product-service.jsx'

const _mm = new MUtil();

const _product = new Product();

class CategoryAdd extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			categoryList: [],
			parentId: 0,
			categoryName: ''
		}
	}
	componentDidMount() {
		this.loadCategoryList();
	}
	loadCategoryList() {
		_product.getCategoryList().then( res => {
			this.setState({
				categoryList: res
			})
		}, errMsg => {
			this.setState({
				list: []
			})
			_mm.errorTips(errMsg)
		})
	}
	onValueChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		})
	}
	onSubmit() {
		let categoryName = this.state.categoryName.trim();
		if(categoryName) {
			_product.saveCategory({
				parentId: this.state.parentId,
				categoryName: categoryName
			}).then( res => {
				_mm.successTips(res)
				this.props.history.push('/product-category/index')
			}, errMsg => {
				_mm.errorTips(errMsg)
			})
		}else {
			_mm.errorTips('请输入品类名称');
		}
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="添加品类"></PageTitle>
				<div className="row">
					<div className="col-md-12">
						<div className="form-horizontal">
						  <div className="form-group">
						  	<label className="col-md-2 control-label">所属品类</label>
						    <div className="col-md-5">
						      <select 
							      name="parentId" 
							      className="form-control"
							      onChange={(e) => {this.onValueChange(e)}}
							  >
								<option value="0">根品类/</option>
								{
									this.state.categoryList.map((category,index) => {
										return (<option key={index} value={category.id}>根品类/{category.name}</option>)
									})
								}
						      </select>
						    </div>
						  </div>

						  <div className="form-group">
						  	<label className="col-md-2 control-label">品类名称</label>
						    <div className="col-md-5">
						      <input 
							      type="text" 
							      className="form-control" 
							      placeholder="请输入品类名称"
							      name="categoryName"
							      onChange={(e) => {this.onValueChange(e)}}
						      />
						    </div>
						  </div>

						  <div className="form-group">
						    <div className="col-md-offset-2 col-md-10">
						      <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmit(e)}}>提交</button>
						    </div>
						  </div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CategoryAdd;