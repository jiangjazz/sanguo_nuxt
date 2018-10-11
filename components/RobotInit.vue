/*
 * @Author: Janzen 
 * @Date: 2018-10-10 16:33:03 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 14:29:22
 */
<template>
  <div>
    robotInit
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // 定时器集合
      timeoutS: {}
    }
  },
  computed: {
    ...mapState(['gameConfig', 'robotData'])
  },
  methods: {
    /**
     * 获取动画名称
     * @param {number} type robot类型
     */
    getAnimationName(type, arrow) {
      // 默认hide
      let name = 'hide'
      switch (type) {
      }
    },
    // 工作 / 打架
    working() {},
    // 前往指定地点
    goToWork(robot) {}
  },
  mounted() {
    let { width, height, numOfMapX, numOfMap, startX, startY } = this.gameConfig

    let ss = new createjs.SpriteSheet({
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
        hero_run_right: [1, 2, , 0.1],
        hero_run_left: [3, 4, , 0.1],
        hero_work_right: [5, 6, , 0.1],
        hero_work_left: [7, 8, , 0.1],
        // 矿工
        worker_run_right: [9, 10, , 0.1],
        worker_run_left: [11, 12, , 0.1],
        worker_work_right: [13, 14, , 0.1],
        worker_work_left: [15, 16, , 0.1],
        // 农夫
        farmer_run_right: [17, 18, , 0.1],
        farmer_run_left: [19, 20, , 0.1],
        farmer_work_right: [21, 22, , 0.1],
        farmer_work_left: [23, 24, , 0.1],
        // 建筑工
        builder_run_right: [25, 26, , 0.1],
        builder_run_left: [27, 28, , 0.1],
        builder_work_right: [29, 30, , 0.1],
        builder_work_left: [31, 32, , 0.1],
        // 搬运工
        hamal_run_right: [33, 34, , 0.1],
        hamal_run_left: [35, 36, , 0.1],
        hamal_work_right: [37, 38, , 0.1],
        hamal_work_left: [39, 40, , 0.1],
        // 园林工
        gardener_run_right: [41, 42, , 0.1],
        gardener_run_left: [43, 44, , 0.1],
        gardener_work_right: [45, 46, , 0.1],
        gardener_work_left: [47, 48, , 0.1]
      },
      images: ['/images/objs.png']
    })
    // 数据检测
    if (!Array.isArray(this.robotData)) {
      throw new Error('没有robot数据')
      return false
    }

    this.robotData.map(robot => {
      let row = Math.floor(robot.position / numOfMapX) // 行
      let col = robot.position % numOfMapX // 列

      // x坐标
      let regX = startX - row * (width / 2) - col * (width / 2)
      // y坐标
      let regY = startY - row * (height / 2) + col * (height / 2)

      // 检测是否在野 是则显示动画
      if (!robot.isHide) {
        
        // 暂且不知道状态，先隐藏
        let sprite = new createjs.Sprite(ss, 'hide')
        sprite.regX = regX
        sprite.regY = regY
        stage.addChild(sprite)

        // 检测是否存在目标
        if (robot.target) {
          // 工作
          this.goToWork(robot)

          let targetRow = Math.floor(robot.target / numOfMapX) // 行
          let targetCol = robot.target % numOfMapX // 列

          // sprite.on('tick', function(event) {
          //   if (targetCol - sprite.x > 0) {
          //     // 水平向右
          //     // sprite = new createjs.Sprite(ss, 'hide')
          //     sprite.x += (event.delta / 1000) * 16
          //     if (sprite.x > targetRow) {
          //       sprite.x = targetRow
          //     }
          //   } else if (targetCol - sprite.x < 0) {
          //     // 水平向左
          //     sprite.x -= (event.delta / 1000) * 16
          //     if (sprite.x < targetRow) {
          //       sprite.x = targetRow
          //     }
          //   } else {
          //     // 到达目的地
          //   }
          // })
        }

        // 检测是否有目标地点
      }

      return
    })
  }
}
</script>
