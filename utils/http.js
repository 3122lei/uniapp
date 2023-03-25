/* 封装2 */
const BASE_URL = 'http://192.168.1.188:8080/m.api'
const http = uni.$u.http;
http.setConfig((config) => {
	/* config 为默认全局配置*/
	config.baseURL = BASE_URL; /* 根域名 */
	config.header = {
		"Content-Type": "application/x-www-form-urlencoded"
	}
	return config
})
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	// config.header = {
	// 	accessToken: uni.getStorageSync("token"),
	// }
	config.header.accessToken = uni.getStorageSync("token") || ''
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})
http.interceptors.response.use((response) => {
	let data = response.data;
	const {
		errmsg
	} = data;
	if ('成功' !== errmsg) {
		return Promise.reject(data);
	}
	return data
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(response)
	return Promise.reject(response)
})
/**
 * post请求
 */
export function post(_gp, _mt, data = {}, params = {}) {
	return http.post('', {
		_gp,
		_mt,
		...data
	}, {
		params
	})
}
/**
 * get请求
 */
export function get(_gp, _mt, params = {}) {
	return http.get('', {
		params: {
			_gp,
			_mt,
			...params
		}
	})
}
