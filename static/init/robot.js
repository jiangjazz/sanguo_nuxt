// 初始化机器人

/**
 * 
 * @param {obj} gameDate // 游戏数据源
 */
window.initRobots = function(gameDate, stage) {
  // 数据检测
  if(!gameDate || !gameDate[0]) {
    throw new Error("没有游戏数据")
    return false;
  }

  // 机器人数据
  let robotsAttr = [
    {
      "x": 40,
      "y": 91,
      "width": 19,
      "height": 20,
      "offsetX": 0,
      "offsetY": 0
    },
    {
      "x": 59,
      "y": 91,
      "width": 17,
      "height": 20,
      "offsetX": 0,
      "offsetY": 0
    }
  ]

  let ss = new createjs.SpriteSheet({
    frames: [
      // hide
      [0, 0, 0, 0, 0],
      /**
       * 武将
       */
      // 武将run_right
      [40, 91, 19, 20, 0, -12, 4],
      [59, 91, 17, 20, 0, -12, 4],
      // 武将hit_right
      [76, 84, 18, 20, 0, -12, 4],
      [95, 84, 18, 20, 0, -12, 4],
      /**
       * 农夫
       */
      // 农夫run_right
      [127, 106, 17, 18, 0, -12, 4],
      [127, 124, 18, 18, 0, -12, 4],
      // 农夫work_right
      [145, 120, 17, 20, 0, -12, 4],
      [162, 120, 18, 20, 0, -12, 4],
    ],
    animations: {
      "hide": 0,
      // 武将
      "hero_run": [1, 2, , .1],
      "hero_hit": [3, 4, , .1],
      // 农夫
      "farmer_run": [5, 6, , .1],
      "farmer_work": [7, 8, , .1]
    },
    images: ["./src/images/objs.png"]
  })

  // 载入机器人
  for (let item in gameDate) {

    let map = gameDate[item]; // 当前土地数据
    let row = Math.floor(map.index / configs.numOfMapX); // 行
    let col = map.index % configs.numOfMapX; // 列
    // let robot = null; // 机器人数据


    // // x坐标
    let regX = configs.startX - (row * (configs.width / 2)) - (col * (configs.width / 2))
    // // y坐标
    let regY = configs.startY - (row * (configs.height / 2)) + (col * (configs.height / 2))

    if (map.robot.type !== null) {
      let sprite = new createjs.Sprite(ss, 'farmer_run');
      sprite.regX = regX;
      sprite.regY = regY;
      // 机器人渲染
      stage.addChild(sprite);

      sprite.on("click", function () {
        sprite.gotoAndPlay("farmer_work");
      });
    }
  }


}

initRobots(gameDate, stage);
