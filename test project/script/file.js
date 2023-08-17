const fs = require("fs");
const path = require("path");

// 路径
const mojangPath = "C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang";
const behPath = mojangPath + "/development_behavior_packs/生成物品json测试 BP";
const resPath = mojangPath + "/development_resource_packs/生成物品json测试 RP";

function saveFile(filePath,data){
  // 确保目录存在
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
    
  // 创建文件并写入内容
  fs.writeFile(filePath,data, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("文件创建成功。");
  });
}

function saveEctype(filePathCopy,data){
  const filePath = path.join(__dirname,filePathCopy);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log("文件副本创建成功。");
  });
}

/**
   * @param {string} itemId 物品标识符
   * @param {string} category 分类
   * @param {string} textuer 材质短名称
   * @param {Object} componentsOpt 组件对象
   * @returns 
   */
function testAddItem(itemId,category,textuer,componentsOpt) {
  const itemData = new itemDataPath(itemId,category,textuer,componentsOpt);
  const itemDataPath = '_doc/dist/BP/items/' + itemId + '.json';
  const itemResPath = '_doc/dist/RP/items/' + itemId + '.json';
  saveFile(itemDataPath,JSON.stringify(itemData));
  saveFile(itemResPath,JSON.stringify(itemRes));
}