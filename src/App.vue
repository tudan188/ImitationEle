<template>
  <div id="app">
    <Vheader :seller="seller"></Vheader>
    <div class="tab border-1px">
      <div class="tab-item"> <router-link to="/goods">商品</router-link></div>
      <div class="tab-item"> <router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"> <router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
        <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">

import Vheader from './components/header/Vheader.vue'
import {urlParse} from 'common/js/util'

const ERR_OK = 0;
export default {
  name: 'App',
  data () {
    return {
      seller: {
        id:(()=>{
          let queryParam=urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  created () {
    this.$http.get('/api/seller?id='+this.seller.id).then((response) => { // function () {}
      response = response.body;
      if (response.errno === ERR_OK ) {
        //this.seller = response.data;
        //assign方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
        this.seller = Object.assign({}, this.seller, response.data);
      }
    })
  },
  components: {
    Vheader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.stylus'
#app .tab
  display:flex
  width:100%
  height:40px
  line-height:40px
  position: relative
  border-1px(rgba(7,17,27,.1))
  
#app .tab .tab-item
  flex:1
  text-align: center

#app .tab .tab-item a
  display: block
  font-size: 14px
  color: rgb(77,85,93)

#app .tab .tab-item a.router-link-active 
  color: rgb(240,20,20)
</style>
