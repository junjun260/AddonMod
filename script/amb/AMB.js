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