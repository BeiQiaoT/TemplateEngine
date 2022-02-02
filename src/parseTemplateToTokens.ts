import Scanner from './Scanner';
import nestTokens from './nestTokens';

/**
 * 将模板字符串转换成tokens
 * @param templateString
 */
export default function parseTemplateToTokens(templateString: string): any[] {
    let tokens: any[] = [];
    // 创建扫描器
    let scanner = new Scanner(templateString);
    let words;
    while (!scanner.eos()) {
        // 收集开始标记出现之前的文字
        words = scanner.scanUtil('{{');
        if (words != '') {
            // 标签中的空格不能去掉，比如<div class="box">不能去掉class前面的空格
            let isInTag = false;
            // 空白字符串
            let _words = '';
            for (let i = 0; i < words.length; i++) {
                // 判断是否在标签里
                if (words[i] == '<') {
                    isInTag = true;
                } else if (words[i] == '>') {
                    isInTag = false;
                }
                // 如果这项不是空格，拼接上
                if (!/\s/.test(words[i])) {
                    _words += words[i];
                } else {
                    // 如果这项是空格，只有当它在标签内的时候，才拼接上
                    if (isInTag) {
                        _words += ' ';
                    }
                }
            }
            // 存起来，去掉空格
            tokens.push(['text', _words]);
        }
        // 过双大括号
        scanner.scan('{{');
        // 收集开始标记出现之前的文字
        words = scanner.scanUtil('}}');
        if (words != '') {
            // 这个words就是{{}}中间的东西。判断一下首字符
            if (words[0] == '#') {
                // 存起来，从下标为1的项开始存，因为下标为0的项是#
                tokens.push(['#', words.substring(1)]);
            } else if (words[0] == '/') {
                // 存起来，从下标为1的项开始存，因为下标为0的项是/
                tokens.push(['/', words.substring(1)]);
            } else {
                // 存起来
                tokens.push(['name', words]);
            }
        }
        // 过双大括号
        scanner.scan('}}');
    }
    // 返回折叠收集的tokens
    return nestTokens(tokens);
};
