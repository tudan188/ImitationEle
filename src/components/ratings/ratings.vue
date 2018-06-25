<template>
<div class="ratings" ref="ratings">
	<div class="ratingsContent">
		<div class="overview">
			<div class="overviewLfet">
				<h1 class="score">{{seller.score}}</h1>
				<div class="title">综合评分</div>
				<div class="rank">高于周围商家{{seller.rankRate}}%</div>
			</div>
			<div class="overviewRight">
				<div class="scoreWap">
					<span class="title">服务态度</span>
					<star :size="36" :score="seller.serviceScore"></star>
					<span class="score">{{seller.serviceScore}}</span>
				</div>
				<div class="scoreWap">
					<span class="title">商品评分</span>
					<star :size="36" :score="seller.serviceScore"></star>
					<span class="score">{{seller.foodScore}}</span>
				</div>
				<div class="deliveryWap">
					<span class="title">送达时间</span>
					<span class="delivery">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<split></split>
		<ratingselect :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings" @selectTypeS ="selectTypeS" @contentToggle="contentToggle"></ratingselect>
		<div class="ratingWap">
			<ul class="">
				<li v-show="needShow(rating.rateType,rating.text)"  class="ratingItem" v-for="rating in ratings">
					<div class="avatar">
						<img :src="rating.avatar" alt="" class="" width="28" height="28">
					</div>
					<div class="content">
						<h1 class="name">{{rating.username}}</h1>
						<div class="starWap">
							<star :size="24" :score="rating.score"></star>
							<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
						</div>
						<p class="text">{{rating.text}}</p>
						<div class="recommedn" v-show="rating.recommend.length">
							<i :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></i>
							<span class="item" v-for="item in rating.recommend">{{item}}</span>
						</div>
						<div class="time">{{rating.rateTime | formatDate}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!--  @selectTypeS ="selectTypeS" @contentToggle="contentToggle" -->
</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from "components/star/star"
import split from "components/split/split"
import ratingselect from "components/ratingselect/ratingselect"
import {formaDate} from 'common/js/date' //{} export 方式	

const ALL = 2 ;
const ERR_OK = 0;

export default {
  name: 'ratings',
  props:{
  	seller:{
  		type:Object
  	}
  },
  data(){
  	return {
  		ratings:[ ],
  		selectType:ALL,
  		onlyContent:true
  	}
  },
  created(){
  	this.$http.get('api/ratings').then((response)=>{
  		response = response.body;
  		if (response.errno === ERR_OK ) {
  		  this.ratings = response.data;
  		  this.$nextTick(function(){
  		  	//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  		  	this.scroll = new BScroll(this.$refs.ratings,{click:true})
  		  })
  		}
  	})
  },
  methods:{
  	selectTypeS(type){
  		this.selectType = type;
  		this.$nextTick(()=>{
  			this.scroll.refresh()
  		})
  	},
  	contentToggle(val){
  		this.onlyContent = val;
  		this.$nextTick(()=>{
  			this.scroll.refresh()
  		})
  	},
  	//只显示有内容的评价
  	needShow(type,text){
  		if(this.onlyContent  &&  !text){
  			return false;
  		}
  		if(this.selectType ===ALL){
  			return true
  		}else{
  			return type===this.selectType
  		}
  	}
  },
  filters:{//过滤器
  	formatDate(time){
  		let date = new Date(time);
  		return formaDate(date,"yyyy-MM-dd hh:mm")
  	}
  },
  components:{
  	star,split,ratingselect
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.stylus"

.ratings
	position absolute
	top 174px
	bottom 0
	left 0
	width 100%
	overflow hidden
	.overview
		display flex
		padding 18px 0
		.overviewLfet
			flex 0 0 137px
			padding-bottom 6px
			width 137px
			border-right 1px solid rgba(7,17,27,.1)
			text-align center
			@media only screen and (max-width: 320px)
				flex 0 0 120px
				width 120px
			.score
				margin-bottom 6px
				line-height 28px
				font-size 24px
				color rgb(255,153,0)
			.title
				margin-bottom 8px
				line-height 12px
				font-size 12px
				color rgb(7,17,27)
			.rank
				line-height 10px
				font-size 10px
				color rgb(147,153,159)
		.overviewRight
			flex 1
			padding 0 0 6px 24px
			@media only screen and (max-width: 320px)
				padding-left: 6px
			.scoreWap
				padding-bottom 8px
				font-size 0
				.title
					display inline-block
					vertical-align top
					line-height 18px
					font-size 12px
					color rgb(7,17,27)
				.star
					display inline-block
					margin 0 12px
					vertical-align top
					@media only screen and (max-width: 320px)
						margin 0 5px
				.score
					display inline-block
					line-height 18px
					vertical-align top
					font-size 12px
					color rgb(255,153,0)
			.deliveryWap
				font-size 0
				.title
					line-height 18px
					font-size 12px
					color rgb(7,17,27)
				.delivery
					font-size 12px
					line-height 18px
					color rgb(147,153,159)
					margin-left 12px
	.ratingWap
		padding 0 18px
		.ratingItem
			display flex
			padding 18px 0
			.avatar
				flex 0 0 28px
				width 28px
				margin-right 12px
				img
					border-radius 50%	
			.content
				position relative
				flex 1
				.name
					margin-bottom 4px
					line-height 12px
					font-size 10px
					color rgb(7,17,27)
				.starWap
					margin-bottom 6px
					font-size 0
					.star
						display inline-block
						margin-right 6px
						vertical-align top
					.delivery
						display inline-block
						vertical-align top
						font-size 10px
						line-height 12px
						color rgb(143,153,159)
				.text
					line-height 18px
					font-size 12px
					color rgb(7,17,27)
					margin-bottom 8px
				.recommedn
					line-height 16px
					font-size 0
					.icon-thumb_up,.icon-thumb_down
						display inline-block
						margin 0 8px 4px 0
						font-size 9px
					.icon-thumb_up
						color rgb(0,160,220)
					.icon-thumb_down
						color rgb(147,153,159)
					.item
						display inline-block
						margin 0 8px 4px 0
						padding 0 6px
						border 1px solid rgba(7,17,27,.1)
						font-size 9px
						border-radius 1px
						background-color #fff
				.time
					position absolute
					top 0
					right 0
					line-height 12px
					font-size 10px
					color rgb(147,153,159)
</style>
