import fs from 'fs';
import path from 'path';

const content = '这是要写入的内容';
// 获取当前文件的路径
//const currentFilePath = path.dirname(new URL(import.meta.url).pathname);
//console.log(currentFilePath);
// 拼接要写入文件的路径
//const filePath = path.join(currentFilePath, '../../example.txt').replace(/\\/g, '/');
//console.log(filePath);
//console.log(path.dirname(filePath));
fs.mkdirSync("./dist/Bp", { recursive: true });
/*fs.writeFile(filePath, content, 'utf-8', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('文件已写入');
});*/
//path.dirname(filePath)


/**
 * 保存备份文件dist下
 * @param {string} filePathCopy 相对于此文件路径下的路径
 * @param {string} data 数据
 */
export function saveEctype(filePathCopy,data){
 // 确保目录存在
 fs.mkdirSync(path.dirname(filePathCopy), { recursive: true });
  // 创建文件并写入内容
  fs.writeFile(filePathCopy,data, (err) => {
   if (err) {
     return console.error(err);
   }
   console.log("文件创建成功。");
 });
}

saveEctype("./dit/test.js",content);


