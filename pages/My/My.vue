<template>
	<view>
		<view class="logout" @tap="logout">
			退出
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			logout() {
				uni.reLaunch({
					url: "/pages/login/login"
				})
			}
		}
	}
</script>

<style>

</style>
