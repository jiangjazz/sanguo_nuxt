/*
 * @Author: Janzen 
 * @Date: 2018-10-10 16:33:21 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 17:05:46
 */
<template>
  <div>
    buildingInit
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 建筑资源
import buildings from '~/static/gameData/spriteSheet/buildings'

export default {
  data () {
    return {
      buildings
    }
  },
  computed: {
    ...mapState(['gameConfig', 'mapData'])
  },
  mounted() {
    let { width, height, numOfMapX, numOfMap, startX, startY } = this.gameConfig

    // 数据检测
    if (!Array.isArray(this.mapData) || this.mapData.length !== numOfMap) {
      throw new Error('没有游戏数据')
      return false
    }

    let animationsType = {} // 所有建筑动画
    this.buildings.map(item => {
      animationsType['building' + item.type] = item.type
    })
    //
    let ss = new createjs.SpriteSheet({
      frames: this.buildings.map(item => {
        return [item.x, item.y, item.width, item.height, 0]
      }),
      animations: animationsType,
      images: ['/images/objs.png']
    })

    // 检测当前位置是否存在建筑，有则渲染
    this.mapData.map(map => {
      let row = Math.floor(map.id / numOfMapX) // 行
      let col = map.id % numOfMapX // 列
      let building = null // 建筑数据

      // x坐标
      let mapX = startX + row * (width / 2) + col * (width / 2)
      // y坐标
      let mapY = startY + row * (height / 2) - col * (height / 2)

      // 建筑渲染
      if (map.building.type !== null && this.buildings[map.building.type]) {
        building = this.buildings[map.building.type]
        let sprite = new createjs.Sprite(ss, 'building' + map.building.type)
        sprite.x = mapX + building.offsetX
        sprite.y = mapY + building.offsetY
        stage.addChild(sprite)
      }

      return
    })
  }
}
</script>
