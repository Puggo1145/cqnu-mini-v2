// 身份
const identity = [
    "本科生", // 0
    "研究生", // 1
];

// 学院和专业
const facultiesAndMajors = [
    {
        name: "马克思主义学院",
        majorsForUndergraduates: ["思想政治教育（师范）"],
        majorsForPostgraduates: ["马克思主义理论和哲学"]
    },
    {
        name: "历史与社会学院",
        majorsForUndergraduates: ["历史学（师范）", "文物与博物馆学", "社会工作"],
        majorsForPostgraduates: ["考古学", "中国史", "专门史", "中国古代史", "中国近现代史"]
    },
    {
        name: "教育科学学院",
        majorsForUndergraduates: ["教育技术学", "教育康复学", "教育学", "特殊教育", "学前教育", "应用心理学"],
        majorsForPostgraduates: ["比较教育学", "高等教育学", "教育史", "教育学原理", "课程教学论", "特殊教育学", "学前教育学", "发展与教育心理学", "基础心理学", "应用心理学", "教育管理", "小学教育", "心理健康教育", "特殊教育", "学前教育"]
    },
    {
        name: "体育与健康科学学院",
        majorsForUndergraduates: ["体育教育", "运动训练"],
        majorsForPostgraduates: ["体育教育学", "学科教学（体育）"]
    },
    {
        name: "文学院",
        majorsForUndergraduates: ["汉语言文学", "秘书学", "汉语国际教育", "戏剧影视文学"],
        majorsForPostgraduates: ["中国语言文学", "学科教学（语文）", "汉语国际教育"]
    },
    {
        name: "外国语学院",
        majorsForUndergraduates: ["翻译", "日语", "英语（师范）", "英语"],
        majorsForPostgraduates: ["英语语言学", "英语文学", "翻译理论", "英语教学理论及应用", "语言测试", "英语文体学", "英语国家文化研究", "日语语言文化"]
    },
    {
        name: "音乐学院",
        majorsForUndergraduates: ["音乐学", "音乐表演", "音乐与舞蹈学类", "舞蹈学", "舞蹈表演"],
        majorsForPostgraduates: ["音乐与舞蹈学", "艺术硕士（音乐）"]
    },
    {
        name: "美术学院",
        majorsForUndergraduates: ["环境设计", "视觉传达设计", "服装与服饰设计", "产品设计", "美术学", "绘画", "服装设计与工程", "书法学"],
        majorsForPostgraduates: ["艺术设计", "学科美术"]
    },
    {
        name: "新闻与传媒学院",
        majorsForUndergraduates: ["新闻传播学类", "网络与新媒体", "新闻学", "摄影影视", "摄影与制作", "广播电视编导", "数字媒体艺术"],
        majorsForPostgraduates: ["职业技术教育", "文艺与传媒", "新闻与传播", "广播电视"]
    },
    {
        name: "数学科学学院",
        majorsForUndergraduates: ["数学与应用数学", "信息与计算科学", "统计学", "金融数学", "数据科学与大数据技术"],
        majorsForPostgraduates: ["基础数学", "计算数学", "概率论与数理统计", "应用数学", "运筹学与控制论", "数学教育学", "课程与教学论", "学科教学", "系统理论", "系统分析与集成"]
    },
    {
        name: "物理与电子工程学院",
        majorsForUndergraduates: ["物理学", "电子信息科学与技术", "光电信息科学与工程", "新能源材料与器件"],
        majorsForPostgraduates: ["学科教学物理", "电子信息"]
    },
    {
        name: "化学学院",
        majorsForUndergraduates: ["化学（师范）", "材料化学", "高分子材料与工程"],
        majorsForPostgraduates: ["学科教学（化学）", "无机化学", "分析化学", "有机 化学", "物理化学"]
    },
    {
        name: "生命科学学院",
        majorsForUndergraduates: ["生物科学（中外合作办学）", "生物技术", "森林保护", "食品质量与安全", "生命科学"],
        majorsForPostgraduates: ["生物学", "生态学", "农业硕士食品加工与安全领域", "农业硕士农艺与种业领域", "教育硕士生物领域"]
    },
    {
        name: "地理与旅游学院",
        majorsForUndergraduates: ["地理科学", "地理信息科学", "旅游管理", "酒店管理", "空乘与礼仪"],
        majorsForPostgraduates: ["地图学与心里信息系统", "自然地理", "旅游管理", "资源环境科学", "人文地理", "学科科学（地理）", "职业技术教育（旅游服务）", "环境工程"]
    },
    {
        name: "经济与管理学院",
        majorsForUndergraduates: ["经济学", "金融工程", "工商管理", "人力资源管理", "市场营销", "财务管理"],
        majorsForPostgraduates: ["应用经济学", "管理科学与工程", "工商管理"]
    },
    {
        name: "计算机与信息科学学院",
        majorsForUndergraduates: ["智能科学与技术", "软件工程", "电子商务", "计算机科学与技术", "信息管理与信息系统"],
        majorsForPostgraduates: ["现代教育技术", "职业技术教育（信息技术）", "计算机系统结构", "计算机软件与理论", "计算机应用技术", "教育技术学", "软件工程", "计算机技术", "农业信息化"]
    },
    {
        name: "初等教育学院",
        majorsForUndergraduates: ["小学教育", "小学教育", "科学教育", "音乐学"],
        majorsForPostgraduates: []
    }
];

export { identity, facultiesAndMajors };