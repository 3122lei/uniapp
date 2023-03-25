<template>
	<view class="content">
		<!-- #ifdef MP -->
		<view class="top_search">
			<navigator url="/pages/Search/Search" hover-class="none">
				<u-button class="search" type="primary" :plain="true" :hairline="true" icon="search" shape="circle"
					text="请搜索宝贝名称"></u-button>
			</navigator>

		</view>
		<!-- #endif -->
		<!-- #ifdef MP || H5 -->
		<u-swiper class="u-swiper1" :list="swiper1" keyName="url" @change="e => currentNum = e.current"
			previousMargin="30" nextMargin="30" circular :autoplay="true" radius="5"
			:bgColor="swiper1[currentNum].color" @click="handelSwiperClick">
			<view slot="indicator" class="indicator swiper-text">
				<text class="indicator-num__text">{{ currentNum + 1 }}/</text>
				<text class="indicator-num__text">{{ swiper1.length }}</text>
			</view>
		</u-swiper>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<swiper class="app_swiper" style="height: 240px;" circular :indicator-dots="false" :autoplay="true">
			<block v-for="(item,index) in swiper1" :key="index">
				<swiper-item class="app_swiper_item" style="padding-top:70px;" :style="{backgroundColor:item.color}">
					<image :src="item.url" mode="" style="width: 100%;height: 160px;"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- #endif -->
		<!-- 宫格布局 -->
		<!-- #ifdef H5 || MP -->
		<view class="grid_box">
			<u-grid :border="false" :col="AdvCol" @click="click">
				<view class="scroll-list">
					<u-grid-item v-for="(baseListItem,baseListIndex) in advertisement.t4" :key="baseListIndex">
						<u-avatar @click="GoShopAdv(baseListItem)" class="u-grid_avatar" :src="baseListItem.imgUrl">
						</u-avatar>
						<text class="grid-text">{{baseListItem.title}}</text>
					</u-grid-item>
				</view>
			</u-grid>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<view class="grid_box">
			<!-- <uni-grid :column="AdvCol" :showBorder="false" :square="false" @click="click">
				<!-- <view class="scroll-list"> -->
			<!-- <uni-grid-item v-for="(baseListItem,baseListIndex) in advertisement.t4" :key="baseListIndex">
				<u-avatar @click="GoShopAdv(baseListItem)" class="u-grid_avatar" :src="baseListItem.imgUrl">
				</u-avatar>
				<text class="grid-text">{{baseListItem.title}}</text>
			</uni-grid-item> -->
			<!-- </view>
				 -->
			<!-- </uni-grid> -->
		</view>
		<!-- #endif -->
		<!-- 阴影条 -->
		<view class="bgShadow"></view>
		<!-- 大喇叭 -->
		<view>
			<u-notice-bar text="xx商城新品上线啦!" bgColor="#fff" color="red"></u-notice-bar>
		</view>
		<!-- 阴影条 -->
		<view class="bgShadow"></view>
		<!-- 横幅图片 -->
		<view class="AdvImge">
			<swiper class="swiper" circular :indicator-dots="false" :autoplay="true">
				<swiper-item v-for="(item,index) in advertisement.t3" :key="index">
					<image @click="GoProductDetails(item.id)" :src="item.imgUrl" style="width: 100%;height: 120px;">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 阴影条 -->
		<view class="bgShadow"></view>
		<!-- 橱窗推荐 -->
		<view class="Gallery_Featured ">
			<div class="Gallery_header recommend_header">
				<image src="/static/img/h1.png" mode="" style="width: 40px;height: 40px;"></image>
				<div>
					<div>
						橱窗推荐
					</div>
					<div style="font-size: 14px;color: #ccc;">
						Shop Window
					</div>
				</div>
			</div>
			<view class="content-item">
				<!-- <swiper  :indicator="false">
					<view class="pic-wrap">
						<block v-for="(item, index) in advertisement.t9" :key="index">
							<view class="pic-wrap_item">
								<image class="picImg" :src="item.data.img"
									style="width: 133px;height: 230px;border-radius: 5px;">
								</image>
								<div class="picImg_text">
									<div style="font-size: 15px;text-indent: 10px;">{{item.data.title}}</div>
									<div style="font-size: 15px; text-indent: 10px;">
										<text style="color: red;">￥{{item.data.price*0.01}}</text>
										<text style="font-size: 14px;text-decoration: line-through;color: #ccc;">
											￥{{item.data.originalPrice*0.01}}</text>
									</div>
									<div style="font-size: 13px;text-indent: 10px;">
										累计销售{{item.data.sales}}{{item.data.unit}}
									</div>
								</div>
							</view>
						</block>
					</view>

				</swiper > -->
				<swiper style="height: 310px;" :indicator-dots="false" :autoplay="false" circular>
					<swiper-item v-for="list in RecommendList">
						<u-row justify="space-between" gutter="8">
							<u-col :span="index%2==0?7:5" v-for="(item,index) in list">
								<image @click="GoProductDetails(item.id)" class="picImg" :src="item.data.img"
									v-if="index%2==0"
									style="width: 133px;height: 230px;border-radius: 5px;margin: 5px 0;">
								</image>
								<div class="picImg_text">
									<div style="font-size: 15px;text-indent: 10px;">{{item.data.title}}</div>
									<div style="font-size: 15px; text-indent: 10px;">
										<text style="color: red;">￥{{item.data.price*0.01}}</text>
										<text style="font-size: 14px;text-decoration: line-through;color: #ccc;">
											￥{{item.data.originalPrice*0.01}}</text>
									</div>
									<div style="font-size: 13px;text-indent: 10px;">
										累计销售{{item.data.sales}}{{item.data.unit}}
									</div>
								</div>
								<image @click="GoProductDetails(item.id)" class="picImg" :src="item.data.img"
									v-if="index%2==1"
									style="width: 133px;height: 230px;border-radius: 5px;margin: 5px 0;">
								</image>
							</u-col>
						</u-row>

					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 阴影条 -->
		<view class="bgShadow"></view>
		<!-- 分类精选 -->
		<view class="Category ">
			<div class="Category_header recommend_header">
				<image src="/static/img/h1.png" mode="" style="width: 40px;height: 40px;"></image>
				<div>
					<div>
						分类精选
					</div>
					<div style="font-size: 14px;color: #ccc;">
						Competitive Products For You
					</div>
				</div>
			</div>
			<view class="Category_content">
				<view class="Category_content_box" v-for="(item,index) in advertisement.t2" :key="index">
					<div style="height: 160px;overflow: hidden; ">
						<image class="bgImg" :src="item.imgUrl" style="width: 100%;height: 200px;"></image>
					</div>
					<view class="Category_scroll">
						<div class="srcoll-view">
							<block v-for="(item2,index) in item.data" :key="index">
								<div class="srcoll-view_item">
									<image @click="GoProductDetails(item2.id)" :src="item2.img"
										style="width: 80px; height: 80px;"></image>
									<div style="width: 60px; overflow: hidden;text-overflow: ellipsis;font-size: 14px;">
										{{item2.title}}
									</div>
									<div style="font-size: 13px;color: red;">￥{{item2.price*0.01}}</div>
								</div>
							</block>
							<view class="srcoll-after_view" @click="toShopList">
								<div style="padding-top: 15px;">
									<div>查看全部</div>
									<div>More++</div>
								</div>
							</view>
						</div>
					</view>
				</view>
			</view>
		</view>
		<!-- 阴影条 -->
		<view class="bgShadow"></view>
		<!-- 热销宝贝 -->
		<view class="popularBaby">
			<div class="recommend_header">
				<image src="/static/img/h1.png" mode="" style="width: 40px;height: 40px;"></image>
				<div>
					<div>
						热销宝贝
					</div>
					<div style="font-size: 14px;color: #ccc;">
						Hot Sale
					</div>
				</div>
			</div>
			<view class="popularBaby_content">
				<block v-for="(item,index) in salesTop" :key="index">
					<div class="popularBaby_content_item">
						<image :src="item.img" mode="" @click="GoProductDetails(item.id)"></image>
						<div style="font-size: 14px;width: 165px;text-indent: 5px;margin-bottom: 3px;">
							<div class="text_box">
								{{item.title}}
							</div>
							<div style="color: red;">￥{{item.price*0.01}}</div>
						</div>
					</div>
				</block>

			</view>
		</view>

	</view>
</template>

<script>
	import {
		post,
		get
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				advertisement: {},
				newTop: [],
				salesTop: [],
				currentNum: 0,
				swiper1: [],


			}
		},
		computed: {
			RecommendList() {
				let list = this.advertisement.t9;
				let tempList = [];
				for (let i = 0; i < list.length; i++) {
					let array = [];
					let item = list[i];
					array.push(item);
					let item2 = list[++i];
					if (item2) {
						array.push(item2);
					}
					tempList.push(array);
				}
				return tempList;
			},
			AdvCol() {
				return this.advertisement.t4.length || 0
			}
		},
		onLoad() {
			post('integral', 'getIndexData', ).then(res => {
				console.log(res.data);
				this.advertisement = res.data.advertisement
				this.newTop = res.data.newTop
				this.salesTop = res.data.salesTop
				this.swiper1 = this.advertisement.t1.map(item => {
					return {
						color: item.color,
						url: 'https://images.weserv.nl/?url=' + item.imgUrl,
						id: item.id,
						unionType: item.unionType,
						unionValue: item.unionValue
					}
				})
				// console.log(this.swiper1);
			}).catch(err => {
				uni.$u.toast('网络异常，数据获取失败！请重新登录')
			})
		},
		methods: {
			click() {

			},
			GoShopAdv(item) {
				console.log(item);
				const {
					unionType,
					unionValue
				} = item;
				let url = '/pages/index/index';
				switch (unionType) {
					case 1:
						url = '/ModuleA/shopDetails/shopDetails?id=' + unionValue;
						break;
					case 2:
						url = '/ModuleA/ShopList/ShopList?id=' + unionValue;
						break;
					case 3:
						url = '/ModuleA/ShopList/ShopList?keyWord=' + unionValue;
						break;
					case 4:
						url = unionValue;
						break;
				}
				uni.navigateTo({
					url: url
				})
			},
			/* h5,app 原生导航栏元素 */
			onNavigationBarSearchInputClicked(e) {
				console.log('输入框');
				uni.navigateTo({
					url: '/pages/Search/Search'
				})
			},
			GoProductDetails(id) {
				uni.navigateTo({
					url: '/ModuleA/shopDetails/shopDetails?id=' + id
				})
			},
			handelSwiperClick(index) {
				this.GoShopAdv(this.swiper1[index])

			},
			toShopList() {
				uni.navigateTo({
					url: '/ModuleA/ShopList/ShopList'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;

		.top_search {
			width: 98%;
			height: 30px;
			background-color: transparent;
			position: fixed;
			z-index: 96;
			top: 5px;

			&/deep/.u-button {
				width: 100%;
				background-color: #ffffff87;
				height: 25px !important;
			}

		}

		/*#ifdef H5*/
		.u-swiper1 {
			width: 100%;
			padding-top: 45px
		}

		/*#endif*/
		/*#ifdef MP*/
		&/deep/.u-swiper {
			width: 100% !important;
			padding-top: 45px !important;
		}

		/* #ifdef APP */
		.app_swiper {
			width: 100%;
			height: 220px;
		}

		/* #endif */

		/*#endif*/
		.indicator {
			@include flex(row);
			justify-content: center;

			&__dot {
				height: 6px;
				width: 6px;
				border-radius: 100px;
				background-color: rgba(255, 255, 255, 0.35);
				margin: 0 5px;
				transition: background-color 0.3s;

				&--active {
					background-color: #ffffff;
				}
			}

		}

		.swiper-text {}

		.indicator-num {
			padding: 10;
			background-color: rgba(0, 0, 0, 0.35);
			border-radius: 100px;
			width: 35px;
			@include flex;
			justify-content: center;

			&__text {
				color: #FFFFFF;
				font-size: 12px;
				border-radius: 20;
			}
		}

		/* #ifdef H5 ||MP */
		.grid_box {
			width: 100%;
			height: 100px;
			border-top: 1px solid #ccc;
			border-radius: 10px 10px 0px 0px;
			position: relative;
			top: -5px;

			.u-grid {
				width: 100%;
				padding: 20px 0;
				height: 100px;
				align-items: center;
				overflow-x: scroll;
				white-space: nowrap;

				.scroll-list {
					width: 1000px !important;
					display: flex;

					&/deep/.u-grid-item {
						/* #ifdef MP */
						justify-content: space-around;
						align-items: center;
						vertical-align: middle;

						/* #endif */
						.u-grid_avatar {
							box-shadow: 0px 2px 6px 0px #ff8082;
							// border: 1px solid #ff8082;
							margin-bottom: 10px;
						}

						/* #ifdef MP */
						.u-avatar {
							box-shadow: 0px 2px 6px 0px #ff8082 !important;
							margin-bottom: 10px !important;
						}

						/* #endif */
						.grid-text {
							font-size: 14px;
						}
					}
				}


			}
		}

		/* #endif */
		/* #ifdef APP */
		.grid_box {
			border-top: 1px solid #ccc;
			border-radius: 10px 10px 0px 0px;
			margin-top: -5px;

			.u-grid {
				width: 100%;
				padding: 20px 0;
				height: 100px;
				overflow-x: scroll;
				white-space: nowrap;

				.scroll-list {
					width: 1000px !important;
					display: flex;
					flex-wrap: nowrap !important;
					white-space: nowrap !important;

					&/deep/.u-grid-item {

						.u-grid_avatar {
							box-shadow: 0px 2px 6px 0px #ff8082;
							margin-bottom: 10px;
						}

						.grid-text {
							font-size: 14px;
						}
					}
				}


			}
		}

		/* #endif */

		.bgShadow {
			width: 100%;
			height: 8px;
			background-color: #F5F5F5;
		}

		.u-notice-bar {
			height: 10px;
			justify-content: center;
		}

		.AdvImge {
			width: 100%;
			height: auto;
			margin-bottom: 5px;
		}


		.Gallery_Featured {
			width: 100%;
			height: auto;

			.Gallery_header {
				width: 90%;
				height: 60px;
				margin: auto;
				display: flex;
				text-indent: 10px;
				align-items: center;
				font-size: 16px;
			}

			.content-item {
				padding: 0 15px;

				.pic-wrap {
					display: flex;

					.pic-wrap_item:nth-child(2n) {
						line-height: 23px;

						.picImg {
							position: relative;
							top: 80px;
						}

						.picImg_text {
							position: absolute;
							top: 0;
						}
					}

					.pic-wrap_item {
						margin-right: 10px;
						line-height: 25px;

					}

				}
			}

		}

		// 所有商品模块的头部，如分类精选等
		.recommend_header {
			width: 90%;
			height: 60px;
			margin: auto;
			display: flex;
			text-indent: 10px;
			align-items: center;
			font-size: 16px;
		}

		.recommend_header {
			background: linear-gradient(to right, #ec695c, #61c454) no-repeat right bottom;
			background-size: 0 2px;
			transition: background-size 1300ms;
		}

		.recommend_header:hover {
			background-position-x: left;
			background-size: 100% 2px;
		}

		.Category {
			width: 100%;
			height: auto;

			.Category_content {
				width: 100%;
				height: auto;
				// white-space: nowrap;
				overflow: hidden !important;
				// -webkit-box-reflect: below 0 linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1) 100%);



				.Category_content_box {
					width: 100%;
					height: 251px;
					white-space: nowrap;
					position: relative;
					margin-bottom: 5px;
					background: linear-gradient(to top, rgba(255, 255, 255, 0.6) 40%, #f8f8f8f8);
				}

				&/deep/.Category_scroll {
					width: 100%;
					margin-left: 20px;
					height: 140px;
					font-size: 14px;
					overflow-x: scroll;
					position: absolute;
					top: 100px;
					left: 10px;
					background-color: #fff;
					border: 1px solid #ccc;
					border-radius: 5px;
					box-shadow: 5, 5, 5, #fff;

					// filter: drop-shadow(1px, 1px, 5px, rgba(0, 0, 0, 0.5));


					.srcoll-view {
						width: 1120px;
						height: 100%;
						display: flex;
						justify-content: start;
						align-items: center;

						&::-webkit-scrollbar-thumb {
							border-radius: 10px;
							/* 滚动条样式 */
							-webkit-box-shadow: inset 0 0 3px red;
							/* 内阴影 */
							background-color: blue;
							/* 滚动条颜色 */
						}

						::-webkit-scrollbar {
							width: 6px;
							/* 竖向滚动条宽度 */
							height: 2px;
							/* 横向滚动条高度 */
						}

						.srcoll-view_item {
							margin: 0 10px;

							image {
								border-radius: 5px;
							}
						}

						.srcoll-after_view {
							width: 80px;
							height: 80px;
							background-color: #F3F3F3;
							color: #ccc;
							border-radius: 5px;
							text-align: center;
							margin-top: -40px;
							font-size: 14px;
						}
					}
				}
			}
		}

		.popularBaby {
			width: 100%;
			height: auto;

			.popularBaby_content {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				flex-wrap: wrap;
				padding: 5px 10px;

				.popularBaby_content_item {
					height: 210px;
					margin-bottom: 10px;

					.text_box {
						width: 160px;
						margin-bottom: 3px;
						/*强制文本在一行内显示*/
						white-space: nowrap;
						overflow-x: hidden;
						text-overflow: ellipsis;

					}

					image {
						width: 165px;
						height: 165px;
						border-radius: 5px;
					}
				}
			}

			/* #ifdef MP */
			.popularBaby_content {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				flex-wrap: wrap;
				padding: 5px 10px;

				.popularBaby_content_item {
					height: 190px;
					margin-bottom: 10px;
					width: 125px;

					.text_box {
						width: 123px;
						margin-bottom: 3px;
						/*强制文本在一行内显示*/
						white-space: nowrap;
						overflow-x: hidden;
						text-overflow: ellipsis;

					}

					image {
						border-radius: 5px;
						width: 125px;
						height: 125px;
					}
				}
			}

			/* #endif */
		}
	}
</style>
