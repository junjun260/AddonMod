
import { Data } from "./Data.mjs";

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

export class Item{
    constructor(identifier,category,textuer,componentsOpt = {}){
      this.identifier = identifier;
      this.category = category;
      this.textuer = textuer;
      this.itemData = new Data(this.getDataTemplate());
      const description = {
        "identifier": identifier,
        "category": category
      }
      this.itemData.setBehDescription(false,description);
      this.itemData.setResDescription(false,description);
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
    