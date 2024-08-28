interface Nav {
    title: string;
    data: {
        subTitle: string;
        places: {
            name: string;
            alias: string;
            location: string;
            desc?: string;
        }[]
    }[]
}

export const navs: Record<string, Nav> = {
    building: {
        title: '教学楼', 
        data: [
            { 
                subTitle: '', 
                places: [
                    { 
                        name: '弘德楼', 
                        alias: '11-15',
                        location: '106.305178,29.614059',
                    },
                    { 
                        name: '特教楼（励志楼）', 
                        alias: 'T',
                        location: '106.299806,29.611043',
                    },
                    {
                        name: '田家炳书院',
                        alias: '16',
                        location: '106.299911,29.611142'
                    },
                    { 
                        name: '图北楼', 
                        alias: '17',
                        location: '106.301295,29.613503',
                    },
                    { 
                        name: '知行楼', 
                        alias: '19',
                        location: '106.30233,29.611058',
                    },
                    { 
                        name: '致用楼', 
                        alias: '' ,
                        location: '106.300463,29.61083',
                    },
                ]
            }
        ]
    },
    express: {
        title: '快递', 
        data: [
            { 
                subTitle: '', 
                places: [
                    { 
                        name: '南门菜鸟驿站', 
                        alias: '南门',
                        location: '106.302472,29.607842',
                    },
                    {
                        name: '东北门菜鸟驿站',
                        alias: '东北门',
                        location: '106.306581,29.616857',
                    },
                    {
                        name: '三食堂菜鸟驿站',
                        alias: '三食堂',
                        location: '106.302341,29.609367',
                    }
                ]
            }
        ]
    },
    shop: {
        title: '商铺',
        data: [
            {
                subTitle: '奶茶', 
                places: [
                    { 
                        name: '茶百道', 
                        alias: '南门商业街',
                        location: '106.302591,29.608013'
                    },
                    {
                        name: '蜜雪冰城',
                        alias: '二食堂二楼',
                        location: '106.302571,29.607951'
                    },
                    {
                        name: '古茗',
                        alias: '南门商业街',
                        location: '106.304384,29.606997'
                    },
                    {
                        name: 'Luckin Coffee',
                        alias: '南门商业街',
                        location: '106.304384,29.606997'
                    },
                    {
                        name: 'XXXX',
                        alias: '三食堂XXX',
                        location: ''
                    }
                ]
            },
            {
                subTitle: '超市',
                places: [
                    { 
                        name: '琳琅铺子', 
                        alias: '南门商业街',
                        location: '106.302571,29.607951'
                    },
                ]
            },
            {
                subTitle: '美食小吃',
                places: [
                    { 
                        name: '重师四食堂', 
                        alias: '北门（5号门）',
                        location: '106.302571,29.607951'
                    },
                    {
                        name: '麦当劳',
                        alias: '熙街',
                        location: '106.304384,29.606997'
                    },
                ]
            }
        ]
    },
    scenery: {
        title: '校园美景',
        data: [
            {
                subTitle: '人气top5',
                places: [
                    {
                        name: '情人坡',
                        alias: '',
                        location: '106.302881,29.613757',
                        desc: '每个重师人共同的回忆'
                    },
                    {
                        name: '致用楼',
                        alias: '',
                        location: '106.299806,29.611043',
                        desc: '白敬亭和章若楠来拍过戏'
                    },
                    {
                        name: '你的寝室',
                        alias: '',
                        location: '',
                        desc: '室友是你四年最熟悉的人'
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '',
                        desc: '暂时没想好'
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '',
                        desc: '这个也是'
                    }
                ]
            },
            {
                subTitle: '所有',
                places: [
                    {
                        name: '情人坡',
                        alias: '',
                        location: '106.302881,29.613757',
                        desc: '每个重师人共同的回忆'
                    },
                    {
                        name: '致用楼',
                        alias: '',
                        location: '106.299806,29.611043',
                        desc: '白敬亭和章若楠来拍过戏'
                    },
                    {
                        name: '你的寝室',
                        alias: '',
                        location: '',
                        desc: '室友是你四年最熟悉的人'
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '暂时没想好',
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '这个也是',
                    }
                ]
            }
        ]
    }
}