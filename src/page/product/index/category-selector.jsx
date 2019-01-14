import React from 'react'

import './category-selector.scss'

import MUtil from 'utils/mm.jsx'

import Product from 'service/product-service.jsx'

const _mm = new MUtil();

const _product = new Product();

class CategorySelector extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			firstCategoryList: [],
			firstCategoryId: 0,
			secondCategoryList: [],
			secondCategoryId: 0
		}
	}
	componentDidMount() {
		this.loadFirstCategory();
	}
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps)
		let categoryIdChange = this.props.categoryId !== nextProps.categoryId;
		let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
		if(!categoryIdChange && !parentCategoryIdChange) {
			return;
		}
		//假如只有一级品类
		if(nextProps.parentCategoryId === 0){
			this.setState({
				firstCategoryId: nextProps.categoryId,
				secondCategoryId: 0
			})
		}else {
			this.setState({
				firstCategoryId: nextProps.parentCategoryId,
				secondCategoryId: nextProps.categoryId
			},() => {
				parentCategoryIdChange && this.loadSecondCategory()
			})
		}
	}
	loadFirstCategory() {
		_product.getCategoryList().then( res => {
			this.setState({
				firstCategoryList: res
			})
		}, errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	//加载二级品类
	loadSecondCategory() {
		_product.getCategoryList(this.state.firstCategoryId).then( res => {
			this.setState({
				secondCategoryList: res
			})
		}, errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	//选择一级品类
	onFirstCategoryChange(e) {
		if(this.props.readOnly) {
			return;
		}
		let newValue = e.target.value || 0;
		this.setState({
			firstCategoryId: newValue,
			secondCategoryId: 0,
			secondCategoryList: []
		}, () => {
			//更新二级品类
			this.loadSecondCategory();
			this.onPropsCategoryChange();
		})
	}
	//选择二级品类
	onSecondCategoryChange(e) {
		if(this.props.readOnly) {
			return;
		}
		let newValue = e.target.value || 0;
		this.setState({
			secondCategoryId: newValue
		}, () => {
			this.onPropsCategoryChange();
		})
	}
	//传给父组件选中的结果
	onPropsCategoryChange() {
		//判断props里面的回调函数是否存在
		let categoryChangeable = typeof this.props.onCategoryChange === 'function';
		//如果有二级品类
		if(this.state.secondCategoryId) {
			categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
		}else {
			//如果只有一级品类
			categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
		}
	}
	render(){
		return (
			<div className="col-md-10">
		      <select 
		      	value={this.state.firstCategoryId}
		      	className="form-control cate-select"
		      	readOnly={this.props.readOnly}
		      	onChange={(e) => {this.onFirstCategoryChange(e)}}
		      >
		      	<option value="">请选择一级品类</option>
				{
					this.state.firstCategoryList.map((category,index) => {
						return (<option key={index} value={category.id}>{category.name}</option>)
					})
				}
		      </select>
		      {
		      	  this.state.secondCategoryList.length ? 
			      (<select 
			      	 value={this.state.secondCategoryId}
			      	 className="form-control cate-select"
			      	 readOnly={this.props.readOnly}
			      	 onChange={(e) => {this.onSecondCategoryChange(e)}}
			       >
			        <option value="">请选择二级品类</option>
					{
						this.state.secondCategoryList.map((category,index) => {
							return (<option key={index} value={category.id}>{category.name}</option>)
						})
					}
			      </select>) : null
		  	  }
		    </div>
		)
	}
}

export default CategorySelector;