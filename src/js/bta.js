/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：js demo index
 */

import {pageLoadingHide} from '../../libs/js/utils'
import {ajaxGet, isJsonString, getTime} from '../js/public/public'
let url = '/info/news'
const tabList = ['区块链核心技术', '区块链行业应用', '通证经济与分布式商业', '投资专场', '区块链创新前沿', '数字资产存储与交易']
const foreNoon30 = [
    {
        time: '主持人',
        cont: '嘉宾: 刘　江  美团点评技术学院院长',
        guest: '',
        title: ''
    },
    {
        time: '9:00-9:20',
        cont: '通证派第66天',
        guest: '元　道',
        title: '中关村区块链产业联盟理事长'
    },
    {
        time: '09:00-10:00',
        cont: '十问2018区块链',
        guest: '王　峰',
        title: '蓝港互动创始人、火星财经发起人'
    },
    {
        time: '9:40-10:00',
        cont: '程序员伟大窗口期开启',
        guest: '蒋　涛',
        title: 'CSDN创始人&董事长、极客帮创始合伙人'
    },
    {
        time: '10:00-10:20',
        cont: 'DCO协议宣言仪式',
        guest: '',
        title: ''
    },
    {
        time: '10:20-10:40',
        cont: '一条公链的生机（生态）',
        guest: '达鸿飞',
        title: 'NEO创始人、Onchain分布科技创始人兼CEO'
    },
    {
        time: '10:40-11:00',
        cont: '20年互联网观察者眼中的区块链可能性演进',
        guest: '何宝宏',
        title: '中国信息通信研究院云计算与大数据研究所所长'
    },
    {
        time: '11:00-11:20',
        cont: '区块链未来世界和我的位置',
        guest: '帅 初',
        title: 'Qtum量子链联合创始人'
    },
    {
        time: '11:20-11:40',
        cont: '区块链技术和应用创新——热潮中的冷思考',
        guest: '陶曲明',
        title: '万向区块链股份公司副总经理'
    },
    {
        time: '11:40-12:00',
        cont: '如何搭建一个可大规模商用的区块链公链平台',
        guest: '周 迅',
        title: 'EKT通用积分CEO'
    }
]
const afterNoon30 = [
    {
        time: '13:30-13:50',
        cont: 'SCRY数据驱动区块链智能合约DAPP',
        guest: '符安文',
        title: 'SCRY创始人兼CEO'
    },
    {
        time: '13:50-14:10',
        cont: '区块链及其商业应用探讨',
        guest: '蒋 海',
        title: '布比创始人兼CEO'
    },
    {
        time: '14:10-14:30',
        cont: '矩阵元创始人兼CEO',
        guest: '孙立林',
        title: '下一代计算架构'
    },
    {
        time: '14:30-14:50',
        cont: '区块链协议栈',
        guest: '杨建新',
        title: '井通科技CTO'
    },
    {
        time: '14:50-15:10',
        cont: '主题演讲',
        guest: '张 健',
        title: '博晨创始人兼CEO、Zipper技术社区发起人'
    },
    {
        time: '15:10-15:30',
        cont: 'PCHAIN下一代的区块链3.0系统',
        guest: '曹 锋',
        title: 'PChain发起人'
    },
    {
        time: '15:30-15:40',
        cont: '中场休息',
        guest: '',
        title: ''
    },
    {
        time: '15:40-16:00',
        cont: '数字货币开启电商红利新纪元',
        guest: '卢 亮',
        title: 'Cybermiles CEO'
    },
    {
        time: '16:00-16:20',
        cont: 'Facebook的解体，重启百花齐放的互联网',
        guest: '姜孟君（笨总）',
        title: 'Merculet创始人'
    },
    {
        time: '16:20-17:20',
        cont: '主题演讲',
        guest: '神秘嘉宾',
        title: ''
    },
    {
        time: '17:20-17:40',
        cont: '区块链技术与未来的共享经济',
        guest: '陈伟星',
        title: ''
    },
    {
        time: '17:40-18:00',
        cont: '区块链技术在企业级应用实践',
        guest: '厉　晹 （Roy Li）',
        title: 'Ruff Chain创始人&Ruff CEO'
    }
]
const headList = [
    {
        list: [
            {
                img: '../img/5.jpg',
                name: '曹 锋',
                title: 'Pchain发起人'
            },
            {
                img: '../img/6.jpg',
                name: '陈伟星',
                title: '泛城资本董事长、快的打车创始人'
            },
            {
                img: '../img/7.jpg',
                name: '陈建闽',
                title: 'PMCAFF创始人& CEO '
            },
            {
                img: '../img/8.jpg',
                name: '陈雪涛',
                title: '麟玺创投创始合伙人'
            },
            {
                img: '../img/9.jpg',
                name: '达鸿飞',
                title: 'NEO创始人、Onchain分布科技创始人兼CEO'
            },
            {
                img: '../img/10.jpg',
                name: '符安文',
                title: 'SCRY创始人兼CEO'
            },
            {
                img: '../img/11.jpg',
                name: '傅 盛',
                title: '猎豹移动CEO'
            },
            {
                img: '../img/12.jpg',
                name: '付银海',
                title: '泰然金融CTO'
            },
            {
                img: '../img/13.jpg',
                name: '何宝宏',
                title: '中国信息通信研究院云计算与大数据研究所所长'
            },
            {
                img: '../img/14.jpg',
                name: '黄 建',
                title: '新加坡YEX交易所发起人'
            },
            {
                img: '../img/15.jpg',
                name: '蒋 海',
                title: '布比创始人兼CEO'
            },
            {
                img: '../img/16.jpg',
                name: '姜孟君',
                title: 'Merculet创始人'
            },
            {
                img: '../img/17.jpg',
                name: '康 烁',
                title: '柏链道捷CTO、清华大学区块链中心高级工程师'
            },
            {
                img: '../img/18.jpg',
                name: '雷志斌',
                title: '香港应用科技研究院智能软件和系统群组研发总监'
            },
            {
                img: '../img/19.jpg',
                name: '李 谱',
                title: 'Achain技术合伙人'
            },
            {
                img: '../img/20.jpg',
                name: '厉晹',
                title: 'Ruff Chain创始人& Ruff CEO'
            },
            {
                img: '../img/21.jpg',
                name: '刘 江',
                title: '美团点评技术学院院长'
            },
            {
                img: '../img/22.jpg',
                name: '卢 亮',
                title: 'Cybermiles CEO'
            },
            {
                img: '../img/23.jpg',
                name: '枪十七',
                title: '控银天下产品负责人'
            },
            {
                img: '../img/24.jpg',
                name: '帅 初',
                title: 'Qtum量子链联合创始人'
            },
            {
                img: '../img/25.jpg',
                name: '沈 杰',
                title: '物联网架构国际标准主编、SDChain首席科学家'
            },
            {
                img: '../img/26.jpg',
                name: '孙立林',
                title: '矩阵元创始人兼CEO'
            },
            {
                img: '../img/27.jpg',
                name: '隋 熙',
                title: 'CoinPaws联合创始人'
            }
        ]
    },
    {
        list: [
            {
                img: '../img/28.jpg',
                name: '陶曲明',
                title: '万向区块链股份公司副总经理'
            },
            {
                img: '../img/29.jpg',
                name: '万 涛',
                title: 'IDF极安客实验室联合创始人'
            },
            {
                img: '../img/30.jpg',
                name: '王 涛',
                title: 'SequoiaDB巨杉数据库联合创始人兼CTO'
            },
            {
                img: '../img/31.jpg',
                name: '王 玮',
                title: '北京志顶科技创始人'
            },
            {
                img: '../img/32.jpg',
                name: '王运嘉',
                title: 'VIPcoin创始人、枫玉科技创始人兼CEO'
            },
            {
                img: '../img/33.jpg',
                name: '王紫上',
                title: '波币创始人、云管理作者'
            },
            {
                img: '../img/34.jpg',
                name: '吴萌野',
                title: '丝链SilkChain首席架构师'
            },
            {
                img: '../img/35.jpg',
                name: '吴为龙',
                title: 'Genaro Network创始人、吉罗科技CTO'
            },
            {
                img: '../img/36.jpg',
                name: '武源文',
                title: '井通网络科技有限公司 CEO'
            },
            {
                img: '../img/37.jpg',
                name: '相里朋',
                title: '工信部电子五所高级工程师'
            },
            {
                img: '../img/38.jpg',
                name: '许建志',
                title: '微软首席项目经理主管'
            },
            {
                img: '../img/39.jpg',
                name: '杨德升',
                title: '原ofo技术副总裁'
            },
            {
                img: '../img/40.jpg',
                name: '杨建新',
                title: '井通科技CTO'
            },
            {
                img: '../img/41.jpg',
                name: '杨耀东',
                title: '夸克链基金会科学家、Demo++联合创始人'
            },
            {
                img: '../img/42.jpg',
                name: '叶 飞',
                title: '库神钱包创始合伙人&CTO;'
            },
            {
                img: '../img/43.jpg',
                name: '张宏亮',
                title: '蓝港互动区块链技术&游戏事业部负责人'
            },
            {
                img: '../img/44.jpg',
                name: '张 健',
                title: '博晨创始人兼CEO、Zipper技术社区发起人'
            },
            {
                img: '../img/45.jpg',
                name: '张 犁',
                title: 'UDAP联合创始人'
            },
            {
                img: '../img/46.jpg',
                name: '周 迅',
                title: 'EKT通用积分CEO'
            },
            {
                img: '../img/47.jpg',
                name: '周政军',
                title: 'TrustNote基金会创始人，区块链软件和芯片研发专家'
            },
            {
                img: '../img/48.jpg',
                name: '朱 江',
                title: '金山云区块链游戏业务负责人'
            },
            {
                img: '../img/49.jpg',
                name: '朱佩江',
                title: 'Pallet联合创始人，中关村区块链产业联盟秘书长'
            },
            {
                img: '../img/50.jpg',
                name: '邹 均',
                title: '海纳云CTO'
            }
        ]
    }
]
const data31 = [
    {
        list: [
            {
                time: '09:00',
                cont: '主持人',
                guest: '茹 琳',
                title: '币好CEO'
            },
            {
                time: '09:00-9:35',
                cont: '区块链技术发展——在不完美世界艰难前行',
                guest: '邹 均',
                title: '海纳云CTO'
            },
            {
                time: '09:35-10:10',
                cont: '区块链中间件驱动应用生态规模化落地',
                guest: '吴萌野',
                title: '丝链SilkChain首席架构师'
            },
            {
                time: '10:10-10:45',
                cont: '区块链：去中心化数据库',
                guest: '王 涛',
                title: 'SequoiaDB巨杉数据库联合创始人兼CTO'
            },
            {
                time: '10:45-11:20',
                cont: 'SPoR+PoS混合共识机制打造高性能公有链',
                guest: '吴为龙',
                title: 'Genaro Network创始人兼CTO'
            },
            {
                time: '11:20-11:55',
                cont: '区块链安全质量保障实践',
                guest: '相里朋',
                title: '工信部电子五所高级工程师'
            },
            {
                time: '11:55-13:30',
                cont: '午餐',
                guest: '',
                title: ''
            },
            {
                time: '13:30-14:00',
                cont: '打造高性能公链',
                guest: '杨耀东',
                title: '夸克链基金会科学家、Demo++联合创始人'
            },
            {
                time: '14:00-14:30',
                cont: 'Pallet-“细腰”链通互联网价值体系',
                guest: '朱佩江',
                title: 'Pallet联合创始人'
            },
            {
                time: '14:30-15:00',
                cont: '币安不安？——区块链安全那点事',
                guest: '万 涛',
                title: 'IDF极安客实验室联合创始人'
            },
            {
                time: '15:00-15:20',
                cont: '中场休息',
                guest: '',
                title: ''
            },
            {
                time: '15:20-15:50',
                cont: '深入以太坊DApp架构和开发实战',
                guest: '杨德升',
                title: '原ofo技术副总裁'
            },
            {
                time: '15:50-16:20',
                cont: 'ERC721/ERC821与通用区块链资产平台',
                guest: '张 犁',
                title: 'UDAP联合创始人'
            },
            {
                time: '16:20-16:50',
                cont: '智能合约——构建未来信任的基石',
                guest: '李 谱',
                title: 'Achain技术合伙人'
            },
            {
                time: '16:50-17:20',
                cont: '基于Linux 的挖矿操作系统',
                guest: '康 烁',
                title: '柏链道捷CTO、清华大学区块链中心高级工程师'
            }
        ]
    },
    {
        list: [
            {
                time: '09:00',
                cont: '主持人',
                guest: '商思林',
                title: '火星财经总编辑'
            },
            {
                time: '09:00-9:35',
                cont: '平行宇宙之桥——中心化应用与区块链世界的连接技术',
                guest: '王 玮',
                title: '北京志顶科技创始人'
            },
            {
                time: '09:35-10:10',
                cont: '企业导入区块链的设计模式与实践',
                guest: '许建志',
                title: '微软Azure Data Blockchain首席项目经理主管'
            },
            {
                time: '10:10-10:45',
                cont: '【颠覆VS融合】从产品视角看区块链行业应用变革',
                guest: '陈建闽（阿德）',
                title: 'PMCAFF&外包大师CEO、Nework CEO'
            },
            {
                time: '10:45-11:20',
                cont: '区块链金融科技创新',
                guest: '雷志斌',
                title: '香港应用科技研究院智能软件和系统群组研发总监'
            },
            {
                time: '11:20-11:55',
                cont: '穿越牛熊，Token投资量化技术指南',
                guest: '枪十七',
                title: '控银天下产品负责人'
            },
            {
                time: '11:55-13:30',
                cont: '午餐',
                guest: '',
                title: ''
            },
            {
                time: '13:30-14:00',
                cont: '区块链技术在金融借贷领域的应用实践',
                guest: '付银海',
                title: '泰然金融CTO'
            },
            {
                time: '14:00-14:30',
                cont: '区块链将带给游戏怎样的机会',
                guest: '张宏亮',
                title: '蓝港互动区块链技术&游戏事业部负责人'
            },
            {
                time: '14:30-15:00',
                cont: '区块链游戏绝不是“撸猫”那么简单',
                guest: '朱 江',
                title: '金山云区块链游戏业务负责人'
            },
            {
                time: '15:00-15:20',
                cont: '中场休息',
                guest: '',
                title: ''
            },
            {
                time: '15:20-15:50',
                cont: '游戏区块链化的平凡之路',
                guest: '隋 熙',
                title: 'CoinPaws联合创始人'
            },
            {
                time: '15:50-16:20',
                cont: 'UGC游戏的痛点及妖精购物街基于区块链技术的解决方案',
                guest: '黄 俊',
                title: '妖精购物街项目顾问、御宅游戏创始人'
            },
            {
                time: '16:20-16:50',
                cont: '牛顿：协议经济基础设施',
                guest: '徐继哲',
                title: '牛顿项目创始人&理事长、亦来云联合创始人'
            },
            {
                time: '16:50-17:20',
                cont: '主题演讲',
                guest: '神秘嘉宾',
                title: ''
            }
        ]
    },
    {
        list: [
            {
                time: '09:00',
                cont: '主持人',
                guest: '孟 岩',
                title: 'CSDN副总裁、柏链道捷CEO'
            },
            {
                time: '09:00-9:35',
                cont: '通证经济系统设计——原则和经验',
                guest: '孟 岩',
                title: 'CSDN副总裁、柏链道捷CEO'
            },
            {
                time: '09:35-10:10',
                cont: '证币链之通证关系',
                guest: '王运嘉',
                title: 'VIPcoin创始人、枫玉科技创始人兼CEO'
            },
            {
                time: '10:10-10:45',
                cont: '通证经济系统设计',
                guest: '王 玮',
                title: '北京志顶科技创始人'
            },
            {
                time: '10:45-11:55',
                cont: '圆桌论坛：哪些公链有潜力超越以太坊',
                guest: '孟岩（主持人）',
                title: 'CSDN副总裁、柏链道捷CEO'
            },
            {
                time: '',
                cont: '',
                guest: '元 道',
                title: '中关村区块链产业联盟理事长'
            },
            {
                time: '',
                cont: '',
                guest: '王运嘉',
                title: 'VIPcoin创始人、枫玉科技创始人兼CEO'
            },
            {
                time: '',
                cont: '',
                guest: '王 玮',
                title: '北京志顶科技创始人'
            }
        ]
    },
    {
        list: [
            {
                time: '13:30',
                cont: '主持人',
                guest: '任 铮',
                title: 'W基金负责人'
            },
            {
                time: '13:30-14:00',
                cont: '主题演讲',
                guest: '黄明明',
                title: '明势资本创始人'
            },
            {
                time: '14:00-14:30',
                cont: '主题演讲',
                guest: '黄峤濛',
                title: 'BKFund 联合创始人、首席分析师'
            },
            {
                time: '14:30-15:00',
                cont: '主题演讲',
                guest: '王 峰',
                title: 'W基金创始人'
            },
            {
                time: '15:00-15:20',
                cont: '中场休息',
                guest: '',
                title: ''
            },
            {
                time: '15:20-15:50',
                cont: 'NEO的投资逻辑和对区块链项目的筛选标准',
                guest: '朱威宇',
                title: 'NEO 投资合伙人'
            },
            {
                time: '15:50-16:20',
                cont: '如何做一个永不破发的区块链项目',
                guest: '王紫上',
                title: '波币创始人、云管理作者'
            },
            {
                time: '16:10-17:20',
                cont: '圆桌：2018年区块链投资机会在哪里？',
                guest: '任铮（主持人）',
                title: 'W基金负责人'
            },
            {
                time: '',
                cont: '',
                guest: '陆宏宇',
                title: '德同资本合伙人'
            },
            {
                time: '',
                cont: '',
                guest: '丰 驰',
                title: '创世资本合伙人'
            },
            {
                time: '',
                cont: '',
                guest: 'David Zhu',
                title: 'DAC和Vinci联合创始人'
            }
        ]
    },
    {
        list: [
            {
                time: '09:00',
                cont: '主持人',
                guest: 'Michael Yuan',
                title: 'Cybermiles首席科学家'
            },
            {
                time: '09:00-9:35',
                cont: '主题演讲',
                guest: 'Tim McCallum',
                title: '区块链技术开发者、Google技术导师'
            },
            {
                time: '09:35-10:10',
                cont: '物联网与区块链融合发展辨析',
                guest: '沈 杰',
                title: 'IoT架构国际标准主编、SDChain首席科学家'
            },
            {
                time: '10:10-10:45',
                cont: '主题演讲',
                guest: 'Marc Fleury',
                title: 'JBoss创始人、红帽软件执行副总裁'
            },
            {
                time: '10:45-11:20',
                cont: '芯链：如何通过软硬件结合解决区块链性能瓶颈问题',
                guest: '汪晓明',
                title: 'HPB芯链CEO'
            },
            {
                time: '11:20-11:55',
                cont: '高速异步的DAG分布式账本技术完美释放P2P网络价值',
                guest: '周政军 （Jeff Zhou）',
                title: 'TrustNote基金会创始人、区块链软件和芯片研发专家'
            }
        ]
    },
    {
        list: [
            {
                time: '13:30',
                cont: '主持人',
                guest: '许志宏',
                title: '脑洞大开创始人'
            },
            {
                time: '13:30-14:00',
                cont: '主题演讲',
                guest: 'Any',
                title: 'Bit-z COO'
            },
            {
                time: '14:00-14:30',
                cont: '数字资产投资生存指南',
                guest: '李天贺',
                title: 'Extrade创始人'
            },
            {
                time: '14:30-15:00',
                cont: 'Token二级市场的估值和治理',
                guest: '凌凤岐',
                title: 'CoinTiger创始人'
            },
            {
                time: '15:00-15:20',
                cont: '中场休息',
                guest: '',
                title: ''
            },
            {
                time: '15:20-15:50',
                cont: '去中心化的跨链钱包',
                guest: '陈 勇',
                title: 'Bituniverse创始人'
            },
            {
                time: '15:50-16:20',
                cont: '下一代交易所技术：重建加密资产交易所信誉',
                guest: '王桂杰',
                title: 'ThinkBit创始人'
            },
            {
                time: '16:20-16:50',
                cont: '区块链资产冷存储方案',
                guest: '叶 飞',
                title: '库神钱包创始合伙人&CTO'
            },
            {
                time: '16:50-17:20',
                cont: '圆桌：交易所眼中的好项目',
                guest: '李 成',
                title: 'MasterDax负责人'
            },
            {
                time: '',
                cont: '',
                guest: 'Any',
                title: 'Bit-z COO'
            },
            {
                time: '',
                cont: '',
                guest: '娄焕庆',
                title: 'Litex顾问'
            },
            {
                time: '',
                cont: '',
                guest: '谢智勇',
                title: 'CEC首席战略顾问'
            },
            {
                time: '',
                cont: '',
                guest: 'Jason Zhang',
                title: 'CoinTiger COO'
            }
        ]
    }
]
$(function () {
    pageLoadingHide()
    let currentPage = 1
    let moreState = true
    let totalPage = 1
    let INLIST = window.location.href.indexOf('btaList') !== -1
    // 热点轮播
    let hot = new Swiper('.hot-swiper', {
        autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false
        },
        spaceBetween: -60,
        initialSlide: 1,
        observer: true,
        preventClicks: false,
        observeParents: true
    })

    // 新闻列表
    const getNewsList = (obj) => {
        const {currentPage, type, fn} = obj
        if (currentPage > totalPage) {
            $('#news-more').html(INLIST ? '已加载全部~' : '查看更多').addClass('grey')
            return false
        }
        let data = {
            currentPage: currentPage,
            pageSize: INLIST ? 10 : 4,
            channelId: 12
        }

        ajaxGet(url + '/shownews', data, function (data) {
            let newsList = data.obj.inforList
            if (newsList.length === 0) {
                $('.news-content').html(`<p class="no-data">暂无相关新闻</p>`)
                return false
            }
            totalPage = data.obj.pageCount
            let liContent = ''
            newsList.map((item, index) => {
                let pic = isJsonString(item.coverPic) ? JSON.parse(item.coverPic) : ''
                liContent += `<li class="news-item" data-id=${item.id}>
                        <p class="news-img">
                            <img src=${pic.m_subject} alt="">
                        </p>
                        <div class="news-item-content">
                            <p class="news-item-title">${item.title}</p>
                            <p class="news-item-desc">${item.synopsis}</p>
                        </div>
                        <p class="news-date">${getTime(item.publishTime, Date.parse(new Date()))}</p>
                    </li>`
            })
            if (type === 'addMore') {
                $('.news-content').append(liContent)
            } else {
                $('.news-content').html(liContent)
            }
            if (fn) {
                fn()
            }
        })
    }

    getNewsList({
        currentPage: 1,
        type: ''
    })

    // 推荐新闻轮播
    !INLIST && ajaxGet('/info/news/shownews', {
        currentPage: 1,
        pageSize: 5,
        recommend: 1,
        channelId: 12
    }, function (data) {
        let newsList = data.obj.inforList
        let swiperSlide = ''
        newsList.map((item, index) => {
            let pic = isJsonString(item.coverPic) ? JSON.parse(item.coverPic) : ''
            swiperSlide += `<div class="swiper-slide" data-id=${item.id}>
                    <div class="swiper-item">
                        <span class="mode"></span>
                        <img src=${pic.m_hot_subject} alt="">
                        <p class="news-title">
                            ${item.title}
                        </p>
                    </div>
                </div>`
        })
        $('.hot-swiper .swiper-wrapper').html(swiperSlide)
    })

    // 快讯
    !INLIST && ajaxGet('/info/lives/showlives', {
        queryTime: '',
        currentPage: 1,
        channelId: 5,
        pageSize: 5
    }, function (data) {
        let newsList = data.obj.inforList
        if (newsList.length === 0) {
            $('.live-swiper .live-wrapper').html(`<p class="no-data">暂无相关快讯</p>`)
            return false
        }
        let swiperSlide = ''
        newsList.map((item, index) => {
            swiperSlide += `<div class="live-slide" data-id=${item.id}>
                    <div class="live-content">
                            <span class="create-time">${getTime(item.createdTime, Date.parse(new Date()))}</span>
                            <span class="separate"> | </span>
                            <span class="content">${item.content}</span>
                    </div>
                </div>`
        })
        $('.live-swiper .live-wrapper').html(swiperSlide)
    })

    $('.news-content').on('click', '.news-item', function (e) {
        e.preventDefault()
        window.location.href = '/details.html?id=' + $(e.currentTarget).attr('data-id')
    })

    $('.hot-swiper').on('click', '.swiper-wrapper .swiper-slide', function (e) {
        e.preventDefault()
        window.location.href = '/details.html?id=' + $(e.currentTarget).attr('data-id')
    })

    $('.live-more').click(function () {
        window.location.href = '/?from=bta'
    })

    $('.news-more').click(() => {
        if (INLIST) {
            getNewsList({
                currentPage: ++currentPage,
                type: 'addMore',
                fn: function () {
                    moreState = true
                }
            })
        } else {
            window.location.href = '/btaList.html'
        }
    })

    // 如果在list 页面则触发滚动效果
    INLIST && $(window).on('scroll', function () {
        let btnMoreTop = $('#news-more').offset().top
        let nowtop = $(window).scrollTop() + $(window).height()
        if (nowtop > btnMoreTop && moreState) {
            moreState = false
            let page = ++currentPage
            getNewsList({
                currentPage: page,
                type: 'addMore',
                fn: function () {
                    moreState = true
                }
            })
        }
    })

    $('.date-btn span').click((e) => {
        $(e.target).addClass('active').siblings().removeClass('active')
        $('.dynamic-swiper').removeClass('active').eq($(e.target).index()).addClass('active')
    })

    // 演讲人员轮播
    let lecture = new Swiper('.lecture-swiper', {
        freeMode: true,
        observer: true,
        touchRatio: 0.2,
        slidesPerView: 'auto',
        observeParents: true
    })
    console.log(lecture, hot)

    $('.menu-btn').click(function (e) {
        e.stopPropagation()
        $('.menu-modal').show()
    })

    $('.close-modal').click(function (e) {
        e.preventDefault()
        $('.menu-modal').hide()
    })
    // 锚点滑动
    $('a[href *= "#"], area[href *= "#"]').on('click', function () {
        $('.menu-modal').hide()
        $(this).addClass('active').siblings().removeClass('active')
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let $target = $(this.hash)
            $target = ($target.length && $target) || $('[name=' + this.hash.slice(1) + ']')
            if ($target.length) {
                let targetOffset = $target.offset().top
                $('html, body').scrollTop(targetOffset)
                return false
            }
        }
    })

    // 30 号上午议程
    let data30fore = ''
    foreNoon30.map((item, index) => {
        data30fore += `<tbody>
                            <tr>
                                <td class="agenda-data">${item.time}</td>
                                <td class="agenda-title">${item.cont}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="agenda-desc">${item.guest.trim() !== '' ? '嘉宾：' + item.guest : ''}   ${item.title} </td>
                            </tr>
                        </tbody>`
    })
    $('.left-btn-swiper .forenoon').html(data30fore)

    // 30 号下午议程
    let data30after = ''
    afterNoon30.map((item, index) => {
        data30after += `<tbody>
                            <tr>
                                <td class="agenda-data">${item.time}</td>
                                <td class="agenda-title">${item.cont}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="agenda-desc">${item.guest.trim() !== '' ? '嘉宾：' + item.guest : ''}   ${item.title} </td>
                            </tr>
                        </tbody>`
    })
    $('.left-btn-swiper .afternoon').html(data30after)

    // 31 号轮播title
    let nav = ''
    tabList.map((item, index) => {
        nav += `<div class="swiper-slide">
                    <p class="swiper-item">${item}</p>
                </div>`
    })
    // nav += `<div class="swiper-slide"></div>`
    $('.right-swiper-title .swiper-wrapper').html(nav)

    let data31content = ''
    data31.map((item, index) => {
        let tableContent = ''
        item.list.map((ele, index) => {
            tableContent += `<tr>
                                <td class="agenda-data">${ele.time}</td>
                                <td class="agenda-title">${ele.cont}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="agenda-desc">${ele.guest.trim() !== '' ? '嘉宾：' + ele.guest : ''}   ${ele.title} </td>
                            </tr>`
        })
        data31content += `<div class="swiper-slide">
                            <table class="swiper-item">
                                ${tableContent}
                            </table>
                        </div>`
    })
    // data31content += `<div class="swiper-slide"></div>`
    $('.right-swiper-body .swiper-wrapper').html(data31content)

    // 议程title轮播
    let rightTitle = new Swiper('.right-btn-swiper .swiper-title', {
        observer: true,
        preventClicks: false,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        observeParents: true,
        centeredSlides: true,
        loop: true,
        loopedSlides: 6,
        touchRatio: 0.2
    })

    // 议程body轮播
    let rightBody = new Swiper('.right-btn-swiper .swiper-body', {
        observer: true,
        preventClicks: false,
        slidesPerView: 'auto',
        spaceBetween: 40,
        loop: true,
        loopedSlides: 6,
        observeParents: true,
        autoHeight: true
    })
    if (!INLIST) {
        rightTitle.controller.control = rightBody
        rightBody.controller.control = rightTitle
    }

    // 头像轮播
    let headContent = ''
    headList.map((item, index) => {
        let ul = ''
        item.list.map((ele, index) => {
            ul += `<li class="lecture-item">
                        <img src=${ele.img} alt="">
                        <p class="lecture-name">${ele.name}</p>
                        <p class="lecture-desc">${ele.title}</p>
                    </li>`
        })
        headContent += `<ul class="lecture-content clearfix">${ul}</ul>`
    })
    $('.lecture-swiper .swiper-slide').html(headContent)

    $('.wx').click(function (e) {
        e.stopPropagation()
        $('.qrCode').toggleClass('active')
    })

    $('body').click(function () {
        $('.qrCode').removeClass('active')
    })
})
