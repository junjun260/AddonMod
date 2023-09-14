export const manifest ={
    "mod_name": "生成物品json测试",
    "authors": [
        "xiaoben"
    ],
    "description": "这里是addonMod的清单文件",
    "version": [
        0,
        0,
        1
    ],
    "script":{
        "amb":"script/amb/AMB.js",
        "sapi":"script/sapi/index.js"
    }
}

export const pathConfig = {
    project: manifest.mod_name,
    mojangPath: "C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang",
    get behPath() {
      return `${this.mojangPath}/development_behavior_packs/${this.project}_BP`;
    },
    get resPath() {
      return `${this.mojangPath}/development_resource_packs/${this.project}_RP`;
    },
  };
  