/*
 * @Author: Janzen 
 * @Date: 2018-10-11 14:24:17 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 16:03:26
 */
<template>
  <div>
    Robot
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    robot: {
      type: Object
    },
    getAnimationName: {
      type: Function
    }
  },
  data () {
    return {
      // 计时器
      timeout: null
    }
  },
  computed: {
    ...mapState(['gameConfig'])
  },
  mounted() {
    console.log(robotSS)
    let { width, height, numOfMapX, numOfMap, startX, startY } = this.gameConfig

    let robot = this.robot

    let row = Math.floor(robot.position / numOfMapX) // 行
    let col = robot.position % numOfMapX // 列

    // x坐标
    let regX = startX - row * (width / 2) - col * (width / 2)
    // y坐标
    let regY = startY - row * (height / 2) + col * (height / 2)

    // 检测是否在野 是则显示动画
    if (!robot.isHide) {
      // 暂且不知道状态，先隐藏
      let sprite = new createjs.Sprite(robotSS, 'farmer_run_right')
      sprite.regX = regX
      sprite.regY = regY
      stage.addChild(sprite)

      // 检测是否存在目标
      if (robot.target) {
        // 工作
        let targetRow = Math.floor(robot.target / numOfMapX) // 行
        let targetCol = robot.target % numOfMapX // 列
        // x坐标
        let targetX =
          startX - width / 2 - targetRow * (width / 2) + targetCol * (width / 2)
        // y坐标
        let targetY =
          startY + targetRow * (height / 2) - targetCol * (height / 2)

        console.log(targetX, targetY, sprite.x)
        // sprite.gotoAndPlay('farmer_run_right')
        sprite.on('tick', event => {
          if (sprite.x < targetX) {
            // 水平向右
            sprite.x += (event.delta / 1000) * 16
            // console.log(11111, targetX, sprite.x)
            if (sprite.x > targetX) {
              sprite.x = targetX
              sprite.gotoAndPlay(
                this.getAnimationName(robot.type, robot.current_type, 'right')
              )
            }
          } else if (sprite.x > targetX) {
            // 水平向左
            sprite.x -= (event.delta / 1000) * 16
            if (sprite.x < targetX) {
              sprite.x = targetX
            }
          } else {
            // 到达目的地
          }
        })
      }

      // 检测是否有目标地点
    }
  }
}
</script>

