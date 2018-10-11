/*
 * @Author: Janzen 
 * @Date: 2018-10-10 11:41:32 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 17:43:05
 */

/**
 * 载入资源
 */
// 游戏配置
import gameConfig from '~/static/gameData/config/index'
// 地图资源
import mapData from '~/static/gameData/mapData'
// robot资源
import robotData from '~/static/gameData/robotData'

/**
 * 函数名称统计
 */
const G_SET_STAGEISINIT = 'setStageIsInit'
const G_SET_SINGLEROBOTDATA = 'setSingleRobotData'

/**
 * state数据
 */
export const state = () => ({
  // {boolean} 舞台是否已经初始化
  stageIsInit: false,
  // {object} 游戏
  gameConfig,
  // {array} 地图数据
  mapData,
  // {array} robot资源
  robotData
})

/**
 * getter
 */
export const getters = {
  /**
   * 最终生成的游戏数据
   * @param {*} state 
   */
  gameDate(state) {}
}

/**
 * 同步方法
 */
export const mutations = {
  /**
   * 初始化舞台（canvas）数据
   * @param {boolean} status
  */
  [G_SET_STAGEISINIT] (state, status) {
    state.stageIsInit = status
  },
  /**
   * 更新单个机器人数据
   * @param {object} robot
  */
  [G_SET_SINGLEROBOTDATA] (state, robot) {
    let i = null
    let array = state.robotData
    array.some((item, index) => {
      let status = item.id === robot.id
      if (status) {
        i = index
      }
      return status
    })
    if (i === null) {
      throw new Error('不存在当前robot数据，请检查')
    } else {
      array[i] = robot
      state.robotData = array.concat([])
    }
  }
}

/**
 * 异步方法
 */
export const actions = {

  /**
   * 特殊方法
   * 从服务器端传输数据到客户端
   */
  nuxtServerInit({
    commit,
    dispatch
  }, {
    req,
    redirect,
    params,
    path,
    query,
    Url
  }) {
    console.log('服务器初始化')
    console.log(req.session)
  }
}
