/*
 * @Author: Janzen 
 * @Date: 2018-10-10 16:33:03 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-10 17:47:32
 */
<template>
  <div>
    robotInit
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  // data () {
  //   return {
  //     // 武将动画
  //     hero: [],
  //     // 矿工动画
  //     worker: [],
  //     // 农夫动画
  //     farmer: [],
  //     // 建筑工动画
  //     builder: [],
  //     // 搬运工动画
  //     hamal: [],
  //     // 园林工动画
  //     gardener: []
  //   }
  // },
  computed: {
    ...mapState(['gameConfig', 'robotData'])
  },
  methods: {
    //
    goToPlace() {}
  },
  mounted() {
    let { width, height, numOfMapX, numOfMap, startX, startY } = this.gameConfig

    let ss = new createjs.SpriteSheet({
      frames: [
        // hide
        [0, 0, 0, 0, 0],
        /**
         * 武将
         */
        // 武将run_right
        [40, 91, 19, 20, 0, -12, 4],
        [59, 91, 17, 20, 0, -12, 4],
        // 武将hit_right
        [76, 84, 18, 20, 0, -12, 4],
        [95, 84, 18, 20, 0, -12, 4],
        /**
         * 农夫
         */
        // 农夫run_right
        [127, 106, 17, 18, 0, -12, 4],
        [127, 124, 18, 18, 0, -12, 4],
        // 农夫work_right
        [145, 120, 17, 20, 0, -12, 4],
        [162, 120, 18, 20, 0, -12, 4]
      ],
      animations: {
        hide: 0,
        // 武将
        hero_run: [1, 2, , 0.1],
        hero_hit: [3, 4, , 0.1],
        // 农夫
        farmer_run: [5, 6, , 0.1],
        farmer_work: [7, 8, , 0.1]
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
        let sprite = null
        switch (robot.type) {
          case 0:
            sprite = new createjs.Sprite(ss, 'hero_run')
            break
          case 2:
            sprite = new createjs.Sprite(ss, 'farmer_run')
            break
          default:
            break
        }

        if (sprite) {
          sprite.regX = regX
          sprite.regY = regY
          stage.addChild(sprite)
          // 检测是否存在目标
          if (robot.target) {
            let targetRow = Math.floor(robot.target / numOfMapX) // 行
            let targetCol = robot.target % numOfMapX // 列
            let arrowRight = (targetCol - col) > 0 // 是否向右走
            let arrowDown = (targetRow - row) > 0 // 是否向下走
            
            sprite.on('tick', function(event) {
              if (arrowRight) {
                // sprite.x += (event.delta / 1000) * 16
              } else {
                // sprite.x -= (event.delta / 1000) * 16
              }
              // console.log(123)
              // move 100 pixels per second (elapsedTimeInMS / 1000msPerSecond * pixelsPerSecond):
              // sprite.x += (event.delta / 1000) * 16
            })
          }
        }

        // 检测是否有目标地点
      }

      return
    })
  }
}
</script>
