/**    addon & mod  bridge **/


/**
 * manifest 清单 以1.16.100为模板
 */
const manifest = {
    "format_version":"1.10.0",
    "nameSpace":"template"
  }
  
  
  //数据操作class
export class Data{
    constructor(DataTemplate){
      this.behData = Object.assign(DataTemplate.BP,{});
      this.resData = Object.assign(DataTemplate.RP,{});
    }
    //BP
    setBehFormatVersion(version){
      this.behData["format_version"] = version;
    }
    setBehDescription(identifier,category,is_experimental){
      const description = {
        "identifier": identifier,
        "category": category,
        "is_experimental": is_experimental
      }
      this.behData["minecraft:item"]["description"] = description;
      this.resData["minecraft:item"]["description"] = description;
    }
    setBehComponents(clear,option){
      if(clear) this.behData["minecraft:item"]["components"] = {};
      Object.assign(this.behData["minecraft:item"]["components"],option);
    }
  
    //RP
    setResFormatVersion(version){
      this.resData["format_version"] = version;
    }
    setResDescription(identifier,category,is_experimental){
      const description = {
        "identifier": identifier,
        "category": category,
        "is_experimental": is_experimental
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
  
  
  
export class Item{
    constructor(identifier,category,textuer,componentsOpt){
      this.itemId = identifier;
      this.textuer = textuer;
      this.itemData = new Data(this.getDataTemplate());
      this.itemData.setBehDescription(`${manifest.nameSpace}:${identifier}`,category,false);
      this.itemData.setResDescription(`${manifest.nameSpace}:${identifier}`,category,false);
      this.itemData.setResComponents(false,{
        "minecraft:icon": textuer
      });
      if(componentsOpt){
        console.log("***");
        const componentsOption = {
          "foil":false,
          "max_stack_size":64,
          "hand_equipped":false,
          "max_damage":1,
          "use_duration":0
        };
        Object.assign(componentsOption,componentsOpt);
    
        const components = {
          "minecraft:foil":componentsOption.foil,
          "minecraft:max_damage": componentsOption.max_damage,
          "minecraft:max_stack_size": componentsOption.max_stack_size,
          "minecraft:use_duration": componentsOption.use_duration,
        };
        this.itemData.setBehComponents(false,components);
      }
    }
    getDataTemplate(){
      return itemDataTemplate;
    }
    setComponents(clear,componentsOpt){
      this.itemData.setBehComponents(clear,componentsOpt);
    }
    setFoil(boolean){
      this.itemData.setBehComponents(false,{"minecraft:foil":boolean});
    }
    setMax_damage(number){
      this.itemData.setBehComponents(false,{"minecraft:max_damage": number});
    }
    setStacked_by_data(boolean){
      this.itemData.setBehComponents(false,{"minecraft:stacked_by_data": boolean});
    }
    setMax_stack_size(number){
      this.itemData.setBehComponents(false,{"minecraft:max_stack_size": number});
    }
    setUse_duration(number){
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
  
  
export class Food extends Item{
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
  
  
  //console.log(food.itemData.behData["minecraft:item"]);
  

  
  //debugger