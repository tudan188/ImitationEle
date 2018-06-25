<template>
	<div class="shopcartWap">
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="contentFlet">
					<div class="logoWapBox">
						<div class="logoWap">
							<div class="logo" :class="{'highlight':totalCount>0}">
								<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
							</div>
							<div class="num" v-show="totalCount>0">{{totalCount}}</div>
						</div>
					</div>
					<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费{{deliveryPrice}}元</div>
				</div>
				<div class="contentRight" @click.stop.prevent="pay">
					<div class="pay" :class="payClass">{{payDesc}}</div>
				</div>
			</div>
			<!--<div class="ballContainer">
				<transition-group name='drop' tag="div">
					<div class="ball" v-for="ball in balls" v-show="ball.show" :key="ball"> 
						<div class="inner"></div>
					</div>
				</transition-group>
			</div> -->
			<transition name="fold">
				<div class="shoupcartList" v-show="listShow">
					<div class="listHeader">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="listContent" ref="listContent">
						<ul class="">
							<li class="food" v-for="food in selectFoods">
								<span class="name"> {{food.name}} </span>
								<div class="price">
									<span class=""> ￥{{food.price*food.count}} </span>
								</div>
								<div class="cartcontrolWap">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="listMask" @click="hideList" v-show="listShow"></div>
		</transition>
	</div>
</template>

<script>
import cartcontrol from "components/cartcontrol/cartcontrol"
import BScroll from 'better-scroll';
	export default {
		name:"shopcart",
		props:{
			selectFoods:{
				type:Array,
				default(){
					return [];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				fold:true
			}
		},
		computed:{
			totalPrice(){
				let total =0;
				this.selectFoods.forEach((food)=>{
					total+= food.price*food.count;
				})
				return total;
			},
			//计算选中的商品数量，在购物车图标处显示，采用绝对定位，top：0；right：0；显示在购物车图标右上角   
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count+=food.count;
				})
				return count;
			},
			payDesc(){
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`;
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice-this.totalPrice;
					return `还差￥${diff}元起送`;
				}else{
					return '去结算';
				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'notEnough';
				}else{
					return 'enough';
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold=true;
					return false
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent,{click:true})
						}else{
							this.scroll.refresh();
						}
					})
				}
				return show
			}
		},
		methods:{
			drop(el){
				console.log(el)
			},
			toggleList(){
				if(!(this.totalCount)){
					return
				}
				this.fold=!this.fold;
			},
			empty(){//清空购物车
				this.selectFoods.forEach((food)=>{
					food.count=0;
				})
			},
			hideList(){//
				this.fold = true;
			},
			pay(){
				if(this.totalPrice<this.minPrice){
					return
				}
				window.alert(`支付${this.totalPrice}元`)
			}
		},
		components:{
			cartcontrol
		},

	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.stylus"
	.shopcart
		position fixed
		left 0px
		bottom 0px
		z-index 99
		width 100%
		height 48px
		background-color #000
		.content
			display flex
			background-color #141d27
			font-size 0
			.contentFlet
				flex 1
				display flex
				.logoWapBox
					flex 0 0 30%
					.logoWap
						display inline-block
						position absolute
						top -10px
						margin 0 18px
						padding 6px
						width 56px
						height 56px
						box-sizing border-box
						vertical-align top
						border-radius 50%
						background-color #141d27
						.logo
							width 100%
							height 100%
							border-radius 50%
							background-color #2b343c
							text-align center
							&.highlight
								background-color rgb(0,160,220)	
							.icon-shopping_cart
								font-size 24px
								color #80858a
								line-height 44px
								&.highlight
									color #fff
						.num
							position absolute
							top 0
							right 0
							width 24px
							height 16px
							line-height 16px
							text-align center
							border-radius 16px
							font-size 9px
							font-weight 700
							color #fff
							background-color rgb(240,20,20)
							box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
				.price
					display inline-block
					vertical-align top
					height 24px
					line-height 24px
					margin-top 12px
					box-sizing border-box
					padding-right:12px
					border-right 1px solid rgba(255,255,255,.1)
					font-size 16px
					font-weight 700
					color rgba(255,255,255,.4)
					flex 0 0 15%
					&.highlight
						color #fff
				.desc
					display inline-block
					flex 0 0 50%
					vertical-align top
					line-height 24px
					margin 12px 0 0 12px
					font-size 10px
					color rgba(255,255,255,.4)
			.contentRight
				width 105px
				flex 0 0 105px
				.pay
					height 48px
					line-height 48px
					text-align center
					font-size 12px
					font-weight 700
					color rgba(255,255,255,0.4)
					&.notEnough
						background-color #2b333b
					&.enough
						background-color #00b43c
						color #fff
		.ballContainer
			.ball
				position fixed
				left 32px
				bottom 22px
				z-index 999
				&.drop-transition
					transition all .4s
					.inner
						width 16px
						height 16px
						border-radius 50%
						background-color rgb(0,160,220)
						transition all .4s
		.shoupcartList
			position absolute
			bottom 48px
			left 0
			z-index -1
			width 100%
			&.fold-transition
				transiton all .4s linear
				transform translate3d(0,-100%,0)
			&.fold-enter-active
			    transition translate3D(0,0,0)
			&.fold-enter, &.fold-leave-active
				opacity 0
			    transition translate3D(24px,0,0)
			.listHeader
				height 40px
				line-height 40px
				padding 0 18px
				background-color #f3f5f7
				border-bottom 1px solid rgba(7,17,27,.1)
				.title
					float left
					font-size 14px
					font-weight 200
					color rgb(7,17,27)
				.empty
					float right
					font-size 12px
					color rgb(0,160,220)
			.listContent
				padding 0 18px
				max-height 217px
				overflow hidden
				background-color #fff
				.food
					position relative
					padding 12px 0
					box-sizing border-box
					border-1px(rgba(7,17,27,.1))
					display flex
					align-items center
					.name
						line-height 24px
						font-size 14px
						color rgb(7,17,27)
						flex 0 0 45%
					.price
						position absolute
						right 100px
						bottom 12px
						line-height 24px
						font-size 14px
						font-weight 700
						color rgb(240,20,20)
					.cartcontrolWap
						position absolute
						right 0
						bottom 6px
	.listMask
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		background-color rgba(7,17,27,.8)
		background-filter blur(10px)
		&.fade-enter-active, &.fade-leave-active
			transition all 0.5s
		&.fade-enter, &.fade-leave-active
			opacity  0  								
</style>