<template>
  <div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img width="64" height="64" :src="seller.avatar">
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name"> {{seller.name}} </span>
    		</div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text"> {{seller.supports[0].description}} </span>
        </div>
    	</div>
      <div v-if="seller.supports" @click="showDetail" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" class="" width="100%" height="100%" >
    </div>
    <transition name="fade">
       <div v-show="detailShow" class="detail">
             <div class="detailWrapper clearfix">
               <div class="detaiMain">
                   <h1 class="name">{{seller.name}}</h1>
                   <div class="starWrap">
                     <star :size="48" :score="seller.score"></star>
                   </div>
                   <div class="title">
                     <div class="line"></div>
                     <div class="text">优惠信息</div>
                     <div class="line"></div>
                   </div>
                   <ul class="supports" v-if="seller.supports">
                     <li class="supportsItem" v-for="(item,index) in seller.supports">
                       <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                       <span class="text"> {{seller.supports[index].description}} </span>
                     </li>
                   </ul>
                   <div class="title">
                     <div class="line"></div>
                     <div class="text">商家公告</div>
                     <div class="line"></div>
                   </div>
                   <div class="buuetin">
                     <p class="content"> {{seller.bulletin}} </p>
                   </div>
               </div>
             </div>
             <div class="detailClose" @click="hienDetail">
               <i class="icon-close"></i>
             </div>
       </div>
     </transition>
  </div>
</template>

<script type="text/ecmascript-6">

import star from "../star/star.vue"

export default {
  name: 'Vheader',
  props : [ 'seller' ],
  data (){
    return {
      detailShow:false
    }
  },
  methods:{
    showDetail(){
      this.detailShow = true;
    },
    hienDetail(){
      this.detailShow = false;
    }
  },
  created (){
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  components:{
    star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.stylus"

.header .content-wrapper .avatar,.content
  display: inline-block
.header .content-wrapper .content .description
  margin-bottom: 10px
  line-height: 12px
  font-size: 12px
.header .content-wrapper .content .support .icon
  display: inline-block
  vertical-align: bottom
  width: 12px
  height: 12px
  margin-right: 4px
  background-size: 12px 12px
  background-repeat: no-repeat
.header .content-wrapper .content .support .decrease
    bg-image(decrease_1)
.header .content-wrapper .content .support .discount
    bg-image(discount_1)
.header .content-wrapper .content .support .special
    bg-image(special_1)
.header .content-wrapper .content .support .invoice
    bg-image(invoice_1)
.header .content-wrapper .content .support .guarantee
    bg-image(guarantee_1)
.header .content-wrapper .content .support .text
  line-height: 12px
  font-size: 10px
.header
  position relative
  background-color rgba(7,17,27,.5)
  overflow hidden
  color:#fff
  .content-wrapper
    position relative
    padding: 24px 12px 18px 24px
    font-size: 0
    .content
      font-size: 14px
      margin-left: 16px
      .title
        margin:2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: bottom
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
    .avatar
      vertical-align: top
      img
        border-radius: 2px
    .support-count
      position absolute
      right:12px
      bottom:18px
      padding:0 8px
      height:24px
      line-height:24px
      border-radius :14px
      background-color :rgba(0 ,0 ,0,.2)
      text-align : center
      .count
        font-size :10px
        vertical-align :top
      .icon-keyboard_arrow_right
        line-height:24px
        font-size :10px
        margin-left :2px
  .bulletin-wrapper
    height:28px
    line-height :28px
    padding:0 22px 0 12px
    white-space : nowrap
    overflow : hidden
    text-overflow : ellipsis
    position relative
    background-color rgba(7,17,27,.2)
    .bulletin-title
      display  inline-block
      width 22px
      height 12px
      bg-image(bulletin)
      background-size 22px 12px
      font-size 12px
      vertical-align top
      margin-top 8px
    .bulletin-text
      font-size 10px
      margin 0 4px
      vertical-align top
    .icon-keyboard_arrow_right
      position absolute
      right 12px
      top 9px
      font-size 10px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
  .detail
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    opacity: 1
    background-color rgba(7,17,27,.8)
    background-filter blur(10px)//背景模糊
    // 接着为过渡类名添加规则
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s     
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background-color rgba(7,17,27,0)
    .detailWrapper
      min-height 100%
      width 100%
      .detaiMain
        margin-top 64px
        padding-bottom 64px
        .name
          font-size 16px
          line-height 16px
          text-align center
          font-weight 700
        .starWrap
          margin-top 18px
          padding 2px 0
          text-align center
        .title
          display flex
          width 80%
          margin 30px auto 24px auto
          .line
            flex 1
            position  relative
            top -6px
            border-bottom 1px solid rgba(255,255,255,.2)
          .text
            padding 0 12px
            font-size 14px
            font-weight 700
        .supports
          width 80%
          margin 0 auto
          .supportsItem
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &:last-child
              margin-bottom 0
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align bottom
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                  bg-image(decrease_2)
              &.discount
                  bg-image(discount_2)
              &.special
                  bg-image(special_2)
              &.invoice
                  bg-image(invoice_2)
              &.guarantee
                  bg-image(guarantee_2)
            .text
              font-size 16px
              line-height 16px
        .buuetin
          width 80%
          margin 0 auto
          .content
            padding 0 12px
            line-height 24px
            font-size 12px
    .detailClose
        position relative
        width 32px
        height 32px
        margin -64px auto
        clear both
        font-size 32px
        z-index 99
</style>
