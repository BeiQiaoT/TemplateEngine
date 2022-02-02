import parseTemplateToTokens from './parseTemplateToTokens';
import renderTemplate from './renderTemplate';

(window as any).TemplateEngine = {
    render(templateString: string, data: any): string {
        // 调用parseTemplateToTokens将模板字符串转换成tokens
        let tokens = parseTemplateToTokens(templateString);
        // 调用renderTemplate将tokens渲染成dom字符串
        return renderTemplate(tokens, data);
    },
}
