<template>
	<div class="cartcontrol">
		<transition name="fade">
			<div class="cartDecrease" v-show="food.count>0" @click.stop.prevent="Decrease($event)">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cartCount" v-show="food.count>0">{{food.count}}</div>
		<div class="cartAdd icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script>
import Vue from 'vue';
	export default{
		name:"cartcontrol",
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1)//set添加属性
				}else {
					this.food.count++;
				}
				// 当点击 添加数量时  通过 $emit 属性 提交一个名为 cartAdd 的事件 给父组件
				// 子组件通过 $emit触发 cartAdd事件 ，将参数传递给父组件
				this.$emit('cartAdd', event.target);
			},
			Decrease(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
	font-size 0
	.cartDecrease
		display inline-block
		padding 4px 6px 6px 6px
		&.fade-enter-active, &.fade-leave-active{
			transition: all 0.4s linear
		}
		&.fade-enter, &.fade-leave-active {
			opacity: 0
			transform translate3d(24px, 0, 0)
		}
		.inner
			display inline-block
			line-height 24px
			font-size 24px
			color rgb(0, 160, 220, 0.2)
			&.inner-enter-active, &.inner-leave-active {
				transition: all 0.4s linear
				transform: rotate(0)
			}
			&.inner-enter, &.inner-leave-active {
				opacity: 0
				transform  rotate(180deg)
			}
	.cartCount
		display inline-block
		vertical-align top
		width 12px
		padding-top 6px
		line-height 24px
	    text-align center
	    font-size 10px
	    color rgb(147,220,0)
	.cartAdd
		display inline-block
		padding 6px
		font-size 24px
		line-height 24px
		color rgb(0,160,220)
</style>