import lookup from './lookup';
import renderTemplate from './renderTemplate';

/**
 * 处理数组，结合renderTemplate实现递归
 * @param token
 * @param data
 */
export default function parseArray(token: any, data: any): string {
    // 得到整体数据data中这个数组要使用的部分
    let v = lookup(data, token[1]);
    let resultStr = '';
    // 遍历v数组，v一定是数组
    // 遍历数据，而不是遍历tokens。数组中的数据有几条，就要遍历几条。
    for (let i = 0; i < v.length; i++) {
        // 这里要补一个“.”属性
        // 拼接
        resultStr += renderTemplate(token[2], {
            ...v[i],
            '.': v[i]
        });
    }
    return resultStr;
};
