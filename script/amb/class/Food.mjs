import { Item } from "./Item.mjs";
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