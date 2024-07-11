// 返回 xnm: 学年码，xqm: 学期码
export const getYearAndTerm = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const term = month < 9 ? 2 : 1;
    return {
        xnm: year,
        xqm: term
    }
}


type OriginalSchedule = {
    zcd: string;
    cd_id: string;
    kcmc: string;
    cdmc: string;
    xm: string;
    jcor: string;
    xqj: string;
}
// 解析后的课程结构
export interface Lesson {
    lesson_id: number
    name: string, // 课程名称
    place: string, // 上课地点
    teacher: string, // 教师
    start_time: number, // 在第几节课开始
    end_time: number, // 在第几节课结束
    day: number, // 星期几
    // start_week: number, // 从第几周开始
    // end_week: number, // 到第几周结束
    include_week: number[],
    color: string, // 课程颜色
}

export const resolveSchedule = (originalSchedule: OriginalSchedule[]) => {
    return originalSchedule.map((item: any): Lesson => {
        const sections = analyst(item.zcd);

        const lesson: Lesson = {
            lesson_id: Number(item.cd_id),
            name: item.kcmc,
            place: item.cdmc,
            teacher: item.xm,
            start_time: Number(item.jcor.split('-')[0]),
            end_time: Number(item.jcor.split('-')[1]),
            day: Number(item.xqj),
            include_week: sections,
            // start_week: Number(item.zcd.split('-')[0]),
            // end_week: endWeek,
            color: getRandomHSLColor()
        }

        return lesson;
    });
}


function analyst(zcd:string): number[]{
    const sections: number[] = [];

    if (zcd.includes("(")) {
        // /(\d+)-(\d+)周/是一个正则表达式，(\d+)表示匹配一个或多个数字，并使用括号将匹配的部分分组 -表示连字符 
        // 当调用match()方法时，返回一个数组，其中包含所有满足正则表达式的匹配项，第一项是完全匹配的子串，后面的项是括号分组对应的子串匹配结果
        // 例如1-16周(单) 得到的就是["1-16周", "1", "16"]
        const range = zcd.match(/(\d+)-(\d+)周/);
        if (range !== null) {
        const start = Number(range[1]);
        const end = Number(range[2]);
        if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
            if (zcd.includes('单') && i % 2 === 0) {
                continue;
            }
            if (zcd.includes('双') && i % 2 !== 0) {
                continue;
            }

            sections.push(i);
            }
        }
        }
    }else if (zcd.includes(",")){
        const subParts = zcd.split(",");

        for (const subPart of subParts){
            const range = subPart.match(/(\d+)-(\d+)周/);
            if (range !== null) {
                const start = Number(range[1]);
                const end = Number(range[2]);

                if (!isNaN(start) && !isNaN(end)){
                    for (let i = start; i<= end; i++){
                        sections.push(i);
                    }
                }
            }
        }
    }else {
        const range = zcd.match(/(\d+)-(\d+)周/);
        if (range !== null) {
            const start = Number(range[1]);
            const end = Number(range[2]);

            if (!isNaN(start) && !isNaN(end)){
                for (let i = start; i<= end; i++){
                    sections.push(i);
                }
            }
        }
    }


  return sections;
}


// 获得随机色值
function getRandomHSLColor() {
    const hue = Math.floor(Math.random() * 360);  // Hue值，范围0-360
    const saturation = Math.floor(Math.random() * 101) + '%';  // Saturation值，范围0%-100%
    const lightness = Math.floor(Math.random() * 26) + 25 + '%';  // Lightness值，范围25%-50%

    return `hsl(${hue},${saturation},${lightness})`;
};