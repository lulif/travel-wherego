<template>
  <div>
      <route-header :isIndex="true" @scoreClick="listenScoreClick"></route-header>
      <route-condition @params="handleParams"></route-condition>
      <route-score :isOpen="isShowScore" @scoreParams="handleScoreParams"></route-score>

      <toast v-model="error1" type="text" width="20em">请完整填写搜索信息</toast>
      <toast v-model="error2" type="text" width="20em">请评价你的出行状态</toast>
      <toast v-model="error3" type="text">定位失败</toast>
      <toast v-model="error4" type="text" width="20em">未检测到相关地点</toast>
      <toast v-model="error5" type="warn">系统错误</toast>
  </div>
</template>

<script>
import RouteHeader from './components/Header'
import RouteCondition from './components/Condition'
import RouteScore from './components/Score'
import { Toast } from 'vux'
import {mapMutations} from 'vuex'
import axios from 'axios'
import qs from 'qs'
export default{
  name: 'RouteIndex',
  components: {RouteHeader, RouteCondition, RouteScore, Toast, axios, qs},
  data () {
    return {
      isShowScore: false,
      searchParams: {
        currentLatitude: '',
        currentLongitude: '',
        origin: '',
        terminal: '',
        departWay: '',
        departTime: '',
        economicScore: '',
        timeScore: '',
        loadBearingScore: ''
      },
      error1: false,
      error2: false,
      error3: false,
      error4: false,
      error5: false
    }
  },
  methods: {
    listenScoreClick () {
      this.isShowScore = true
    },
    handleParams (params) {
      if (!this.searchParams.economicScore && !this.searchParams.timeScore &&
           !this.searchParams.loadBearingScore) {
        this.error2 = true
        return
      }
      if (!params.origin || !params.terminal || !params.departWay || !params.departTime) {
        this.error1 = true
        return
      }
      this.searchParams.origin = params.origin
      this.searchParams.terminal = params.terminal
      this.searchParams.departWay = params.departWay
      this.searchParams.departTime = params.departTime
      axios.post('/line/checkSearchMsg', qs.stringify(this.searchParams), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(this.checkSearchMsg)
    },
    checkSearchMsg (res) {
      if (res.data.code === 200) {
        this.getSearchParams(qs.stringify(this.searchParams))
        this.$router.push('./result')
      } else if (res.data.code === 40008) {
        this.error4 = true
      } else {
        this.error5 = true
      }
    },
    handleScoreParams (scoreParams) {
      this.isShowScore = false
      if (scoreParams) {
        this.searchParams.economicScore = scoreParams.economicScore
        this.searchParams.timeScore = scoreParams.timeScore
        this.searchParams.loadBearingScore = scoreParams.loadBearingScore
      }
    },
    getLocation () {
      return new Promise((resolve, reject) => {
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
        	if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        		resolve(r.point)
          }
        }, {enableHighAccuracy: true})
      })
    },
    ...mapMutations(['getSearchParams'])
  },
  mounted () {
    this.getLocation().then(point => {
      if (point.lat && point.lng) {
        this.searchParams.currentLatitude = point.lat
        this.searchParams.currentLongitude = point.lng
      } else {
        this.error3 = true
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
