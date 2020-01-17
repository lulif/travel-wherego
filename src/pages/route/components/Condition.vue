<template>
  <div>
    <group>
      <x-input title="所在起点:" placeholder="例:北京XX地铁站点"  v-model="origin" :show-clear="false"/>
      <x-input title="所达终点:"  placeholder="例:昆明XX地铁站点" v-model="terminal" :show-clear="false"/>
      <popup-radio title="出行类别:" :options="options" v-model="departWay"/>
      <datetime-range title="出行时间" v-model="value" :start-date="startDate" :end-date="endDate" @on-change="departTimeChange"/>
    </group>
      <x-button type="warn" text="搜索" class="search" @click.native="handleSearch"></x-button>
  </div>
</template>

<script>
import { Group, XInput, PopupRadio, DatetimeRange, XButton } from 'vux'

export default {
  name: 'RouteCondition',
  components: {
    Group, XInput, PopupRadio, DatetimeRange, XButton
  },
  data () {
    return {
      options: ['商务旅客', '个人出行', '家庭出游'],
      value: [],
      startDate: '',
      endDate: '',
      origin: '当前位置',
      terminal: '',
      departWay: '',
      departTime: ''
    }
  },
  mounted () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let T = year + '-' + month + '-' + day
    let now = [T, hour, minute]
    this.value = now
    this.startDate = T + ' ' + hour + ':' + minute
    this.endDate = year + '-' + (month + 3) + '-' + day + ' ' + hour + ':' + minute
  },
  methods: {
    departTimeChange (val) {
      this.departTime = val[0] + ' ' + val[1] + ':' + val[2] + ':00'
    },
    handleSearch () {
      let params = {
        'origin': this.origin,
        'terminal': this.terminal,
        'departWay': this.departWay,
        'departTime': this.departTime
      }
      this.$emit('params', params)
    }
  }

}
</script>

<style lang="stylus" scoped>
.search
  width 75%
  margin-top 0.8rem
</style>
