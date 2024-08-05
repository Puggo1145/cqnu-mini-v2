interface Nav {
    title: string;
    data: {
        subTitle: string;
        places: {
            name: string;
            alias: string;
            location: string;
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
                        location: ''
                    },
                    { 
                        name: '特教楼', 
                        alias: 'T',
                        location: ''
                    },
                    { 
                        name: '致用楼', 
                        alias: '' ,
                        location: ''
                    },
                    { 
                        name: '图北楼', 
                        alias: '17',
                        location: ''
                    },
                ]
            }
        ]
    },
}