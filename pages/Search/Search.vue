<template>
	<view>
		<uni-search-bar radius="15" placeholder="默认关键字" @confirm="search" cancel-text="取消" />
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},

		},

	}
</script>

<style>

</style>
