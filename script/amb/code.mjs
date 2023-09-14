import { Item } from "./class/Item.mjs";
import { Food } from "./class/Food.mjs";
import { Block } from "./class/Block.mjs";
import { Equipment } from "./class/Equipment.mjs";
import { Sword } from "./class/Tool.mjs";
import { createBlock, createItem } from "./file.mjs";
import { Chestplate, Helmet, Leggings, Boots } from "./class/Armor.mjs";
import { Event } from "./event.mjs";
import { Attachable } from "./class/Attachable.mjs";
import { copyFile } from "fs";

/**        code  正式编写的例子       */


const food = new Food("test:test_food","items","template_item",{"foil":true});
const sword1 = new Equipment("test:test_equipment","equipment","template_sword",{"foil":true});
const sword2 = new Sword("test:test_sword","equipment","template_sword",{"foil":true});
      sword2.setItemName("test_sword");
      sword2.setDamage(1111);
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

const item = new Item("test:test_item","items","template_item",{"foil":true});
      food.setUseDuration(100);

      const attachable = new Attachable("test:test_food","textures/entity/trident","geometry.trident");
      attachable.addMaterial("enchanted", "entity_alphatest_glint");
      attachable.addTexture("enchanted","textures/misc/enchanted_item_glint");
      attachable.addAnimation("wield","controller.animation.trident.wield");
      attachable.addAnimation("wield_first_person","animation.trident.wield_first_person");
      attachable.addAnimation("wield_first_person_raise", "animation.trident.wield_first_person_raise");
      attachable.addAnimation("wield_first_person_raise_shake", "animation.trident.wield_first_person_raise_shake");
      attachable.addAnimation("wield_first_person_riptide", "animation.trident.wield_first_person_riptide");
      attachable.addAnimation("wield_third_person", "animation.trident.wield_third_person");
      attachable.addAnimation("wield_third_person_raise", "animation.trident.wield_third_person_raise");
      attachable.setScript("animate", ["wield"]);
      attachable.setScript("pre_animation", [
            "variable.charge_amount = math.clamp((query.main_hand_item_max_duration - (query.main_hand_item_use_duration - query.frame_alpha + 1.0)) / 10.0, 0.0, 1.0f);"
          ],);
      attachable.addRenderController("controller.render.item_default");

      

      item.attachable = attachable;

      const block = new Block('test:test_bock',"construction","test_block");
      block.setCraftingTable();



//debugger

createItem(item);
createItem(food);
createItem(sword1);
createItem(sword2);
createItem(chest);
createItem(helmet);
createItem(leggings);
createItem(boots);

createBlock(block);


