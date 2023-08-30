import fs from "fs";
import path from "path";


/**
 * 保存文件
 * @param {string} filePath 绝对路径
 * @param {string} data 数据
 */
export function saveFile(filePath,data){
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


/**
 * 保存备份文件dist下
 * @param {string} filePathCopy 相对项目路径下的路径
 * @param {string} data 数据
 */
export function saveEctype(filePathCopy,data){
  // 确保目录存在
  fs.mkdirSync(path.dirname(filePathCopy), { recursive: true });
   // 创建文件并写入内容
   fs.writeFile(filePathCopy,data, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("文件创建成功。");
  });
 }
 


export function createItem(item){
  const itemId = item.identifier.split(":")[1];
  console.log(item.identifier);

  //路径部分应该是先读取清单manifest.json里"mod_name"的值，但是暂时未写这部分的代码，希望有大佬来补全
  const project = "生成物品json测试";
  // 路径
  const mojangPath = "C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang";
  const behPath = `${mojangPath}/development_behavior_packs/${project}_BP`;
  const resPath = `${mojangPath}/development_resource_packs/${project}_RP`;
  
  //保存备份文件
  const itemDataPath = './dist/BP/items/' + itemId + '.json';
  const itemResPath = './dist/RP/items/' + itemId + '.json';
  saveEctype(itemDataPath,JSON.stringify(item.itemData.behData));
  
  const item_behPath = behPath + "/items/" +itemId +'.json';
  const item_resPath = resPath + "/items/" +itemId +'.json';

  //写入mc
  saveFile(item_behPath,JSON.stringify(item.itemData.behData));
  console.log(item.itemData.getBehFormatVersion());

  if(item.itemData.getBehFormatVersion()!="1.16.100"){
    //只有格式版本不是1.16.100才创建Rp文件
    console.log("sssss");
    saveEctype(itemResPath,JSON.stringify(item.itemData.resData));
    saveFile(item_resPath,JSON.stringify(item.itemData.resData));
  }

  if(item.attachables){
    //只有物品具有Attachables才创建Attachables文件
    console.log("AttachablesT");
    const item_resPath_attachables = resPath + "/attachables/" +itemId +'.json';
    saveFile(item_resPath_attachables,JSON.stringify(item.attachables.AttachablesT));
    const AttachablesPath = './dist/RP/attachables/' + itemId + '.json';
    saveEctype(AttachablesPath,JSON.stringify(item.attachables.AttachablesT));
  }
}