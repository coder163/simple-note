
import TNodeOption from "../domain/TNodeOption";
const { v4: uuidv4 } = require("uuid");

export default class FileUtil {
    /**
     * 遍历文件
     * @param  {string}        pathName 路径
     * @return {Array<string>}          指定目录下的文件集合
     * 
     */

    public static listFiles(pathName: string): Array<string> {
        let fs = window.require("fs");
      

        const files = fs.readdirSync(pathName)
        //定义结构
        let nodes = Array<any>();
        for (let i = 0; i < files.length; i++) {
            const item = files[i]
            const stat = fs.lstatSync(pathName + '\\' + item)

            let treeNode = {
                id: uuidv4(),
                label: item,
                hasChildren: stat.isDirectory(),
                path: pathName + '\\' + item
            };

            nodes.push(treeNode)
        }
        // console.log(nodes)
        return nodes
    }
}


