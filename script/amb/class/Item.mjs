
import { ItemData } from "./Data.mjs";

/**
 * 稳定版物品类
 */
export class Item {
  /**
   * 构造函数
   * @param {string} identifier 物品的 ID
   * @param {string} category 物品的分类
   * @param {string} texture 物品的贴图
   * @param {Object} componentsOpt 物品的行为组件
   */
  constructor(identifier, category, texture, componentsOpt = {}) {
    this.behData = new ItemData('1.10.0');
    this.resData = new ItemData('1.10.0');
    
    this.identifier = identifier;
    this.category = category;
    this.texture = texture;
    this.behData.setDescription("identifier", identifier);
    this.resData.setDescription("identifier", identifier);

    this.resData.setComponents({
      "minecraft:icon": texture
    });
    this.setComponentsOpt(componentsOpt);
  }

  /**
   * 设置物品的行为组件
   * @param {Object} componentsOpt 物品的行为组件
   */
  setComponentsOpt(componentsOpt) {
    const defaultComponents = {
      "foil": false,
      "max_damage": 10,
      "use_duration": 0,
      "max_stack_size": 64,
      ...componentsOpt
    };
    const components = Object.entries(defaultComponents).reduce((obj, [key, value]) => {
      obj[`minecraft:${key}`] = value;
      return obj;
    }, {});
    this.behData.setComponents(components);
  }

  /**
   * 设置物品是否可以被附魔
   * @param {boolean} boolean 物品是否可以被附魔
   */
  setFoil(boolean) {
    this.behData.setComponents({
      "minecraft:foil": boolean
    });
  }

  /**
   * 设置物品的最大耐久度
   * @param {number} number 物品的最大耐久度
   */
  setMaxDamage(number) {
    this.behData.setComponents({
      "minecraft:max_damage": number
    });
  }

  /**
   * 设置物品是否可以堆叠
   * @param {boolean} boolean 物品是否可以堆叠
   */
  setStackedByData(boolean) {
    this.behData.setComponents({ "minecraft:stacked_by_data": boolean });
  }

  /**
   * 设置物品的最大堆叠数量
   * @param {number} number 物品的最大堆叠数量
   */
  setMaxStackSize(number) {
    this.behData.setComponents({ "minecraft:max_stack_size": number });
  }

  /**
   * 设置物品使用的持续时间
   * @param {number} number 物品使用的持续时间
   */
  setUseDuration(number) {
    this.behData.setComponents({ "minecraft:use_duration": number });
  }
}
/*
这段代码定义了一个 `Item` 类，用于封装 Minecraft 物品的属性和行为。

在类中，定义了一些方法：

- `constructor(identifier, category, texture, componentsOpt = {})`：构造函数，用于创建一个新的物品对象。这个方法接受四个参数，`identifier` 表示物品的 ID，`category` 表示物品的分类，`texture` 表示物品的贴图，`componentsOpt` 表示一些可选的行为组件。在构造函数中，创建了两个 `ItemData` 类的实例，用于分别封装行为组件和资源组件。然后，设置了物品的 ID、分类和贴图，并调用了 `setComponentsOpt()` 方法，将可选的行为组件设置到物品中。
- `setComponentsOpt(componentsOpt)`：用于设置物品的行为组件。这个方法接受一个参数 `componentsOpt`，表示要设置的行为组件。这个方法首先使用对象展开语法和默认的行为组件对象将可选的行为组件合并到一起，然后将行为组件对象转换为 Minecraft 行为组件格式，并调用 `behData` 实例的 `setComponents()` 方法，将行为组件添加到物品中。
- `setFoil(boolean)`：用于设置物品是否可以被附魔。这个方法接受一个参数 `boolean`，表示是否可以被附魔，然后将值设置到 Minecraft 行为组件中。
- `setMaxDamage(number)`：用于设置物品的最大耐久度。这个方法接受一个参数 `number`，表示最大耐久度，然后将值设置到 Minecraft 行为组件中。
- `setStackedByData(boolean)`：用于设置物品是否可以堆叠。这个方法接受一个参数 `boolean`，表示是否可以堆叠，然后将值设置到 Minecraft 行为组件中。
- `setMaxStackSize(number)`：用于设置物品的最大堆叠数量。这个方法接受一个参数 `number`，表示最大堆叠数量，然后将值设置到 Minecraft 行为组件中。
- `setUseDuration(number)`：用于设置物品使用的持续时间。这个方法接受一个参数 `number`，表示使用的持续时间，然后将值设置到 Minecraft 行为组件中。

这个类的作用是封装通用的物品属性和行为设置方法，避免重复的代码。通过调用类的方法，可以方便地创建和修改 Minecraft 物品。
*/
