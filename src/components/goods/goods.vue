<template>
	<div class="goods">
		<div class="menuWap" ref="menuWap">
			<ul class="">
				<li v-for="(item,index) in goods" class="menuItem" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foodsWap" ref="foodsWap">
			<ul class="">
				<li v-for="item in goods" class="foodList foodListHook">
					<h1 class="title"> {{item.name}} </h1>
					<ul class="">
						<li v-for="food in item.foods" @click="selectFood(food,$event)" class="foodItem border-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" alt="" class="">
							</div>
							<div class="content">
								<h2 class="name"> {{food.name}} </h2>
								<p class="desc"> {{food.description}} </p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span class="">好评率 {{food.rating}}% </span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrolWap">
									<!-- 购物车组件如果提交了addCart事件就调用add函数 -->
									<cartcontrol :food="food" @cartAdd="_drpo"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart"  :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
		<foods :food="selectedFood" ref="food"></foods>
	</div>
</template>

<script>
const ERR_OK = 0;
import BScroll from 'better-scroll';
import shopcart from "components/shopcart/shopcart"
import cartcontrol from "components/cartcontrol/cartcontrol"
import foods from "components/food/food"

export default {
  name: 'goods',
  props:['seller'],
  data () {
    return {
      goods: [],
      listHeight:[],
      scrollY:0,
      selectedFood:{}
    }
  },
  created(){
  	this.$http.get('api/goods').then((response)=>{
  		response = response.body;
  		if (response.errno === ERR_OK ) {
  		  this.goods = response.data;
  		  this.$nextTick(function(){
  		  	//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  		  	this.initScroll();
  		  	this.calculateHeight();
  		  })
  		}
  	}),
  	this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  computed:{
  	currentIndex() {
  	  for (let i = 0; i < this.listHeight.length; i++) {
  	    let height1 = this.listHeight[i];
  	    let height2 = this.listHeight[i + 1];
  	    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
  	      return i ;
  	    }
  	  }
  	  return 0 ;
  	},
  	//统计数量
  	selectFoods(){
  		let foods = [];
  		this.goods.forEach((good) => {
  			good.foods.forEach((food) => {
                if(food.count){
                	foods.push(food)
                }
  			})
  		})
  		return foods
  	}
  },
  methods:{
  	selectMenu:function(index,event){
  		if(!event._constructed){
  			return;
  		}
  		let foodList = this.$refs.foodsWap.getElementsByClassName("foodListHook");
  		let el = foodList[index]
  		this.foodsScroll.scrollToElement(el,300)
  	},
  	selectFood(food,event){
  		if(!event._constructed){
  			return;
  		}
  		this.selectedFood = food;
  		this.$refs.food.show();
  	},
  	initScroll:function(){
  		this.meunScroll = new BScroll(this.$refs.menuWap,{click:true});
  		this.foodsScroll = new BScroll(this.$refs.foodsWap,{probeType:3,click:true});
  		this.foodsScroll.on("scroll",(pos)=>{
  			this.scrollY =Math.abs(Math.round(pos.y));
  		})
  	},
  	// 父组件使用 @cartAdd=”_drpo”监听由子组件vm.$emit触发的事件，通过_drpo()接受从子组件传递过来的数据，通知父组件数据改变了。
  	_drpo(target){
  		this.$nextTick(()=>{
  			this.$refs.shopcart.drop(target);
  		})
  	},
  	calculateHeight:function(){
  		let foodList = this.$refs.foodsWap.getElementsByClassName("foodListHook");
  		let height = 0;
  		this.listHeight.push(height);
  		for(let i =0 ; i<foodList.length;i++){
  			let item = foodList[i];
  			height+=item.clientHeight; //clientHeight 可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算. 
  			this.listHeight.push(height);
  		}
  	}
  },
  components:{
  	shopcart,cartcontrol,foods
  },
  events:{
  	"cart.add"(target){
  		this._drpo(t)
  	}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.stylus"

	.goods
		display flex
		position absolute
		top 174px
		bottom 47px
		width 100%
		overflow hidden
		.menuWap
			flex 0 0 80px
			width 80px
			background-color #f3f5f7
			.menuItem
				display table
				height 54px
				width 56px
				font-size 12px
				line-height 14px
				padding 0 12px
				&.current
					position relative
					z-index 100
					margin-top -1px
					font-weight 700
					background-color: #fff
					.text
						border-none()
				.text
					display table-cell
					width 56px
					vertical-align middle
					font-size 12px
					border-1px(rgba(7,17,27,.1))
				.icon
					display inline-block
					width 12px
					height 12px
					vertical-align top
					margin-right 2px
					background-size 12px 12px
					background-repeat no-repeat
				.decrease
					bg-image(decrease_3)
				.discount
					bg-image(discount_3)
				.special
					bg-image(special_3)
				.invoice
					bg-image(invoice_3)
				.guarantee
					bg-image(guarantee_3)
		.foodsWap
			flex 1
			.title
				padding-left 14px
				height 26px
				line-height 26px
				border-left 2px solid #d9dde1
				font-size 12px
				color rgb(147,153,159)
				background-color #f3f5f7
			.foodItem
				display flex
				margin 18px
				padding-bottom 18px
				border-1px(rgba(7,17,27,.1))
				&:last-child
					border-none()
					margin-bottom 0
				.icon
					flex 0 0 57px
					margin-right 10px
				.content
					flex 1
					.name
						margin 2px 0 8px 0
						font-size 14px
						line-height 14px
						color rgb(7,17,27)
					.desc,.extra
						font-size 10px
						line-height 12px
						color rgb(147,153,159)
					.desc
						margin-bottom 8px
					.extra
						.count
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
					.cartcontrolWap
						position absolute
						right 0px
						bottom 12px
</style>
