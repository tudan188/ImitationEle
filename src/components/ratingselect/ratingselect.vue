<template>
	<div class="ratingselect">
		<div class="ratingType border-1px">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span> </span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span> </span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span> </span>
		</div>
		<div @click="tonggleContent" class="switch" :class="{'on':onlyContent}">
			<i class="icon-check_circle"></i>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0; // 好评
const NEGATIVE = 1; // 差评
const ALL = 2; //所有评价
	export default{
		name:"ratingselect",
		props:{
			ratings:{
				type:Array,
				default(){
					return [ ]
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:"全部",
						positive:"满意",
						negative:"不满意"
					}
				}
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
		  			return;
		  		}
		  		this.$emit('selectTypeS',type);
			},
			tonggleContent(event){
				if(!event._constructed){
		  			return;
		  		}
		  		this.$emit('contentToggle',!this.onlyContent);
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			negatives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.stylus"

.ratingselect
	.ratingType
		padding 18px 0
		margin 0 18px
		border-1px(rgba(7,17,27,.1))
		font-size 0
		.block
			display inline-block
			padding 8px 12px
			font-size 12px
			line-height 16px
			margin-right 8px
			border-radius 1px
			color rgb(77,85,93)
			&.active
				color #fff
			.count
				margin-left 2px
				font-size 8px
			&.positive
				background-color rgba(0,160,220,.2)
				&.active
					background-color rgb(0,160,220)
			&.negative
				background-color rgba(77,85,93,.2)
				&.active
					background-color rgb(77,85,93)
	.switch
		padding 12px 18px
		line-height 24px
		border-bottom 1px solid rgba(7,17,27,.1)
		font-size 0
		&.on
			.icon-check_circle
				color #00c850
		.icon-check_circle
			display inline-block
			vertical-align top
			font-size 24px
			line-height 24px
			color rgb(147,153,159)
			margin-right 4px
		.text
			display inline-block
			vertical-align top
			font-size 12px
			line-height 24px
			color rgb(147,153,159)
</style>