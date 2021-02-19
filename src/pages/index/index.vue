<template>
<view class="content">
    <view>
		<u-button type="primary" @click='openSelect'>uView 按钮, 显示一个 select </u-button>
	</view>
	<view>
		这儿，将不能够正常显示 u-icon, <br/>
		需要去修改 u-icon <br/>
		将 uview-ui/iconfont.css 复制为 iconfont.scss,<br/>
		然后 uview-ui/components/u-icon/u-icon.vue 中: <br/>
		@import '../../iconfont.css'; <br/>
		变为 import '../../uicinfot.scss';<br/>

		<u-icon :name='iconName' size='40'/>
	</view>
	<view>
		<label>你选中了:{{selectItem}}</label>
		<u-select :list='dataList' mode="single-column" v-model='selectOpened' @confirm='selectConfirm'></u-select>
	</view>
</view>	
</template>

<script lang="ts" src='./index.ts'></script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
