import * as cheerio from 'cheerio';

export const parseOverallGrade = (html: string) => {
    const $ = cheerio.load(html);
    const gpa = $("font").eq(1).find("font").text();
    const studyDetails = $('font').eq(3).text().split(' ')
        .filter((item: string) => item !== '')
        .concat($('font').eq(4).text().split(' '));

    const passStr = studyDetails[1].match(/\d+/g)![0];
    const failStr = studyDetails[2].split('；')[0].match(/\d+/g)![0];
    const unstudyStr = studyDetails[2].split('；')[1].match(/\d+/g)![0];
    const studyingStr = studyDetails[4].match(/\d+/g)![0];

    const result = {
        gpa: gpa,
        studyDetail: [
            { name: "未通过", count: failStr },
            { name: "未修", count: unstudyStr },
            { name: "在读", count: studyingStr },
            { name: "通过", count: passStr },
        ]
    };


    return result;
}