import React from 'react'

import PageTitle from 'components/page-title/index.jsx'

import CategorySelector from 'page/product/index/category-selector.jsx'

import MUtil from 'utils/mm.jsx'

import Product from 'service/product-service.jsx'

import FileUploader from 'utils/file-uploader/index.jsx'

import RichEditor from 'utils/rich-editor/index.jsx'

import './save.scss'

const _mm = new MUtil();

const _product = new Product();

class ProductSave extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.pid,
			name: '',
			subtitle: '',
			categoryId: 0,
			parentCategoryId: 0,
			subImages: [],
			price: '',
			stock: '',
			detail: '',
			status: 1 //商品状态
		}
	}
	componentDidMount() {
		this.loadProduct();
	}
	loadProduct() {
		if(this.state.id) {
			_product.getProduct(this.state.id).then(res => {
				let images = res.subImages.split(',');
				res.subImages = images.map((img) => {
					return {
						uri: img,
						url: res.imageHost + img
					}
				})
				res.defaultDetail = res.detail;
				this.setState(res)
			},errMsg => {
				_mm.errorTips(errMsg);
			})
		} 
	}
	//简单字段的改变
	onValueChange(e) {
		let name = e.target.name;
		let value = e.target.value.trim();
		this.setState({
			[name]: value
		})
	}
	//品类选择器的变化
	onCategoryChange(categoryId,parentCategoryId) {
		this.setState({
			categoryId: categoryId,
			parentCategoryId: parentCategoryId
		})
	}
	//上传成功
	onUploadSuccess(res) {
		let subImages = this.state.subImages;
		subImages.push(res);
		this.setState({
			subImages: subImages
		})
	}
	//上传失败
	onUploadError(err) {
		_mm.errorTips(err.message || '上传图片失败');
	}
	//删除图片
	onImageDelete(e) {
		let index = Number(e.target.getAttribute('index'));
		let subImages = this.state.subImages;
		subImages.splice(index,1);
		this.setState({
			subImages: subImages
		})
	}
	//富文本编辑器的变化
	onDetailValueChange(value) {
		// console.log(value)
		this.setState({
			detail: value
		})
	}

	getSubImagesString() {
		return this.state.subImages.map((image) => {
			return image.uri
		}).join(',')
	}
	
	//提交表单
	onSubmit() {
		let product = {
			name: this.state.name,
			subtitle: this.state.subtitle,
			categoryId: parseInt(this.state.categoryId),
			subImages: this.getSubImagesString(),
			detail: this.state.detail,
			price: parseFloat(this.state.price),
			stock: parseInt(this.state.stock),
			status: this.state.status
		}
		let productCheckResult = _product.checkProduct(product)
		if(this.state.id) {
			product.id = this.state.id;
		}
		if(productCheckResult.status) {
			_product.saveProduct(product).then( res => {
				_mm.successTips(res)
				this.props.history.push('/product/index')
			}, errMsg => {
				_mm.errorTips(errMsg)
			})
		}else {
			_mm.errorTips(productCheckResult.msg);
		}
	}

	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
				<div className="form-horizontal">
				  <div className="form-group">
				  	<label className="col-md-2 control-label">商品名称</label>
				    <div className="col-md-5">
				      <input 
					      type="text" 
					      className="form-control" 
					      placeholder="请输入商品名称"
					      name="name"
					      value={this.state.name}
					      onChange={(e) => {this.onValueChange(e)}}
				      />
				    </div>
				  </div>
				  <div className="form-group">
				  	<label className="col-md-2 control-label">商品描述</label>
				    <div className="col-md-5">
				      <input 
					      type="text" 
					      className="form-control" 
					      placeholder="请输入商品描述"
					      name="subtitle" 
					      value={this.state.subtitle}
					      onChange={(e) => {this.onValueChange(e)}}
				      />
				    </div>
				  </div>
				  <div className="form-group">
				  	<label className="col-md-2 control-label">所属分类</label>
				    <CategorySelector
				    	categoryId={this.state.categoryId}
				    	parentCategoryId={this.state.parentCategoryId}
				    	onCategoryChange={(categoryId,parentCategoryId) => {
				    	this.onCategoryChange(categoryId,parentCategoryId)
				    }} />
				  </div>
				  <div className="form-group">
				  	<label className="col-md-2 control-label">商品价格</label>
				    <div className="col-md-3">
					    <div className="input-group">
					      <input 
						      type="number" 
						      className="form-control" 
						      placeholder="请输入商品价格"
						      name="price"
						      value={this.state.price}
						      onChange={(e) => {this.onValueChange(e)}}
					      />
						  <span className="input-group-addon">元</span>
						</div>
				    </div>
				  </div>
				  <div className="form-group">
				  	<label className="col-md-2 control-label">商品库存</label>
				    <div className="col-md-3">
				   		<div className="input-group">
				          <input 
					          type="number" 
					          className="form-control" 
					          placeholder="请输入商品库存"
					          name="stock"
					          value={this.state.stock}
					          onChange={(e) => {this.onValueChange(e)}}
				          />
						  <span className="input-group-addon">件</span>
						</div>
				    </div>
				  </div>
				  <div className="form-group">
				  	<label className="col-md-2 control-label">商品图片</label>
				    <div className="col-md-10">
				   		{
				   			this.state.subImages.length ? this.state.subImages.map((image,index) => {
				   				return (
				   					<div key={index} className="img-con">
				   						<img src={image.url} />
				   						<i className="fa fa-close" index={index} onClick={(e) => {this.onImageDelete(e)}}></i>
				   					</div>
				   				)
				   			}) : (<div>请上传图片</div>)
				   		}
				    </div>
				    <div className="col-md-offset-2 col-md-10 file-upload-con">
				   		<FileUploader onSuccess={(res) => {this.onUploadSuccess(res)}} onError={(errMsg) => {this.onUploadError(errMsg)}} />
				    </div>
				  </div>
				  <div className="form-group">
				  	<label className="col-md-2 control-label">商品详情</label>
				    <div className="col-md-10">
				   		<RichEditor 
				   			detail={this.state.detail}
				   			defaultDetail={this.state.defaultDetail}
				   			onValueChange={(value) => {this.onDetailValueChange(value)}} />
				    </div>
				  </div>
				  <div className="form-group">
				    <div className="col-md-offset-2 col-md-10">
				      <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmit(e)}}>提交</button>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
}

export default ProductSave;