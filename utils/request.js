const BASE_URL = 'http://192.168.1.188:8080/m.api'

function request(method = "GET", data = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL,
			method,
			data,
			header: {
				accessToken: uni.getStorageSync("token"),
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: res => {
				console.log(res);
				resolve(res)
			},
			fail: err => {
				console.log(err);
				// uni.showToast({
				// 	title: "获取数据失败！"
				// })
				reject(err)
			}
		})
	})
}


export default request
//全局挂载   uni.$http = request
//vue3 用app.config.globalProperties.$myRuquest= request 
// Vue.prototype.$myRuquest= request
