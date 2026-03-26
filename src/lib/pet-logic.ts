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
      { 
        label: "A. 规律作息，喜欢稳定", 
        value: "A", 
        score: { 
          "英国短毛猫": 2, "波斯猫": 2, "苏格兰折耳猫": 2,
          "金丝熊仓鼠": 2, "三线仓鼠": 2, "龙猫": 1,
          "荷兰垂耳兔": 2, "迷你力斯兔": 1, "文鸟": 2, "金丝雀": 1
        } 
      },
      { 
        label: "B. 随性自由，喜欢变化", 
        value: "B", 
        score: { 
          "柯基犬": 2, "哈士奇": 2, "边境牧羊犬": 2,
          "孟加拉豹猫": 2, "暹罗猫": 2, "美国短毛猫": 1,
          "虎皮鹦鹉": 2, "玄凤鹦鹉": 1, "蜜袋鼯": 2
        } 
      }
    ]
  },
  {
    id: 2,
    text: "你更喜欢哪种相处方式？",
    options: [
      { 
        label: "A. 黏人陪伴型", 
        value: "A", 
        score: { 
          "柯基犬": 2, "金毛寻回犬": 3, "萨摩耶": 2, "贵宾犬": 2,
          "布偶猫": 3, "暹罗猫": 2,
          "荷兰垂耳兔": 2, "狮子兔": 1,
          "牡丹鹦鹉": 2, "蜜袋鼯": 3, "豚鼠": 2
        } 
      },
      { 
        label: "B. 独立自在型", 
        value: "B", 
        score: { 
          "英国短毛猫": 3, "美国短毛猫": 2, "柴犬": 2,
          "金丝熊仓鼠": 2, "三线仓鼠": 2, "龙猫": 2, "刺猬": 3,
          "文鸟": 1, "金丝雀": 1
        } 
      }
    ]
  },
  {
    id: 3,
    text: "你的居住环境是？",
    options: [
      { 
        label: "A. 较小的公寓", 
        value: "A", 
        score: { 
          "英国短毛猫": 2, "苏格兰折耳猫": 2, "波斯猫": 2,
          "吉娃娃": 3, "贵宾犬": 2,
          "金丝熊仓鼠": 2, "三线仓鼠": 3, "刺猬": 2,
          "虎皮鹦鹉": 2, "文鸟": 2, "玄凤鹦鹉": 1
        } 
      },
      { 
        label: "B. 宽敞的房子或有院子", 
        value: "B", 
        score: { 
          "柯基犬": 2, "金毛寻回犬": 3, "哈士奇": 3, "萨摩耶": 3, "边境牧羊犬": 3,
          "缅因猫": 2, "孟加拉豹猫": 2,
          "佛兰德巨兔": 3, "非洲灰鹦鹉": 2
        } 
      }
    ]
  },
  {
    id: 4,
    text: "你能接受的互动频率是？",
    options: [
      { 
        label: "A. 随时互动，越多越好", 
        value: "A", 
        score: { 
          "柯基犬": 2, "金毛寻回犬": 3, "贵宾犬": 2, "边境牧羊犬": 3,
          "暹罗猫": 2, "布偶猫": 2,
          "虎皮鹦鹉": 3, "玄凤鹦鹉": 2, "非洲灰鹦鹉": 3,
          "豚鼠": 2, "蜜袋鼯": 2
        } 
      },
      { 
        label: "B. 偶尔互动，各自安静", 
        value: "B", 
        score: { 
          "英国短毛猫": 3, "波斯猫": 2, "美国短毛猫": 2,
          "金丝熊仓鼠": 2, "三线仓鼠": 2, "龙猫": 2, "刺猬": 3,
          "荷兰垂耳兔": 2, "迷你力斯兔": 2,
          "文鸟": 2, "金丝雀": 2
        } 
      }
    ]
  },
  {
    id: 5,
    text: "你对宠物叫声的接受度？",
    options: [
      { 
        label: "A. 完全没问题", 
        value: "A", 
        score: { 
          "柯基犬": 2, "哈士奇": 2, "萨摩耶": 1, "吉娃娃": 2,
          "暹罗猫": 2,
          "虎皮鹦鹉": 3, "玄凤鹦鹉": 2, "非洲灰鹦鹉": 2, "牡丹鹦鹉": 2,
          "豚鼠": 2, "金丝雀": 2
        } 
      },
      { 
        label: "B. 希望安静一些", 
        value: "B", 
        score: { 
          "英国短毛猫": 3, "波斯猫": 2, "苏格兰折耳猫": 2, "布偶猫": 2,
          "金丝熊仓鼠": 2, "三线仓鼠": 2, "龙猫": 2, "刺猬": 2,
          "荷兰垂耳兔": 2, "迷你力斯兔": 2, "狮子兔": 2,
          "文鸟": 1
        } 
      }
    ]
  },
  {
    id: 6,
    text: "你日常的工作/学习时长大约是？",
    options: [
      { 
        label: "A. 时间充裕，有大量闲暇", 
        value: "A", 
        score: { 
          "柯基犬": 2, "金毛寻回犬": 3, "哈士奇": 3, "边境牧羊犬": 3,
          "暹罗猫": 2, "布偶猫": 2,
          "荷兰垂耳兔": 2, "狮子兔": 1,
          "虎皮鹦鹉": 2, "非洲灰鹦鹉": 3, "蜜袋鼯": 2
        } 
      },
      { 
        label: "B. 节奏紧凑，经常需要加班", 
        value: "B", 
        score: { 
          "英国短毛猫": 3, "美国短毛猫": 2, "柴犬": 2,
          "金丝熊仓鼠": 2, "三线仓鼠": 2, "龙猫": 2, "刺猬": 2,
          "迷你力斯兔": 2,
          "文鸟": 2, "金丝雀": 1
        } 
      }
    ]
  },
  {
    id: 7,
    text: "你觉得自己目前的精力/健康状况如何？",
    options: [
      { 
        label: "A. 精力旺盛，热爱户外活动", 
        value: "A", 
        score: { 
          "柯基犬": 3, "金毛寻回犬": 3, "哈士奇": 4, "萨摩耶": 3, "边境牧羊犬": 4,
          "孟加拉豹猫": 2, "美国短毛猫": 1,
          "佛兰德巨兔": 1
        } 
      },
      { 
        label: "B. 偶尔疲惫，更倾向居家休养", 
        value: "B", 
        score: { 
          "英国短毛猫": 3, "波斯猫": 2, "苏格兰折耳猫": 2, "布偶猫": 2,
          "吉娃娃": 2, "贵宾犬": 1, "柴犬": 1,
          "金丝熊仓鼠": 2, "三线仓鼠": 2, "龙猫": 2, "刺猬": 2,
          "荷兰垂耳兔": 2, "迷你力斯兔": 2, "狮子兔": 2,
          "虎皮鹦鹉": 1, "玄凤鹦鹉": 1, "文鸟": 2
        } 
      }
    ]
  }
];

export interface Pet {
  id: string;
  name: string;
  category: string; // 物种分类
  image: string;
  description: string;
  traits: string[];
  personality: string[]; // 性格标签
}

export const petPool: Pet[] = [
  // 猫科 - 8种
  {
    id: 'british_shorthair',
    name: "英国短毛猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_7997cf78-5631-47d3-b2ec-6d08365d4ed1.jpg",
    description: "你们都喜欢安静，超级合拍！它是最懂你独立空间的伴侣。",
    traits: ["喜欢安静", "独立", "小空间"],
    personality: ["独立", "安静", "温和"]
  },
  {
    id: 'ragdoll',
    name: "布偶猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_f520bd87-bba3-4a5a-ab7a-4ecfdfde9945.jpg",
    description: "温柔黏人的它就像你的小跟班，时刻陪伴在你身边。",
    traits: ["温顺黏人", "适合陪伴", "中等空间"],
    personality: ["温顺", "黏人", "安静"]
  },
  {
    id: 'scottish_fold',
    name: "苏格兰折耳猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_d0a31c0b-0d14-4bb5-9f7e-e61eaf0de460.jpg",
    description: "呆萌可爱的它能瞬间融化你的心，是治愈系的最佳选择。",
    traits: ["呆萌可爱", "温和", "小空间"],
    personality: ["温和", "安静", "可爱"]
  },
  {
    id: 'american_shorthair',
    name: "美国短毛猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_e9cf5e63-bc72-4bf4-89ef-383547948f73.jpg",
    description: "活泼又独立的它，既能陪你玩耍，也懂得给你空间。",
    traits: ["活泼独立", "适应力强", "中等空间"],
    personality: ["活泼", "独立", "友善"]
  },
  {
    id: 'persian',
    name: "波斯猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_880b93e1-d182-46eb-9662-df7a90c95e17.jpg",
    description: "优雅高贵的它需要你的细心呵护，适合享受慢生活的你。",
    traits: ["优雅安静", "需要打理", "小空间"],
    personality: ["优雅", "安静", "温和"]
  },
  {
    id: 'siamese',
    name: "暹罗猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_49ddb86b-6d6c-43e1-95c5-5d281c8d481c.jpg",
    description: "聪明健谈的它喜欢和你互动交流，是最佳的倾听者。",
    traits: ["聪明活泼", "喜欢交流", "中等空间"],
    personality: ["聪明", "活泼", "健谈"]
  },
  {
    id: 'maine_coon',
    name: "缅因猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_5b41b908-0f87-409e-96a4-126d46d51c5b.jpg",
    description: "温柔的巨人，体型大但性格超温和，是家庭的守护者。",
    traits: ["温和友善", "体型较大", "大空间"],
    personality: ["温和", "友善", "稳重"]
  },
  {
    id: 'bengal',
    name: "孟加拉豹猫",
    category: "猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_3b442b28-e9d0-47c1-a31f-e4cae3fe6b31.jpg",
    description: "充满野性魅力的它精力充沛，适合喜欢冒险的你。",
    traits: ["精力充沛", "好奇心强", "大空间"],
    personality: ["活泼", "好奇", "独立"]
  },

  // 犬科 - 8种
  {
    id: 'corgi',
    name: "柯基犬",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_1f289281-9468-45a4-977f-f75ca3bc7b25.jpg",
    description: "你充满活力，柯基的热情能瞬间点燃你的生活！",
    traits: ["活泼好动", "喜欢互动", "中等空间"],
    personality: ["活泼", "友善", "聪明"]
  },
  {
    id: 'golden_retriever',
    name: "金毛寻回犬",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_8026d323-4d3c-4814-847b-8dfacfb82209.jpg",
    description: "温暖的大暖男，它的笑容能治愈你所有的疲惫。",
    traits: ["温顺友善", "喜欢陪伴", "大空间"],
    personality: ["温顺", "友善", "忠诚"]
  },
  {
    id: 'husky',
    name: "哈士奇",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_9c2f26d9-5143-4213-bf3e-621bf962cb16.jpg",
    description: "精力旺盛的二哈，能给你的生活带来无限欢乐和惊喜。",
    traits: ["精力旺盛", "活泼搞笑", "大空间"],
    personality: ["活泼", "好动", "搞笑"]
  },
  {
    id: 'poodle',
    name: "贵宾犬",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_7264f4d7-ca01-4838-bfe8-991d16d2c33a.jpg",
    description: "聪明优雅的它，既是你的玩伴也是你的小助手。",
    traits: ["聪明优雅", "不易掉毛", "中等空间"],
    personality: ["聪明", "活泼", "优雅"]
  },
  {
    id: 'shiba',
    name: "柴犬",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_c710312c-85a3-4d4e-b1bb-efd8e880dfe6.jpg",
    description: "独立又忠诚的柴柴，是最懂你的小伙伴。",
    traits: ["独立忠诚", "干净整洁", "中等空间"],
    personality: ["独立", "忠诚", "警觉"]
  },
  {
    id: 'chihuahua',
    name: "吉娃娃",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_9ad40bba-f356-48a3-be4b-c139727549de.jpg",
    description: "小巧玲珑的它，是最适合公寓生活的贴心小棉袄。",
    traits: ["体型迷你", "黏人", "小空间"],
    personality: ["警觉", "黏人", "勇敢"]
  },
  {
    id: 'samoyed',
    name: "萨摩耶",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_0e66d5b9-a449-454a-b74a-cf0c2bc5da08.jpg",
    description: "微笑天使，它的笑容和温柔能融化你的心。",
    traits: ["温柔友善", "喜欢互动", "大空间"],
    personality: ["温柔", "友善", "活泼"]
  },
  {
    id: 'border_collie',
    name: "边境牧羊犬",
    category: "狗",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_588d00a0-8d55-4459-8e00-a0f51d363f4a.jpg",
    description: "智商第一的它，能和你玩各种互动游戏，永不厌倦。",
    traits: ["极其聪明", "精力充沛", "大空间"],
    personality: ["聪明", "活泼", "专注"]
  },

  // 小型宠物 - 6种
  {
    id: 'syrian_hamster',
    name: "金丝熊仓鼠",
    category: "仓鼠",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_a86e69bf-d433-435c-9e87-223ba9ca581c.jpg",
    description: "规律的生活节奏让你们的相处非常和谐，它在角落里默默陪伴着你。",
    traits: ["规律作息", "空间有限", "独居"],
    personality: ["安静", "独立", "可爱"]
  },
  {
    id: 'dwarf_hamster',
    name: "三线仓鼠",
    category: "仓鼠",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_d16c5c49-ab52-48ec-a9d1-8deaac67d528.jpg",
    description: "小巧可爱的它，是最适合新手的入门级萌宠。",
    traits: ["体型迷你", "好养活", "极小空间"],
    personality: ["活泼", "可爱", "好奇"]
  },
  {
    id: 'guinea_pig',
    name: "豚鼠",
    category: "豚鼠",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_d355695f-82e4-4e3a-a442-4f6970eac5a2.jpg",
    description: "温顺爱叫的小家伙，会用叫声和你交流，超级有趣。",
    traits: ["温顺友善", "喜欢交流", "小空间"],
    personality: ["温顺", "友善", "活泼"]
  },
  {
    id: 'chinchilla',
    name: "龙猫",
    category: "龙猫",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_543ddc27-1534-4787-a00e-6f736eca2fe5.jpg",
    description: "软萌的毛球，喜欢在夜晚活动，是夜猫子的最佳伴侣。",
    traits: ["夜行性", "柔软可爱", "中等空间"],
    personality: ["温和", "独立", "可爱"]
  },
  {
    id: 'hedgehog',
    name: "刺猬",
    category: "刺猬",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_17967fb6-ca5e-4f50-a58e-0271007154d9.jpg",
    description: "外表带刺内心温柔，就像你一样需要时间才能打开心扉。",
    traits: ["独特个性", "夜行性", "小空间"],
    personality: ["独立", "安静", "独特"]
  },
  {
    id: 'sugar_glider',
    name: "蜜袋鼯",
    category: "蜜袋鼯",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_292eb8f4-06fb-4d92-bdbd-de18ee102604.jpg",
    description: "会飞的小精灵，喜欢和你建立深厚的情感联系。",
    traits: ["需要陪伴", "夜行性", "中等空间"],
    personality: ["黏人", "活泼", "社交"]
  },

  // 兔科 - 4种
  {
    id: 'holland_lop',
    name: "荷兰垂耳兔",
    category: "兔",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_e617b86c-b3d6-4a61-a49c-1aca0fefa269.jpg",
    description: "温和的心灵最适合温柔的你，一起享受宁静的午后吧。",
    traits: ["温和安静", "喜欢陪伴", "中等空间"],
    personality: ["温和", "安静", "友善"]
  },
  {
    id: 'lionhead_rabbit',
    name: "狮子兔",
    category: "兔",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_51ac0229-5b74-44cb-916a-fa8f9b523afb.jpg",
    description: "毛茸茸的小狮子，呆萌可爱，是拍照的最佳模特。",
    traits: ["呆萌可爱", "需要打理", "中等空间"],
    personality: ["温和", "可爱", "安静"]
  },
  {
    id: 'mini_rex',
    name: "迷你力斯兔",
    category: "兔",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_64e322f1-bdd6-4fb5-acf0-f8d1ff809356.jpg",
    description: "天鹅绒般的毛发，摸起来超级舒服，是解压神器。",
    traits: ["毛质柔软", "体型适中", "中等空间"],
    personality: ["温和", "友善", "安静"]
  },
  {
    id: 'flemish_giant',
    name: "佛兰德巨兔",
    category: "兔",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_04e11959-9806-472a-bd23-025fdbad0276.jpg",
    description: "温柔的巨兔，虽然体型大但性格超级温和。",
    traits: ["体型巨大", "温和友善", "大空间"],
    personality: ["温和", "稳重", "友善"]
  },

  // 鸟类 - 6种
  {
    id: 'budgerigar',
    name: "虎皮鹦鹉",
    category: "鹦鹉",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_adb84c0f-455d-41c4-bc33-24b06afc37d0.jpg",
    description: "喜欢交流的你遇上健谈的它，生活永远不会寂寞！",
    traits: ["喜欢互动", "会学说话", "小空间"],
    personality: ["活泼", "健谈", "聪明"]
  },
  {
    id: 'cockatiel',
    name: "玄凤鹦鹉",
    category: "鹦鹉",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_6f22b701-b5d5-4f14-bdbc-be67f9d03763.jpg",
    description: "会吹口哨的小可爱，能和你一起合奏美妙的音乐。",
    traits: ["温顺友善", "会吹口哨", "中等空间"],
    personality: ["温顺", "友善", "音乐"]
  },
  {
    id: 'lovebird',
    name: "牡丹鹦鹉",
    category: "鹦鹉",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_7e98a659-fd9b-4752-af64-59141b077a23.jpg",
    description: "成双成对的爱情鸟，见证你的浪漫时光。",
    traits: ["成对饲养", "色彩鲜艳", "小空间"],
    personality: ["活泼", "黏人", "社交"]
  },
  {
    id: 'canary',
    name: "金丝雀",
    category: "鸣禽",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_1fdedb43-f6af-4d46-8bf4-8b647f9203c5.jpg",
    description: "天籁般的歌声，每天清晨都能被美妙的歌声唤醒。",
    traits: ["歌声动听", "色彩鲜艳", "小空间"],
    personality: ["安静", "优雅", "歌唱"]
  },
  {
    id: 'java_sparrow',
    name: "文鸟",
    category: "鸣禽",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_4e49cd56-c41d-4f8c-babc-b31c8120e366.jpg",
    description: "小巧安静的它，是最适合公寓饲养的鸟类伴侣。",
    traits: ["体型小巧", "安静", "极小空间"],
    personality: ["安静", "温和", "可爱"]
  },
  {
    id: 'african_grey',
    name: "非洲灰鹦鹉",
    category: "鹦鹉",
    image: "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_d59c1fcf-0010-4d68-adb6-9d4d1aa1d202.jpg",
    description: "智商超高的语言大师，能和你进行真正的对话。",
    traits: ["极其聪明", "会说话", "大空间"],
    personality: ["聪明", "健谈", "社交"]
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

  // 根据星座加分 (火象喜欢活泼，土象喜欢稳定，风象喜欢聪明，水象喜欢温和)
  const element = getZodiacElement(zodiac);
  
  petPool.forEach(pet => {
    if (element === '火象' && pet.personality.includes('活泼')) {
      scores[pet.name] += 3;
    }
    if (element === '土象' && (pet.personality.includes('稳重') || pet.personality.includes('安静'))) {
      scores[pet.name] += 3;
    }
    if (element === '风象' && pet.personality.includes('聪明')) {
      scores[pet.name] += 3;
    }
    if (element === '水象' && (pet.personality.includes('温和') || pet.personality.includes('温顺'))) {
      scores[pet.name] += 3;
    }
  });
  
  // 按分数排序，取前8-10个推荐
  const sortedPets = [...petPool].sort((a, b) => (scores[b.name] || 0) - (scores[a.name] || 0));
  
  // 随机取8-10个，确保多样性
  const topPets = sortedPets.slice(0, 15);
  const shuffled = topPets.sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, 10); // 返回10个推荐
};
