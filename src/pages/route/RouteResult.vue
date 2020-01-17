<template>
  <div>
    <route-header :isIndez="false"></route-header>
    <route-step :step="item" v-for="(item,index) of routeSteps" :key="index" class="step"></route-step>
    <spinner class="spinner" type="bubbles" size="60px" v-show="loading"></spinner>
    <toast v-model="error" type="text" width="22em">抱歉,未能找出完整路线,换条路线试试</toast>
    <alert v-model="success" title="已为您选择最佳路线" :content="alertContent" :hide-on-blur="true"></alert>
  </div>
</template>

<script>
import RouteHeader from './components/Header'
import RouteStep from './components/Step'
import { mapState } from 'vuex'
import { Toast, Spinner, Alert} from 'vux'
import axios from 'axios'

export default {
  name: 'RouteIndex',
  components: { RouteHeader, axios, Toast, Spinner, Alert, RouteStep},
  data () {
    return {
      loading: true,
      success: false,
      error: false,
      alertContent: '',
      routeSteps: []
    }
  },
  computed: {
    ...mapState(['searchParams'])
  },
  methods: {
    renderRoute (res) {
      let d = res.data
      console.log(d)
      if (d.code === 200) {
        this.loading = false
        this.alertContent = '总耗时:' + d.data.totalTime + ' ' + '总费用:￥' + d.data.totalCost
        this.success = true
        this.routeSteps = d.data.steps
      } else {
        this.error = true
      }
    }
  },
  mounted () {
    axios.post('/line/getTripLine', this.searchParams, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(this.renderRoute)
  }
}
</script>

<style lang="stylus" scoped>
.step
  margin-top 0.2rem
  margin-left 0.08rem
  margin-right 0.08rem
  border 0.02rem solid gray
.spinner
  position absolute
  top 40%
  left 40%
</style>
