import { Item } from "./class/Item.mjs";
import { Food } from "./class/Food.mjs";
import { Equipment } from "./class/Equipment.mjs";
import { Sword } from "./class/Tool.mjs";
import { createItem } from "./file.mjs";
import { Chestplate, Helmet, Leggings, Boots } from "./class/Armor.mjs";
import { Event } from "./event.mjs";

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