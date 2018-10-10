/*
 * @Author: Janzen 
 * @Date: 2018-10-10 16:33:09 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-10 17:02:29
 */
<template>
  <div>mapInit</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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

    // 渲染
    let ss = new createjs.SpriteSheet({
      frames: {
        width,
        height
      },
      animations: {
        map0: 0,
        map1: 1,
        map2: 2,
        map3: 3,
        map4: 4
      },
      images: ['/images/maps.png']
    })

    this.mapData.map(map => {
      let row = Math.floor(map.id / numOfMapX) // 行
      let col = map.id % numOfMapX // 列

      // x坐标
      let regX = startX - row * (width / 2) - col * (width / 2)
      // y坐标
      let regY = startY - row * (height / 2) + col * (height / 2)

      let sprite = new createjs.Sprite(ss, 'map' + map.map.type)
      sprite.regX = regX
      sprite.regY = regY
      // 添加上画布
      stage.addChild(sprite)

      return
    })
  }
}
</script>

