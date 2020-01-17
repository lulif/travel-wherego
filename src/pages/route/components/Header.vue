<template>
  <div class="header">
    行程智能推荐
    <router-link to=""><div class="iconfont header-back" @click="$router.back(-1)">&#xe743;</div></router-link>
    <div class="iconfont header-right" v-show="isIndex" @click="handleScoreClick">&#xe633;</div>
  </div>
</template>

<script>
export default{
  name: 'RouteHeader',
  props: {
    isIndex: Boolean
  },
  methods: {
    handleScoreClick () {
      this.$emit('scoreClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'

.header
  position relative
  overflow hidden
  height $headerHeight
  line-height $headerHeight
  text-align center
  color #fff
  background $bgColor
  font-size 0.32rem
  .header-right
    position absolute
    top 0
    right 0
    width 0.64rem
    text-align center
    font-size 0.36rem
    color #fff
  .header-back
    position absolute
    top 0
    left 0
    width 0.64rem
    text-align center
    font-size 0.5rem
    color #fff
</style>
