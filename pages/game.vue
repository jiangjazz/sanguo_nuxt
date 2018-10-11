/*
 * @Author: Janzen 
 * @Date: 2018-10-10 11:41:36 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 11:02:38
 */
<template>
  <div>
    <canvas class="myCanvas" id="myCanvas" width="320" height="640"></canvas>
    <MapInit v-if="stageIsInit"></MapInit>
    <BuildingInit v-if="stageIsInit"></BuildingInit>
    <RobotInit v-if="stageIsInit"></RobotInit>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MapInit from '@/components/MapInit'
import BuildingInit from '@/components/BuildingInit'
import RobotInit from '@/components/RobotInit'

export default {
  components: {
    MapInit,
    BuildingInit,
    RobotInit
  },
  computed: {
    ...mapState(['stageIsInit'])
  },
  mounted() {
    // 绘制画布并绑定至全局
    window.stage = new createjs.Stage('myCanvas')

    createjs.Ticker.on('tick', (event) => {
      stage.update(event)
    })
    // fps
    createjs.Ticker.framerate = 20

    // 发送通知，舞台搭建完成
    this.$store.commit('setStageIsInit', true)
  }
}
</script>

<style>
.myCanvas {
  border: 1px solid red;
}
</style>

