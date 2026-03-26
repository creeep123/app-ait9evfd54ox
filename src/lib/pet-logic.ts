/**
 * 根据生日计算星座
 */
export const getZodiacSign = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '白羊座';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '金牛座';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return '双子座';
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return '巨蟹座';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '狮子座';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '处女座';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return '天秤座';
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return '天蝎座';
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return '射手座';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '摩羯座';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '水瓶座';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return '双鱼座';
  
  return '未知';
};

/**
 * 星座元素分类
 */
export const getZodiacElement = (sign: string): string => {
  const fire = ['白羊座', '狮子座', '射手座'];
  const earth = ['金牛座', '处女座', '摩羯座'];
  const air = ['双子座', '天秤座', '水瓶座'];
  const water = ['巨蟹座', '天蝎座', '双鱼座'];

  if (fire.includes(sign)) return '火象';
  if (earth.includes(sign)) return '土象';
  if (air.includes(sign)) return '风象';
  if (water.includes(sign)) return '水象';
  return '未知';
};

export interface Question {
  id: number;
  text: string;
  options: { label: string; value: string; score: Record<string, number> }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "你的日常生活节奏是？",
    options: [
      { label: "A. 规律作息，喜欢稳定", value: "A", score: { "英短蓝猫": 2, "仓鼠": 2, "兔子": 1 } },
      { label: "B. 随性自由，喜欢变化", value: "B", score: { "柯基犬": 2, "鹦鹉": 2, "兔子": 1 } }
    ]
  },
  {
    id: 2,
    text: "你更喜欢哪种相处方式？",
    options: [
      { label: "A. 黏人陪伴型", value: "A", score: { "柯基犬": 2, "鹦鹉": 1, "兔子": 2 } },
      { label: "B. 独立自在型", value: "B", score: { "英短蓝猫": 2, "仓鼠": 2, "鹦鹉": 1 } }
    ]
  },
  {
    id: 3,
    text: "你的居住环境是？",
    options: [
      { label: "A. 较小的公寓", value: "A", score: { "英短蓝猫": 2, "仓鼠": 2, "兔子": 1 } },
      { label: "B. 宽敞的房子或有院子", value: "B", score: { "柯基犬": 2, "鹦鹉": 1, "兔子": 1 } }
    ]
  },
  {
    id: 4,
    text: "你能接受的互动频率是？",
    options: [
      { label: "A. 随时互动，越多越好", value: "A", score: { "柯基犬": 2, "鹦鹉": 2 } },
      { label: "B. 偶尔互动，各自安静", value: "B", score: { "英短蓝猫": 2, "仓鼠": 2, "兔子": 2 } }
    ]
  },
  {
    id: 5,
    text: "你对宠物叫声的接受度？",
    options: [
      { label: "A. 完全没问题", value: "A", score: { "柯基犬": 2, "鹦鹉": 2 } },
      { label: "B. 希望安静一些", value: "B", score: { "英短蓝猫": 2, "仓鼠": 2, "兔子": 2 } }
    ]
  },
  {
    id: 6,
    text: "你日常的工作/学习时长大约是？",
    options: [
      { label: "A. 时间充裕，有大量闲暇", value: "A", score: { "柯基犬": 2, "鹦鹉": 2, "兔子": 1 } },
      { label: "B. 节奏紧凑，经常需要加班", value: "B", score: { "英短蓝猫": 2, "仓鼠": 2, "兔子": 1 } }
    ]
  },
  {
    id: 7,
    text: "你觉得自己目前的精力/健康状况如何？",
    options: [
      { label: "A. 精力旺盛，热爱户外活动", value: "A", score: { "柯基犬": 3, "兔子": 1 } },
      { label: "B. 偶尔疲惫，更倾向居家休养", value: "B", score: { "英短蓝猫": 2, "仓鼠": 2, "鹦鹉": 1, "兔子": 1 } }
    ]
  }
];

export interface Pet {
  id: string;
  name: string;
  image: string;
  description: string;
  traits: string[];
}

export const petPool: Pet[] = [
  {
    id: 'british_shorthair',
    name: "英短蓝猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_a0e05404-2e9c-42bb-991a-14d611dbcfa6.jpg",
    description: "你们都喜欢安静，超级合拍！它是最懂你独立空间的伴侣。",
    traits: ["喜欢安静", "独立", "小空间居住"]
  },
  {
    id: 'corgi',
    name: "柯基犬",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_1f289281-9468-45a4-977f-f75ca3bc7b25.jpg",
    description: "你充满活力，柯基的热情能瞬间点燃你的生活！",
    traits: ["活泼好动", "喜欢互动", "有活动空间"]
  },
  {
    id: 'hamster',
    name: "仓鼠",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_a86e69bf-d433-435c-9e87-223ba9ca581c.jpg",
    description: "规律的生活节奏让你们的相处非常和谐，它在角落里默默陪伴着你。",
    traits: ["规律作息", "空间有限", "喜欢观察"]
  },
  {
    id: 'rabbit',
    name: "兔子",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_2be374b6-98fb-452b-8b22-d9fafc94484c.jpg",
    description: "温和的心灵最适合温柔的你，一起享受宁静的午后吧。",
    traits: ["温和安静", "喜欢陪伴", "不过度依赖"]
  },
  {
    id: 'parrot',
    name: "鹦鹉",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_adb84c0f-455d-41c4-bc33-24b06afc37d0.jpg",
    description: "喜欢交流的你遇上健谈的它，生活永远不会寂寞！",
    traits: ["喜欢互动", "接受叫声", "有耐心"]
  }
];

/**
 * 推荐算法：计算匹配分数并返回推荐列表
 */
export const calculateMatch = (zodiac: string, answers: string[]): Pet[] => {
  const scores: Record<string, number> = {};
  
  // 初始化分数
  petPool.forEach(pet => scores[pet.name] = 0);

  // 根据问答加分
  answers.forEach((ans, index) => {
    const question = questions[index];
    const option = question.options.find(o => o.value === ans);
    if (option) {
      Object.entries(option.score).forEach(([petName, score]) => {
        if (scores[petName] !== undefined) {
          scores[petName] += score;
        }
      });
    }
  });

  // 根据星座加分 (示例逻辑：火象喜欢柯基，土象喜欢仓鼠，风象喜欢鹦鹉，水象喜欢蓝猫)
  const element = getZodiacElement(zodiac);
  if (element === '火象') scores['柯基犬'] += 2;
  if (element === '土象') scores['仓鼠'] += 2;
  if (element === '风象') scores['鹦鹉'] += 2;
  if (element === '水象') scores['英短蓝猫'] += 2;
  
  // 随机取3-5个推荐，按分数排序
  const sortedPets = [...petPool].sort((a, b) => (scores[b.name] || 0) - (scores[a.name] || 0));
  
  return sortedPets.slice(0, 5); // 取前5名
};
