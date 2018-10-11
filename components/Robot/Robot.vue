/*
 * @Author: Janzen 
 * @Date: 2018-10-11 14:24:17 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 18:00:04
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
  data() {
    return {
      // 计时器
      timeout: null
    }
  },
  computed: {
    ...mapState(['gameConfig'])
  },
  methods: {
    /**
     * 检查工作内容并执行
     * @param {obj} sprite 建好的机器人动画模型
     */
    action(sprite) {
      let {
        width,
        height,
        numOfMapX,
        numOfMap,
        startX,
        startY
      } = this.gameConfig
      // let robot = this.robot
      // 行动处理
      let targetRow = Math.floor(this.robot.target / numOfMapX) // 行
      let targetCol = this.robot.target % numOfMapX // 列
      // x坐标
      let targetX = startX + targetRow * (width / 2) + targetCol * (width / 2)
      // y坐标
      let targetY = startY + targetRow * (height / 2) - targetCol * (height / 2)
      // 动画的面向
      let arrow = sprite.x < targetX ? 'right' : 'left'
      sprite.gotoAndPlay(
        this.getAnimationName(this.robot.type, this.robot.current_type, arrow)
      )

      // 防止组件重复加载时重复注册事件
      if (sprite.hasEventListener('tick')) {
        return
      }

      // sprite.gotoAndPlay('farmer_run_right')
      console.log(11111, startY, sprite.x, sprite.y, targetY)
      sprite.on('tick', event => {
        // console.log(targetX)
        if (sprite.x < targetX) {
          // 水平向右
          sprite.x += (event.delta / 1000) * 16
          if (sprite.x > targetX) {
            sprite.x = targetX
          }
        } else if (sprite.x > targetX) {
          // 水平向左
          sprite.x -= (event.delta / 1000) * 16
          if (sprite.x < targetX) {
            sprite.x = targetX
          }
        } else {
          // 到达x轴目的地， 开始检测y轴目的地
          if (sprite.y > targetY) {
            // console.log(9999)
            // 向下
            sprite.y -= (event.delta / 1000) * 16
            if (sprite.y < targetY) {
              sprite.y = targetY
            }
          } else if (sprite.y < targetY) {
            // console.log(1231)
            // 向上
            sprite.y += (event.delta / 1000) * 16
            if (sprite.y > targetY) {
              sprite.y = targetY
            }
          } else {
            // 抵达目的地
            console.log('抵达目的地')
            // this.robotData.current_type = 2
            if (this.robot.current_type !== 2) {
              console.log(
                '执行变化',
                this.robot.type,
                2,
                arrow
              )
              sprite.gotoAndPlay(
                this.getAnimationName(
                  this.robot.type,
                  2,
                  arrow
                )
              )
              let { current_type, work_place, target, ...other } = this.robot
              this.$store.commit('setSingleRobotData', {
                ...other,
                work_place,
                current_type: 2,
                target
              })
              this.timeout = setTimeout(() => {

                this.$store.commit('setSingleRobotData', {
                  ...other,
                  current_type: 3,
                  target: work_place,
                  position: target,
                  lastmodify: new Date().getTime()
                })
              }, 2000)
            }
            // switch(robot.current_type) {
            //   // case 1:
            // }
          }
        }
      })
    }
  },
  mounted() {
    let { width, height, numOfMapX, numOfMap, startX, startY } = this.gameConfig
    let robot = this.robot

    let row = Math.floor(robot.position / numOfMapX) // 行
    let col = robot.position % numOfMapX // 列
    // x偏移
    let spriteX = startX + row * (width / 2) + col * (width / 2)
    // y偏移
    let spriteY = startY + row * (height / 2) - col * (height / 2)

    // 检测是否在野 是则显示动画
    if (robot.belong !== -1) {
      // 暂且不知道状态，先隐藏
      let sprite = new createjs.Sprite(robotSS, 'hide')
      sprite.x = spriteX
      sprite.y = spriteY
      stage.addChild(sprite)

      // 检测是否有工作
      if (robot.current_type !== 0) {
        // 在路上
        // if (robot.current_type == 1 || robot.current_type == 3) {
        //   this.action(sprite)
        // } else {
        //   console.log(1)
        // }
      }
    }
  }
}
</script>

