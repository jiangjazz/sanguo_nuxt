// 初始化建筑数据

/**
 * 
 * @param {obj} gameDate // 游戏数据源
 */
window.initBuildings = function(gameDate, stage) {
  // 数据检测
  if(!gameDate || !gameDate[0]) {
    throw new Error("没有游戏数据")
    return false;
  }

  let buildingsAttr = []; // 建筑数据
  let animationsType = {}; // 动画数据
  // 序列化
  for(let index in buildingsData) {
    buildingsAttr[index] = buildingsData[index];
    animationsType["building" + buildingsData[index].type] = buildingsData[index].type;
  }

  //
  let ss = new createjs.SpriteSheet({
    frames: buildingsAttr.map(item => {
      return [
        item.x,
        item.y,
        item.width,
        item.height,
        0
      ]
    }),
    animations: animationsType,
    images: ["./src/images/objs.png"]
  })

  // 检测是否存在建筑并初始化
  for (let item in gameDate) {
  
    let map = gameDate[item]; // 当前土地数据
    let row = Math.floor(map.index / configs.numOfMapX); // 行
    let col = map.index % configs.numOfMapX; // 列
    let building = null; // 建筑数据

    // x坐标
    let regX = configs.startX - (row * (configs.width / 2)) - (col * (configs.width / 2))
    // y坐标
    let regY = configs.startY - (row * (configs.height / 2)) + (col * (configs.height / 2))

    // 建筑渲染
    if (map.building.type !== null && buildingsAttr.some((item) => {
        let status = (item.type === map.building.type);
        if (status) {
          building = item; // 当前建筑数据
        }
        return status
      })) {

      let sprite = new createjs.Sprite(ss, 'building' + map.building.type);
      sprite.regX = regX - building.offsetX;
      sprite.regY = regY - building.offsetY;
      stage.addChild(sprite);
    }
  }

  // for (let item in gameDate) {
  
  //   let map = gameDate[item]; // 当前土地数据
  //   let row = Math.floor(map.index / configs.numOfMapX); // 行
  //   let col = map.index % configs.numOfMapX; // 列
  //   let building = null; // 建筑数据

  //   // x坐标
  //   let regX = configs.startX - (row * (configs.width / 2)) - (col * (configs.width / 2))
  //   // y坐标
  //   let regY = configs.startY - (row * (configs.height / 2)) + (col * (configs.height / 2))

  //   // 建筑渲染
  //   if (map.building.type && buildingsAttr.some((item) => {
  //       let status = (item.type === map.building.type);
  //       if (status) {
  //         building = item; // 当前建筑数据
  //       }
  //       return status
  //     })) {

  //     stage.addChild(new createjs.Sprite(new createjs.SpriteSheet({
  //       frames: buildingsAttr.map(item => {
  //         return [
  //           item.x,
  //           item.y,
  //           item.width,
  //           item.height,
  //           0,
  //           regX - building.offsetX,
  //           regY - building.offsetY
  //         ]
  //       }),
  //       animations: animationsType,
  //       images: ["./src/images/objs.png"]
  //     }), 'building' + map.building.type));
  //   }
  // }


  // stage.update();
}

// 初始化
initBuildings(gameDate, stage);
