 //Attachables 模板
 const AttachablesT = {
    "format_version": "1.8.0",
    "minecraft:attachable": {
      "description": {
        "identifier": "bridge:test_chestplate_chestplate",
        "materials": {
          "default": "armor",
          "enchanted": "armor_enchanted"
        },
        "textures": {
          "default": "textures/models/armor/test_chestplate_1",
          "enchanted": "textures/misc/enchanted_item_glint"
        },
        "geometry": {
          "default": "geometry.humanoid.armor.chestplate"
        },
        "scripts": {
          "parent_setup": "variable.chest_layer_visible = 0.0;"
        },
        "render_controllers": [
          "controller.render.armor"
        ]
      }
    }
  };

export  class Attachables{
    constructor(identifier,texture,geometry){
      this.AttachablesT = this.cloneData(AttachablesT);
      this.setIdentifier(identifier);
      this.setDefaultTextures(texture);
      this.setGeometry(geometry);
    }
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    }
    setIdentifier(identifier){
      this.AttachablesT["minecraft:attachable"]["description"]["identifier"] = identifier;
    }
    setDefaultTextures(textures){
      this.AttachablesT["minecraft:attachable"]["description"]["textures"]["default"] = textures;
    }
    setGeometry(geometry){
      this.AttachablesT["minecraft:attachable"]["description"]["geometry"]["default"] = geometry;
    }
  }
  