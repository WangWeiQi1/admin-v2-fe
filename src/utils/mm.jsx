class MUtil {
	request(param) {
		return new Promise((resolve,reject) => {
			$.ajax({
				type: param.type || 'get',
				url: param.url || '',
				dataType: param.dataType || 'json',
				data: param.data || null,
				success: res => {
					if(res.status === 0){
						typeof resolve === 'function' && resolve(res.data, res.msg)
					}else if(res.status === 10){
						this.doLogin();
					}else{
						typeof reject === 'function' && reject(res.msg || res.data)
					}
				},
				error: err => {
					typeof reject === 'function' && reject(err.statusText)
				}
			})
		})
	}
	doLogin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	getUrlParam(name){
		let queryString = window.location.search.split('?')[1] || '';
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		let result = queryString.match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}
	errorTips(errMsg) {
		alert(errMsg || '好像哪里不对了~')
	}
	successTips(successMsg) {
		alert(successMsg || '操作成功!')
	}
	setStorage(name,data) {
		let dataType = typeof data;
		if( dataType === 'object'){
			window.localStorage.setItem(name,JSON.stringify(data));
		}else if(['number','string','boolean'].indexOf(dataType) >= 0) {
			window.localStorage.setItem(name,data);
		}else {
			alert('该类型不能用于本地存储')
		}
	}
	getStorage(name) {
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}else {
			return '';
		}
	}
	removeStorage(name) {
		window.localStorage.removeItem(name);
	}
	formatTime(date) {
		var date = new Date(date);
		var year = date.getFullYear();
		var month = this._addZero(date.getMonth() + 1);
		var day = this._addZero(date.getDate());
		var hour = this._addZero(date.getHours());
		var minute = this._addZero(date.getMinutes());
		var second = this._addZero(date.getSeconds());
		var res = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		return res;
	}
	_addZero(time) {
		let len = time.toString().length;
		let n = 2;
		if( len < n ) {
			time = '0' + time;
			len ++;
		}
		return time;
	}
}

export default MUtil;