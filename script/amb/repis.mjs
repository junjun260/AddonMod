
export const Recipes ={
    format_version: "1.17.41",
    resiter:function(itemId,tags,pattern,key,result){
    }
}


const pattern = {
    "pattern": [
        "X",
        "X",
        "I"
    ],
    "key": {
        "X": "wiki:cold_steel",
        "I": "minecraft:stick"
    },
}

Recipes.regisiter("test:recipe",["crafting_table"],pattern,{"item":"test:item","count": 3});