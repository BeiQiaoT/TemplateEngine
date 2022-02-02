import lookup from './lookup';
import parseArray from './parseArray';

/**
 * 将tokens渲染成dom字符串
 * @param tokens
 * @param data
 */
export default function renderTemplate(tokens: any[], data: any): string {
    // 结果字符串
    let resultStr: string = '';
    // 遍历tokens
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token[0] == 'text') {
            // 拼起来
            resultStr += token[1];
        } else if (token[0] == 'name') {
            // 如果是name类型，那么就直接使用它的值，当然要用lookup
            // 因为防止这里是“a.b.c”有逗号的形式
            resultStr += lookup(data, token[1]);
        } else if (token[0] == '#') {
            resultStr += parseArray(token, data);
        }
    }
    return resultStr;
};
