<template>
	<div class="foodWap">
		<transition name="move">
			<div class="food" v-show="showFlag" ref="food">
				<div class="foodCotent">
					<div class="imgHeader">
						<img :src="food.image" alt="" class="">
						<div class="back" @click="hide">
							<i class="icon-arrow_lift"></i>
						</div>
					</div>
					<div class="content">
						<h1 class="title">{{food.name}}</h1>
						<div class="detail">
							<span class="sellCount">月售{{food.sellCount}}份</span>
							<span class="rating">好评率{{food.rating}}%</span>
						</div>
						<div class="price">
							<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
						</div>
						<div class="cartControlWap">
							<cartcontrol :food="food"></cartcontrol>
						</div>
						<transition name="fade">
							<div @click.stop.prevent="addFirst" class="buy" v-show="!food.count||food.count===0">加入购物车 </div>
						</transition>
					</div>
					<split v-show="food.info"></split>
					<div class="info" v-show="food.info">
						<h1 class="title">商品信息</h1>
						<p class="text">{{food.info}}</p>
					</div>
					<split v-show="food.info"></split>
					<!-- 评价 -->
					<div class="rating">
						<h1 class="title">商品评价</h1>
						<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @selectTypeS ="selectTypeS" @contentToggle="contentToggle"></ratingselect>
						<div class="ratingWap">
							<ul class="" v-show="food.ratings  &&  food.ratings.length">
								<li v-show="needShow(rating.rateType,rating.text)" class="ratingItem" v-for="rating in food.ratings">
									<div class="user">
										<span class="name">{{rating.username}}</span>
										<img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
									</div>
									<div class="time">{{rating.rateTime | formatDate}}</div>
									<p class="text">
										<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>{{rating.text}}
									</p>
								</li>
							</ul>
							<div class="noRating" v-show="!food.ratings  ||  !food.ratings.length">暂无评价</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {formaDate} from 'common/js/date' //{} export 方式	
import Vue from 'vue'
import cartcontrol from "components/cartcontrol/cartcontrol"
import split from "components/split/split"
import ratingselect from "components/ratingselect/ratingselect"


const POSITIVE = 0; //
const NEGATIVE = 1; //
const ALL = 2; //所有评价

export default{
	name:"food",
	props:{
		food:{type:Object}
	},
	data(){
		return{
			showFlag:false,
			selectType:ALL,
			onlyContent:true,
			desc:{
				all:"全部",
				positive:"推荐",
				negative:"吐槽"
			}
		}
	},
	filters:{//过滤器
		formatDate(time){
			let date = new Date(time);
			return formaDate(date,"yyyy-MM-dd hh:mm")
		}
	},
	methods:{
		show(){
			this.showFlag = true ;
			this.selectType = ALL;
			this.onlyContent = true;
			this.$nextTick(()=>{ //确保dom 变化 加载完毕
				if(!this.scroll){//scroll 不存在就 new一个
					this.scroll = new BScroll(this.$refs.food,{click:true})
				}else{
					this.scroll.refresh()
				}
			})
		},
		needShow(type,text){
			if(this.onlyContent  &&  !text){
				return false;
			}
			if(this.selectType ===ALL){
				return true
			}else{
				return type===this.selectType
			}
		},
		// 父组件使用 @selectTypeS=”selectTypeS”监听由子组件vm.$emit触发的事件，通过selectTypeS()接受从子组件传递过来的数据，通知父组件数据改变了。
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
		hide(){
			this.showFlag = false ;
		},
		addFirst(event){
			if(!event._constructed){
	  			return;
	  		}
	  		// 当点击 添加数量时  通过 $emit 属性 提交一个名为 cartAdd 的事件 给父组件
	  		// 子组件通过 $emit触发 cartAdd事件 ，将参数传递给父组件
	  		this.$emit('cartAdd', event.target);
			Vue.set(this.food,'count',1)//set添加属性
		}
	},
	components:{
		cartcontrol,split,ratingselect
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.stylus"
.food
	position: fixed
	left 0px
	top 0px
	bottom 48px
	z-index 30
	width 100%
	background-color #fff
	&.move-enter-active, &.move-leave-active
		transition all 0.5s
	&.move-enter, &.move-leave-active
		transform translate3d(100%,0,0)
	.imgHeader
		position relative
		width 100%
		height 0
		padding-top 100% //高度100%
		&>img
			position absolute
			top 0
			left 0
			width 100%
			height 100%
	.back
		position absolute
		top 10px
		left 0px
		.icon-arrow_lift
			display block
			padding 10px
			font-size 20px
			color #fff
	.content
		position relative
		padding 18px
		width 100%
		.title
			line-height 14px
			margin-bottom 8px
			font-size 14px
			font-weight 700
			color rgb(7,17,27)
		.detail
			margin-bottom 18px
			line-height 10px
			height 10px
			font-size 0
			.sellCount,.rating
				font-size 10px
				color rgb(147,153,159)
			.sellCount
				margin-right 12px
		.price
			font-weight 700
			line-height 24px
			.now
				margin-right 8px
				font-size 14px
				color rgb(240,20,20)
			.old
				text-decoration line-through
				font-size 10px
				color rgb(147,153,159)
		.cartControlWap
			position absolute
			right 50px
			bottom 12px
		.buy
			position absolute
			right 50px
			bottom 18px
			z-index 10
			height 24px
			line-height 24px
			padding 0 12px
			box-sizing border-box
			font-size 10px
			border-radius 12px
			color #fff
			background-color rgb(0,160,220)
			&.move-enter-active, &.move-leave-active
				transition all 0.2s
			&.move-enter, &.move-leave-active
				opacity 0
	.info
		padding 18px
		.title
			line-height 14px
			margin-bottom 6px
			font-size 14px
			color rgb(7,17,27)
		.text
			line-height 24px
			font-size 12px
			padding 0 8px
			color rgb(77,85,93)
	.rating
		padding-top 18px
		.title
			line-height 14px
			margin-left 18px
			font-size 14px
			color rgb(7,17,27)
		.ratingWap
			padding 0 18px
			.ratingItem
				position relative
				padding 16px 0
				border-1px(rgba(7,17,27,.1))
				.user
					position absolute
					right 0px
					top 16px
					line-height 12px					
					font-size 0
					.name
						display inline-block
						margin-right 6px
						vertical-align top
						font-size 10px
						color rgb(147,153,159)
					.avatar
						border-radius 50%
				.time
					margin-bottom 6px
					line-height 12px
					font-size 10px
					color rgb(147,153,159)
				.text
					line-height 16px
					font-size 12px
					color rgb(7,17,27)
					.icon-thumb_up,.icon-thumb_down
						margin-right 4px
						line-height 16px
						font-size 12px
					.icon-thumb_up
						color rgb(0,160,220)
					.icon-thumb_down
						color rgb(147,153,159)
			.noRating
				padding 16px 0
				font-size 12px
				color rgb(147,153,159)
</style>