import fs from "fs";
import path from "path";
import { manifest, pathConfig } from "./manifest.mjs";


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
 
 export function copyResFile(sourcePath, destinationPath) {
  fs.copyFile(sourcePath, destinationPath, (error) => {
    if (error) {
      console.error(`Failed to copy file: ${error}`);
      return;
    }

    console.log(`File copied from ${sourcePath} to ${destinationPath}`);
  });
}


export function createItem(item){
  const itemId = item.identifier.split(":")[1];
  console.log(item.identifier);

  //路径部分应该是先读取清单manifest.json里"mod_name"的值，但是暂时未写这部分的代码，希望有大佬来补全
  const project = "生成物品json测试";
  // 路径
  const mojangPath = "C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang";
  const behPath = `${mojangPath}/development_behavior_packs/${project}_BP`;
  const resPath = `${mojangPath}/development_resource_packs/${project}_RP`;
 
  //保存备份文件
  const itemDataPath = './dist/BP/items/' + itemId + '.json';
  const itemResPath = './dist/RP/items/' + itemId + '.json';
  saveEctype(itemDataPath,item.behData.toJsonData());
  
  const item_behPath = behPath + "/items/" +itemId +'.json';
  const item_resPath = resPath + "/items/" +itemId +'.json';

  //写入mc
  saveFile(item_behPath,item.behData.toJsonData());
  console.log(item.behData.getFormatVersion());

  if(item.resData.getFormatVersion()!="1.16.100"){
    //只有格式版本不是1.16.100才创建Rp文件
    console.log("sssss");
    saveEctype(itemResPath,item.resData.toJsonData());
    saveFile(item_resPath,item.resData.toJsonData());
  }

  if(item.attachable){
    //只有物品具有Attachables才创建Attachables文件
    console.log("AttachablesT");
    const item_resPath_attachables = resPath + "/attachables/" +itemId +'.json';
    saveFile(item_resPath_attachables,item.attachable.attachableData.toJsonData());
    const AttachablesPath = './dist/RP/attachables/' + itemId + '.json';
    saveEctype(AttachablesPath,item.attachable.attachableData.toJsonData());
  }
}

export function createBlock(block){
  const blockId = block.identifier.split(":")[1];
  const project = manifest.mod_name;
  //保存备份文件
  const blockDataPath = './dist/BP/block/' + blockId + '.json';
  saveEctype(blockDataPath,block.blockData.toJsonData());
  //游戏文件
  const behPath = `${pathConfig.mojangPath}/development_behavior_packs/${project}_BP`;
  const block_Path = behPath + "/blocks/" +blockId +'.json';
  //写入mc
  saveFile(block_Path,block.blockData.toJsonData());
}



