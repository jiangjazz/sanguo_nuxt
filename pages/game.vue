/*
 * @Author: Janzen 
 * @Date: 2018-10-10 11:41:36 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-10 14:07:56
 */
<template>
  <div>
    <canvas id="game" width="320" height="640"></canvas>
    {{test}}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['test'])
  },
  mounted () {
    console.log(createjs)
  }
}
</script>
