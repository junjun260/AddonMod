import { ItemData } from "./Data.mjs";
import { Item } from "./Item.mjs";
export class Equipment extends Item {
  RepairableItemList = [];
  constructor(identifier, category, texture, componentsOpt = {}) {
    super(identifier, category, texture, componentsOpt);
    this.resData = new ItemData('1.16.100');
    this.behData = new ItemData('1.16.100');
    this.behData.setDescription("identifier", identifier);
    this.behData.setDescription("category", category);
    this.behData.setComponents({
      "minecraft:display_name": {
        "value": this.getItemName()
      },
      "minecraft:icon": {
        "texture": texture
      }
    });
    this.setComponentsOpt(componentsOpt);
  }

  setComponentsOpt(componentsOpt) {
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
    const components = Object.entries(defaultComponents).reduce(
      (obj, [key, value]) => {
        obj[`minecraft:${key}`] = value;
        return obj;
      }, {});
    this.behData.setComponents(components);
  }

  getItemName() {
    return this.identifier.split(":")[1];
  }

  setItemName(string) {
    this.behData.setComponents({
      "minecraft:display_name": {
        "value": string
      }
    });
    console.log(string);
  }

  setFoil(boolean) {
    this.behData.setComponents({
      "minecraft:foil": boolean
    });
  }

  setMaxStackSize(number) {
    this.behData.setComponents({
      "minecraft:max_stack_size": number
    });
  }

  setUseDuration(number) {
    this.behData.setComponents({
      "minecraft:use_duration": number
    });
  }

  allowOffHand(boolean) {
    this.behData.setComponents({
      "minecraft:allow_off_hand": boolean
    });
  }
  setHandEquipped(boolean) {
    this.behData.setComponents({
      "minecraft:hand_equipped": boolean
    });
  }
  setUseAnimation(string) {
    this.behData.setComponents({
      "minecraft:use_animation": string
    });
  }
  setDamage(number) {
    this.behData.setComponents({
      "minecraft:damage": number
    });
  }
  setHoverTextColor(string) {
    this.behData.setComponents({
      "minecraft:hover_text_color": string
    });
  }
  setCanDestroyInCreative(boolean) {
    this.behData.setComponents({
      "minecraft:can_destroy_in_creative": boolean
    });
  }
  //以上是基础方法
  setCreativeCategory(string) {
    this.behData.setComponents({
      "minecraft:creative_category": {
        "parent": string
      }
    });
  }

  setBlockPlacer(blockId, alowBlocks) {
    this.behData.setComponents({
      "minecraft:block_placer": {
        "block": blockId,
        "use_on": alowBlocks
      }
    });
  }

  setEntityPlacer(entityId, alowBlocks, disBlock) {
    this.behData.setComponents({
      "minecraft:entity_placer": {
        "entity": entityId,
        "use_on": alowBlocks,
        "dispense_on": disBlock
      }
    });
  }

  setFuel(number) {
    this.behData.setComponents({
      "minecraft:fuel": {
        "duration": number
      }
    });
  }

  setWearable(slot) {
    this.behData.setComponents({
      "minecraft:wearable": {
        "slot": slot
      }
    });
  }

  setProjectile(power, entityId) {
    this.behData.setComponents({
      "minecraft:projectile": {
        "minimum_critical_power": power,
        "projectile_entity": entityId
      }
    });
  }

  setShooter(charge_on_draw, launch_power_scale, max_draw_duration, max_launch_power, scale_power_by_draw_duration, ammunition) {
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

  setMaxDurability(max_durability) {
    this.behData.setComponents({
      "minecraft:durability": {
        "max_durability": max_durability
      }
    });
  }

  setDyePowder(color) {
    this.behData.setComponents({
      "minecraft:dye_powder": {
        "color": color
      }
    });
  }

  setKnockbackResistance(protection) {
    this.behData.setComponents({
      "minecraft:knockback_resistance": {
        "protection": protection
      }
    });
  }

  setEnchantable(slot, value) {
    this.behData.setComponents({
      "minecraft:enchantable": {
        "slot": slot, // Can be any of the enchant slot listed below
        "value": value
      }
    });
  }

  setArmor(protection) {
    this.behData.setComponents({
      "minecraft:armor": {
        "protection": protection
      }
    });
  }

  setRecord(sound, signal) {
    this.behData.setComponents({
      "minecraft:record": {
        "sound_event": sound, // Currently restricted to strings listed below
        "comparator_signal": signal
      }
    });
  }

  setDigger(use_efficiency, arr) {
    this.behData.setComponents({
      "minecraft:digger": {
        "use_efficiency": use_efficiency,
        "destroy_speeds": arr
      }
    });
  }

  setRepairable(arr) {
    this.behData.setComponents({
      "minecraft:repairable": {
        "repair_items": arr
      }
    });
  }

  setOnUse(event, target) {
    this.behData.setComponents({
      "minecraft:on_use": {
        "on_use": {
          "event": event,
          "target": target
        }
      }
    });
  }

  setOnUseOn(event, target) {
    this.behData.setComponents({
      "minecraft:on_use_on": {
        "on_use": {
          "event": event,
          "target": target
        }
      }
    });
  }

  // 添加标签
  addTag(tag) {
    const tag_ = `tag:${tag}`;
    const obj = {
      [tag_]: {}
    };
    this.behData.setComponents(obj);
  }

  // 添加常见标签
  addSwordTag() {
    this.addTag('minecraft:is_sword');
  }

  addToolTag() {
    this.addTag('minecraft:is_tool');
  }

  addAxeTag() {
    this.addTag('minecraft:is_axe');
  }

  // 添加事件
  addEvent(eventName, event) {
    const obj = {
      [eventName]: event
    };
    this.behData.setEvents(obj);
  }
/**
   * 添加可修复物品列表
   * @param {Array} itemsList 可修复物品列表
   * @param {string|molang} repair_amount 修复值表达式
   */
  setRepairableItemsList(itemsList, repair_amount) {
    this.RepairableItemList.push(
    {
      "items": itemsList,
      "repair_amount": repair_amount
    });
    this.setRepairable(this.RepairableItemList);
  }
  /**
   * 添加单个可修复物品
   * @param {string} itemId 物品标识符
   * @param {number} rate 修复比率
   */
  addRepairableItem(itemId, rate = 0.25) {
    this.RepairableItemList.push(
    {
      "items": [itemId],
      "repair_amount": `query.max_durability * ${rate}`
    });
    this.setRepairable(this.RepairableItemList);
  }
  /**
   * 添加可修复物品列表
   * @param {Array} itemsList 可修复物品列表
   * @param {string|molang} repair_amount 修复值表达式
   */
  setRepairableItemsList(itemsList, repair_amount) {
    this.RepairableItemList.push(
    {
      "items": itemsList,
      "repair_amount": repair_amount
    });
    this.setRepairable(this.RepairableItemList);
  }
  /**
   * 添加单个可修复物品
   * @param {string} itemId 物品标识符
   * @param {number} rate 修复比率
   */
  addRepairableItem(itemId, rate = 0.25) {
    this.RepairableItemList.push(
    {
      "items": [itemId],
      "repair_amount": `query.max_durability * ${rate}`
    });
    this.setRepairable(this.RepairableItemList);
  }
}