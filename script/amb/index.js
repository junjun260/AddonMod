/**        Addon & Mod bridge    by git junjun210/xiaoben    **/



/**
 * 这是一个底层的数据操作class，为数据操作提供操作api
 */
class Data{
    /**
     * 以数据模板创建数据
     * @param {Object} DataTemplate 数据模板对象
     */
    constructor(DataTemplate){
      this.behData = this.cloneData(DataTemplate.BP);
      this.resData = this.cloneData(DataTemplate.RP);
    }
    /**
     * 深度拷贝
     * @param {Object} data 数据对象
     * @returns 拷贝数据对象
     */
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
    /**
     * 设置bp的组件
     * @param {boolean} clear 是否清楚组件里的所有的数据
     * @param {Object} option 要拷贝的组件对象
     */
    setBehComponents(clear,option){
      if(clear) this.behData["minecraft:item"]["components"] = {};
      Object.assign(this.behData["minecraft:item"]["components"],option);
    }
    /**
     * 设置bp的Event
     * @param {boolean} clear 是否清楚Event里的所有的数据
     * @param {Object} option 要拷贝的Event对象
     */
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
    #RepairableItemList = [];
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

    setProjectile(power,entityId){
      this.itemData.setBehComponents(false, { 
        "minecraft:projectile": {
          "minimum_critical_power": power,
          "projectile_entity":entityId
        }
      });
    }
    //setShooter组件没想好怎么封装
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

    setDigger(use_efficiency,arr){
      this.itemData.setBehComponents(false, {
        "minecraft:digger": {
          "use_efficiency": use_efficiency,
          "destroy_speeds": arr
        }
      });
    }

    setRepairable(arr){
      this.itemData.setBehComponents(false, {
        "minecraft:repairable": {
          "repair_items": arr
        }
      });
    }

    setOnUse(event,target){
      this.itemData.setBehComponents(false, {
        "minecraft:on_use": {
          "on_use": {
            "event":event,
            "target":target
          }
        }
      });
    }

    setOnUseOn(event,target){
      this.itemData.setBehComponents(false, {
        "minecraft:on_use_on": {
          "on_use": {
            "event":event,
            "target":target
          }
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

    addAxeTag(){
      this.itemData.setBehComponents(false,{ "tag:minecraft:is_axe": {}});
    }
   
    //
    addEvent(eventName,event){
      const eventName_ = `${eventName}`;
      const obj = {};
      obj[eventName_] = event;
      this.itemData.setBehEvents(false,obj)
    }

    //二次封装的高级api
    /**
     * 添加可修复物品列表
     * @param {Array} itemsList 可修复物品列表
     * @param {string|molang} repair_amount 修复值表达式
     */
    setRepairableItemsList( itemsList,repair_amount){
      this.#RepairableItemList.push(
        {
          "items": itemsList,
          "repair_amount": repair_amount
        }
      );
      this.setRepairable( this.#RepairableItemList);
    }
    /**
     * 添加单个可修复物品
     * @param {string} itemId 物品标识符
     * @param {number} rate 修复比率
     */
    addRepairableItem(itemId,rate = 0.25){
      this.#RepairableItemList.push(
        {
          "items": [itemId],
          "repair_amount": `query.max_durability * ${rate}`
        }
      );
      this.setRepairable( this.#RepairableItemList);
    }
    

  }

  //Event对象用于返回Event组件
  const Event = {
    damage:function(type,target,amount){
        const damage_event ={
            "type": type,//伤害类型
            "target": target,//伤害目标
            "amount": amount//伤害大小
        };
        return damage_event;
    },
    addMobEffect:function(effect,target,duration,amplifier) {
        const effect_event ={
            "effect": effect,
            "target": target,
            "duration": duration,
            "amplifier": amplifier
        }
        return effect_event;
    },
    shoot:function(projectile,launch_power,angle_offset){
        const shoot_event = {
            "shoot": {
                "projectile": projectile,//发射的生物任何
                "launch_power": launch_power,//力度
                "angle_offset": angle_offset//角度偏移
            }
        }
        return shoot_event;
    },
    transformItem:function(itemId){
        const transform_item_event ={
            "transform_item": {
                "transform":itemId
            }
        }
        return transform_item_event;
    },
    teleport:function(target,sx,sy,sz){
        const teleport_event ={
            "teleport": {
                "target": target,
                "max_range": [sx, sy, sz]
            }
        };
        return teleport_event;
    },
    runCommand(commandArr,target){
        const run_command_event ={
            "run_command": {
                "command":commandArr,
                "target": target
            }
        }
        return run_command_event;
    },
    tool:{
        sequence:function(arr){
            const sequence = {"sequence":arr}
        }

    }
};

  class Tool extends Equipment{
    #blocksDigSpeedList = [];
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt);
      //Tool
      this.setDamage(3);
      this.addToolTag();
      this.setMaxStackSize(1);
      this.setHandEquipped(true);
      this.setMaxDurability(100);
      this.setCreativeCategory("equipment");
      //默认设置 本身为可修复物品
      this.setRepairableItemsList([identifier],"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
    /**
     * 设置单个方块挖掘速度
     * @param {boolean} boolean 如果对该项目施加了效率附魔，是否应该受到影响。
     * @param {string} blockId 方块标识符
     * @param {number} speed 挖掘速度
     */
    setBlockDigSpeed(boolean,blockId,speed){
      this.#blocksDigSpeedList.push(
        {
          "block":blockId,
          "speed":speed,
          "on_dig": {
            "event": "amb:on_tool_used",
            "target": "self"
          }
        }
      );
      this.setDigger(boolean,this.#blocksDigSpeedList);
      this.setToolDamage(1);
    }
    /**
     * 设置工具类通用耐久度磨损值
     * @param {number} amount 每次使用工具磨损值
     */
    setToolDamage(amount){
      //标准：以amb:on_tool_used为通用工具磨损调用事件
      this.addEvent("amb:on_tool_used",Event.damage("durability","self",amount));
    }
    onClickOnUse(event){
      //为项目专门添加一个onUse
      this.addEvent(`amb:${this.getItemName()}OnUse`,event);
      this.setOnUse(`amb:${this.getItemName()}OnUse`,"self");
    }
  }

  class Sword extends Tool{
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt);
      //sword
      this.setDamage(5);
      this.addSwordTag();
      this.setEnchantable("sword",14);
      this.setCanDestroyInCreative(false);
      this.setCreativeCategory("itemGroup.name.sword");
    }
  }
//2023.8.18   框架
  class Axe extends Tool{
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt);
      //sword
      this.setDamage(5);
      this.addSwordTag();
      this.setEnchantable("axe",14);
      this.setCanDestroyInCreative(true);
      this.setCreativeCategory("itemGroup.name.axe");
    }
  }

  class Pickaxe extends Tool{
    constructor(identifier, category, texture, componentsOpt = {}){
      super(identifier, category, texture, componentsOpt);
      //sword
      this.setDamage(5);
      this.addSwordTag();
      this.setEnchantable("pickaxe",14);
      this.setCanDestroyInCreative(true);
      this.setCreativeCategory("itemGroup.name.pickaxe");
    }
  }

  //Armor
  class Chestplate extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOpt = {}){
      super(identifier,category, texture, componentsOpt);
      //Attachables
      this.attachables = new Attachables(identifier,armor_texture,"geometry.humanoid.armor.chestplate");

      //chest
      this.setArmor(5);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my chest");
      this.setWearable("slot.armor.chest");
      this.setEnchantable("armor_torso",10);
      this.setCreativeCategory("itemGroup.name.chestplate");
      //默认设置 本身为可修复物品
      this.setRepairableItemsList([identifier],"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }

  class Helmet extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOpt = {}){
      super(identifier,category, texture, componentsOpt);
      //Attachables
      this.attachables = new Attachables(identifier,armor_texture,"geometry.humanoid.armor.helmet");

      //chest
      this.setArmor(2);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my head");
      this.setWearable("slot.armor.head");
      this.setEnchantable("armor_head",9);
      this.setCreativeCategory("itemGroup.name.helmet");
      //默认设置 本身为可修复物品
      this.setRepairableItemsList([identifier],"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }

  class Leggings extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOpt = {}){
      super(identifier,category, texture, componentsOpt);
      //Attachables
      this.attachables = new Attachables(identifier,armor_texture,"geometry.humanoid.armor.leggings");

      //chest
      this.setArmor(5);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my legs");
      this.setWearable("slot.armor.legs");
      this.setEnchantable("armor_legs",9);
      this.setCreativeCategory("itemGroup.name.leggings");
      //默认设置 本身为可修复物品
      this.setRepairableItemsList([identifier],"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }

  class Boots extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOpt = {}){
      super(identifier,category, texture, componentsOpt);
      //Attachables
      this.attachables = new Attachables(identifier,armor_texture,"geometry.humanoid.armor.boots");

      //chest
      this.setArmor(2);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my feets");
      this.setWearable("slot.armor.feet");
      this.setEnchantable("armor_feet",9);
      this.setCreativeCategory("itemGroup.name.boots");
      //默认设置 本身为可修复物品
      this.setRepairableItemsList([identifier],"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }

  //Attachables 模板
  const AttachablesT = {
    "format_version": "1.8.0",
    "minecraft:attachable": {
      "description": {
        "identifier": "bridge:test_chestplate_chestplate",
        "materials": {
          "default": "armor",
          "enchanted": "armor_enchanted"
        },
        "textures": {
          "default": "textures/models/armor/test_chestplate_1",
          "enchanted": "textures/misc/enchanted_item_glint"
        },
        "geometry": {
          "default": "geometry.humanoid.armor.chestplate"
        },
        "scripts": {
          "parent_setup": "variable.chest_layer_visible = 0.0;"
        },
        "render_controllers": [
          "controller.render.armor"
        ]
      }
    }
  };

  class Attachables{
    constructor(identifier,texture,geometry){
      this.AttachablesT = this.cloneData(AttachablesT);
      this.setIdentifier(identifier);
      this.setDefaultTextures(texture);
      this.setGeometry(geometry);
    }
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    }
    setIdentifier(identifier){
      this.AttachablesT["minecraft:attachable"]["description"]["identifier"] = identifier;
    }
    setDefaultTextures(textures){
      this.AttachablesT["minecraft:attachable"]["description"]["textures"]["default"] = textures;
    }
    setGeometry(geometry){
      this.AttachablesT["minecraft:attachable"]["description"]["geometry"]["default"] = geometry;
    }
  }
  


  const fs = require("fs");
  const path = require("path");


  /**
   * 保存文件
   * @param {string} filePath 绝对路径
   * @param {string} data 数据
   */
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
  

  /**
   * 保存备份文件dist下
   * @param {string} filePathCopy 相对于此文件路径下的路径
   * @param {string} data 数据
   */
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

    //路径部分应该是先读取清单manifest.json里"mod_name"的值，但是暂时未写这部分的代码，希望有大佬来补全
    const project = "生成物品json测试";
    // 路径
    const mojangPath = "C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang";
    const behPath = `${mojangPath}/development_behavior_packs/${project} BP`;
    const resPath = `${mojangPath}/development_resource_packs/${project} RP`;
    
    //保存备份文件
    const itemDataPath = '../../dist/BP/items/' + itemId + '.json';
    const itemResPath = '../../dist/RP/items/' + itemId + '.json';
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
      const AttachablesPath = '../../dist/RP/attachables/' + itemId + '.json';
      saveEctype(AttachablesPath,JSON.stringify(item.attachables.AttachablesT));
    }
  }
/**         以上是应该放入app里的源码 但是由于技术不够暂时裸露在外 */




/**        code  正式编写的例子       */

const item = new Item("test:test_item","items","template_item",{"foil":true});
const food = new Food("test:test_food","items","template_item",{"foil":true});
const sword1 = new Equipment("test:test_equipment","equipment","template_sword",{"foil":true});
const sword2 = new Sword("test:test_sword","equipment","template_sword",{"foil":true});
      sword2.setItemName("test_sword");
      sword2.setDamage(9999);
      sword2.setBlockDigSpeed(true,"minecraft:web",15);
      sword2.addRepairableItem("minecraft:stick");
      //sword2.setProjectile(1,"minecraft:ender_pearl");
      sword2.onClickOnUse(Event.shoot("minecraft:ender_pearl",1,20));

console.log(sword2);

const chest = new Chestplate("test:chest","equipment","template_chest","textures/models/armor/test_armor_1",{"foil":true});
console.log(chest);
const helmet = new Helmet("test:helmet","equipment","template_helmet","textures/models/armor/test_armor_1",{"foil":true});
console.log(helmet);
const leggings = new Leggings("test:leggings","equipment","template_leggings","textures/models/armor/test_armor_2",{"foil":true});
console.log(leggings);
const boots = new Boots("test:boots","equipment","template_boots","textures/models/armor/test_armor_1",{"foil":true});
console.log(boots);

//debugger

createItem(item);
createItem(food);
createItem(sword1);
createItem(sword2);
createItem(chest);
createItem(helmet);
createItem(leggings);
createItem(boots);

//debugger

/*目前待实现的功能
1.生成bp与rp包清单
2.将sapi里的文件复制到bp里
3.将textus文件夹复制到rp里
4.将pack_icon.png复制到bp于rp里
*/