import React from 'react'

import FileUpload from './FileUpload.jsx';

class FileUploader extends React.Component {
	render(){
		const options={
			baseUrl:'/manage/product/upload.do',
			fileFieldName: 'upload_file',
			dataType: 'json',
			//设置自动上传
			chooseAndUpload: true,
			uploadSuccess: (res) => {this.props.onSuccess(res.data)},
			uploadError: (err) => {this.props.onError(err.message)}
		}
		return (
			<FileUpload options={options}>
				<button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
			</FileUpload>
		)	        
	}
}

export default FileUploader;
