let event ={
    //播放项摆动动画  无
    "swing": {},
    //射击组件
    "shoot": {
        "projectile": "minecraft:snowball",//发射的生物任何
        "launch_power": 5,//力度
        "angle_offset": 20//角度偏移
    },
    //伤害组件
    "damage": {
        "type": "magic",//伤害类型
        "target": "other",//伤害目标
        "amount": 4//伤害大小
    },
    //是否在创造模式下递减
    "decrement_stack": {
        "ignore_game_mode": false
    },
    //给予目标药水效果
    "add_mob_effect": {
        "effect": "poison",
        "target": "holder",
        "duration": 8,
        "amplifier": 3
    },
    //
    "remove_mob_effect": {
        "effect": "poison",
        "target": "holder"
    },
    //
    "transform_item": {
        "transform": "minecraft:apple"
    },
    //随机传送
    "teleport": {
        "target": "holder",
        "max_range": [8, 8, 8]
    },
    //序列化  只能写在mob
    "sequence": [
        {
            "add_mob_effect": {
                "effect": "poison",
                "target": "holder",
                "duration": 8,
                "amplifier": 3
            }
        },
        {
            "transform_item": {
                "transform": "minecraft:apple"
            }
        }
    ],
    // 只能写在mob
    "randomize": [
        {
            "weight": 1,
            "transform_item": {
                "transform": "minecraft:apple"
            }
        },
        {
            "weight": 2,
            "add_mob_effect": {
                "effect": "weakness",
                "target": "holder",
                "duration": 8,
                "amplifier": 3
            }
        }
    ],
    //mob
    "run_command": {
        "command": ["say hi"],
        "target": "other"
    }


}