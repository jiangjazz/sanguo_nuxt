/*
 * @Author: Janzen 
 * @Date: 2018-10-10 16:32:57 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-10-11 11:19:49
 */
export default [
  {
    "id": 0,
    "name": "刘备",
    // 等级 1-10
    "level": 1,
    // 0:武将；1:矿工；2:农夫；3:建筑工；4:搬运工；5:园林工；
    "type": 2,
    // 工作建筑id，没有则为 null
    "work_place": 8,
    // 目标地图的id，如不存在则为null
    "target": 10,
    // 0:没有工作；1:去工作路上；2:工作；3:回建筑；4:休息；
    "current_type": 0,
    // 能力值 0 - 100
    "ability": 90,
    // -1:在野； 0:蜀国；1:魏国；2:吴国；
    "belong": 0,
    "response": {
      "type": null,
      "count": 0
    },
    // 当前所处map的id，不存在则为null,后期考虑改为 x y值
    "position": 7,
    "isHide": false
  }
]