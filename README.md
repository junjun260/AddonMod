# AddonMod

# 项目立意：
随着Sapi的出现，目前Addon在功能方面趋近于Mod，并且得到Mojang公司的维护。然而，Addon的开发过程相对于原先的ModPE开发者而言仍然不够便捷。编写JSON需要反复跳转文件，常需查阅文档等，十分繁琐。因此，我们迫切需要一种统一的处理方式。作为ModPE时代的开发者，我们渴望一种优雅的开发模式，一条代码即可创建一个物品。虽然我们曾想过采用第三方启动器，但基岩版MC的第三方启动器开发难度系数较高，且难以维护。因此，我们将Addon与Sapi作为基础，站在Mojang这个巨人的肩膀上进行开发，创造一个名为AddonMod的项目。这样，我们可以解决开发难度大与维护成本高的问题，并且继承Addon与Sapi的优点，将它们纳入一个统一的框架中。
# 基本架构
-script
     -amb
      
      index.js
      
      amb.js
    
    -sapi
      
      index.js
  
  -textures
    
    -items
      item.png
    
    -models
      test.png
    
    -item_texture.json
  -dist
  
  manifest.json
  
  pack_icon.png

# 目前待实现的功能

1.生成bp与rp包清单

2.将sapi里的文件复制到bp里

3.将textus文件夹复制到rp里

4.将pack_icon.png复制到bp于rp里
