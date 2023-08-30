import { Data } from "./Data.mjs";
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

export class Equipment {
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