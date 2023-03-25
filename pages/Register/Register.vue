<template>
	<view class="login-contiue">
		<view class="login-form">
			<h1 class='title'>欢迎加入！</h1>
			<u-form>
				<u-form-item>
					<uni-easyinput class="from-input" prefixIcon="person" type="number" v-model="form.phone"
						placeholder="请输入手机号">
					</uni-easyinput>
				</u-form-item>
				<u-form-item>
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input placeholder="6位数字" v-model.trim="form.verifyCode">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input placeholder="6位数字" v-model.trim="form.verifyCode">
							<!-- #endif -->
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
							</template>
							<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<u-form-item>
					<uni-easyinput class="from-input" prefixIcon="locked-filled" type="password" v-model="form.password"
						placeholder="请输入8-12位的密码">
					</uni-easyinput>
				</u-form-item>
				<u-button @tap="submit" class="form-item " type="primary" shape="circle">注册</u-button>
			</u-form>
			<div class="login-item form-item">
				<div>已有账号，</div>
				<div style="color: cornflowerblue;" @click="GoLogin">立即登录</div>
			</div>
		</view>
	</view>
</template>

<script>
	import {
		verifyPhone,
		verifPassword
	} from '@/utils/verify.js';
	export default {
		data() {
			return {
				tips: '',
				form: {
					phone: '',
					password: '',
					ip: '',
					verifyCode: ''
				},
			}
		},
		methods: {
			/**
			 * 用户注册
			 * */
			submit() {
				const {
					phone,
					password,
					verifyCode
				} = this.form;
				if (phone && password) {
					if (!verifyPhone(phone)) {
						uni.$u.toast('请输入准确的手机号！')
						return;
					}
					if (!verifPassword(password)) {
						uni.$u.toast('密码格式不正确！不得少于9位且包含一个字母，多个任意数字')
						return;
					}
					if (verifyCode == '') {
						uni.$u.toast('请获取验证码！')
						return;
					}
					if (verifyCode.length <= 5) {
						uni.$u.toast('验证码格式不正确！')
						return;
					}

					const data = {
						_gp: 'user',
						_mt: 'register',
						...this.form
					};
					this.$Ruquest('get', data).then(res => {
						console.log(res);
						const {
							data: {
								errmsg
							}
						} = res;
						if ('成功' === errmsg) {
							uni.$u.toast('注册成功')
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/login'
								});
							}, 1200)
						} else {
							uni.$u.toast(errmsg)
						}

					})
				} else {
					uni.$u.toast('请输入!')

				}
			},
			codeChange(text) {
				this.tips = text;
			},
			/**
			 * 获取验证码
			 * */
			getCode() {
				if (!verifyPhone(this.form.phone)) {
					uni.$u.toast('请输入准确的手机号！')
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						//向后端发送请求，获取验证码
						this.$Ruquest('get', {
							_gp: 'user',
							_mt: 'sendVerifyCode',
							phone: this.form.phone
						}).then(res => {
							console.log(res);
							const {
								data: {
									data,
									errmsg
								}
							} = res;
							if ('成功' === errmsg) {
								this.form.verifyCode = data;
							} else {
								uni.$u.toast(errmsg)
							}

						})
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			GoLogin() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		}
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
				/*#ifdef APP */
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
