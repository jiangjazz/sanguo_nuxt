/*
 * @Author: Janzen 
 * @Date: 2018-10-10 16:33:03 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 17:56:58
 */
<template>
  <div>
    robotInit
    <div v-if="isDataInit">
      <Robot v-for="item in robotData" :robot="item" :getAnimationName="getAnimationName" :key="item.lastmodify"></Robot>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Robot from '@/components/Robot/Robot.vue'

export default {
  components: {
    Robot
  },
  data() {
    return {
      // 不同类型职业的动画名称前缀
      preNames: ['hero', 'worker', 'farmer', 'builder', 'hamal', 'gardener'],
      // spriteSheet数据初始化是否完成
      isDataInit: false
    }
  },
  computed: {
    ...mapState(['robotData'])
  },
  methods: {
    /**
     * 获取动画名称
     * @param {number} type robot类型
     * @param {number} current_type 工作状态
     * @param {string} arrow 面向 right | left
     */
    getAnimationName(type, current_type, arrow) {
      // 默认hide
      let name = 'hide'
      switch (current_type) {
        case 0:
          name = 'hide'
          break
        case 1:
          name = `${this.preNames[type]}_run_${arrow}`
          break
        case 2:
          name = `${this.preNames[type]}_work_${arrow}`
          break
        case 3:
          name = `${this.preNames[type]}_run_${arrow}`
          break
        case 4:
          name = 'hide'
          break
        default:
          name = 'hide'
          break
      }
      return name
    }
  },
  mounted() {

    window.robotSS = new createjs.SpriteSheet({
      frames: [
        // hide
        [0, 0, 0, 0, 0],
        /**
         * type 0
         * 武将
         */
        // 武将run_right
        [40, 91, 19, 20, 0, -12, 4],
        [59, 91, 17, 20, 0, -14, 4],
        // 武将run_left
        [153, 141, 19, 20, 0, -16, 4],
        [136, 143, 17, 19, 0, -16, 4],
        // 武将hit_right
        [76, 84, 18, 20, 0, -12, 4],
        [95, 84, 18, 20, 0, -12, 4],
        // 武将hit_left
        [0, 164, 18, 20, 0, -12, 4],
        [19, 163, 18, 21, 0, -14, 4],
        /**
         * type 1
         * 矿工
         */
        // 矿工run_right
        [165, 76, 15, 21, 0, -14, 4],
        [154, 98, 11, 21, 0, -15, 4],
        // 矿工run_left
        [38, 165, 14, 19, 0, -16, 4],
        [53, 165, 11, 20, 0, -17, 4],
        // 矿工work_right
        [167, 97, 12, 22, 0, -9, 5],
        [147, 76, 17, 21, 0, -12, 4],
        // 矿工work_left
        [168, 160, 12, 23, 0, -20, 7],
        [64, 165, 16, 20, 0, -12, 4],
        /**
         * type 2
         * 农夫
         */
        // 农夫run_right
        [127, 106, 17, 18, 0, -12, 4],
        [127, 124, 18, 18, 0, -12, 4],
        // 农夫run_left
        [80, 165, 18, 18, 0, -14, 4],
        [98, 164, 18, 18, 0, -14, 4],
        // 农夫work_right
        [145, 120, 17, 20, 0, -12, 4],
        [162, 120, 18, 20, 0, -12, 4],
        // 农夫work_left
        [117, 163, 17, 20, 0, -16, 4],
        [134, 163, 17, 20, 0, -16, 4],
        /**
         * type 3
         * 建筑工
         */
        // 建筑工run_right
        [11, 114, 15, 20, 0, -13, 4],
        [27, 114, 12, 20, 0, -14, 4],
        // 建筑工run_left
        [84, 143, 15, 20, 0, -18, 4],
        [71, 143, 12, 20, 0, -20, 4],
        // 建筑工work_right
        [40, 112, 12, 24, 0, -12, 8],
        [53, 112, 14, 20, 0, -16, 4],
        // 建筑工work_left
        [12, 134, 12, 24, 0, -20, 8],
        [99, 143, 14, 19, 0, -14, 4],
        /**
         * type 4
         * 搬运工
         */
        // 搬运工run_right
        [80, 104, 12, 20, 0, -17, 4],
        [0, 114, 11, 20, 0, -18, 4],
        // 搬运工run_left
        [25, 143, 12, 20, 0, -18, 4],
        [0, 143, 11, 20, 0, -17, 4],
        // 搬运工work_right
        [109, 106, 17, 20, 0, -13, 4],
        [92, 105, 17, 20, 0, -14, 4],
        // 搬运工work_left
        [37, 143, 17, 20, 0, -16, 4],
        [54, 143, 17, 20, 0, -15, 4],
        /**
         * type 5
         * 园林工
         */
        // 园林工run_right
        [80, 104, 12, 20, 0, -17, 4],
        [0, 114, 11, 20, 0, -18, 4],
        // 园林工run_left
        [25, 143, 12, 20, 0, -18, 4],
        [0, 143, 11, 20, 0, -17, 4],
        // 园林工work_right
        [66, 112, 12, 18, 0, -17, 1],
        [88, 125, 11, 18, 0, -18, 2],
        // 园林工work_left
        [113, 143, 12, 18, 0, -17, 2],
        [125, 143, 11, 18, 0, -18, 2]
      ],
      animations: {
        hide: 0,
        // 武将
        [`${this.preNames[0]}_run_right`]: [1, 2, , 0.1],
        [`${this.preNames[0]}_run_left`]: [3, 4, , 0.1],
        [`${this.preNames[0]}_work_right`]: [5, 6, , 0.1],
        [`${this.preNames[0]}_work_left`]: [7, 8, , 0.1],
        // 矿工
        [`${this.preNames[1]}_run_right`]: [9, 10, , 0.1],
        [`${this.preNames[1]}_run_left`]: [11, 12, , 0.1],
        [`${this.preNames[1]}_work_right`]: [13, 14, , 0.1],
        [`${this.preNames[1]}_work_left`]: [15, 16, , 0.1],
        // 农夫
        [`${this.preNames[2]}_run_right`]: [17, 18, , 0.1],
        [`${this.preNames[2]}_run_left`]: [19, 20, , 0.1],
        [`${this.preNames[2]}_work_right`]: [21, 22, , 0.1],
        [`${this.preNames[2]}_work_left`]: [23, 24, , 0.1],
        // 建筑工
        [`${this.preNames[3]}_run_right`]: [25, 26, , 0.1],
        [`${this.preNames[3]}_run_left`]: [27, 28, , 0.1],
        [`${this.preNames[3]}_work_right`]: [29, 30, , 0.1],
        [`${this.preNames[3]}_work_left`]: [31, 32, , 0.1],
        // 搬运工
        [`${this.preNames[4]}_run_right`]: [33, 34, , 0.1],
        [`${this.preNames[4]}_run_left`]: [35, 36, , 0.1],
        [`${this.preNames[4]}_work_right`]: [37, 38, , 0.1],
        [`${this.preNames[4]}_work_left`]: [39, 40, , 0.1],
        // 园林工
        [`${this.preNames[5]}_run_right`]: [41, 42, , 0.1],
        [`${this.preNames[5]}_run_left`]: [43, 44, , 0.1],
        [`${this.preNames[5]}_work_right`]: [45, 46, , 0.1],
        [`${this.preNames[5]}_work_left`]: [47, 48, , 0.1]
      },
      images: ['/images/objs.png']
    })

    // 发送通知，数据初始化完成
    this.isDataInit = true
  }
}
</script>
