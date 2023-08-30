import Data from "./Data.mjs"

const blockDataTemplate = {
    "format_version": "1.16.100",
    "minecraft:block": {
      "description": {
        "identifier": "test:test_block",
        "menu_category": {
          "category": "construction"
        }
      },
      "components": {
        "minecraft:material_instances": {
          "*": {
            "texture": "test_block"
          }
        },
        
        "minecraft:friction": 0.4,
        "minecraft:explosion_resistance": 3,
        "minecraft:block_light_absorption": 3
      },
      "events": {}
    }
  };


class Block extends Data{
    constructor(identifier,category,textuer,componentsOpt = {}){
        this.identifier = identifier;
        this.category = category;
        this.textuer = textuer; 
        this.blockData = new Data(this.getDataTemplate());
        const description = {
          "identifier": identifier,
          "menu_category": {
            "category": category
          }
        };
        this.blockData.setBehDescription(false,description);

        this.setMaterialInstances({
          "*": {
            "texture": textuer
          }
        });


    }
    getDataTemplate(){
      return blockDataTemplate;
    }
    setMaterialInstances(opt){
      this.blockData.setBehComponents(false,opt);
    }
    setFriction(friction){
      this.blockData.setBehComponents(false,{"minecraft:friction": friction});
    }
    setExplosionResistance(resistance){
      this.blockData.setBehComponents(false,{"minecraft:explosion_resistance": resistance});
    }
    setBlockLightAbsorption(light){
      this.blockData.setBehComponents(false,{"minecraft:block_light_absorption": light});
    }
}