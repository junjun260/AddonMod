/**        Add & Mod bridge    **/


//数据操作class
class Data{
    constructor(DataTemplate){
      this.behData = this.cloneData(DataTemplate.BP);
      this.resData = this.cloneData(DataTemplate.RP);
    }
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    }

    //BP
    getBehFormatVersion(){
      return this.behData["format_version"];
    }
    getBehDescription(){
      return this.behData["minecraft:item"]["description"];
    }
    getBehComponents(){
      return this.behData["minecraft:item"]["components"]
    }
    getEvents(){
      return this.behData["minecraft:item"]["events"];
    }
    setBehFormatVersion(version){
      this.behData["format_version"] = version;
    }
    setBehDescription(identifier,category){
      const description = {
        "identifier": identifier,
        "category": category
      }
      this.behData["minecraft:item"]["description"] = description;
    }
    setBehComponents(clear,option){
      if(clear) this.behData["minecraft:item"]["components"] = {};
      Object.assign(this.behData["minecraft:item"]["components"],option);
    }
    setBehEvents(clear,option){
      if(clear) this.behData["minecraft:item"]["events"] = {};
      Object.assign(this.behData["minecraft:item"]["events"],option);
    }

    //RP
    getResFormatVersion(){
      return this.resData["format_version"];
    }
    getResDescription(){
      return this.resData["minecraft:item"]["description"];
    }
    getResComponents(){
      return this.resData["minecraft:item"]["components"]
    }
   
    setResFormatVersion(version){
      this.resData["format_version"] = version;
    }
    setResDescription(identifier,category){
      const description = {
        "identifier": identifier,
        "category": category
      }
      this.resData["minecraft:item"]["description"] = description;
    }
    setResComponents(clear,option){
      if(clear) this.resData["minecraft:item"]["components"] = {};
      Object.assign(this.resData["minecraft:item"]["components"],option);
    }
  }
  

  /**
   * 物品基础模板 1.10.0
   */
  const itemDataTemplate = {
    BP:{
      "format_version": "1.10.0",
      "minecraft:item": {
        "description": {
          "identifier": "template:item",
          "category": "items",
          "is_experimental": false
        },
        "components": {
          "minecraft:foil": false,
          "minecraft:hand_equipped": false,
          "minecraft:max_damage": 10,
          "minecraft:stacked_by_data": true,
          "minecraft:max_stack_size": 64,
          "minecraft:use_duration": 0
        }
      }
    },
    RP:{
      "format_version": "1.10.0",
      "minecraft:item": {
        "description": {
          "identifier": "template:item",
          "category": "items"
        },
        "components": {
          "minecraft:icon": "template_item",
          "minecraft:render_offsets": "tools",
          "minecraft:hover_text_color": "light_purple"
        }
      }
    }
  }


  class Item{
    constructor(identifier,category,textuer,componentsOpt = {}){
      this.identifier = identifier;
      this.category = category;
      this.textuer = textuer;
      this.itemData = new Data(this.getDataTemplate());
      this.itemData.setBehDescription(identifier,category,false);
      this.itemData.setResDescription(identifier,category,false);
      this.itemData.setResComponents(false,{
        "minecraft:icon": textuer
      });
      this.setComponents(componentsOpt);
    }

    getDataTemplate(){
      return itemDataTemplate;
    }

    setComponents(componentsOpt){
      const defaultComponents = {
        "foil": false,
        "max_stack_size": 64,
        "use_duration": 0,
        "max_damage":10
      };
      Object.assign(defaultComponents, componentsOpt);
      const components = {};
      Object.keys(defaultComponents).forEach(key => {
        components[`minecraft:${key}`] = defaultComponents[key];
      });
      this.itemData.setBehComponents(false,components);
    }

    setFoil(boolean){
      this.itemData.setBehComponents(false,{"minecraft:foil":boolean});
    }
    setMaxDamage(number){
      this.itemData.setBehComponents(false,{"minecraft:max_damage": number});
    }
    setStackedByData(boolean){
      this.itemData.setBehComponents(false,{"minecraft:stacked_by_data": boolean});
    }
    setMaxStackSize(number){
      this.itemData.setBehComponents(false,{"minecraft:max_stack_size": number});
    }
    setUseDuration(number){
      this.itemData.setBehComponents(false,{"minecraft:use_duration": number});
    }
  }
    

  /**
   * 食物基础模板
   */
  const FoodDataTemplate = {
    BP:{
      "format_version": "1.12.0",
      "minecraft:item": {
        "description": {
          "identifier": "template:food",
          "is_experimental": false
        },
        "components": {
          "minecraft:hand_equipped": false,
          "minecraft:stacked_by_data": true,
          "minecraft:foil": true,
          "minecraft:max_stack_size": 64,
          "minecraft:use_duration": 32,
          "minecraft:food": {
            "nutrition": 4,
            "saturation_modifier": "normal",
            "can_always_eat": false,
            "effects": [
              {
                "name": "regeneration",
                "chance": 1.0,
                "duration": 5,
                "amplifier": 1
              },
              {
                "name": "absorption",
                "chance": 1.0,
                "duration": 120,
                "amplifier": 3
              }
            ]
          }
        }
      }
    },
    RP:{
      "format_version": "1.10.0",
      "minecraft:item": {
          "description": {
              "identifier": "template:food",
              "category": "items"
          },
          "components": {
              "minecraft:icon": "template_food",
              "minecraft:use_animation": "eat",
              "minecraft:render_offsets": "apple",
              "minecraft:hover_text_color": "light_purple"
          }
      }
    }
  }
  
  
  
class Food extends Item{
    constructor(identifier,category,textuer,...componentsOpt){
      super(identifier,category,textuer,...componentsOpt);
      this.effects = [];
    }
    getDataTemplate(){
      return FoodDataTemplate;
    }
    setFoodComponents(clear,foodOptions){
      if(clear) this.itemData.behData["minecraft:item"]["components"]["minecraft:food"] = {};
      Object.assign(this.itemData.behData["minecraft:item"]["components"]["minecraft:food"],foodOptions);
    }
    addEffect(Effect){
      this.effects.push(Effect);
    }
    setEffects(effects){
      this.setFoodComponents(false,{"effects":effects})
    }
    setCan_always_eat(boolean){
      this.setFoodComponents(false,{"can_always_eat":boolean});
    }
    setNutrition(number){
      this.setFoodComponents(false,{"nutrition":number});
    }
    setSaturation_modifier(string){
      this.setFoodComponents(false,{"saturation_modifier":string});
    }
  }


   /**
   * 装备基础模板 1.16.100
   */
   const EquipmentDataTemplate = {
    "BP":{
      "format_version": "1.16.100",
      "minecraft:item": {
        "description": {
          "identifier": "template:equipment",
          "category": "equipment"
        },
        "components": {
          "minecraft:foil": false,
          "minecraft:use_duration": 0,
          "minecraft:max_stack_size": 64,
          "minecraft:allow_off_hand": true,
          "minecraft:hand_equipped": false,
          "minecraft:use_animation": "bow",
          "minecraft:damage": 0,
          "minecraft:hover_text_color": "gold",
          "minecraft:can_destroy_in_creative": true,
          "minecraft:display_name": {
            "value": "template_new_item"
          },
          "minecraft:icon": {
            "texture": "template_item"
          }
        },
        "events": {}
      }
    },
    "RP":{}
  }

  class Equipment {
    constructor(identifier, category, texture, componentsOpt = {}) {
      this.identifier = identifier;
      this.category = category;
      this.texture = texture;
      this.itemData = new Data(this.getDataTemplate());
      this.itemData.setBehDescription(identifier, category, true);
      this.itemData.setBehComponents(false, {
        "minecraft:displayName": {
          "value": this.getItemName()
        },
        "minecraft:icon": {
          "texture": texture
        }
      });
      this.setComponents(componentsOpt);
    }
    
    getDataTemplate() {
      return EquipmentDataTemplate;
    }
    
    setComponents(componentsOpt) {
      const defaultComponents = {
        "foil": false,
        "max_stack_size": 64,
        "use_duration": 0,
        "allow_off_hand": false,
        "hand_equipped": false,
        "use_animation": "bow",
        "damage": 0,
        "hover_text_color": "gold",
        "can_destroy_in_creative": true
      };
      Object.assign(defaultComponents, componentsOpt);
      const components = {};
      Object.keys(defaultComponents).forEach(key => {
        components[`minecraft:${key}`] = defaultComponents[key];
      });
      this.itemData.setBehComponents(false, components);
    }

    getItemName() {
      return this.identifier.split(":")[1];
    }

    setItemName(string){
      this.itemData.setBehComponents(false, {
        "minecraft:display_name": {
          "value": string
        }
      });
      console.log(string);
    }
    
    setFoil(boolean) {
      this.itemData.setBehComponents(false, {"minecraft:foil": boolean});
    }
    
    setMaxStackSize(number) {
      this.itemData.setBehComponents(false, {"minecraft:max_stack_size": number});
    }
    
    setUseDuration(number) {
      this.itemData.setBehComponents(false, {"minecraft:use_duration": number});
    }

    allowOffHand(boolean){
      this.itemData.setBehComponents(false, {"minecraft:allow_off_hand": boolean});
    }
    setHandEquipped(boolean){
      this.itemData.setBehComponents(false, {"minecraft:hand_equipped": boolean});
    }
    setUseAnimation(string){
      this.itemData.setBehComponents(false, {"minecraft:use_animation": string});
    }
    setDamage(number) {
      this.itemData.setBehComponents(false, {"minecraft:damage": number});
    }
    setHoverTextColor(string){
      this.itemData.setBehComponents(false, {"minecraft:hover_text_color": string});
    }
    setCanDestroyInCreative(boolean){
      this.itemData.setBehComponents(false, {"minecraft:can_destroy_in_creative": boolean});
    }
    //以上是基础方法
    setCreativeCategory(string){
      this.itemData.setBehComponents(false, { 
        "minecraft:creative_category": {
          "parent": string
        }
      });
    }
   
    setBlockPlacer(blockId,alowBlocks){
      this.itemData.setBehComponents(false, { 
        "minecraft:block_placer": {
          "block": blockId,
          "use_on": alowBlocks
        }
      });
    }

    setEntityPlacer(entityId,alowBlocks,disBlock){
      this.itemData.setBehComponents(false, { 
        "minecraft:entity_placer": {
          "entity": entityId,
          "use_on": alowBlocks,
          "dispense_on":disBlock
        }
      });
    }

    setFuel(number){
      this.itemData.setBehComponents(false, { 
        "minecraft:fuel": {
          "duration": number
        }
      });
    }

    setWearable(slot){
      this.itemData.setBehComponents(false, { 
        "minecraft:wearable": {
          "slot": slot
        }
      });
    }

    setProjectile(number,entityId){
      this.itemData.setBehComponents(false, { 
        "minecraft:projectile": {
          "minimum_critical_power": number,
          "projectile_entity":entityId
        }
      });
    }
    
    setShooter(charge_on_draw,launch_power_scale,max_draw_duration,max_launch_power,scale_power_by_draw_duration,ammunition){
      this.itemData.setBehComponents(false, { 
        "minecraft:shooter": {
          "charge_on_draw": false,
          "launch_power_scale": 1,
          "max_draw_duration": 6,
          "max_launch_power": 1,
          "scale_power_by_draw_duration": true,
          "ammunition": [
            {
              "item": "minecraft:arrow",
              "use_offhand": true,
              "search_inventory": true,
              "use_in_creative": true
            }
          ]
        }
      });
    }

    setMaxDurability(max_durability){
      this.itemData.setBehComponents(false, { 
        "minecraft:durability": {
          "max_durability": max_durability
        }
      });
    }

    setDyePowder(color){
      this.itemData.setBehComponents(false, { 
        "minecraft:dye_powder": {
          "color": color
        }
      });
    }
    
    setKnockbackResistance(protection){
      this.itemData.setBehComponents(false, { 
        "minecraft:knockback_resistance": {
          "protection":protection
        }
      });
    }

    setEnchantable(slot,value){
      this.itemData.setBehComponents(false, { 
        "minecraft:enchantable": {
          "slot": slot, // Can be any of the enchant slot listed below
          "value": value
        }
      });
    }

    setArmor(protection){
      this.itemData.setBehComponents(false, { 
        "minecraft:armor": {
          "protection": protection
        }
      });
    }
    
    setRecord(sound,signal){
      this.itemData.setBehComponents(false, { 
        "minecraft:record": {
          "sound_event": sound, // Currently restricted to strings listed below
          "comparator_signal": signal
        }
      });
    }
    //
    addTag(tag){
      const tag_ = `tag:${tag}`;
      const obj = {};
      obj[tag_] = {}
      this.itemData.setBehComponents(false,obj);
    }
    addSwordTag(){
      this.itemData.setBehComponents(false,{"tag:minecraft:is_sword":{}});
    }
    addToolTag(){
      this.itemData.setBehComponents(false,{"tag:minecraft:is_tool":{}});
    }

  }

  class Sword extends Equipment{
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt = {});
      //sword
      this.setDamage(5);
      this.addToolTag();
      this.addSwordTag();
      this.setMaxStackSize(1);
      this.setHandEquipped(true);
      this.setMaxDurability(100);
      this.setEnchantable("sword",14);
      this.setCanDestroyInCreative(false);
      this.setCreativeCategory("itemGroup.name.sword");
    }
  }

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



/**        code         */

let item = new Item("test:test_item","items","template_item",{"foil":true});
let food = new Food("test:test_food","items","template_item",{"foil":true});
food.setUseDuration(32);
let sword1 = new Equipment("test:test_equipment","equipment","template_sword",{"foil":true});
let sword2 = new Sword("test:test_sword","equipment","template_sword",{"foil":true});
sword2.setItemName("test_sword");
sword2.setDamage(9999);

//debugger

createItem(item);
createItem(food);
createItem(sword1);
createItem(sword2);







//debugger
