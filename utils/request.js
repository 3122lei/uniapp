const BASE_URL = 'http://192.168.1.188:8080/m.api'
import qs from 'qs'

function request(method = "GET", data = {}) {
	qs.stringify(data)
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL,
			method,
			data,
			header: {
				accessToken: uni.getStorageSync("token")
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
