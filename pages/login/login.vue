<template>
	<view class="login-contiue">
		<view class="login-form">
			<h1 class='title'>用户登录</h1>
			<u-form :model="form">
				<u-form-item prop="phone">
					<!-- <u--input placeholder="请输入手机号" type="number" shape="circle" v-model="form.phone" clearable
						prefixIcon="account" prefixIconStyle="font-size: 22px;color: #909399">
					</u--input> -->
					<uni-easyinput class="from-input" prefixIcon="person" type="number" v-model="form.phone"
						placeholder="请输入手机号">
					</uni-easyinput>
				</u-form-item>
				<u-form-item prop="password">
					<uni-easyinput class="from-input" prefixIcon="locked-filled" type="password" v-model="form.password"
						placeholder="请输入密码">
					</uni-easyinput>
					<!-- <u--input placeholder="请输入密码" shape="circle" v-model="form.password" type="password"
						password-icon="true" prefixIcon="lock-fill" prefixIconStyle="font-size: 22px;color: #909399">
					</u--input> -->
					</uni-easyinput>
				</u-form-item>
				<u-button @tap="submit" class="form-item " type="primary" shape="circle">登录</u-button>
			</u-form>
			<div class="login-item form-item">
				<div style="color: cornflowerblue;">忘记密码</div>
				<div class="form-item-div"></div>
				<div>还没有账号，<span style="color: cornflowerblue;">立即注册</span></div>
			</div>
			<!--  -->
			<div class="Divder form-item">
				<div class="Divder-item"></div>
				<div class="Divder-text">第三方登录</div>
				<div class="Divder-item"></div>
			</div>
			<div class="from-wxin" @tap="thirdParty">
				<u-icon name="weixin-circle-fill" color="#00de00" size="28"></u-icon>
			</div>
		</view>
	</view>
</template>

<script>
	import {
		verifyPhone,
		verifPassword
	} from '../../utils/verify.js';
	import {
		WX_AppID,
		CALL_URL
	} from '@/config/index.js'
	export default {
		data() {
			return {
				form: {
					phone: '16666666666',
					password: '12345678a',

				},
			}
		},
		methods: {
			submit() {
				const {
					phone,
					password
				} = this.form;
				const data = {
					phone,
					password,
					raw: '',
					_gp: 'user',
					_mt: 'login',
					ip: ''
				};
				const that = this;
				if (phone && password) {
					// console.log(this.$md5(this.form.pass));

					if (!verifyPhone(phone)) {
						uni.$u.toast('请输入准确的手机号！')
						return;
					}
					if (!verifPassword(password)) {
						uni.$u.toast('密码格式不正确！不得少于9位且包含一个字母，任意数字')
						return;
					}
					// #ifdef MP-WEIXIN
					uni.login({
						provider: 'weixin',
						success: function(wxres) {
							data.raw = JSON.stringify(wxres);
							that.logins(data)
							console.log('wx');
						}
					})
					// #endif
					// #ifdef APP-PLUS || H5
					that.logins(data)
					// #endif
				} else {
					uni.$u.toast('请输入账号密码')

				}
			},
			logins(data) {
				this.$Ruquest('get', data).then(res => {
					console.log(res);
					const {
						data: {
							data,
							errmsg
						}
					} = res;
					if ('成功' === errmsg) {
						uni.$u.toast('登陆成功！')
						uni.setStorageSync("token", data.accessToken)
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						uni.$u.toast(errmsg)
					}

				})
			},
			thirdParty() {
				//wxb230ba20ae7426c8
				// #ifdef  H5
				this.webH5Login()
				// #endif
				// #ifdef APP-PLUS
				this.webAppLogin()
				// #endif
				// #ifdef MP-WEIXIN
				/** 小程序第三方微信授权登陆*/
				this.MPLogin()
				// #endif
			},
			//微信公众号h5
			webH5Login() {
				console.log('webH5Login');
				const BACKURL = encodeURIComponent(CALL_URL);
				const url =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WX_AppID +
					"&redirect_uri=" + BACKURL + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				window.location.href = url;
			},
			//手机App端登录
			webAppLogin() {
				console.log('webAppLogin');
				uni.login({
					provider: 'weixin',
					success: function(wxres) {
						uni.request({
							url: 'http://192.168.1.188:8080/m.api',
							method: 'POST',
							data: {
								_gp: 'user',
								_mt: 'thirdPartLogin',
								loginType: 2,
								raw: JSON.stringify(wxres)
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success(res) {
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
					}
				})

			},
			MPLogin() {
				console.log('MPLogin');
				uni.login({
					provider: 'weixin',
					success: function(wxres) {
						uni.request({
							url: 'http://192.168.1.188:8080/m.api',
							method: 'POST',
							data: {
								_gp: 'user',
								_mt: 'thirdPartLogin',
								loginType: 1,
								raw: JSON.stringify(wxres)
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success(res) {
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
					}
				})
			}
		},


	}
</script>
<style>
	page {
		overflow: hidden;
		/*#ifdef H5*/
		height: 100%;
		/*#endif*/
	}
</style>

<style lang="scss" scoped>
	.login-contiue {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: darkslategrey;
		/*#ifdef H5*/
		height: 100%;
		/*#endif*/
		/*#ifdef  MP ||APP */
		height: 100vh;

		/*#endif*/
		.login-form {
			background-color: #fff;
			padding: 20px;
			border-radius: 8px;
			position: relative;
			width: 76vw;

			.title {
				text-align: center;
				font-size: 20px;
				padding-bottom: 20px;
			}



			&::v-deep.form-button {
				/*#ifdef MP*/
				padding-bottom: 20px;
				/*#endif*/
			}

			.form-item {
				/*#ifdef H5*/
				margin-bottom: 20px;
				/*#endif*/

				/*#ifdef  MP /APP */
				margin-bottom: 20px;
				/*#endif*/

			}

			&/deep/.uni-easyinput {
				.is-input-border {
					border-radius: 100px;
				}
			}


			.login-item {
				font-size: 14px;
				display: flex;
				justify-content: center;
				align-items: center;
				/*#ifdef  MP /APP */
				margin-top: 20px;

				/*#endif*/
				.form-item-div {
					width: 2px;
					height: 16px;
					margin: 0px 8px;
					background-color: #ccc;
				}
			}

			.Divder {
				display: flex;
				justify-content: center;
				align-items: center;

				&/deep/.Divder-text {
					font-size: 16px;
					color: #ccc;
					margin: 0px 10px;
				}

				.Divder-item {
					width: 70px;
					height: 2px;
					background: #e7e7e7;
					margin: 10rpx 0;
				}

			}

			.from-wxin {
				width: 100%;
				height: 40px;
				border: 1px solid #ccc;
				border-radius: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

		}
	}
</style>
