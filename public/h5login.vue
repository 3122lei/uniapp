<template>
	<view>
		h5登录
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			const that = this;
			const code = this.getUrlCode("code");
			console.log(code);
			uni.request({
				url: "http://192.168.1.188:8080/m.api",
				method: "post",
				data: {
					"_gp": 'user',
					"_mt": 'thirdPartLogin',
					loginType: 3,
					raw: code
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success(res) {
					console.log(res);
					let data = res.data;
					if ('成功' === data.errmsg) {
						uni.$u.toast('登陆成功！')
						uni.setStorageSync("user", data.data)
						uni.setStorageSync("token", data.data.accessToken)
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						uni.$u.toast(data.errmsg)
					}
				}
			})
		},
		methods: {
			//截取地址栏code
			getUrlCode(name) {
				return (
					decodeURIComponent(
						(new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
							location.href
						) || [, ""])[1].replace(/\+/g, "%20")
					) || null
				);
			},
		}
	}
</script>

<style>
</style>
