<template>
  <div>
    <card :header="header" :footer="footer" class="title">
      <p slot="content" class="card-padding way" v-html="wayContent"></p>
    </card>
  </div>
</template>

<script>
import { Card } from 'vux'
export default {
  name: 'RouteStep',
  components: {
    Card
  },
  props: {
    step: Object
  },
  data () {
    return {
      header: {title: ''},
      footer: {title: ''},
      wayContent: ''
    }
  },
  mounted () {
    this.header.title = this.step.tempOri + '->' + this.step.tempTer + (this.step.isDrive ? '  (驾车)' : '') +
         (this.step.isWalk ? '  (步行)' : '') + (this.step.isRail ? '  (火车)' : '') +
         (this.step.isFlight ? '  (飞机)' : '') + (this.step.isSubway ? '  (地铁)' : '')

    this.footer.title = '距离:' + (!this.step.tempDistance ? '—' : this.step.tempDistance) + '米' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;' + '耗时:' + this.step.tempTime + '&nbsp;&nbsp;&nbsp;&nbsp;' + '花费:' + this.step.tempCost + '元'

    if (this.step.isRail) {
      let way = this.step.way
      this.wayContent = way.railCode + '&nbsp;&nbsp;&nbsp;&nbsp;' + 'FORM:' + way.departurePlace.cityName + '&nbsp;&nbsp;&nbsp;&nbsp;' + 'TO:' + way.stopoverStation.cityName + '<br>' +
                        '出发时间:' + way.departureTime + '&nbsp;&nbsp;&nbsp;&nbsp;' + '到达时间:' + way.arriveTime + '<br>' +
                        '一等座:' + way.firstSeatPrice + '&nbsp;&nbsp;&nbsp;&nbsp;' + '二等座:' + way.secondSeatPrice + '&nbsp;&nbsp;&nbsp;&nbsp;' + '商务座:' + way.businessSeatPrice
    } else if (this.step.isFlight) {
      let way = this.step.way
      this.wayContent = way.flightName + '&nbsp;&nbsp;&nbsp;&nbsp;' + way.aircraftType + '&nbsp;&nbsp;&nbsp;&nbsp;' + way.aircraftTypeCode + '<br>' +
      'FORM:' + way.departurePlace.cityName + '&nbsp;&nbsp;&nbsp;&nbsp;' + 'TO:' + way.destinationPlace.cityName + '<br>' +
                        '出发时间:' + way.departureTime + '&nbsp;&nbsp;&nbsp;&nbsp;' + '到达时间:' + way.arriveTime + '<br>' +
                        '折扣方式' + way.discountMethod + '&nbsp;&nbsp;&nbsp;&nbsp;' + '准点率' + way.punctualityRate + '%'
    } else if (this.step.isSubway) {
      let passSubwayLineList = this.step.subwayLinePlanning.passSubwayLineList
      let passSitesList = this.step.subwayLinePlanning.passSitesList
      let content = ''
      for (let i = 0, j = 0; i < passSubwayLineList.length; i++) {
        if (passSubwayLineList[i]) {
          content += '<b>' + passSubwayLineList[i].lineName + '</b>' + '<br>'
          for (;j < passSitesList.length; j++) {
            if (!passSitesList[j]) {
              content = content.substring(0, content.length - 2) + '<br>'
              j++
              break
            }
            content += passSitesList[j].stationName + '->'
          }
        }
      }
      content = content.substring(0, content.length - 2)
      this.wayContent = content
    } else {
      let s = this.step.way.steps
      for (let i = 0; i < s.length; i++) {
        this.wayContent += s[i].instruction + '<br>'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .way
    width 94%
    height 1.62rem
    overflow auto
    font-size 0.25rem
    line-height 0.4rem
    margin-left 0.2rem
    margin-right 0.2rem
</style>
