import { Equipment } from "./Equipment.mjs";
import { Attachables } from "./Attachables.mjs";

//Armor
export class Chestplate extends Equipment{
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

export  class Helmet extends Equipment{
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

export  class Leggings extends Equipment{
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

export  class Boots extends Equipment{
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
