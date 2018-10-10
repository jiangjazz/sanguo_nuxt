// // 入口文件

// // 配置
// let configs = {
//   width: 48, // 单个地图宽度
//   height: 23, // 单个地图高度
//   numOfMapX: 6, // 一行多少个地图
//   // numOfMapY: 30, // 一列多少个地图
//   startX: 0,
//   startY: -23 / 2 * 6
// }

// // 加载地图数据
// window.gameDate = {};
// $.ajax({
//   url: '/src/scripts/spriteSheet/gameData.json',
//   async: false,
//   datatype: 'json',
//   success: function (data) {
//     gameDate = data;
//   }
// });
// // 加载建筑数据
// window.buildingsData = {}
// $.ajax({
//   url: '/src/scripts/spriteSheet/buildings.json',
//   async: false,
//   datatype: 'json',
//   success: function (data) {
//     buildingsData = data;
//   }
// });

// // 创建画布
// var stage = new createjs.Stage('gamemap');

// (function () {

//   // 插入图像
//   var ss = new createjs.SpriteSheet({
//     frames: [
//       [0, 0, 30, 24],
//       [30, 0, 35, 26]
//     ],
//     animations: {
//       run: [0, 1, , .1],
//       act: [2, 3, , .1]
//     },
//     images: ["./src/images/objs.png"]
//   });

//   //
//   var sprite = new createjs.Sprite(ss, "run");
//   sprite.scaleY = sprite.scaleX = 1;
//   stage.addChild(sprite);

//   sprite.on("click", function () {
//     sprite.gotoAndPlay("act");
//   });

//   createjs.Ticker.on("tick", function (event) {
//     stage.update(event);
//   });
// }());