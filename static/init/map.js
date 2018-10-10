// 初始化地图 / 加载本地配置初始化

/**
 * 
 * @param {obj} gameDate 游戏数据源
 */
window.initMaps = function (gameDate, stage) {
  // 数据检测
  if (!gameDate || !gameDate[0]) {
    throw new Error("没有游戏数据")
    return false;
  }

  // 配置
  let configs = {
    width: 48, // 单个地图宽度
    height: 23, // 单个地图高度
    numOfMapX: 6, // 一行多少个地图
    // numOfMapY: 30, // 一列多少个地图
    startX: 0,
    startY: -23 / 2 * 6
  }

  // 载入地图
  for (let item in gameDate) {

    let map = gameDate[item]; // 当前土地数据
    let row = Math.floor(map.index / configs.numOfMapX); // 行
    let col = map.index % configs.numOfMapX; // 列

    // x坐标
    let regX = configs.startX - (row * (configs.width / 2)) - (col * (configs.width / 2))
    // y坐标
    let regY = configs.startY - (row * (configs.height / 2)) + (col * (configs.height / 2))

    // 土地渲染
    stage.addChild(new createjs.Sprite(new createjs.SpriteSheet({
      frames: {
        width: configs.width,
        height: configs.height,
        regX,
        regY
      },
      animations: {
        map0: 0,
        map1: 1,
        map2: 2,
        map3: 3,
        map4: 4
      },
      images: ["./src/images/maps.png"]
    }), 'map' + map.map.type));

  }

  // stage.update();
};

// 初始化
initMaps(gameDate, stage);
