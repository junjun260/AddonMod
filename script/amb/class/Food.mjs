import { Item } from "./Item.mjs";

/**
 * 食物类，继承自稳定版物品类
 */
export class Food extends Item {
  /**
   * 构造函数
   * @param {string} identifier 物品的 ID
   * @param {string} category 物品的分类
   * @param {string} textuer 物品的贴图
   * @param {Object} componentsOpt 物品的行为组件
   */
  constructor(identifier, category, textuer, componentsOpt = {}) {
    super(identifier, category, textuer, componentsOpt);
    this.effects = [];

    // 设置食物的默认属性
    this.setUseDuration(32);
    this.setNutrition(4);
    this.setCanAlwaysEat(false);
    this.setSaturationModifier('low');
  }

  /**
   * 设置食物的行为组件
   * @param {Object} foodOptions 食物的行为组件
   */
  setFoodOption(foodOptions) {
    this.behData.setComponents({
      "minecraft:food": {
        ...this.behData.getElement('components')['minecraft:food'],
        ...foodOptions
      }
    });
  }

  /**
   * 设置食物的效果
   * @param {Object} effects 效果数组
   */
  addEffect(effect) {
    this.effects.push(effect);
    this.setFoodOption({
      "effects": this.effects
    });
  }

  /**
   * 设置食物是否可以在任何情况下都能食用
   * @param {boolean} boolean 食物是否可以在任何情况下都能食用
   */
  setCanAlwaysEat(boolean) {
    this.setFoodOption({
      "can_always_eat": boolean
    });
  }

  /**
   * 设置食物提供的饱食度
   * @param {number} number 食物提供的饱食度
   */
  setNutrition(number) {
    this.setFoodOption({
      "nutrition": number
    });
  }

  /**
   * 设置食物的饱和度修正值
   * @param {string} string 饱和度修正值
   */
  setSaturationModifier(string) {
    this.setFoodOption({
      "saturation_modifier": string
    });
  }
}
