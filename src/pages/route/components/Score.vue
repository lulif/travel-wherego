<template>
  <popup position="right" width="70%" v-model="isShow" @on-hide="scoreParams">
  <div class="box">
    <div class="up"><div class="notice">本系统将根据您的评测情况 推荐最佳行程路线</div></div>
    <div class="down">
      <div class="title text">请评价您的出行状态:</div>
      <div class="content">
        <flexbox>
          <flexbox-item :span="3"><span class="text">经济:</span></flexbox-item>
          <flexbox-item :span="6"><vue-slider class="slider" v-model="economy" :lazy="true"></vue-slider></flexbox-item>
          <flexbox-item :span="1">
            <span class="text">{{ economy }}</span>
          </flexbox-item>
        </flexbox>
        <group class=" switch-group">
          <x-switch title="公司报销" class="switch text" :disabled="SwitchStatus[0][0]"  @on-change="ecoSwitchChange1"></x-switch>
          <x-switch title="能省则省" class="switch text" :disabled="SwitchStatus[0][1]"  @on-change="ecoSwitchChange2"></x-switch>
        </group>
        <flexbox>
          <flexbox-item :span="3"><span class="text">时间:</span></flexbox-item>
          <flexbox-item :span="6"><vue-slider class="slider" v-model="time" :lazy="true"></vue-slider></flexbox-item>
          <flexbox-item :span="1">
            <span class="text">{{ time }}</span>
          </flexbox-item>
        </flexbox>
        <group class=" switch-group">
          <x-switch title="悠闲旅游" class="switch text" :disabled="SwitchStatus[1][0]"  @on-change="timeSwitchChange1"></x-switch>
          <x-switch title="十万火急" class="switch text" :disabled="SwitchStatus[1][1]"  @on-change="timeSwitchChange2"></x-switch>
        </group>
        <flexbox>
          <flexbox-item :span="3"><span class="text">负重:</span></flexbox-item>
          <flexbox-item :span="6"><vue-slider class="slider" v-model="weight" :lazy="true"></vue-slider></flexbox-item>
          <flexbox-item :span="1">
            <span class="text">{{ weight }}</span>
          </flexbox-item>
        </flexbox>
        <group class=" switch-group">
          <x-switch title="携带老幼" class="switch text" :disabled="SwitchStatus[2][0] "  @on-change="weightSwitchChange1"></x-switch>
          <x-switch title="轻车简从" class="switch text" :disabled="SwitchStatus[2][1] "  @on-change="weightSwitchChange2"></x-switch>
        </group>
      </div>
    </div>
  </div>
  </popup>
</template>

<script>
import { Flexbox, FlexboxItem, Group, XSwitch, Popup } from 'vux'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'RouteScore',
  props: {
    isOpen: Boolean
  },
  components: {
    VueSlider,
    Flexbox,
    FlexboxItem,
    Group,
    XSwitch,
    Popup
  },
  data () {
    return {
      economy: 0,
      time: 0,
      weight: 0,
      SwitchStatus: [
        [false, false],
        [false, false],
        [false, false]
      ]
    }
  },
  computed: {
    isShow: {
      get: function () { return this.isOpen },
      set: function () { }
    }
  },
  methods: {
    ecoSwitchChange1 (e) {
      if (e) {
        this.economy = this.economy + 50 > 100 ? 100 : this.economy + 50
        this.SwitchStatus[0][1] = true
      } else {
        this.economy = this.economy - 50 < 0 ? 0 : this.economy - 50
        this.SwitchStatus[0][1] = false
      }
    },
    ecoSwitchChange2 (e) {
      if (e) {
        this.economy = this.economy - 50 < 0 ? 0 : this.economy - 50
        this.SwitchStatus[0][0] = true
      } else {
        this.economy = this.economy + 50 > 100 ? 0 : this.economy + 50
        this.SwitchStatus[0][0] = false
      }
    },
    timeSwitchChange1 (e) {
      if (e) {
        this.time = this.time + 50 > 100 ? 100 : this.time + 50
        this.SwitchStatus[1][1] = true
      } else {
        this.time = this.time - 50 < 0 ? 0 : this.time - 50
        this.SwitchStatus[1][1] = false
      }
    },
    timeSwitchChange2 (e) {
      if (e) {
        this.time = this.time - 50 < 0 ? 0 : this.time - 50
        this.SwitchStatus[1][0] = true
      } else {
        this.time = this.time + 50 > 100 ? 0 : this.time + 50
        this.SwitchStatus[1][0] = false
      }
    },
    weightSwitchChange1 (e) {
      if (e) {
        this.weight = this.weight + 50 > 100 ? 100 : this.weight + 50
        this.SwitchStatus[2][1] = true
      } else {
        this.weight = this.weight - 50 < 0 ? 0 : this.weight - 50
        this.SwitchStatus[2][1] = false
      }
    },
    weightSwitchChange2 (e) {
      if (e) {
        this.weight = this.weight - 50 < 0 ? 0 : this.weight - 50
        this.SwitchStatus[2][0] = true
      } else {
        this.weight = this.weight + 50 > 100 ? 0 : this.weight + 50
        this.SwitchStatus[2][0] = false
      }
    },
    scoreParams () {
      let scoreParams = {
        'economicScore': this.economy,
        'timeScore': this.time,
        'loadBearingScore': this.weight
      }
      this.$emit('scoreParams', scoreParams)
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  width 100%
  height 100%
  .up
    height 20%
    background-color dimgray
    text-align center
    font-size 0.4rem
    color white
    .notice
      padding-top 0.9rem
  .down
    height 80%
    background-color black
    .title
      font-size 0.4rem
      position relative
      font-weight 400
      color white
      top 0.2rem
    .content
      position relative
      top 1rem
      .switch-group
        margin-bottom 0.22rem
        .switch
          background-color #000000
       .text
         font-size 0.38rem
         font-weight 400
         color white
       .slider
         width 30%
         margin-left -0.3rem
</style>
