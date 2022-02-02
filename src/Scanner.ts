/**
 * 扫描器
 */
export default class Scanner {
    // 模板字符串
    private templateString: string;
    // 指针
    private pos: number;
    // 尾部
    private tail: string;

    constructor(templateString: string) {
        this.templateString = templateString;
        this.pos = 0;
        this.tail = templateString;
    }

    // 功能弱，就是走过指定内容，没有返回值
    scan(tag: string): void {
        if (this.tail.indexOf(tag) == 0) {
            // tag长度，比如 {{ 长度是2，就让指针后移多少位
            this.pos += tag.length;
            // 尾部也要变，改变尾部为从当前指针这个字符开始，到最后的全部字符
            this.tail = this.templateString.substring(this.pos);
        }
    }

    // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
    scanUtil(stopTag: string): string {
        // 记录一下执行本方法的时候pos的值
        const pos_backup = this.pos;
        // 当尾部的开头不是stopTag的时候，就说明还没有扫描到stopTag
        while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
            this.pos++;
            // 改变尾部为从当前指针这个字符开始，到最后的全部字符
            this.tail = this.templateString.substring(this.pos);
        }
        return this.templateString.substring(pos_backup, this.pos);
    }

    // 指针是否已经到头，返回布尔值。
    eos(): boolean {
        return this.pos >= this.templateString.length;
    }
};
