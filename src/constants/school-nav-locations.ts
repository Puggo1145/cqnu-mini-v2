interface Nav {
    title: string;
    data: {
        subTitle: string;
        places: {
            name: string;
            alias: string;
            location: string;
            desc: string;
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
                        alias: '11/12/13/14/15',
                        location: '',
                        desc: '',
                    },
                    { 
                        name: '特教楼', 
                        alias: 'T',
                        location: '',
                        desc: ''
                    },
                    { 
                        name: '致用楼', 
                        alias: '' ,
                        location: '',
                        desc: ''
                    },
                    { 
                        name: '图北楼', 
                        alias: '17',
                        location: '',
                        desc: ''
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
                        location: '',
                        desc: ''
                    },
                    {
                        name: '东北门菜鸟驿站',
                        alias: '东北门',
                        location: '',
                        desc: ''
                    },
                    {
                        name: '三食堂菜鸟驿站',
                        alias: '三食堂',
                        location: '',
                        desc: ''
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
                        location: ''
                    },
                    {
                        name: '蜜雪冰城',
                        alias: '二食堂二楼',
                        location: ''
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
                        location: ''
                    },
                    {
                        name: 'XXXX',
                        alias: 'XXX',
                        location: ''
                    },
                    {
                        name: 'XXXX',
                        alias: '三食堂XXX',
                        location: ''
                    }
                ]
            },
            {
                subTitle: '美食小吃',
                places: [
                    { 
                        name: '重师四食堂', 
                        alias: '北门',
                        location: ''
                    },
                    {
                        name: '麦当劳',
                        alias: '南门商业街',
                        location: ''
                    },
                    {
                        name: 'XXXX',
                        alias: '三食堂XXX',
                        location: ''
                    }
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
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: '致用楼',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: '你的寝室',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    }
                ]
            },
            {
                subTitle: '所有',
                places: [
                    {
                        name: '情人坡',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: '致用楼',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: '你的寝室',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    },
                    {
                        name: 'XXXX',
                        alias: '',
                        location: '',
                        desc: '所有重师人的共同回忆'
                    }
                ]
            }
        ]
    }
}