<template>
	<div class="seller" ref="seller">
		<div class="sellerCotent">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2 class="">起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="">商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="">平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<i class="icon-favorite" :class="{'active':favorite}"></i>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="contentWap border-1px">
					<p class="content">{{seller.bulletin}}</p>
					<ul class="supports" v-if="seller.supports">
					  <li class="supportsItem border-1px" v-for="(item,index) in seller.supports">
					    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
					    <span class="text"> {{seller.supports[index].description}} </span>
					  </li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="picWap" ref="picWap">
					<ul class="picList" ref="picList">
						<li class="picItem" v-for="pic in seller.pics">
							<img :src="pic" alt="" class="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title border-1px">商家信息</h1>
				<ul class="">
					<li class="infoItem" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from "components/star/star"
import split from "components/split/split"
import {saveToLocal,loadFromLocal} from "common/js/store.js"

export default {
  name: 'ratings',
  props:{
  	seller:{type:Object}
  },
  data() {
    return {
      favorite : (() => {
      	console.log(123)
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed:{
  	favoriteText(){
  		return this.favorite?"已收藏":"收藏"
  	}
  },
  created (){
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  watch: {
    'seller'() {
      this._initScroll();
      this._initPics();
    }
  },
  
  methods:{
  	_initScroll(){
  		if(!this.scroll){
  			this.scroll = new BScroll(this.$refs.seller,{click:true});
  		}else{
  			this.scroll.refresh();
  		}
  	},
  	_initPics(){
  		if(this.seller.pics){
  			// 动态计算ul宽度
  			let picWidth = 120;
  			let margin = 6;
  			let width = (picWidth+margin)*this.seller.pics.length-margin; 
  			this.$refs.picList.style.width = width + 'px'; 
  			this.$nextTick(()=>{
  				if(!this.picScroll){
  					this.picScroll = new BScroll (this.$refs.picWap,{
  						scrollX:true,//横向滚动
  						eventPassthrouggh:"vertical" //是为了忽略某一方向的滚动处理
  					})

  				}else{
  					this.picScroll.refresh();
  				}
  			})
  		}
  	},
  	toggleFavorite(event){
  		if(!event._constructed){
  			return;
  		}
  		this.favorite=!this.favorite;
  		saveToLocal(this.seller.id,'favorite',this.favorite)
  	}
  },
  mounted:function(){
  	this._initScroll();
  	this._initPics();

  },
  components:{
  	star,split
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.stylus"

.seller
	position absolute
	top 174px
	bottom 0
	left 0
	width 100%
	overflow hidden
	.overview
		padding 18px
		position relative
		.title
			margin-bottom 8px
			line-height 14px
			font-size 14px
			color rgb(7,17,27)
		.desc
			padding-bottom 18px
			font-size 0
			border-1px(rgba(7,17,27,.1))
			.star
				display inline-block
				vertical-align top
				margin-right 8px
			.text
				display inline-block
				line-height 18px
				margin-right 8px
				vertical-align top
				font-size 10px
				color rgb(77,85,93)
		.remark
			display flex
			padding-top 18px
			.block
				flex 1
				text-align center
				border-right 1px solid rgba(7,17,27,.1)
				&:last-child
					border-right 0
				h2
					margin-bottom 4px
					line-height 10px
					font-size 10px
					color rgb(147,153,159)
				.content
					line-height 24px
					font-size 10px
					color rgb(7,17,27)
					.stress
						font-size 24px
		.favorite
			position absolute
			width 50px
			top 18px
			right 11px
			text-align center
			.icon-favorite
				display block
				margin-bottom 4px
				line-height 24px
				font-size 24px
				color #d4d6d9
				&.active
					color rgb(240,20,20)
			.text
				line-height 10px
				font-size 10px
				color rgb(77,58,93)
	.bulletin
		padding 18px 18px 0 18px
		.title
			margin-bottom 8px
			line-height 14px
			font-size 14px
			color rgb(7,17,27)
		.contentWap
			padding 0 12px 16px 12px
			border-1px(rgba(7,17,27,.1))
			.content
				line-height 24px
				font-size 12px
				color rgb(240,20,20)
			.supports
				.supportsItem
					padding 16px 12px
					font-size 0
					border-1px(rgba(7,17,27,.1))
					&:last-child
						border-none()
					.icon
						display inline-block
						width 16px
						height 16px
						vertical-align bottom
						margin-right 6px
						background-size 16px 16px
						background-repeat no-repeat
						&.decrease
							bg-image(decrease_4)
						&.discount
							bg-image(discount_4)
						&.special
							bg-image(special_4)
						&.invoice
							bg-image(invoice_4)
						&.guarantee
							bg-image(guarantee_4)
					.text
						line-height 16px
						font-size 12px
						color rgb(7,17,27)
	.pics
		padding 18px
		.title
			margin-bottom 12px
			line-height 14px
			font-size 14px
			color rgb(7,17,27)
		.picWap
			width 100%
			overflow hidden
			white-space nowrap
			.picList
				font-size 0
				.picItem
					display inline-block
					margin-right 6px
					width 120px
					height 90px
	.info
		padding 18px 18px 0 18px
		color rgb(7,17,27)
		.title
			padding-bottom 12px
			line-height 14px
			font-size 14px
			border-1px(rgba(7,17,27,.1))
		.infoItem
			padding 16px 12px
			line-height 16px
			font-size 12px
			border-1px(rgba(7,17,27,.1))
			&:last-child
				border-none()
</style>
