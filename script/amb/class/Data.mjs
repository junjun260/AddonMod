/**
 * 这是一个底层的数据操作class，为数据操作提供操作api
 */
export class Data{
    /**
     * 以数据模板创建数据
     * @param {Object} DataTemplate 数据模板对象
     */
    constructor(DataTemplate){
      this.behData = this.cloneData(DataTemplate.BP);
      this.resData = this.cloneData(DataTemplate.RP);
    }
    /**
     * 深度拷贝
     * @param {Object} data 数据对象
     * @returns 拷贝数据对象
     */
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    }

    //BP
    getBehFormatVersion(){
      return this.behData["format_version"];
    }
    getBehDescription(){
      return this.behData["minecraft:item"]["description"];
    }
    getBehComponents(){
      return this.behData["minecraft:item"]["components"]
    }
    getEvents(){
      return this.behData["minecraft:item"]["events"];
    }
    setBehFormatVersion(version){
      this.behData["format_version"] = version;
    }
    setBehDescription(clear,option){ 
      if(clear) this.behData["minecraft:item"]["description"] = {};
      Object.assign(this.behData["minecraft:item"]["description"],option);
    }
    /**
     * 设置bp的组件
     * @param {boolean} clear 是否清楚组件里的所有的数据
     * @param {Object} option 要拷贝的组件对象
     */
    setBehComponents(clear,option){
      if(clear) this.behData["minecraft:item"]["components"] = {};
      Object.assign(this.behData["minecraft:item"]["components"],option);
    }
    /**
     * 设置bp的Event
     * @param {boolean} clear 是否清楚Event里的所有的数据
     * @param {Object} option 要拷贝的Event对象
     */
    setBehEvents(clear,option){
      if(clear) this.behData["minecraft:item"]["events"] = {};
      Object.assign(this.behData["minecraft:item"]["events"],option);
    }

    //RP
    getResFormatVersion(){
      return this.resData["format_version"];
    }
    getResDescription(){
      return this.resData["minecraft:item"]["description"];
    }
    getResComponents(){
      return this.resData["minecraft:item"]["components"]
    }
   
    setResFormatVersion(version){
      this.resData["format_version"] = version;
    }
    setResDescription(clear,option){
      if(clear) this.resData["minecraft:item"]["components"] = {};
      Object.assign(this.resData["minecraft:item"]["components"],option);
    }
    setResComponents(clear,option){
      if(clear) this.resData["minecraft:item"]["components"] = {};
      Object.assign(this.resData["minecraft:item"]["components"],option);
    }
  }
  