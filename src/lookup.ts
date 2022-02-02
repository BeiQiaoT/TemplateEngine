/**
 * 在对象中寻找属性
 * @param dataObj
 * @param keyName
 */
export default function lookup(dataObj: any, keyName: string): any {
    // keyName是否有点符号，但是不能是.本身
    if (keyName.indexOf('.') != -1 && keyName != '.') {
        // 如果有点符号，那么拆开
        let keys = keyName.split('.');
        // 设置一个临时变量，这个临时变量用于周转，一层一层找下去。
        let temp = dataObj;
        // 每找一层，就把它设置为新的临时变量
        for (let i = 0; i < keys.length; i++) {
            temp = temp[keys[i]];
        }
        return temp;
    }
    // 如果这里面没有点符号直接返回
    return dataObj[keyName];
};
