import * as cheerio from 'cheerio';

export const parseOverallGrade = (html: string) => {
    const $ = cheerio.load(html);
    
    // 获取 GPA
    const gpa = $('font[style="color: red;"]').first().text().trim();
    
    // 获取课程统计信息
    const statsText = $('font[size="2px"]').map((_, el) => $(el).text()).get().join(' ');
    
    // 使用更可靠的方式提取数字
    const pass = statsText.match(/通过\s*(\d+)\s*门/)?.[1] || '0';
    const fail = statsText.match(/未通过\s*(\d+)\s*门/)?.[1] || '0';
    const unstudy = statsText.match(/未修\s*(\d+)\s*门/)?.[1] || '0';
    const studying = statsText.match(/在读\s*(\d+)\s*门/)?.[1] || '0';

    const result = {
        gpa: gpa,
        studyDetail: [
            { name: "未通过", count: fail },
            { name: "未修", count: unstudy },
            { name: "在读", count: studying },
            { name: "通过", count: pass },
        ]
    };

    return result;
}