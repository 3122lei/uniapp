<template>
	<view>
		h5登录
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			const that = this;
			const code = options?.code;
			console.log(options);
			uni.request({
				url: "http://zxwyit.cn:8989/m.api",
				method: "post",
				data: {
					_gp: 'user',
					_mt: 'thirdPartLogin',
					loginType: 3,
					raw: code
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success(res) {
					console.log(res);
					// let data = res.data;
					// if ('成功' === data.errmsg) {
					// 	uni.$u.toast('登陆成功！')
					// 	// uni.setStorageSync("token", data.data.accessToken)
					// 	// uni.switchTab({
					// 	// 	url: '/pages/index/index'
					// 	// });
					// } else {
					// 	uni.$u.toast(data.errmsg)
					// }
				}
			})
		}
	}
</script>

<style>
</style>
