/*
 * @Author: Janzen 
 * @Date: 2018-10-10 11:41:32 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-10 14:06:25
 */

// 函数名称统计
const G_SET_TEST = 'setTest'
// state数据
export const state = () => ({
  test: 'test'
})

// 同步方法
export const mutations = {
  // 测试数据
  [G_SET_TEST] (state, test) {
    state.test = test
  }
}

// 异步方法
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
    commit('setTest', 123)
    
  }
}
