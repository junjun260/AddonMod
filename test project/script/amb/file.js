const fs = require("fs");
  const path = require("path");
  
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


  function createItem(item){
    const itemId = item.identifier.split(":")[1];
    console.log(item.identifier);
    // 路径
    const mojangPath = "C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang";
    const behPath = `${mojangPath}/development_behavior_packs/生成物品json测试 BP`;
    const resPath = `${mojangPath}/development_resource_packs/生成物品json测试 RP`;
    
    const itemDataPath = '../dist/BP/items/' + itemId + '.json';
    const itemResPath = '../dist/RP/items/' + itemId + '.json';
    saveEctype(itemDataPath,JSON.stringify(item.itemData.behData));
    saveEctype(itemResPath,JSON.stringify(item.itemData.resData));
    
    const item_behPath = behPath + "/items/" +itemId +'.json';
    const item_resPath = resPath + "/items/" +itemId +'.json';
    
    saveFile(item_behPath,JSON.stringify(item.itemData.behData));
    console.log(item.itemData.getBehFormatVersion());

    if(item.itemData.getBehFormatVersion()==="1.16.100"){
      console.log("sssss");
      return ;
    }
    saveFile(item_resPath,JSON.stringify(item.itemData.resData));
    
  }
