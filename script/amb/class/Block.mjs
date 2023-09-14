import { BlockData } from "./Data.mjs"

export class Block {
  constructor(identifier, category, texture) {
    this.blockData = new BlockData('1.12.10');
    this.identifier = identifier;
    this.category = category;
    this.texture = texture;
   
    this.blockData.setDescription("identifier",identifier);
    this.blockData.setDescription("menu_category",{"category": category});
    this.addUnitCube();
    this.setMaterialInstances(texture);
  }

  regsiterPropertie(name,context){
    this.blockData.setProperties(name,context);
  }

  addUnitCube() {
    this.blockData.setComponents({
      "minecraft:unit_cube": {}
    })
  }
 

  setLoot(loot) {
    this.blockData.setComponents({
      'minecraft:loot': loot
    })
  }
  setDestructibleByMining(seconds_to_destroy) {
    this.blockData.setComponents({
      "minecraft:destructible_by_mining": {
        "seconds_to_destroy": seconds_to_destroy
      }
    })
  }
  setDestructibleByExplosion(explosion_resistance) {
    this.blockData.setComponents({
      "minecraft:destructible_by_explosion": {
        "explosion_resistance": explosion_resistance
      }
    })
  }
  setFriction(friction) {
    this.blockData.setComponents({
      "minecraft:friction": friction
    })
  }
  setLightEmission(light_emission) {
    this.blockData.setComponents({
      "minecraft:light_emission": light_emission
    })
  }
  setLightDampening(light_dampening) {
    this.blockData.setComponents({
      'minecraft:light_dampening': light_dampening
    });
  }

  setMaterialInstances(texture) {
    this.blockData.setComponents({
      "minecraft:material_instances": {
        "*": {
          "texture": texture
        }
      }
    });
  }

  setCollisionBox(origin,size) {
    this.blockData.setComponents({
      "minecraft:collision_box": {
        "origin": origin || [-8, 0, -8],
        "size": size || [16, 16, 16]
      }
    });
  }

  setCraftingTable(table_name,crafting_tags) {
    this.blockData.setComponents({
      "minecraft:crafting_table": {
      "table_name": table_name||"Example Crafting Table", // Name shown in GUI, can be translated
      "crafting_tags": crafting_tags||["crafting_table"]
      }
    });
  }

  setFlammable(catch_chance_modifier, destroy_chance_modifier) {
    this.blockData.setComponents({
      "minecraft:flammable": {
        "catch_chance_modifier": catch_chance_modifier||5, // Affects chance that this block will catch flame when next to a fire
        "destroy_chance_modifier": destroy_chance_modifier||20 // Affects chance that this block will be destroyed by flames when on fire
      }
    });
  }
  setGeometry(geometry) {
    this.blockData.setComponents({
      'minecraft:geometry': geometry
    });
  }
  setMapColor(color) {
    this.blockData.setComponents({
      'minecraft:map_color': color
    });
  }
  
  
  setSelectionBox(origin,size) {
    this.blockData.setComponents({
      'minecraft:selection_box': {
        "origin": origin || [-8, 0, -8],
        "size": size || [16, 16, 16]
      }
    });
  }
  
  setDisplayName(displayName) {
    this.blockData.setComponents({
      'minecraft:display_name': displayName
    });
  }

  setPlacementFilter(filter) {
    this.blockData.setComponents({
      'minecraft:placement_filter': filter
    });
  }

  setTransformation(translation,rotation,scale) {
    this.blockData.setComponents({
      "minecraft:transformation": {
        "translation": translation||[-5, 8, 0],
        "rotation": rotation||[90, 180, 0],
        "scale": scale||[0.5, 1, 0.5],
      }
    });
  }
  
}


