const API_URL = "https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=";
const BUS_API_URL = "https://rt.data.gov.hk/v1/transport/mtr/bus/getSchedule";
const REFRESH_MS = 60_000;

const STATIONS = [
  { id: 1, zh: "屯門碼頭", en: "Tuen Mun Ferry Pier" },
  { id: 10, zh: "美樂", en: "Melody Garden" },
  { id: 15, zh: "蝴蝶", en: "Butterfly" },
  { id: 20, zh: "輕鐵車廠", en: "Light Rail Depot" },
  { id: 30, zh: "龍門", en: "Lung Mun" },
  { id: 40, zh: "青山村", en: "Tsing Shan Tsuen" },
  { id: 50, zh: "青雲", en: "Tsing Wun" },
  { id: 60, zh: "建安", en: "Kin On" },
  { id: 70, zh: "河田", en: "Ho Tin" },
  { id: 75, zh: "蔡意橋", en: "Choy Yee Bridge" },
  { id: 80, zh: "澤豐", en: "Affluence" },
  { id: 90, zh: "屯門醫院", en: "Tuen Mun Hospital" },
  { id: 100, zh: "兆康", en: "Siu Hong" },
  { id: 110, zh: "麒麟", en: "Kei Lun" },
  { id: 120, zh: "青松", en: "Ching Chung" },
  { id: 130, zh: "建生", en: "Kin Sang" },
  { id: 140, zh: "田景", en: "Tin King" },
  { id: 150, zh: "良景", en: "Leung King" },
  { id: 160, zh: "新圍", en: "San Wai" },
  { id: 170, zh: "石排", en: "Shek Pai" },
  { id: 180, zh: "山景(北)", en: "Shan King (North)" },
  { id: 190, zh: "山景(南)", en: "Shan King (South)" },
  { id: 200, zh: "鳴琴", en: "Ming Kum" },
  { id: 212, zh: "大興(北)", en: "Tai Hing (North)" },
  { id: 220, zh: "大興(南)", en: "Tai Hing (South)" },
  { id: 230, zh: "銀圍", en: "Ngan Wai" },
  { id: 240, zh: "兆禧", en: "Siu Hei" },
  { id: 250, zh: "屯門泳池", en: "Tuen Mun Swimming Pool" },
  { id: 260, zh: "豐景園", en: "Goodview Garden" },
  { id: 265, zh: "兆麟", en: "Siu Lun" },
  { id: 270, zh: "安定", en: "On Ting" },
  { id: 275, zh: "友愛", en: "Yau Oi" },
  { id: 280, zh: "市中心", en: "Town Centre" },
  { id: 295, zh: "屯門", en: "Tuen Mun" },
  { id: 300, zh: "杯渡", en: "Pui To" },
  { id: 310, zh: "何福堂", en: "Hoh Fuk Tong" },
  { id: 320, zh: "新墟", en: "San Hui" },
  { id: 330, zh: "景峰", en: "Prime View" },
  { id: 340, zh: "鳳地", en: "Fung Tei" },
  { id: 350, zh: "藍地", en: "Lam Tei" },
  { id: 360, zh: "泥圍", en: "Nai Wai" },
  { id: 370, zh: "鍾屋村", en: "Chung Uk Tsuen" },
  { id: 380, zh: "洪水橋", en: "Hung Shui Kiu" },
  { id: 390, zh: "塘坊村", en: "Tong Fong Tsuen" },
  { id: 400, zh: "屏山", en: "Ping Shan" },
  { id: 425, zh: "坑尾村", en: "Hang Mei Tsuen" },
  { id: 430, zh: "天水圍", en: "Tin Shui Wai" },
  { id: 435, zh: "天慈", en: "Tin Tsz" },
  { id: 445, zh: "天耀", en: "Tin Yiu" },
  { id: 448, zh: "樂湖", en: "Locwood" },
  { id: 450, zh: "天湖", en: "Tin Wu" },
  { id: 455, zh: "銀座", en: "Ginza" },
  { id: 460, zh: "天瑞", en: "Tin Shui" },
  { id: 468, zh: "頌富", en: "Chung Fu" },
  { id: 480, zh: "天富", en: "Tin Fu" },
  { id: 490, zh: "翠湖", en: "Chestwood" },
  { id: 500, zh: "天榮", en: "Tin Wing" },
  { id: 510, zh: "天悅", en: "Tin Yuet" },
  { id: 520, zh: "天秀", en: "Tin Sau" },
  { id: 530, zh: "濕地公園", en: "Wetland Park" },
  { id: 540, zh: "天恒", en: "Tin Heng" },
  { id: 550, zh: "天逸", en: "Tin Yat" },
  { id: 560, zh: "水邊圍", en: "Shui Pin Wai" },
  { id: 570, zh: "豐年路", en: "Fung Nin Road" },
  { id: 580, zh: "康樂路", en: "Hong Lok Road" },
  { id: 590, zh: "大棠路", en: "Tai Tong Road" },
  { id: 600, zh: "元朗", en: "Yuen Long" },
  { id: 920, zh: "三聖", en: "Sam Shing" },
];

const ROUTE_STOPS = {
  "505": [920, 265, 270, 280, 295, 60, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100],
  "507": [1, 240, 250, 260, 265, 270, 280, 295, 70, 75, 230, 220, 212, 160, 150, 140],
  "610": [1, 10, 15, 20, 30, 40, 50, 200, 170, 212, 220, 230, 80, 90, 100, 350, 360, 370, 380, 390, 400, 560, 570, 580, 590, 600],
  "614": [1, 240, 250, 260, 265, 270, 280, 300, 310, 320, 330, 340, 100, 350, 360, 370, 380, 390, 400, 560, 570, 580, 590, 600],
  "615": [1, 10, 15, 20, 30, 40, 50, 200, 170, 160, 150, 140, 130, 120, 100, 350, 360, 370, 380, 390, 400, 560, 570, 580, 590, 600],
  "705": [430, 435, 450, 455, 500],
  "706": [430, 445, 448, 460, 468, 480, 550, 540, 530, 520, 510, 500],
  "751": [275, 270, 280, 295, 70, 75, 80, 90, 100, 350, 360, 370, 380, 425, 430, 435, 450, 455, 500, 490, 468, 480, 550],
  "614P": [1, 240, 250, 260, 265, 270, 280, 300, 310, 320, 330, 340, 100],
  "615P": [1, 10, 15, 20, 30, 40, 50, 200, 170, 160, 150, 140, 130, 120, 110, 100],
  "761P": [550, 480, 468, 460, 448, 445, 425, 390, 400, 560, 570, 580, 590, 600],
};

const BUS_ROUTES = [
  {
    "id": "506",
    "zh": "屯門碼頭至兆麟",
    "en": "Tuen Mun Ferry Pier to Siu Lun",
    "is_circular": "",
    "line_up": "506_SL",
    "line_down": "506_TMFP",
    "reference_id": "506"
  },
  {
    "id": "506",
    "zh": "富健花園至屯門站",
    "en": "Glorious Garden to Tuen Mun Station",
    "is_circular": "",
    "line_up": "506_GG_TMS",
    "line_down": "",
    "reference_id": "506-1"
  },
  {
    "id": "K12",
    "zh": "大埔墟站至八號花園",
    "en": "Tai Po Market Station to Eightland Garden",
    "is_circular": "",
    "line_up": "K12_EG",
    "line_down": "K12_TPMS",
    "reference_id": "K12"
  },
  {
    "id": "K14",
    "zh": "大埔超級城至大埔墟站",
    "en": "Tai Po Mega Mall to Tai Po Market Station",
    "is_circular": "",
    "line_up": "K14_TPMS",
    "line_down": "",
    "reference_id": "K14"
  },
  {
    "id": "K17",
    "zh": "大埔墟站至富善",
    "en": "Tai Po Market Station to Fu Shin",
    "is_circular": "",
    "line_up": "K17_FS",
    "line_down": "K17_TPMS",
    "reference_id": "K17"
  },
  {
    "id": "K18",
    "zh": "大埔墟站至廣福",
    "en": "Tai Po Market Station to Kwong Fuk",
    "is_circular": "",
    "line_up": "K18_KF",
    "line_down": "K18_TPMS",
    "reference_id": "K18"
  },
  {
    "id": "K51",
    "zh": "富泰至大欖",
    "en": "Fu Tai to Tai Lam",
    "is_circular": "",
    "line_up": "K51_TL",
    "line_down": "K51_FT",
    "reference_id": "K51"
  },
  {
    "id": "K51A",
    "zh": "富泰至掃管笏",
    "en": "Fu Tai to So Kwun Wat",
    "is_circular": "",
    "line_up": "K51A_SKWT",
    "line_down": "K51A_FT",
    "reference_id": "K51A"
  },
  {
    "id": "K51",
    "zh": "富泰至兆康站",
    "en": "Fu Tai to Siu Hong Station",
    "is_circular": "",
    "line_up": "K51_FT_SHS",
    "line_down": "",
    "reference_id": "K51-1"
  },
  {
    "id": "K51",
    "zh": "兆康站至富泰",
    "en": "Siu Hong Station to Fu Tai",
    "is_circular": "",
    "line_up": "K51_SHS_FT",
    "line_down": "",
    "reference_id": "K51-2"
  },
  {
    "id": "K52",
    "zh": "悅湖山莊至龍鼓灘",
    "en": "Yuet Wu Villa to Lung Kwu Tan",
    "is_circular": "",
    "line_up": "K52_YWV_LKT",
    "line_down": "K52_LKT_YWV",
    "reference_id": "K52"
  },
  {
    "id": "K52",
    "zh": "輕鐵屯門站至龍鼓灘",
    "en": "LR Tuen Mun Stop to Lung Kwu Tan",
    "is_circular": "",
    "line_up": "K52_LRTMS_LKT",
    "line_down": "",
    "reference_id": "K52-1"
  },
  {
    "id": "K52P",
    "zh": "龍鼓灘至屯門站",
    "en": "Lung Kwu Tan to Tuen Mun Station",
    "is_circular": "",
    "line_up": "K52P_LKT_TMS",
    "line_down": "",
    "reference_id": "K52P"
  },
  {
    "id": "K53",
    "zh": "屯門站至掃管笏 (循環線)",
    "en": "Tuen Mun Station to So Kwun Wat (Circular)",
    "is_circular": "",
    "line_up": "K53_SKW_CIR",
    "line_down": "",
    "reference_id": "K53"
  },
  {
    "id": "K53S",
    "zh": "屯門站至業旺邨特別班次 (循環線)",
    "en": "Tuen Mun Station to Yip Wong Estate Special Trips (Circular)",
    "is_circular": "",
    "line_up": "K53S_YWE_CIR",
    "line_down": "",
    "reference_id": "K53S"
  },
  {
    "id": "K54",
    "zh": "和田邨至屯門市中心(循環線)",
    "en": "Wo Tin Estate to Tuen Mun Town Centre (Circular)",
    "is_circular": "",
    "line_up": "K54_CIR",
    "line_down": "",
    "reference_id": "K54"
  },
  {
    "id": "K54A",
    "zh": "和田邨至兆康站",
    "en": "Wo Tin Estate to Siu Hong Station",
    "is_circular": "",
    "line_up": "K54A_WTE_SHS",
    "line_down": "K54A_SHS_WTE",
    "reference_id": "K54A"
  },
  {
    "id": "K58",
    "zh": "富泰至掃管笏",
    "en": "Fu Tai to So Kwun Wat",
    "is_circular": "",
    "line_up": "K58_FT_SKW",
    "line_down": "K58_SKW_FT",
    "reference_id": "K58"
  },
  {
    "id": "K65",
    "zh": "元朗站至流浮山",
    "en": "Yuen Long Station to Lau Fau Shan",
    "is_circular": "",
    "line_up": "K65_LFS",
    "line_down": "K65_YLS",
    "reference_id": "K65"
  },
  {
    "id": "K65A",
    "zh": "天水圍站至流浮山",
    "en": "Tin Shui Wai Station to Lau Fau Shan",
    "is_circular": "",
    "line_up": "K65A_LFS",
    "line_down": "K65A_TSWS",
    "reference_id": "K65A"
  },
  {
    "id": "K66",
    "zh": "朗屏至大棠黃泥墩村",
    "en": "Long Ping to Tai Tong Wong Nai Tun Tsuen",
    "is_circular": "",
    "line_up": "K66_TTWNTT",
    "line_down": "K66_LP",
    "reference_id": "K66"
  },
  {
    "id": "K66",
    "zh": "大棠黃泥墩村至朗屏邨悅屏樓",
    "en": "Tai Tong Wong Nai Tun Tsuen to Yuet Ping House, Long Ping Estate",
    "is_circular": "",
    "line_up": "K66_TT_YPH",
    "line_down": "",
    "reference_id": "K66-1"
  },
  {
    "id": "K66",
    "zh": "大棠黃泥墩村至安康路",
    "en": "Tai Tong Wong Nai Tun Tsuen to On Hong Road",
    "is_circular": "",
    "line_up": "K66_TT_OHR",
    "line_down": "",
    "reference_id": "K66-2"
  },
  {
    "id": "K66",
    "zh": "南坑排至朗屏",
    "en": "Nam Hang Pai to Long Ping",
    "is_circular": "",
    "line_up": "K66_NHP_LP",
    "line_down": "",
    "reference_id": "K66-3"
  },
  {
    "id": "K68",
    "zh": "元朗工業邨至元朗公園 (循環線)",
    "en": "Yuen Long Industrial Estate to Yuen Long Park (Circular)",
    "is_circular": "",
    "line_up": "K68_CIR",
    "line_down": "",
    "reference_id": "K68"
  },
  {
    "id": "K68",
    "zh": "銀田花園至元朗工業邨",
    "en": "Silver Field Garden to Yuen Long Industrial Estate",
    "is_circular": "",
    "line_up": "K68_SFG_YLIE",
    "line_down": "",
    "reference_id": "K68-1"
  },
  {
    "id": "K68",
    "zh": "元朗廣場至元朗工業邨",
    "en": "Yuen Long Plaza to Yuen Long Industrial Estate",
    "is_circular": "",
    "line_up": "K68_YLP_YLIE",
    "line_down": "",
    "reference_id": "K68-2"
  },
  {
    "id": "K68",
    "zh": "大橋村至元朗工業邨",
    "en": "Tai Kiu Tsuen to Yuen Long Industrial Estate",
    "is_circular": "",
    "line_up": "K68_TKT_YLIE",
    "line_down": "",
    "reference_id": "K68-3"
  },
  {
    "id": "K68",
    "zh": "元朗工業邨至大橋村",
    "en": "Yuen Long Industrial Estate to Tai Kiu Tsuen",
    "is_circular": "",
    "line_up": "K68_YLIE_TKT",
    "line_down": "",
    "reference_id": "K68-4"
  },
  {
    "id": "K73",
    "zh": "天恆至元朗西",
    "en": "Tin Heng to Yuen Long West",
    "is_circular": "",
    "line_up": "K73_YLW",
    "line_down": "K73_TH",
    "reference_id": "K73"
  },
  {
    "id": "K73",
    "zh": "天恩至元朗西",
    "en": "Tin Yan to Yuen Long West",
    "is_circular": "",
    "line_up": "K73_TY_YLW",
    "line_down": "",
    "reference_id": "K73-1"
  },
  {
    "id": "K73",
    "zh": "香港青年協會李兆基書院至元朗西",
    "en": "HKFYG Lee Shau Kee College to Yuen Long West",
    "is_circular": "",
    "line_up": "K73_HKFYG_YLW",
    "line_down": "",
    "reference_id": "K73-2"
  },
  {
    "id": "K74",
    "zh": "天水圍市中心至凹頭 (循環線)",
    "en": "Tin Shui Wai Town Centre to Au Tau (Circular)",
    "is_circular": "",
    "line_up": "K74_POH_CIR",
    "line_down": "",
    "reference_id": "K74"
  },
  {
    "id": "K75A",
    "zh": "天水圍站至洪水橋 (循環線)",
    "en": "Tin Shui Wai Station to Hung Shui Kiu (Circular)",
    "is_circular": "",
    "line_up": "K75A_CIR",
    "line_down": "",
    "reference_id": "K75A"
  },
  {
    "id": "K75P",
    "zh": "天瑞至洪水橋 (循環線)",
    "en": "Tin Shui to Hung Shui Kiu (Circular)",
    "is_circular": "",
    "line_up": "K75P_CIR",
    "line_down": "",
    "reference_id": "K75P"
  },
  {
    "id": "K75S",
    "zh": "天水圍站至洪福邨 (循環線)",
    "en": "Tin Shui Wai Station to Hung Fuk Estate (Circular)",
    "is_circular": "",
    "line_up": "K75S_CIR",
    "line_down": "",
    "reference_id": "K75S"
  },
  {
    "id": "K75S",
    "zh": "洪水橋巴士廠至天水圍站",
    "en": "Hung Shui Kiu Bus Depot to Tin Shui Wai Station",
    "is_circular": "",
    "line_up": "K75S_HSKBD_TSWS",
    "line_down": "",
    "reference_id": "K75S1"
  },
  {
    "id": "K75P",
    "zh": "洪水橋巴士廠至天瑞",
    "en": "Hung Shui Kiu Bus Depot to Tin Shui",
    "is_circular": "",
    "line_up": "K75P_HSKBD_TS",
    "line_down": "",
    "reference_id": "K75P1"
  },
  {
    "id": "K76",
    "zh": "天恆至天水圍站",
    "en": "Tin Heng to Tin Shui Wai Station",
    "is_circular": "",
    "line_up": "K76_TSWS",
    "line_down": "K76_TH",
    "reference_id": "K76"
  },
  {
    "id": "K52A",
    "zh": "屯門站至曾咀",
    "en": "Tuen Mun Station to Tsang Tsui",
    "is_circular": "",
    "line_up": "K52A_TT",
    "line_down": "K52A_TMS",
    "reference_id": "K52A"
  },
  {
    "id": "K76S",
    "zh": "濕地公園路(近天葵路)至天盛苑/港鐵天水圍站",
    "en": "Wetland Park Road (near Tin Kwai Road) to Tin Shing Court /MTR Tin Shui Wai Station",
    "is_circular": "",
    "line_up": "K76S_TSC",
    "line_down": "K76S_HKWP",
    "reference_id": "K76S"
  }
];

const BUS_STOPS = {
  "506": [
    {
      "direction": "I",
      "seq": 1,
      "id": "506-D010",
      "zh": "兆麟",
      "en": "Siu Lun"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "506-D020",
      "zh": "友愛邨",
      "en": "Yau Oi Estate"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "506-D030",
      "zh": "輕鐵市中心站",
      "en": "LR Town Centre Stop"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "506-D040",
      "zh": "輕鐵屯門站",
      "en": "LR Tuen Mun Stop"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "506-D050",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "506-D060",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "506-D070",
      "zh": "聖彼得堂",
      "en": "SKH St. Peter's Church"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "506-D080",
      "zh": "富健花園",
      "en": "Glorious Garden"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "506-D090",
      "zh": "新屯門中心",
      "en": "Sun Tuen Mun Centre"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "506-D100",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "506-D110",
      "zh": "蝴蝶邨蝶心樓",
      "en": "Tip Sum House, Butterfly Estate"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "506-D120",
      "zh": "湖景邨湖碧樓",
      "en": "Wu Pik House, Wu King Estate"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "506-D130",
      "zh": "海翠花園",
      "en": "Pierhead Garden"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "506-D140",
      "zh": "屯門碼頭",
      "en": "Tuen Mun Ferry Pier"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "506-U010",
      "zh": "屯門碼頭",
      "en": "Tuen Mun Ferry Pier"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "506-U045",
      "zh": "富健花園",
      "en": "Glorious Garden"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "506-U020",
      "zh": "美樂花園",
      "en": "Melody Garden"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "506-U050",
      "zh": "輕鐵龍門站",
      "en": "LR Lung Mun Stop"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "506-U030",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "506-U060",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "506-U040",
      "zh": "輕鐵車廠站",
      "en": "Light Rail Depot Stop"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "506-U070",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "506-U050",
      "zh": "輕鐵龍門站",
      "en": "LR Lung Mun Stop"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "506-U075",
      "zh": "屯門站",
      "en": "Tuen Mun Station"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "506-U060",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "506-U070",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "506-U080",
      "zh": "港鐵屯門站",
      "en": "MTR Tuen Mun Station"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "506-U090",
      "zh": "屯門市中心",
      "en": "Tuen Mun Town Centre"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "506-U100",
      "zh": "安定邨",
      "en": "On Ting Estate"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "506-U110",
      "zh": "輕鐵三聖站",
      "en": "LR Sam Shing Stop"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "506-U120",
      "zh": "兆麟",
      "en": "Siu Lun"
    }
  ],
  "K12": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K12-D010",
      "zh": "八號花園",
      "en": "Eightland Garden"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K12-D020",
      "zh": "大埔超級城",
      "en": "Tai Po Mega Mall"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K12-D030",
      "zh": "新達廣場",
      "en": "Uptown Plaza"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K12-D040",
      "zh": "大埔墟站",
      "en": "Tai Po Market Station"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K12-U010",
      "zh": "大埔墟站",
      "en": "Tai Po Market Station"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K12-U020",
      "zh": "大埔超級城",
      "en": "Tai Po Mega Mall"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K12-U030",
      "zh": "八號花園",
      "en": "Eightland Garden"
    }
  ],
  "K14": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K14-D010",
      "zh": "大埔超級城",
      "en": "Tai Po Mega Mall"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K14-D020",
      "zh": "新達廣場",
      "en": "Uptown Plaza"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K14-D030",
      "zh": "大埔墟站",
      "en": "Tai Po Market Station"
    }
  ],
  "K17": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K17-D010",
      "zh": "富善",
      "en": "Fu Shin"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K17-D020",
      "zh": "新達廣場",
      "en": "Uptown Plaza"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K17-D030",
      "zh": "大埔墟站",
      "en": "Tai Po Market Station"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K17-U010",
      "zh": "大埔墟站",
      "en": "Tai Po Market Station"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K17-U020",
      "zh": "大埔中心第五期",
      "en": "Tai Po Centre Phase 5"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K17-U030",
      "zh": "怡雅苑",
      "en": "Yee Nga Court"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K17-U040",
      "zh": "富善",
      "en": "Fu Shin"
    }
  ],
  "K18": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K18-D010",
      "zh": "廣福",
      "en": "Kwong Fuk"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K18-D020",
      "zh": "新達廣場",
      "en": "Uptown Plaza"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K18-D030",
      "zh": "大埔墟站",
      "en": "Tai Po Market Station"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K18-U010",
      "zh": "大埔墟站",
      "en": "Tai Po Market Station"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K18-U020",
      "zh": "宏福苑",
      "en": "Wang Fuk Court"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K18-U030",
      "zh": "廣福",
      "en": "Kwong Fuk"
    }
  ],
  "K51": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K51-D010",
      "zh": "大欖",
      "en": "Tai Lam"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K51-D020",
      "zh": "小欖",
      "en": "Siu Lam"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K51-D030",
      "zh": "小欖澄麗路",
      "en": "Ching Lai Road Siu Lam"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K51-D040",
      "zh": "小欖村",
      "en": "Siu Lam Tsuen"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K51-D050",
      "zh": "小欖新村",
      "en": "Siu Lam San Tsuen"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K51-D060",
      "zh": "愛琴灣",
      "en": "The Aegean"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K51-D070",
      "zh": "小秀上村",
      "en": "Siu Sau Sheung Tsuen"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K51-D080",
      "zh": "龍珠島",
      "en": "Pearl Island"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K51-D090",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K51-D100",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K51-D110",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K51-D120",
      "zh": "碧翠花園",
      "en": "Bayview Terrace"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K51-D130",
      "zh": "青山灣碼頭",
      "en": "Castle Peak Bay Pier"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K51-D140",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K51-D150",
      "zh": "恆福花園 (輕鐵三聖站)",
      "en": "Hanford Garden (LR Sam Shing Stop)"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K51-D160",
      "zh": "胡陳金枝中學",
      "en": "Mrs Aw Boon Haw Secondary School"
    },
    {
      "direction": "I",
      "seq": 17,
      "id": "K51-D170",
      "zh": "青善遊樂場",
      "en": "Tsing Sin Playground"
    },
    {
      "direction": "I",
      "seq": 18,
      "id": "K51-D180",
      "zh": "置樂花園",
      "en": "Chi Lok Fa Yuen"
    },
    {
      "direction": "I",
      "seq": 19,
      "id": "K51-D190",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "I",
      "seq": 20,
      "id": "K51-D200",
      "zh": "輕鐵市中心站",
      "en": "LR Town Centre Stop"
    },
    {
      "direction": "I",
      "seq": 21,
      "id": "K51-D210",
      "zh": "港鐵屯門站 (輕鐵屯門站)",
      "en": "MTR Tuen Mun Station (LR Tuen Mun Stop)"
    },
    {
      "direction": "I",
      "seq": 22,
      "id": "K51-D220",
      "zh": "聖公會聖西門呂明才中學",
      "en": "SKH St. Simon's Lui Ming Choi Secondary School"
    },
    {
      "direction": "I",
      "seq": 23,
      "id": "K51-D230",
      "zh": "景峰花園",
      "en": "Prime View Garden"
    },
    {
      "direction": "I",
      "seq": 24,
      "id": "K51-D240",
      "zh": "輕鐵鳳地站",
      "en": "LR Fung Tei Stop"
    },
    {
      "direction": "I",
      "seq": 25,
      "id": "K51-D250",
      "zh": "港鐵兆康站 (南) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (South) (LR Siu Hong Stop)"
    },
    {
      "direction": "I",
      "seq": 26,
      "id": "K51-D260",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "I",
      "seq": 27,
      "id": "K51-D270",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "I",
      "seq": 28,
      "id": "K51-D280",
      "zh": "倚嶺南庭",
      "en": "South Hillcrest"
    },
    {
      "direction": "I",
      "seq": 29,
      "id": "K51-D290",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K51-U010",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K51-U010",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K51-D250",
      "zh": "港鐵兆康站 (南)",
      "en": "MTR Siu Hong Station (South)"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K51-U020",
      "zh": "聚康山莊",
      "en": "Beneville"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K51-U020",
      "zh": "聚康山莊",
      "en": "Beneville"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K51-D260",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K51-U030",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K51-U030",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K51-D270",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K51-U040",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K51-U040",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K51-D280",
      "zh": "倚嶺南庭",
      "en": "South Hillcrest"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K51-U050",
      "zh": "港鐵兆康站 (南) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (South) (LR Siu Hong Stop)"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K51-U050",
      "zh": "港鐵兆康站 (南)",
      "en": "MTR Siu Hong Station (South)"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K51-D290",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K51-U060",
      "zh": "井財街",
      "en": "Tseng Choi Street"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K51-U070",
      "zh": "雅都商場",
      "en": "ACME Shopping Arcade"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K51-U080",
      "zh": "德政圍 (港鐵屯門站)",
      "en": "Tak Ching Court (MTR Tuen Mun Station)"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K51-U090",
      "zh": "屯門市中心 (輕鐵市中心站)",
      "en": "Tuen Mun Town Centre (LR Town Centre Stop)"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K51-U100",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K51-U110",
      "zh": "恒順園",
      "en": "Handsome Court"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K51-U120",
      "zh": "恒豐園",
      "en": "Harvest Garden"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K51-U130",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K51-U140",
      "zh": "青山灣",
      "en": "Castle Peak Beach"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K51-U150",
      "zh": "海景花園",
      "en": "Seaview Garden"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K51-U160",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K51-U170",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K51-U180",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K51-U190",
      "zh": "嘉禾里村",
      "en": "Kar Wo Lei Tsuen"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K51-U200",
      "zh": "小秀村",
      "en": "Siu Sau Tsuen"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K51-U210",
      "zh": "愛琴灣",
      "en": "The Aegean"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K51-U220",
      "zh": "小欖新村",
      "en": "Siu Lam San Tsuen"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K51-U230",
      "zh": "小欖村",
      "en": "Siu Lam Tsuen"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K51-U240",
      "zh": "小欖澄麗路",
      "en": "Ching Lai Road Siu Lam"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K51-U250",
      "zh": "大欖",
      "en": "Tai Lam"
    }
  ],
  "K52": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K52-nD010",
      "zh": "龍鼓灘",
      "en": "Lung Kwu Tan"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K52-nD020",
      "zh": "沙埔崗127號",
      "en": "No.127 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K52-nD030",
      "zh": "沙埔崗177號",
      "en": "No.177 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K52-nD040",
      "zh": "沙埔崗288號",
      "en": "No.288 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K52-nD050",
      "zh": "沙埔崗351號",
      "en": "No.351 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K52-nD060",
      "zh": "中電 A廠",
      "en": "CLP (Plant A)"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K52-nD070",
      "zh": "紹榮鋼鐵",
      "en": "Shiu Wing Steel Mill"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K52-nD080",
      "zh": "環保園",
      "en": "EcoPark"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K52-nD090",
      "zh": "內河碼頭",
      "en": "River Trade Terminal"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K52-nD100",
      "zh": "政府車場",
      "en": "Government Depot"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K52-nD110",
      "zh": "望后石",
      "en": "Pillar Point"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K52-nD120",
      "zh": "蝴蝶灣公園",
      "en": "Butterfly Beach Park"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K52-nD130",
      "zh": "屯門公眾騎術學校",
      "en": "Tuen Mun Public Riding School"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K52-nD140",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K52-nD150",
      "zh": "輕鐵車廠站",
      "en": "Light Rail Depot Stop"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K52-nD160",
      "zh": "輕鐵龍門站",
      "en": "LR Lung Mun Stop"
    },
    {
      "direction": "I",
      "seq": 17,
      "id": "K52-nD170",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "I",
      "seq": 18,
      "id": "K52-nD180",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "I",
      "seq": 19,
      "id": "K52-nD190",
      "zh": "屯門站",
      "en": "Tuen Mun Station"
    },
    {
      "direction": "I",
      "seq": 20,
      "id": "K52-nD200",
      "zh": "屯門市中心",
      "en": "Tuen Mun Town Centre"
    },
    {
      "direction": "I",
      "seq": 21,
      "id": "K52-nD210",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "I",
      "seq": 22,
      "id": "K52-nD220",
      "zh": "恒順園",
      "en": "Handsome Court"
    },
    {
      "direction": "I",
      "seq": 23,
      "id": "K52-nD230",
      "zh": "恒豐園",
      "en": "Harvest Garden"
    },
    {
      "direction": "I",
      "seq": 24,
      "id": "K52-nD240",
      "zh": "輕鐵三聖站",
      "en": "LR Sam Shing Stop"
    },
    {
      "direction": "I",
      "seq": 25,
      "id": "K52-nD250",
      "zh": "屯門中央廣場",
      "en": "Tuen Mun Central Square"
    },
    {
      "direction": "I",
      "seq": 26,
      "id": "K52-nD260",
      "zh": "湖景邨湖翠樓",
      "en": "Wu Tsui House, Wu King Estate"
    },
    {
      "direction": "I",
      "seq": 27,
      "id": "K52-nD270",
      "zh": "兆禧苑",
      "en": "Siu Hei Court"
    },
    {
      "direction": "I",
      "seq": 28,
      "id": "K52-nD280",
      "zh": "海翠花園",
      "en": "Pierhead Garden"
    },
    {
      "direction": "I",
      "seq": 29,
      "id": "K52-nD290",
      "zh": "邁亞美海灣",
      "en": "Miami Beach Towers"
    },
    {
      "direction": "I",
      "seq": 30,
      "id": "K52-nD300",
      "zh": "悅湖山莊",
      "en": "Yuet Wu Villa"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K52-nU010",
      "zh": "悅湖山莊",
      "en": "Yuet Wu Villa"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K52-nU140",
      "zh": "輕鐵屯門站",
      "en": "LR Tuen Mun Stop"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K52-nU020",
      "zh": "邁亞美海灣",
      "en": "Miami Beach Towers"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K52-nU150",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K52-nU030",
      "zh": "屯門碼頭",
      "en": "Tuen Mun Ferry Pier"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K52-nU160",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K52-nU040",
      "zh": "湖景邨湖畔樓",
      "en": "Wu Boon House, Wu King Estate"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K52-nU170",
      "zh": "聖彼得堂",
      "en": "SKH St. Peter's Church"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K52-nU050",
      "zh": "湖景邨湖翠樓",
      "en": "Wu Tsui House, Wu King Estate"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K52-nU180",
      "zh": "富健花園",
      "en": "Glorious Garden"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K52-nU060",
      "zh": "屯門中央廣場",
      "en": "Tuen Mun Central Square"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K52-nU190",
      "zh": "新屯門中心",
      "en": "Sun Tuen Mun Centre"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K52-nU070",
      "zh": "輕鐵三聖站",
      "en": "LR Sam Shing Stop"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K52-nU200",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K52-nU080",
      "zh": "胡陳金枝中學",
      "en": "Mrs Aw Boon Haw Secondary School"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K52-nU210",
      "zh": "屯門公眾騎術學校",
      "en": "Tuen Mun Public Riding School"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K52-nU090",
      "zh": "青善遊樂場",
      "en": "Tsing Sin Playground"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K52-nU220",
      "zh": "蝴蝶灣公園",
      "en": "Butterfly Beach Park"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K52-nU100",
      "zh": "置樂花園",
      "en": "Chi Lok Fa Yuen"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K52-nU230",
      "zh": "望后石",
      "en": "Pillar Point"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K52-nU110",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K52-nU240",
      "zh": "政府車場",
      "en": "Government Depot"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K52-nU120",
      "zh": "輕鐵市中心站",
      "en": "LR Town Centre Stop"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K52-nU250",
      "zh": "內河碼頭",
      "en": "River Trade Terminal"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K52-nU140",
      "zh": "輕鐵屯門站 (港鐵屯門站)",
      "en": "LR Tuen Mun Stop (MTR Tuen Mun Station)"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K52-nU260",
      "zh": "環保園",
      "en": "EcoPark"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K52-nU150",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K52-nU270",
      "zh": "紹榮鋼鐵",
      "en": "Shiu Wing Steel Mill"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K52-nU160",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K52-nU280",
      "zh": "沙埔崗312號",
      "en": "No.312 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K52-nU170",
      "zh": "聖彼得堂",
      "en": "SKH St. Peter's Church"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K52-nU290",
      "zh": "沙埔崗177號",
      "en": "No.177 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K52-nU180",
      "zh": "富健花園",
      "en": "Glorious Garden"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K52-nU300",
      "zh": "沙埔崗127號",
      "en": "No.127 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K52-nU190",
      "zh": "新屯門中心",
      "en": "Sun Tuen Mun Centre"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K52-nU310",
      "zh": "龍鼓灘",
      "en": "Lung Kwu Tan"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K52-nU200",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K52-nU210",
      "zh": "屯門公眾騎術學校",
      "en": "Tuen Mun Public Riding School"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K52-nU220",
      "zh": "蝴蝶灣公園",
      "en": "Butterfly Beach Park"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K52-nU230",
      "zh": "望后石",
      "en": "Pillar Point"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K52-nU240",
      "zh": "政府車場",
      "en": "Government Depot"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K52-nU250",
      "zh": "內河碼頭",
      "en": "River Trade Terminal"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K52-nU260",
      "zh": "環保園",
      "en": "EcoPark"
    },
    {
      "direction": "O",
      "seq": 26,
      "id": "K52-nU270",
      "zh": "紹榮鋼鐵",
      "en": "Shiu Wing Steel Mill"
    },
    {
      "direction": "O",
      "seq": 27,
      "id": "K52-nU280",
      "zh": "沙埔崗312號",
      "en": "No.312 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 28,
      "id": "K52-nU290",
      "zh": "沙埔崗177號",
      "en": "No.177 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 29,
      "id": "K52-nU300",
      "zh": "沙埔崗127號",
      "en": "No.127 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 30,
      "id": "K52-nU310",
      "zh": "龍鼓灘",
      "en": "Lung Kwu Tan"
    }
  ],
  "K53": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K53-U010",
      "zh": "屯門站 (輕鐵屯門站)",
      "en": "Tuen Mun Station (LR Tuen Mun Stop)"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K53-U020",
      "zh": "屯門市中心",
      "en": "Tuen Mun Town Centre"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K53-U030",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K53-U040",
      "zh": "恒順園",
      "en": "Handsome Court"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K53-U050",
      "zh": "恒豐園",
      "en": "Harvest Garden"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K53-U060",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K53-U070",
      "zh": "青山灣",
      "en": "Castle Peak Beach"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K53-U080",
      "zh": "海景花園",
      "en": "Seaview Garden"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K53-U090",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K53-U100",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K53-U110",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K53-U120",
      "zh": "愛琴海岸",
      "en": "Aegean Coast"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K53-U130",
      "zh": "掃管笏變電站",
      "en": "So Kwun Wat Sub-station"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K53-U140",
      "zh": "掃管笏村",
      "en": "So Kwun Wat Tsuen"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K53-D010",
      "zh": "掃管笏 (鄭任安夫人千禧小學)",
      "en": "So Kwun Wat (Mrs. Cheng Yam On Millennium School)"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K53-D015",
      "zh": "掃管笏路",
      "en": "So Kwun Wat Road"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K53-D020",
      "zh": "管翠路18號",
      "en": "18 Kwun Chui Road"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K53-D030",
      "zh": "管翠路",
      "en": "Kwun Chui Road"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K53-D040",
      "zh": "愛琴海岸",
      "en": "Aegean Coast"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K53-D050",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K53-D060",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K53-D070",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K53-D080",
      "zh": "碧翠花園",
      "en": "Bayview Terrace"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K53-D090",
      "zh": "青山灣碼頭",
      "en": "Castle Peak Bay Pier"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K53-D100",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "O",
      "seq": 26,
      "id": "K53-D110",
      "zh": "恆福花園 (輕鐵三聖站)",
      "en": "Hanford Garden (LR Sam Shing Stop)"
    },
    {
      "direction": "O",
      "seq": 27,
      "id": "K53-D120",
      "zh": "胡陳金枝中學",
      "en": "Mrs Aw Boon Haw Secondary School"
    },
    {
      "direction": "O",
      "seq": 28,
      "id": "K53-D130",
      "zh": "青善遊樂場",
      "en": "Tsing Sin Playground"
    },
    {
      "direction": "O",
      "seq": 29,
      "id": "K53-D140",
      "zh": "置樂花園",
      "en": "Chi Lok Fa Yuen"
    },
    {
      "direction": "O",
      "seq": 30,
      "id": "K53-D150",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "O",
      "seq": 31,
      "id": "K53-D160",
      "zh": "輕鐵市中心站",
      "en": "LR Town Centre Stop"
    },
    {
      "direction": "O",
      "seq": 32,
      "id": "K53-U011",
      "zh": "屯門站 (輕鐵屯門站)",
      "en": "Tuen Mun Station (LR Tuen Mun Stop)"
    }
  ],
  "K54": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K54-U010",
      "zh": "和田邨",
      "en": "Wo Tin Estate"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K54-U020",
      "zh": "菁田邨",
      "en": "Ching Tin Estate"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K54-U030",
      "zh": "紫田村",
      "en": "Tsz Tin Tsuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K54-U040",
      "zh": "欣田邨",
      "en": "Yan Tin Estate"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K54-U050",
      "zh": "港鐵兆康站 (北) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (North) (LR Siu Hong Stop)"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K54-U060",
      "zh": "紅橋",
      "en": "Hung Kiu"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K54-U070",
      "zh": "屯門市中心",
      "en": "Tuen Mun Town Centre"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K54-D010",
      "zh": "屯門市廣場",
      "en": "Tuen Mun Town Plaza"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K54-D020",
      "zh": "新墟街市",
      "en": "San Hui Market"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K54-D030",
      "zh": "港鐵兆康站 (北) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (North) (LR Siu Hong Stop)"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K54-D040",
      "zh": "兆康苑",
      "en": "Siu Hong Court"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K54-D050",
      "zh": "欣寶路公共運輸交匯處",
      "en": "Yan Po Road Public Transport Interchange"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K54-D060",
      "zh": "菁田邨",
      "en": "Ching Tin Estate"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K54-D070",
      "zh": "和田邨",
      "en": "Wo Tin Estate"
    }
  ],
  "K58": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K58-D001",
      "zh": "掃管笏村",
      "en": "So Kwun Wat Tsuen"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K58-D002",
      "zh": "掃管笏  (鄭任安夫人千禧小學)",
      "en": "So Kwun Wat (Mrs. Cheng Yam On Millennium School)"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K58-D003",
      "zh": "掃管笏路",
      "en": "So Kwun Wat Road"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K58-D004",
      "zh": "管翠路18號",
      "en": "18 Kwun Chui Road"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K58-D005",
      "zh": "管翠路",
      "en": "Kwun Chui Road"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K58-D006",
      "zh": "愛琴海岸",
      "en": "Aegean Coast"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K58-D007",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K58-D008",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K58-D009",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K58-D011",
      "zh": "碧翠花園",
      "en": "Bayview Terrace"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K58-D012",
      "zh": "青山灣碼頭",
      "en": "Castle Peak Bay Pier"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K58-D020",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K58-D030",
      "zh": "胡陳金枝中學",
      "en": "Mrs Aw Boon Haw Secondary School"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K58-D040",
      "zh": "青善遊樂場",
      "en": "Tsing Sin Playground"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K58-D050",
      "zh": "置樂花園",
      "en": "Chi Lok Fa Yuen"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K58-D060",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "I",
      "seq": 17,
      "id": "K58-D070",
      "zh": "輕鐵市中心站",
      "en": "LR Town Centre Stop"
    },
    {
      "direction": "I",
      "seq": 18,
      "id": "K58-D080",
      "zh": "輕鐵屯門站 (港鐵屯門站)",
      "en": "LR Tuen Mun Stop (MTR Tuen Mun Station)"
    },
    {
      "direction": "I",
      "seq": 19,
      "id": "K58-D090",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "I",
      "seq": 20,
      "id": "K58-D100",
      "zh": "輕鐵鳴琴站",
      "en": "LR Ming Kum Stop"
    },
    {
      "direction": "I",
      "seq": 21,
      "id": "K58-D110",
      "zh": "輕鐵石排站",
      "en": "LR Shek Pai Stop"
    },
    {
      "direction": "I",
      "seq": 22,
      "id": "K58-D120",
      "zh": "輕鐵新圍站",
      "en": "LR San Wai Stop"
    },
    {
      "direction": "I",
      "seq": 23,
      "id": "K58-D130",
      "zh": "輕鐵田景站",
      "en": "LR Tin King Stop"
    },
    {
      "direction": "I",
      "seq": 24,
      "id": "K58-D140",
      "zh": "青田遊樂場",
      "en": "Tsing Tin Playground"
    },
    {
      "direction": "I",
      "seq": 25,
      "id": "K58-D150",
      "zh": "建生邨樂生樓",
      "en": "Lok Sang House, Kin Sang Estate"
    },
    {
      "direction": "I",
      "seq": 26,
      "id": "K58-D160",
      "zh": "建生邨泰生樓",
      "en": "Tai Sang House, Kin Sang Estate"
    },
    {
      "direction": "I",
      "seq": 27,
      "id": "K58-D170",
      "zh": "輕鐵麒麟站",
      "en": "LR Kei Lun Stop"
    },
    {
      "direction": "I",
      "seq": 28,
      "id": "K58-D180",
      "zh": "欣田邨",
      "en": "Yan Tin Estate"
    },
    {
      "direction": "I",
      "seq": 29,
      "id": "K58-D190",
      "zh": "港鐵兆康站 (南) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (South) (LR Siu Hong Stop)"
    },
    {
      "direction": "I",
      "seq": 30,
      "id": "K58-D193",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "I",
      "seq": 31,
      "id": "K58-D196",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "I",
      "seq": 32,
      "id": "K58-D200",
      "zh": "倚嶺南庭",
      "en": "South Hillcrest"
    },
    {
      "direction": "I",
      "seq": 33,
      "id": "K58-D210",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K58-U010",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K58-U020",
      "zh": "聚康山莊",
      "en": "Beneville"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K58-U023",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K58-U026",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K58-U030",
      "zh": "港鐵兆康站 (南) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (South) (LR Siu Hong Stop)"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K58-U040",
      "zh": "兆康苑",
      "en": "Siu Hong Court"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K58-U050",
      "zh": "輕鐵麒麟站",
      "en": "LR Kei Lun Stop"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K58-U060",
      "zh": "屯門醫院",
      "en": "Tuen Mun Hospital"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K58-U070",
      "zh": "青松觀",
      "en": "Tsing Chung Koon"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K58-U080",
      "zh": "保良局莊啟程第二小學",
      "en": "PLK Vicwood K.T. Chong No.2 Primary School"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K58-U090",
      "zh": "何壽基小學",
      "en": "Ho Sau Kei Primary School"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K58-U100",
      "zh": "良景邨",
      "en": "Leung King Estate"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K58-U110",
      "zh": "輕鐵新圍站",
      "en": "LR San Wai Stop"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K58-U120",
      "zh": "輕鐵石排站",
      "en": "LR Shek Pai Stop"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K58-U130",
      "zh": "輕鐵鳴琴站",
      "en": "LR Ming Kum Stop"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K58-U140",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K58-U150",
      "zh": "港鐵屯門站",
      "en": "MTR Tuen Mun Station"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K58-U160",
      "zh": "屯門市中心",
      "en": "Tuen Mun Town Centre"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K58-U170",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K58-U180",
      "zh": "恒順園",
      "en": "Handsome Court"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K58-U190",
      "zh": "恒豐園",
      "en": "Harvest Garden"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K58-U200",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K58-U215",
      "zh": "青山灣",
      "en": "Castle Peak Beach"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K58-U220",
      "zh": "海景花園",
      "en": "Seaview Garden"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K58-U230",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "O",
      "seq": 26,
      "id": "K58-U240",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "O",
      "seq": 27,
      "id": "K58-U250",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "O",
      "seq": 28,
      "id": "K58-U260",
      "zh": "愛琴海岸",
      "en": "Aegean Coast"
    },
    {
      "direction": "O",
      "seq": 29,
      "id": "K58-U270",
      "zh": "掃管笏變電站",
      "en": "So Kwun Wat Sub-station"
    },
    {
      "direction": "O",
      "seq": 30,
      "id": "K58-U280",
      "zh": "掃管笏村",
      "en": "So Kwun Wat Tsuen"
    },
    {
      "direction": "O",
      "seq": 31,
      "id": "K58-U290",
      "zh": "掃管笏 (鄭任安夫人千禧小學)",
      "en": "So Kwun Wat (Mrs. Cheng Yam On Millennium School)"
    },
    {
      "direction": "O",
      "seq": 32,
      "id": "K58-U300",
      "zh": "掃管笏路",
      "en": "So Kwun Wat Road"
    },
    {
      "direction": "O",
      "seq": 33,
      "id": "K58-U310",
      "zh": "管翠路18號",
      "en": "18 Kwun Chui Road"
    },
    {
      "direction": "O",
      "seq": 34,
      "id": "K58-U320",
      "zh": "管翠路",
      "en": "Kwun Chui Road"
    }
  ],
  "K65": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K65-D010",
      "zh": "流浮山",
      "en": "Lau Fau Shan"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K65-D020",
      "zh": "新慶村",
      "en": "San Hing Tsuen"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K65-D030",
      "zh": "沙江圍",
      "en": "Sha Kong Wai"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K65-D040",
      "zh": "鳳降村",
      "en": "Fung Kong Tsuen"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K65-D050",
      "zh": "東頭村",
      "en": "Tung Tau Tsuen"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K65-D060",
      "zh": "羅屋村",
      "en": "Lo Uk Tsuen"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K65-D070",
      "zh": "錫降圍",
      "en": "Shek Kong Wai"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K65-D080",
      "zh": "廈村",
      "en": "Ha Tsuen"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K65-D090",
      "zh": "沙洲里村",
      "en": "Sha Chau Lei Tsuen"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K65-D100",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K65-D110",
      "zh": "輕鐵坑尾村站",
      "en": "LR Hang Mei Tsuen Stop"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K65-D120",
      "zh": "坑尾村",
      "en": "Hang Mei Tsuen"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K65-D130",
      "zh": "屏山屏興里",
      "en": "Ping Hing Lane, Ping Shan"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K65-D140",
      "zh": "輕鐵屏山站",
      "en": "LR Ping Shan Stop"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K65-D150",
      "zh": "輕鐵水邊圍站",
      "en": "LR Shui Pin Wai Stop"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K65-D160",
      "zh": "元朗廣場",
      "en": "Yuen Long Plaza"
    },
    {
      "direction": "I",
      "seq": 17,
      "id": "K65-D170",
      "zh": "開心廣場",
      "en": "Yuen Long Landmark"
    },
    {
      "direction": "I",
      "seq": 18,
      "id": "K65-D180",
      "zh": "谷亭街",
      "en": "Kuk Ting Street"
    },
    {
      "direction": "I",
      "seq": 19,
      "id": "K65-D190",
      "zh": "元朗站 (輕鐵元朗站, 港鐵元朗站)",
      "en": "Yuen Long Station (LR Yuen Long Stop, MTR Yuen Long Station)"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K65-U010",
      "zh": "元朗站 (輕鐵元朗站) (港鐵元朗站)",
      "en": "Yuen Long Station (LR Yuen Long Stop) (MTR Yuen Long Station)"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K65-U020",
      "zh": "又新街",
      "en": "Yau San Street"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K65-U030",
      "zh": "大棠路",
      "en": "Tai Tong Road"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K65-U040",
      "zh": "康樂路",
      "en": "Hong Lok Road"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K65-U050",
      "zh": "元朗警署",
      "en": "Yuen Long Police Station"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K65-U060",
      "zh": "輕鐵水邊圍站",
      "en": "LR Shui Pin Wai Stop"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K65-U070",
      "zh": "元朗公園",
      "en": "Yuen Long Park"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K65-U080",
      "zh": "朗邊",
      "en": "Long Bin"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K65-U090",
      "zh": "屏山屏興里",
      "en": "Ping Hing Lane, Ping Shan"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K65-U100",
      "zh": "坑尾村",
      "en": "Hang Mei Tsuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K65-U110",
      "zh": "輕鐵坑尾村站",
      "en": "LR Hang Mei Tsuen Stop"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K65-U120",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K65-U130",
      "zh": "石埗路",
      "en": "Shek Po Road"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K65-U140",
      "zh": "沙洲里村",
      "en": "Sha Chau Lei Tsuen"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K65-U150",
      "zh": "廈村",
      "en": "Ha Tsuen"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K65-U160",
      "zh": "錫降圍",
      "en": "Shek Kong Wai"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K65-U170",
      "zh": "羅屋村",
      "en": "Lo Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K65-U180",
      "zh": "東頭村 (南)",
      "en": "Tung Tau Tsuen (South)"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K65-U190",
      "zh": "東頭村 (北)",
      "en": "Tung Tau Tsuen (North)"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K65-U200",
      "zh": "鳳降村",
      "en": "Fung Kong Tsuen"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K65-U210",
      "zh": "沙江圍",
      "en": "Sha Kong Wai"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K65-U220",
      "zh": "新慶村",
      "en": "San Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K65-U230",
      "zh": "流浮山",
      "en": "Lau Fau Shan"
    }
  ],
  "K66": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K66-D010",
      "zh": "大棠黃泥墩村",
      "en": "Tai Tong Wong Nai Tun Tsuen"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K66-D020",
      "zh": "大棠山路",
      "en": "Tai Tong Shan Road"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K66-D030",
      "zh": "大棠迴旋處",
      "en": "Tai Tong Roundabout"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K66-D040",
      "zh": "華苑",
      "en": "Wah Yuen"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K66-D050",
      "zh": "水蕉新村",
      "en": "Shui Chiu San Tsuen"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K66-D060",
      "zh": "南坑排",
      "en": "Nam Hang Pai"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K66-D070",
      "zh": "南坑村",
      "en": "Nam Hang Tsuen"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K66-D080",
      "zh": "紅棗田村",
      "en": "Hung Tso Tin Tsuen"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K66-D090",
      "zh": "普盛圍",
      "en": "Po Shing Wai"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K66-D100",
      "zh": "崇正公立學校",
      "en": "Shung Ching School"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K66-D110",
      "zh": "羅家園",
      "en": "Law Ka Yuen"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K66-D120",
      "zh": "深涌村",
      "en": "Sham Chung Tsuen"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K66-D130",
      "zh": "禮修村",
      "en": "Fraser Village"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K66-D140",
      "zh": "蝶翠峰",
      "en": "Sereno Verde"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K66-D150",
      "zh": "恆香製餅廠",
      "en": "Hang Heung Cake Shop"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K66-D160",
      "zh": "富達廣場",
      "en": "Manhattan Plaza"
    },
    {
      "direction": "I",
      "seq": 17,
      "id": "K66-D170",
      "zh": "千色廣場",
      "en": "Citi Mall"
    },
    {
      "direction": "I",
      "seq": 18,
      "id": "K66-D180",
      "zh": "安康路",
      "en": "On Hong Road"
    },
    {
      "direction": "I",
      "seq": 19,
      "id": "K66-D190",
      "zh": "元朗大會堂 (輕鐵豐年路站)",
      "en": "Yuen Long Town Hall (LR Fung Nin Road Stop)"
    },
    {
      "direction": "I",
      "seq": 20,
      "id": "K66-D200",
      "zh": "水邊圍邨康水樓",
      "en": "Hong Shui House, Shui Pin Wai Estate"
    },
    {
      "direction": "I",
      "seq": 21,
      "id": "K66-D210",
      "zh": "朗屏邨悅屏樓 (港鐵朗屏站)",
      "en": "Yuet Ping House, Long Ping Estate (MTR Long Ping Station)"
    },
    {
      "direction": "I",
      "seq": 22,
      "id": "K66-D220",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "I",
      "seq": 23,
      "id": "K66-D230",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "I",
      "seq": 24,
      "id": "K66-D240",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K66-U010",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K66-D010",
      "zh": "大棠黃泥墩村",
      "en": "Tai Tong Wong Nai Tun Tsuen"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K66-D010",
      "zh": "大棠黃泥墩村",
      "en": "Tai Tong Wong Nai Tun Tsuen"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K66-D060",
      "zh": "南坑排",
      "en": "Nam Hang Pai"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K66-U020",
      "zh": "楊屋村",
      "en": "Yeung Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K66-D020",
      "zh": "大棠山路",
      "en": "Tai Tong Shan Road"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K66-D020",
      "zh": "大棠山路",
      "en": "Tai Tong Shan Road"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K66-D070",
      "zh": "南坑村",
      "en": "Nam Hang Tsuen"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K66-U030",
      "zh": "屏昌徑 (港鐵朗屏站)",
      "en": "Ping Cheong Path (MTR Long Ping Station)"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K66-D030",
      "zh": "大棠迴旋處",
      "en": "Tai Tong Roundabout"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K66-D030",
      "zh": "大棠迴旋處",
      "en": "Tai Tong Roundabout"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K66-D080",
      "zh": "紅棗田村",
      "en": "Hung Tso Tin Tsuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K66-U040",
      "zh": "元朗盲人安老院",
      "en": "Yuen Long Home for the Aged Blind"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K66-D040",
      "zh": "華苑",
      "en": "Wah Yuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K66-D040",
      "zh": "華苑",
      "en": "Wah Yuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K66-D090",
      "zh": "普盛圍",
      "en": "Po Shing Wai"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K66-U050",
      "zh": "元朗大會堂 (輕鐵豐年路站)",
      "en": "Yuen Long Town Hall (LR Fung Nin Road Stop)"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K66-D050",
      "zh": "水蕉新村",
      "en": "Shui Chiu San Tsuen"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K66-D050",
      "zh": "水蕉新村",
      "en": "Shui Chiu San Tsuen"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K66-D100",
      "zh": "崇正公立學校",
      "en": "Shung Ching School"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K66-U060",
      "zh": "安康路",
      "en": "On Hong Road"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K66-D060",
      "zh": "南坑排",
      "en": "Nam Hang Pai"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K66-D060",
      "zh": "南坑排",
      "en": "Nam Hang Pai"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K66-D110",
      "zh": "羅家園",
      "en": "Law Ka Yuen"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K66-U070",
      "zh": "元朗商業中心",
      "en": "Yuen Long Commercial Centre"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K66-D070",
      "zh": "南坑村",
      "en": "Nam Hang Tsuen"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K66-D070",
      "zh": "南坑村",
      "en": "Nam Hang Tsuen"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K66-D120",
      "zh": "深涌村",
      "en": "Sham Chung Tsuen"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K66-U080",
      "zh": "富達廣場",
      "en": "Manhattan Plaza"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K66-D080",
      "zh": "紅棗田村",
      "en": "Hung Tso Tin Tsuen"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K66-D080",
      "zh": "紅棗田村",
      "en": "Hung Tso Tin Tsuen"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K66-D130",
      "zh": "禮修村",
      "en": "Fraser Village"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K66-U090",
      "zh": "蝶翠峰",
      "en": "Sereno Verde"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K66-D090",
      "zh": "普盛圍",
      "en": "Po Shing Wai"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K66-D090",
      "zh": "普盛圍",
      "en": "Po Shing Wai"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K66-D140",
      "zh": "蝶翠峰",
      "en": "Sereno Verde"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K66-U100",
      "zh": "禮修村",
      "en": "Fraser Village"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K66-D100",
      "zh": "崇正公立學校",
      "en": "Shung Ching School"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K66-D100",
      "zh": "崇正公立學校",
      "en": "Shung Ching School"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K66-D150",
      "zh": "恆香製餅廠",
      "en": "Hang Heung Cake Shop"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K66-U110",
      "zh": "深涌村",
      "en": "Sham Chung Tsuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K66-D110",
      "zh": "羅家園",
      "en": "Law Ka Yuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K66-D110",
      "zh": "羅家園",
      "en": "Law Ka Yuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K66-D160",
      "zh": "富達廣場",
      "en": "Manhattan Plaza"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K66-U120",
      "zh": "羅家園",
      "en": "Law Ka Yuen"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K66-D120",
      "zh": "深涌村",
      "en": "Sham Chung Tsuen"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K66-D120",
      "zh": "深涌村",
      "en": "Sham Chung Tsuen"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K66-D170",
      "zh": "千色廣場",
      "en": "Citi Mall"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K66-U130",
      "zh": "崇正公立學校",
      "en": "Shung Ching School"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K66-D130",
      "zh": "禮修村",
      "en": "Fraser Village"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K66-D130",
      "zh": "禮修村",
      "en": "Fraser Village"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K66-D180",
      "zh": "安康路",
      "en": "On Hong Road"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K66-U140",
      "zh": "崇正菜站",
      "en": "Shung Ching Vegetable Market"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K66-D140",
      "zh": "蝶翠峰",
      "en": "Sereno Verde"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K66-D140",
      "zh": "蝶翠峰",
      "en": "Sereno Verde"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K66-D190",
      "zh": "元朗大會堂",
      "en": "Yuen Long Town Hall"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K66-U150",
      "zh": "老圍",
      "en": "Lo Wai"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K66-D150",
      "zh": "恆香製餅廠",
      "en": "Hang Heung Cake Shop"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K66-D150",
      "zh": "恆香製餅廠",
      "en": "Hang Heung Cake Shop"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K66-D200",
      "zh": "水邊圍邨康水樓",
      "en": "Hong Shui House, Shui Pin Wai Estate"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K66-U160",
      "zh": "振華花園",
      "en": "Chun Wah Villas"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K66-D160",
      "zh": "富達廣場",
      "en": "Manhattan Plaza"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K66-D160",
      "zh": "富達廣場",
      "en": "Manhattan Plaza"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K66-D210",
      "zh": "朗屏邨悅屏樓",
      "en": "Yuet Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K66-U170",
      "zh": "南坑排",
      "en": "Nam Hang Pai"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K66-D170",
      "zh": "千色廣場",
      "en": "Citi Mall"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K66-D170",
      "zh": "千色廣場",
      "en": "Citi Mall"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K66-D220",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K66-U180",
      "zh": "水蕉新村",
      "en": "Shui Chiu San Tsuen"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K66-D180",
      "zh": "安康路",
      "en": "On Hong Road"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K66-D180",
      "zh": "安康路",
      "en": "On Hong Road"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K66-D230",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K66-U190",
      "zh": "華苑",
      "en": "Wah Yuen"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K66-D190",
      "zh": "元朗大會堂",
      "en": "Yuen Long Town Hall"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K66-D240",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K66-U200",
      "zh": "大棠迴旋處",
      "en": "Tai Tong Roundabout"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K66-D200",
      "zh": "水邊圍邨康水樓",
      "en": "Hong Shui House, Shui Pin Wai Estate"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K66-U210",
      "zh": "大棠山路",
      "en": "Tai Tong Shan Road"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K66-D210",
      "zh": "朗屏邨悅屏樓",
      "en": "Yuet Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K66-U220",
      "zh": "大棠黃泥墩村",
      "en": "Tai Tong Wong Nai Tun Tsuen"
    }
  ],
  "K68": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K68-U010",
      "zh": "元朗工業邨",
      "en": "Yuen Long Industrial Estate"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K68-U160",
      "zh": "銀田花園",
      "en": "Silver Field Garden"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K68-D070",
      "zh": "元朗廣場",
      "en": "Yuen Long Plaza"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K68-D090",
      "zh": "大橋村",
      "en": "Tai Kiu Tsuen"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K68-U010",
      "zh": "元朗工業邨",
      "en": "Yuen Long Industrial Estate"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K68-U020",
      "zh": "凸版資訊卡",
      "en": "Toppan Forms Card Tech Ltd"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K68-U170",
      "zh": "南元朗官立小學",
      "en": "South Yuen Long Government Primary School"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K68-D080",
      "zh": "元朗安寧路",
      "en": "Yuen Long On Ning Road"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K68-D100",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K68-U020",
      "zh": "凸版資訊卡",
      "en": "Toppan Forms Card Tech Ltd"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K68-U030",
      "zh": "雀巢",
      "en": "Nestle (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K68-D010",
      "zh": "元朗公園",
      "en": "Yuen Long Park"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K68-D090",
      "zh": "大橋村",
      "en": "Tai Kiu Tsuen"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K68-D110",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K68-U030",
      "zh": "雀巢",
      "en": "Nestle (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K68-U040",
      "zh": "元朗污水處理廠",
      "en": "Yuen Long Sewage Treatment Works"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K68-D020",
      "zh": "御豪山莊",
      "en": "Park Royale"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K68-D100",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K68-D120",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K68-U040",
      "zh": "元朗污水處理廠",
      "en": "Yuen Long Sewage Treatment Works"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K68-U050",
      "zh": "位元堂藥業大廈",
      "en": "Wai Yuen Tong Medicine Building"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K68-D030",
      "zh": "藝典居",
      "en": "Villa Art Deco"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K68-D110",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K68-D130",
      "zh": "橫洲福慶村",
      "en": "Wang Chau Fuk Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K68-U050",
      "zh": "位元堂藥業大廈",
      "en": "Wai Yuen Tong Medicine Building"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K68-U060",
      "zh": "東電化電子零件",
      "en": "TDK Manufacturing (HK) Co Ltd"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K68-D040",
      "zh": "御庭居",
      "en": "Springdale Villas"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K68-D120",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K68-D140",
      "zh": "元朗紡織品",
      "en": "Yuen Long Textile Co Ltd"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K68-U060",
      "zh": "東電化電子零件",
      "en": "TDK Manufacturing (HK) Co Ltd"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K68-U070",
      "zh": "凸版印刷",
      "en": "Toppan Printing Co (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K68-D050",
      "zh": "元朗游泳池",
      "en": "Yuen Long Swimming Pool"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K68-D130",
      "zh": "橫洲福慶村",
      "en": "Wang Chau Fuk Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K68-D150",
      "zh": "大昌行食品加工及物流中心",
      "en": "DCH Food Processing & Logistics Centre"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K68-U070",
      "zh": "凸版印刷",
      "en": "Toppan Printing Co (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K68-U080",
      "zh": "匯泉國際實業",
      "en": "Telford International Industries Ltd"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K68-D060",
      "zh": "元朗大會堂",
      "en": "Yuen Long Town Hall"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K68-D140",
      "zh": "元朗紡織品",
      "en": "Yuen Long Textile Co Ltd"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K68-D160",
      "zh": "有生鉛水(熱浸鋅)",
      "en": "Yau Sang Galvanizers (Hot-Dip) Co Ltd"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K68-U080",
      "zh": "匯泉國際實業",
      "en": "Telford International Industries Ltd"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K68-U090",
      "zh": "橫洲福慶村",
      "en": "Wang Chau Fuk Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K68-D070",
      "zh": "元朗廣場",
      "en": "Yuen Long Plaza"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K68-D150",
      "zh": "大昌行食品加工及物流中心",
      "en": "DCH Food Processing & Logistics Centre"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K68-D170",
      "zh": "余仁生中心",
      "en": "Eu Yan Sang Centre"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K68-U090",
      "zh": "橫洲福慶村",
      "en": "Wang Chau Fuk Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K68-U100",
      "zh": "朗屏 (巴士總站)",
      "en": "Long Ping (Bus Terminus)"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K68-D080",
      "zh": "元朗安寧路",
      "en": "Yuen Long On Ning Road"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K68-D160",
      "zh": "有生鉛水(熱浸鋅)",
      "en": "Yau Sang Galvanizers (Hot-Dip) Co Ltd"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K68-D180",
      "zh": "元朗污水處理廠",
      "en": "Yuen Long Sewage Treatment Works"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K68-U100",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K68-U110",
      "zh": "楊屋村",
      "en": "Yeung Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K68-D090",
      "zh": "大橋村",
      "en": "Tai Kiu Tsuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K68-D170",
      "zh": "余仁生中心",
      "en": "Eu Yan Sang Centre"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K68-D190",
      "zh": "雀巢",
      "en": "Nestle (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K68-U110",
      "zh": "楊屋村",
      "en": "Yeung Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K68-U120",
      "zh": "屏昌徑 (港鐵朗屏站)",
      "en": "Ping Cheong Path (MTR Long Ping Station)"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K68-D100",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K68-D180",
      "zh": "元朗污水處理廠",
      "en": "Yuen Long Sewage Treatment Works"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K68-D200",
      "zh": "牛尾香港",
      "en": "Ushio HK Ltd"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K68-D090",
      "zh": "大橋村",
      "en": "Tai Kiu Tsuen"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K68-U130",
      "zh": "元朗盲人安老院",
      "en": "Yuen Long Home for the Aged Blind"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K68-D110",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K68-D190",
      "zh": "雀巢",
      "en": "Nestle (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K68-U011",
      "zh": "元朗工業邨",
      "en": "Yuen Long Industrial Estate"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K68-U140",
      "zh": "聿修堂 (輕鐵豐年路站)",
      "en": "Lut Sau Hall (LR Fung Nin Road Stop)"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K68-D120",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K68-D200",
      "zh": "牛尾香港",
      "en": "Ushio HK Ltd"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K68-U150",
      "zh": "元朗劇院",
      "en": "Yuen Long Theatre"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K68-D130",
      "zh": "橫洲福慶村",
      "en": "Wang Chau Fuk Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K68-U011",
      "zh": "元朗工業邨",
      "en": "Yuen Long Industrial Estate"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K68-U160",
      "zh": "銀田花園",
      "en": "Silver Field Garden"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K68-D140",
      "zh": "元朗紡織品",
      "en": "Yuen Long Textile Co Ltd"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K68-U170",
      "zh": "南元朗官立小學",
      "en": "South Yuen Long Government Primary School"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K68-D150",
      "zh": "大昌行食品加工及物流中心",
      "en": "DCH Food Processing & Logistics Centre"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K68-D010",
      "zh": "元朗公園",
      "en": "Yuen Long Park"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K68-D160",
      "zh": "有生鉛水(熱浸鋅)",
      "en": "Yau Sang Galvanizers (Hot-Dip) Co Ltd"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K68-D020",
      "zh": "御豪山莊",
      "en": "Park Royale"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K68-D170",
      "zh": "余仁生中心",
      "en": "Eu Yan Sang Centre"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K68-D030",
      "zh": "藝典居",
      "en": "Villa Art Deco"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K68-D180",
      "zh": "元朗污水處理廠",
      "en": "Yuen Long Sewage Treatment Works"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K68-D040",
      "zh": "御庭居",
      "en": "Springdale Villas"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K68-D190",
      "zh": "雀巢",
      "en": "Nestle (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K68-D050",
      "zh": "元朗游泳池",
      "en": "Yuen Long Swimming Pool"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K68-D200",
      "zh": "牛尾香港",
      "en": "Ushio HK Ltd"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K68-D060",
      "zh": "元朗大會堂",
      "en": "Yuen Long Town Hall"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K68-U011",
      "zh": "元朗工業邨",
      "en": "Yuen Long Industrial Estate"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K68-D070",
      "zh": "元朗廣場 (輕鐵豐年路站)",
      "en": "Yuen Long Plaza (LR Fung Nin Road Stop)"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K68-D080",
      "zh": "元朗安寧路",
      "en": "Yuen Long On Ning Road"
    },
    {
      "direction": "O",
      "seq": 26,
      "id": "K68-D090",
      "zh": "大橋村 (港鐵朗屏站)",
      "en": "Tai Kiu Tsuen (MTR Long Ping Station)"
    },
    {
      "direction": "O",
      "seq": 27,
      "id": "K68-D100",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "O",
      "seq": 28,
      "id": "K68-D110",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 29,
      "id": "K68-D120",
      "zh": "朗屏 (巴士總站)",
      "en": "Long Ping (Bus Terminus)"
    },
    {
      "direction": "O",
      "seq": 30,
      "id": "K68-D130",
      "zh": "橫洲福慶村",
      "en": "Wang Chau Fuk Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 31,
      "id": "K68-D140",
      "zh": "元朗紡織品",
      "en": "Yuen Long Textile Co Ltd"
    },
    {
      "direction": "O",
      "seq": 32,
      "id": "K68-D150",
      "zh": "大昌行食品加工及物流中心",
      "en": "DCH Food Processing & Logistics Centre"
    },
    {
      "direction": "O",
      "seq": 33,
      "id": "K68-D160",
      "zh": "有生鉛水(熱浸鋅)",
      "en": "Yau Sang Galvanizers (Hot-Dip) Co Ltd"
    },
    {
      "direction": "O",
      "seq": 34,
      "id": "K68-D170",
      "zh": "余仁生中心",
      "en": "Eu Yan Sang Centre"
    },
    {
      "direction": "O",
      "seq": 35,
      "id": "K68-D180",
      "zh": "元朗污水處理廠",
      "en": "Yuen Long Sewage Treatment Works"
    },
    {
      "direction": "O",
      "seq": 36,
      "id": "K68-D190",
      "zh": "雀巢",
      "en": "Nestle (HK) Ltd"
    },
    {
      "direction": "O",
      "seq": 37,
      "id": "K68-D200",
      "zh": "牛尾香港",
      "en": "Ushio HK Ltd"
    },
    {
      "direction": "O",
      "seq": 38,
      "id": "K68-U011",
      "zh": "元朗工業邨",
      "en": "Yuen Long Industrial Estate"
    }
  ],
  "K73": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K73-D010",
      "zh": "元朗西 (輕鐵豐年路站)",
      "en": "Yuen Long West (LR Fung Nin Road Stop)"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K73-D020",
      "zh": "元朗安寧路",
      "en": "Yuen Long On Ning Road"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K73-D030",
      "zh": "大橋村 (港鐵朗屏站)",
      "en": "Tai Kiu Tsuen (MTR Long Ping Station)"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K73-D040",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K73-D050",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K73-D070",
      "zh": "朗屏 (巴士總站)",
      "en": "Long Ping (Bus Terminus)"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K73-D080",
      "zh": "鳳池村",
      "en": "Fung Chi Tsuen"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K73-D090",
      "zh": "輕鐵天慈站",
      "en": "LR Tin Tsz Stop"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K73-D100",
      "zh": "天水圍游泳池",
      "en": "Tin Shui Wai Swimming Pool"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K73-D110",
      "zh": "天龍路景湖居",
      "en": "Kenswood Court, Tin Lung Road"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K73-D120",
      "zh": "天葵路麗湖居",
      "en": "Lynwood Court, Tin Kwai Road"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K73-D130",
      "zh": "天晴邨晴雲樓",
      "en": "Ching Wan House, Tin Ching Estate"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K73-D140",
      "zh": "天富苑能富閣",
      "en": "Nang Fu House, Tin Fu Court"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K73-D150",
      "zh": "天澤邨",
      "en": "Tin Chak Estate"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K73-D160",
      "zh": "天恆",
      "en": "Tin Heng"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K73-U010",
      "zh": "天恆",
      "en": "Tin Heng"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K73-U025",
      "zh": "天恩",
      "en": "Tin Yan"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K73-U050",
      "zh": "香港青年協會李兆基書院",
      "en": "HKFYG Lee Shau Kee College"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K73-U020",
      "zh": "天逸邨逸潭樓",
      "en": "Yat Tam House, Tin Yat Estate"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K73-U045",
      "zh": "天悅邨",
      "en": "Tin Yuet Estate"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K73-U060",
      "zh": "天葵路美湖居",
      "en": "Maywood Court, Tin Kwai Road"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K73-U030",
      "zh": "天逸邨逸洋樓",
      "en": "Yat Yeung House, Tin Yat Estate"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K73-U060",
      "zh": "天葵路美湖居",
      "en": "Maywood Court, Tin Kwai Road"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K73-U070",
      "zh": "天城路景湖居",
      "en": "Kenswood Court, Tin Shing Road"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K73-U040",
      "zh": "天晴邨晴碧樓",
      "en": "Ching Pik House, Tin Ching Estate"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K73-U070",
      "zh": "天城路景湖居",
      "en": "Kenswood Court, Tin Shing Road"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K73-U080",
      "zh": "天慈邨",
      "en": "Tin Tsz Estate"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K73-U050",
      "zh": "香港青年協會李兆基書院",
      "en": "HKFYG Lee Shau Kee College"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K73-U080",
      "zh": "天慈邨",
      "en": "Tin Tsz Estate"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K73-U090",
      "zh": "鳳池村",
      "en": "Fung Chi Tsuen"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K73-U060",
      "zh": "天葵路美湖居",
      "en": "Maywood Court, Tin Kwai Road"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K73-U090",
      "zh": "鳳池村",
      "en": "Fung Chi Tsuen"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K73-U100",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K73-U070",
      "zh": "天城路景湖居",
      "en": "Kenswood Court, Tin Shing Road"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K73-U100",
      "zh": "朗屏",
      "en": "Long Ping"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K73-U110",
      "zh": "元朗盲人安老院",
      "en": "Yuen Long Home for the Aged Blind"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K73-U080",
      "zh": "天慈邨",
      "en": "Tin Tsz Estate"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K73-U110",
      "zh": "元朗盲人安老院",
      "en": "Yuen Long Home for the Aged Blind"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K73-U120",
      "zh": "元朗西",
      "en": "Yuen Long West"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K73-U090",
      "zh": "鳳池村",
      "en": "Fung Chi Tsuen"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K73-U120",
      "zh": "元朗西",
      "en": "Yuen Long West"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K73-U100",
      "zh": "朗屏 (巴士總站)",
      "en": "Long Ping (Bus Terminus)"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K73-U110",
      "zh": "元朗盲人安老院",
      "en": "Yuen Long Home for the Aged Blind"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K73-U120",
      "zh": "元朗西 (輕鐵豐年路站)",
      "en": "Yuen Long West (LR Fung Nin Road Stop)"
    }
  ],
  "K74": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K74-U001",
      "zh": "天水圍市中心",
      "en": "Tin Shui Wai Town Centre"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K74-U004",
      "zh": "天頌苑頌棋閣",
      "en": "Chung Ki House Tin Chung Court"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K74-U007",
      "zh": "天頌苑",
      "en": "Tin Chung Court"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K74-U010",
      "zh": "天瑞",
      "en": "Tin Shui"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K74-U020",
      "zh": "天水圍公園",
      "en": "Tin Shui Wai Park"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K74-U030",
      "zh": "天慈邨",
      "en": "Tin Tsz Estate"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K74-U040",
      "zh": "鳳池村",
      "en": "Fung Chi Tsuen"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K74-U050",
      "zh": "朗屏 (巴士總站)",
      "en": "Long Ping (Bus Terminus)"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K74-U060",
      "zh": "元朗盲人安老院",
      "en": "Yuen Long Home for the Aged Blind"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K74-U070",
      "zh": "元朗廣場 (輕鐵豐年路站)",
      "en": "Yuen Long Plaza (LR Fung Nin Road Stop)"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K74-U080",
      "zh": "開心廣場",
      "en": "Yuen Long Landmark"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K74-U090",
      "zh": "港鐵元朗站(朗日路)  (港鐵元朗站)",
      "en": "MTR Yuen Long Station (Long Yat Road) (MTR Yuen Long Station)"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K74-U100",
      "zh": "博愛醫院",
      "en": "Pok Oi Hospital"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K74-D010",
      "zh": "東成里",
      "en": "Tung Shing Lei"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K74-D020",
      "zh": "東華三院馬振玉中學(近朗善邨)",
      "en": "TWGHs C.Y.Ma Memorial College (near Long Shin Estate)"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K74-D030",
      "zh": "大橋村 (港鐵朗屏站)",
      "en": "Tai Kiu Tsuen (MTR Long Ping Station)"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K74-D040",
      "zh": "惠州學校",
      "en": "Wai Chow School"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K74-D050",
      "zh": "朗屏邨珠屏樓",
      "en": "Chu Ping House, Long Ping Estate"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K74-D060",
      "zh": "朗屏 (巴士總站)",
      "en": "Long Ping (Bus Terminus)"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K74-D070",
      "zh": "鳳池村",
      "en": "Fung Chi Tsuen"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K74-D080",
      "zh": "輕鐵天慈站",
      "en": "LR Tin Tsz Stop"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K74-D090",
      "zh": "天水圍公園",
      "en": "Tin Shui Wai Park"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K74-U011",
      "zh": "天瑞",
      "en": "Tin Shui"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K74-D100",
      "zh": "天華邨",
      "en": "Tin Wah Estate"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K74-D110",
      "zh": "天悅邨",
      "en": "Tin Yuet Estate"
    },
    {
      "direction": "O",
      "seq": 26,
      "id": "K74-U002",
      "zh": "天水圍市中心",
      "en": "Tin Shui Wai Town Centre"
    }
  ],
  "K76": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K76-D010",
      "zh": "天水圍站 (港鐵天水圍站)",
      "en": "Tin Shui Wai Station (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K76-D020",
      "zh": "天恩邨",
      "en": "Tin Yan Estate"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K76-D030",
      "zh": "天澤邨",
      "en": "Tin Chak Estate"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K76-D040",
      "zh": "天恆",
      "en": "Tin Heng"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K76-U010",
      "zh": "天恆",
      "en": "Tin Heng"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K76-U020",
      "zh": "天逸邨逸潭樓",
      "en": "Yat Tam House, Tin Yat Estate"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K76-U030",
      "zh": "天富苑欣富閣",
      "en": "Yan Fu House, Tin Fu Court"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K76-U040",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K76-U050",
      "zh": "天水圍站 (港鐵天水圍站)",
      "en": "Tin Shui Wai Station (MTR Tin Shui Wai Station)"
    }
  ],
  "K51A": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K51A-D010",
      "zh": "掃管笏村",
      "en": "So Kwun Wat Tsuen"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K51A-D020",
      "zh": "掃管笏 (鄭任安夫人千禧小學)",
      "en": "So Kwun Wat (Mrs. Cheng Yam On Millennium School)"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K51A-D030",
      "zh": "掃管笏路",
      "en": "So Kwun Wat Road"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K51A-D040",
      "zh": "管翠路18號",
      "en": "18 Kwun Chui Road"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K51A-D050",
      "zh": "管翠路",
      "en": "Kwun Chui Road"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K51A-D060",
      "zh": "愛琴海岸",
      "en": "Aegean Coast"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K51A-D070",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K51A-D080",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K51A-D090",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K51A-D100",
      "zh": "碧翠花園",
      "en": "Bayview Terrace"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K51A-D110",
      "zh": "青山灣碼頭",
      "en": "Castle Peak Bay Pier"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K51A-D120",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K51A-D140",
      "zh": "胡陳金枝中學",
      "en": "Mrs Aw Boon Haw Secondary School"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K51A-D150",
      "zh": "青善遊樂場",
      "en": "Tsing Sin Playground"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K51A-D160",
      "zh": "置樂花園",
      "en": "Chi Lok Fa Yuen"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K51A-D170",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "I",
      "seq": 17,
      "id": "K51A-D180",
      "zh": "輕鐵市中心站",
      "en": "LR Town Centre Stop"
    },
    {
      "direction": "I",
      "seq": 18,
      "id": "K51A-D190",
      "zh": "港鐵屯門站 (輕鐵屯門站)",
      "en": "MTR Tuen Mun Station (LR Tuen Mun Stop)"
    },
    {
      "direction": "I",
      "seq": 19,
      "id": "K51A-D200",
      "zh": "聖公會聖西門呂明才中學",
      "en": "SKH St. Simon's Lui Ming Choi Secondary School"
    },
    {
      "direction": "I",
      "seq": 20,
      "id": "K51A-D210",
      "zh": "景峰花園",
      "en": "Prime View Garden"
    },
    {
      "direction": "I",
      "seq": 21,
      "id": "K51A-D220",
      "zh": "輕鐵鳳地站",
      "en": "LR Fung Tei Stop"
    },
    {
      "direction": "I",
      "seq": 22,
      "id": "K51A-D230",
      "zh": "港鐵兆康站 (南) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (South) (LR Siu Hong Stop)"
    },
    {
      "direction": "I",
      "seq": 23,
      "id": "K51A-D240",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "I",
      "seq": 24,
      "id": "K51A-D250",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "I",
      "seq": 25,
      "id": "K51A-D260",
      "zh": "倚嶺南庭",
      "en": "South Hillcrest"
    },
    {
      "direction": "I",
      "seq": 26,
      "id": "K51A-D270",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K51A-U010",
      "zh": "富泰",
      "en": "Fu Tai"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K51A-U020",
      "zh": "聚康山莊",
      "en": "Beneville"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K51A-U030",
      "zh": "嶺南大學",
      "en": "Lingnan University"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K51A-U040",
      "zh": "彩暉花園",
      "en": "Brilliant Garden"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K51A-U050",
      "zh": "港鐵兆康站 (南) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (South) (LR Siu Hong Stop)"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K51A-U060",
      "zh": "井財街",
      "en": "Tseng Choi Street"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K51A-U070",
      "zh": "雅都商場",
      "en": "ACME Shopping Arcade"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K51A-U080",
      "zh": "德政圍 (港鐵屯門站)",
      "en": "Tak Ching Court (MTR Tuen Mun Station)"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K51A-U090",
      "zh": "屯門市中心 (輕鐵市中心站)",
      "en": "Tuen Mun Town Centre (LR Town Centre Stop)"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K51A-U100",
      "zh": "屯門官立中學",
      "en": "Tuen Mun Government Secondary School"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K51A-U110",
      "zh": "恒順園",
      "en": "Handsome Court"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K51A-U120",
      "zh": "恒豐園",
      "en": "Harvest Garden"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K51A-U130",
      "zh": "三聖邨",
      "en": "Sam Shing Estate"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K51A-U140",
      "zh": "青山灣",
      "en": "Castle Peak Beach"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K51A-U150",
      "zh": "海景花園",
      "en": "Seaview Garden"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K51A-U160",
      "zh": "咖啡灣",
      "en": "Cafeteria Beach"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K51A-U170",
      "zh": "黃金泳灘",
      "en": "Golden Beach"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K51A-U180",
      "zh": "香港黃金海岸",
      "en": "Hong Kong Gold Coast"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K51A-U190",
      "zh": "愛琴海岸",
      "en": "Aegean Coast"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K51A-U200",
      "zh": "掃管笏變電站",
      "en": "So Kwun Wat Sub-station"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K51A-U210",
      "zh": "掃管笏村",
      "en": "So Kwun Wat Tsuen"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K51A-U220",
      "zh": "掃管笏 (鄭任安夫人千禧小學)",
      "en": "So Kwun Wat (Mrs. Cheng Yam On Millennium School)"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K51A-U230",
      "zh": "掃管笏路",
      "en": "So Kwun Wat Road"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K51A-U240",
      "zh": "管翠路18號",
      "en": "18 Kwun Chui Road"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K51A-U250",
      "zh": "掃管笏村",
      "en": "So Kwun Wat Tsuen"
    }
  ],
  "K52A": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K52A-D010",
      "zh": "曾咀 (曾咀靈灰安置所)",
      "en": "Tsang Tsui (Tsang Tsui Columbarium)"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K52A-D020",
      "zh": "沙埔崗127號",
      "en": "No.127 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K52A-D030",
      "zh": "沙埔崗177號",
      "en": "No.177 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K52A-D040",
      "zh": "沙埔崗288號",
      "en": "No.288 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K52A-D050",
      "zh": "沙埔崗351號",
      "en": "No.351 Sha Po Kong"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K52A-D060",
      "zh": "中電 A廠",
      "en": "CLP (Plant A)"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K52A-D070",
      "zh": "紹榮鋼鐵",
      "en": "Shiu Wing Steel Mill"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K52A-D080",
      "zh": "環保園",
      "en": "EcoPark"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K52A-D090",
      "zh": "內河碼頭",
      "en": "River Trade Terminal"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K52A-D100",
      "zh": "政府車場",
      "en": "Government Depot"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K52A-D110",
      "zh": "望后石",
      "en": "Pillar Point"
    },
    {
      "direction": "I",
      "seq": 12,
      "id": "K52A-D120",
      "zh": "蝴蝶灣公園",
      "en": "Butterfly Beach Park"
    },
    {
      "direction": "I",
      "seq": 13,
      "id": "K52A-D130",
      "zh": "屯門公眾騎術學校",
      "en": "Tuen Mun Public Riding School"
    },
    {
      "direction": "I",
      "seq": 14,
      "id": "K52A-D140",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "I",
      "seq": 15,
      "id": "K52A-D150",
      "zh": "輕鐵車廠站",
      "en": "Light Rail Depot Stop"
    },
    {
      "direction": "I",
      "seq": 16,
      "id": "K52A-D160",
      "zh": "輕鐵龍門站",
      "en": "LR Lung Mun Stop"
    },
    {
      "direction": "I",
      "seq": 17,
      "id": "K52A-D170",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "I",
      "seq": 18,
      "id": "K52A-D180",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "I",
      "seq": 19,
      "id": "K52A-D190",
      "zh": "屯門站 (輕鐵屯門站)",
      "en": "Tuen Mun Station (LR Tuen Mun Stop)"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K52A-U010",
      "zh": "屯門站 (輕鐵屯門站)",
      "en": "Tuen Mun Station (LR Tuen Mun Stop)"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K52A-U015",
      "zh": "輕鐵屯門站 (請留意服務時間)*",
      "en": "LR Tuen Mun Stop (Please refer to Service Time)*"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K52A-U020",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K52A-U030",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K52A-U040",
      "zh": "聖彼得堂",
      "en": "SKH St. Peter's Church"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K52A-U050",
      "zh": "富健花園",
      "en": "Glorious Garden"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K52A-U060",
      "zh": "新屯門中心",
      "en": "Sun Tuen Mun Centre"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K52A-U070",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K52A-U080",
      "zh": "屯門公眾騎術學校",
      "en": "Tuen Mun Public Riding School"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K52A-U090",
      "zh": "蝴蝶灣公園",
      "en": "Butterfly Beach Park"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K52A-U100",
      "zh": "望后石",
      "en": "Pillar Point"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K52A-U110",
      "zh": "政府車場",
      "en": "Government Depot"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K52A-U120",
      "zh": "內河碼頭",
      "en": "River Trade Terminal"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K52A-U130",
      "zh": "環保園",
      "en": "EcoPark"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K52A-U140",
      "zh": "紹榮鋼鐵",
      "en": "Shiu Wing Steel Mill"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K52A-U150",
      "zh": "沙埔崗312號",
      "en": "No.312 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K52A-U160",
      "zh": "沙埔崗177號",
      "en": "No.177 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K52A-U170",
      "zh": "沙埔崗127號",
      "en": "No.127 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K52A-U180",
      "zh": "曾咀 (曾咀靈灰安置所)",
      "en": "Tsang Tsui (Tsang Tsui Columbarium)"
    }
  ],
  "K52P": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K52P-D010",
      "zh": "龍鼓灘",
      "en": "Lung Kwu Tan"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K52P-D020",
      "zh": "沙埔崗127號",
      "en": "No.127 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K52P-D030",
      "zh": "沙埔崗177號",
      "en": "No.177 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K52P-D040",
      "zh": "沙埔崗288號",
      "en": "No.288 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K52P-D050",
      "zh": "沙埔崗351號",
      "en": "No.351 Sha Po Kong"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K52P-D060",
      "zh": "中電 A廠",
      "en": "CLP (Plant A)"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K52P-D070",
      "zh": "紹榮鋼鐵",
      "en": "Shiu Wing Steel Mill"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K52P-D080",
      "zh": "環保園",
      "en": "EcoPark"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K52P-D090",
      "zh": "內河碼頭",
      "en": "River Trade Terminal"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K52P-D100",
      "zh": "政府車場",
      "en": "Government Depot"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K52P-D110",
      "zh": "望后石",
      "en": "Pillar Point"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K52P-D120",
      "zh": "蝴蝶灣公園",
      "en": "Butterfly Beach Park"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K52P-D130",
      "zh": "屯門公眾騎術學校",
      "en": "Tuen Mun Public Riding School"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K52P-D140",
      "zh": "輕鐵蝴蝶站",
      "en": "LR Butterfly Stop"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K52P-D150",
      "zh": "悅湖山莊",
      "en": "Yuet Wu Villa"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K52P-D160",
      "zh": "邁亞美海灣",
      "en": "Miami Beach Towers"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K52P-D170",
      "zh": "屯門碼頭",
      "en": "Tuen Mun Ferry Pier"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K52P-D180",
      "zh": "湖景邨湖畔樓",
      "en": "Wu Boon House, Wu King Estate"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K52P-D190",
      "zh": "湖景邨湖翠樓",
      "en": "Wu Tsui House, Wu King Estate"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K52P-D200",
      "zh": "兆山苑",
      "en": "Siu Shan Court"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K52P-D210",
      "zh": "輕鐵車廠站",
      "en": "Light Rail Depot Stop"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K52P-D220",
      "zh": "輕鐵龍門站",
      "en": "LR Lung Mun Stop"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K52P-D230",
      "zh": "輕鐵青雲站",
      "en": "LR Tsing Wun Stop"
    },
    {
      "direction": "O",
      "seq": 24,
      "id": "K52P-D240",
      "zh": "輕鐵建安站",
      "en": "LR Kin On Stop"
    },
    {
      "direction": "O",
      "seq": 25,
      "id": "K52P-D250",
      "zh": "屯門站",
      "en": "Tuen Mun Station"
    }
  ],
  "K53S": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K53S-U010",
      "zh": "屯門站",
      "en": "Tuen Mun Station"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K53S-U020",
      "zh": "天后路",
      "en": "Tin Hau Road"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K53S-U030",
      "zh": "業旺邨",
      "en": "Yip Wong Estate"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K53S-U040",
      "zh": "屯門站",
      "en": "Tuen Mun Station"
    }
  ],
  "K54A": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K54A-D010",
      "zh": "港鐵兆康站 (北) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (North) (LR Siu Hong Stop)"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K54A-D020",
      "zh": "兆康苑",
      "en": "Siu Hong Court"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K54A-D030",
      "zh": "欣寶路公共運輸交匯處",
      "en": "Yan Po Road Public Transport Interchange"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K54A-D040",
      "zh": "菁田邨",
      "en": "Ching Tin Estate"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K54A-D050",
      "zh": "和田邨",
      "en": "Wo Tin Estate"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K54A-U010",
      "zh": "和田邨",
      "en": "Wo Tin Estate"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K54A-U020",
      "zh": "菁田邨",
      "en": "Ching Tin Estate"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K54A-U030",
      "zh": "紫田村",
      "en": "Tsz Tin Tsuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K54A-U040",
      "zh": "欣田邨",
      "en": "Yan Tin Estate"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K54A-U050",
      "zh": "港鐵兆康站 (北) (輕鐵兆康站)",
      "en": "MTR Siu Hong Station (North) (LR Siu Hong Stop)"
    }
  ],
  "K65A": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K65A-D010",
      "zh": "流浮山",
      "en": "Lau Fau Shan"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K65A-D020",
      "zh": "新慶村",
      "en": "San Hing Tsuen"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K65A-D030",
      "zh": "沙江圍",
      "en": "Sha Kong Wai"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K65A-D040",
      "zh": "鳳降村",
      "en": "Fung Kong Tsuen"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K65A-D050",
      "zh": "東頭村",
      "en": "Tung Tau Tsuen"
    },
    {
      "direction": "I",
      "seq": 6,
      "id": "K65A-D060",
      "zh": "羅屋村",
      "en": "Lo Uk Tsuen"
    },
    {
      "direction": "I",
      "seq": 7,
      "id": "K65A-D070",
      "zh": "錫降圍",
      "en": "Shek Kong Wai"
    },
    {
      "direction": "I",
      "seq": 8,
      "id": "K65A-D080",
      "zh": "廈村",
      "en": "Ha Tsuen"
    },
    {
      "direction": "I",
      "seq": 9,
      "id": "K65A-D090",
      "zh": "沙洲里村",
      "en": "Sha Chau Lei Tsuen"
    },
    {
      "direction": "I",
      "seq": 10,
      "id": "K65A-D100",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "I",
      "seq": 11,
      "id": "K65A-D110",
      "zh": "天水圍站 (輕鐵天水圍站)",
      "en": "Tin Shui Wai Station (LR Tin Shui Wai Stop)"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K65A-U010",
      "zh": "天水圍站 (輕鐵天水圍站)",
      "en": "Tin Shui Wai Station (LR Tin Shui Wai Stop)"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K65A-U020",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K65A-U030",
      "zh": "石埗路",
      "en": "Shek Po Road"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K65A-U040",
      "zh": "沙洲里村",
      "en": "Sha Chau Lei Tsuen"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K65A-U050",
      "zh": "廈村",
      "en": "Ha Tsuen"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K65A-U060",
      "zh": "錫降圍",
      "en": "Shek Kong Wai"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K65A-U070",
      "zh": "羅屋村",
      "en": "Lo Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K65A-U080",
      "zh": "東頭村 (南)",
      "en": "Tung Tau Tsuen (South)"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K65A-U090",
      "zh": "東頭村 (北)",
      "en": "Tung Tau Tsuen (North)"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K65A-U100",
      "zh": "鳳降村",
      "en": "Fung Kong Tsuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K65A-U110",
      "zh": "沙江圍",
      "en": "Sha Kong Wai"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K65A-U120",
      "zh": "新慶村",
      "en": "San Hing Tsuen"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K65A-U130",
      "zh": "流浮山",
      "en": "Lau Fau Shan"
    }
  ],
  "K75A": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K75A-U010",
      "zh": "天水圍站 (輕鐵天水圍站)",
      "en": "Tin Shui Wai Station (LR Tin Shui Wai Stop)"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K75A-U020",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K75A-U030",
      "zh": "石埗村",
      "en": "Shek Po Tsuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K75A-D010",
      "zh": "輕鐵洪水橋站",
      "en": "LR Hung Shui Kiu Stop"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K75A-D020",
      "zh": "鄉事委員會",
      "en": "Rural Committee"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K75A-D030",
      "zh": "田心",
      "en": "Tin Sam"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K75A-D040",
      "zh": "新李屋村",
      "en": "San Lee Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K75A-D050",
      "zh": "新生村",
      "en": "San Sang Tsuen"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K75A-D060",
      "zh": "李屋村",
      "en": "Lee Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K75A-D070",
      "zh": "新屋村",
      "en": "San Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K75A-D080",
      "zh": "廈村市",
      "en": "Ha Tsuen Shi"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K75A-D090",
      "zh": "廈村",
      "en": "Ha Tsuen"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K75A-D100",
      "zh": "沙洲里村",
      "en": "Sha Chau Lei Tsuen"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K75A-D110",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K75A-U011",
      "zh": "天水圍站 (輕鐵天水圍站)",
      "en": "Tin Shui Wai Station (LR Tin Shui Wai Stop)"
    }
  ],
  "K75P": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K75P-U010",
      "zh": "天瑞",
      "en": "Tin Shui"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K75P-D020",
      "zh": "洪水橋巴士廠",
      "en": "Hung Shui Kiu Bus Depot"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K75P-U020",
      "zh": "天水圍公園",
      "en": "Tin Shui Wai Park"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K75P-D030",
      "zh": "洪福邨",
      "en": "Hung Fuk Estate"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K75P-U030",
      "zh": "天耀邨耀盛樓",
      "en": "Yiu Shing House, Tin Yiu Estate"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K75P-D040",
      "zh": "石埗村",
      "en": "Shek Po Tsuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K75P-U040",
      "zh": "輕鐵天耀站",
      "en": "LR Tin Yiu Stop"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K75P-D050",
      "zh": "天盛苑",
      "en": "Tin Shing Court"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K75P-U050",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K75P-D060",
      "zh": "天水圍警署",
      "en": "Tin Shui Wai Police Station"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K75P-U060",
      "zh": "石埗路",
      "en": "Shek Po Road"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K75P-D070",
      "zh": "賞湖居",
      "en": "Sherwood Court"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K75P-U070",
      "zh": "沙洲里村",
      "en": "Sha Chau Lei Tsuen"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K75P-D080",
      "zh": "天水圍公園",
      "en": "Tin Shui Wai Park"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K75P-U080",
      "zh": "廈村市",
      "en": "Ha Tsuen Shi"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K75P-U011",
      "zh": "天瑞",
      "en": "Tin Shui"
    },
    {
      "direction": "O",
      "seq": 9,
      "id": "K75P-U090",
      "zh": "新屋村",
      "en": "San Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 10,
      "id": "K75P-U100",
      "zh": "李屋村",
      "en": "Lee Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 11,
      "id": "K75P-U110",
      "zh": "新生村",
      "en": "San Sang Tsuen"
    },
    {
      "direction": "O",
      "seq": 12,
      "id": "K75P-U120",
      "zh": "新李屋村",
      "en": "San Lee Uk Tsuen"
    },
    {
      "direction": "O",
      "seq": 13,
      "id": "K75P-U130",
      "zh": "田心",
      "en": "Tin Sam"
    },
    {
      "direction": "O",
      "seq": 14,
      "id": "K75P-U140",
      "zh": "鄉事委員會",
      "en": "Rural Committee"
    },
    {
      "direction": "O",
      "seq": 15,
      "id": "K75P-D010",
      "zh": "輕鐵洪水橋站",
      "en": "LR Hung Shui Kiu Stop"
    },
    {
      "direction": "O",
      "seq": 16,
      "id": "K75P-D020",
      "zh": "洪水橋巴士廠",
      "en": "Hung Shui Kiu Bus Depot"
    },
    {
      "direction": "O",
      "seq": 17,
      "id": "K75P-D030",
      "zh": "洪福邨",
      "en": "Hung Fuk Estate"
    },
    {
      "direction": "O",
      "seq": 18,
      "id": "K75P-D040",
      "zh": "石埗村",
      "en": "Shek Po Tsuen"
    },
    {
      "direction": "O",
      "seq": 19,
      "id": "K75P-D050",
      "zh": "天盛苑 (港鐵天水圍站)",
      "en": "Tin Shing Court (MTR Tin Shui Wai Station)"
    },
    {
      "direction": "O",
      "seq": 20,
      "id": "K75P-D060",
      "zh": "天水圍警署",
      "en": "Tin Shui Wai Police Station"
    },
    {
      "direction": "O",
      "seq": 21,
      "id": "K75P-D070",
      "zh": "賞湖居",
      "en": "Sherwood Court"
    },
    {
      "direction": "O",
      "seq": 22,
      "id": "K75P-D080",
      "zh": "天水圍公園",
      "en": "Tin Shui Wai Park"
    },
    {
      "direction": "O",
      "seq": 23,
      "id": "K75P-U011",
      "zh": "天瑞",
      "en": "Tin Shui"
    }
  ],
  "K75S": [
    {
      "direction": "O",
      "seq": 1,
      "id": "K75S-U040",
      "zh": "洪水橋巴士廠",
      "en": "Hung Shui Kiu Bus Depot"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K75S-U010",
      "zh": "天水圍站",
      "en": "Tin Shui Wai Station"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K75S-D010",
      "zh": "洪福邨",
      "en": "Hung Fuk Estate"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K75S-U020",
      "zh": "天盛苑",
      "en": "Tin Shing Court"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K75S-D020",
      "zh": "石埗村",
      "en": "Shek Po Tsuen"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K75S-U030",
      "zh": "石埗村",
      "en": "Shek Po Tsuen"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K75S-D030",
      "zh": "天盛苑",
      "en": "Tin Shing Court"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K75S-U040",
      "zh": "洪水橋巴士廠",
      "en": "Hung Shui Kiu Bus Depot"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K75S-U011",
      "zh": "天水圍站",
      "en": "Tin Shui Wai Station"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K75S-D010",
      "zh": "洪福邨",
      "en": "Hung Fuk Estate"
    },
    {
      "direction": "O",
      "seq": 6,
      "id": "K75S-D020",
      "zh": "石埗村",
      "en": "Shek Po Tsuen"
    },
    {
      "direction": "O",
      "seq": 7,
      "id": "K75S-D030",
      "zh": "天盛苑",
      "en": "Tin Shing Court"
    },
    {
      "direction": "O",
      "seq": 8,
      "id": "K75S-U011",
      "zh": "天水圍站",
      "en": "Tin Shui Wai Station"
    }
  ],
  "K76S": [
    {
      "direction": "I",
      "seq": 1,
      "id": "K76S-D010",
      "zh": "天水圍站",
      "en": "Tin Shui Wai Station"
    },
    {
      "direction": "I",
      "seq": 2,
      "id": "K76S-D020",
      "zh": "天恩邨",
      "en": "Tin Yan Estate"
    },
    {
      "direction": "I",
      "seq": 3,
      "id": "K76S-D030",
      "zh": "天澤邨",
      "en": "Tin Chak Estate"
    },
    {
      "direction": "I",
      "seq": 4,
      "id": "K76S-D040",
      "zh": "輕鐵濕地公園站",
      "en": "LR Wetland Park Stop"
    },
    {
      "direction": "I",
      "seq": 5,
      "id": "K76S-D050",
      "zh": "濕地公園路(近天葵路)",
      "en": "Wetland Park Road (near Tin Kwai Road)"
    },
    {
      "direction": "O",
      "seq": 1,
      "id": "K76S-U010",
      "zh": "濕地公園路(近天葵路)",
      "en": "Wetland Park Road (near Tin Kwai Road)"
    },
    {
      "direction": "O",
      "seq": 2,
      "id": "K76S-U015",
      "zh": "輕鐵濕地公園站",
      "en": "LR Wetland Park Stop"
    },
    {
      "direction": "O",
      "seq": 3,
      "id": "K76S-U020",
      "zh": "天逸邨逸潭樓",
      "en": "Yat Tam House, Tin Yat Estate"
    },
    {
      "direction": "O",
      "seq": 4,
      "id": "K76S-U030",
      "zh": "天富苑欣富閣",
      "en": "Yan Fu House, Tin Fu Court"
    },
    {
      "direction": "O",
      "seq": 5,
      "id": "K76S-U040",
      "zh": "天盛苑",
      "en": "Tin Shing Court"
    }
  ]
};


const translations = {
  zh: {
    lrtEyebrow: "香港輕鐵 · 即時到站",
    busEyebrow: "港鐵巴士 · 即時到站",
    lrtTitle: "LRT Arrival",
    busTitle: "MTR Bus Arrival",
    lrtSubtitle: "先揀路線，再揀站。即時顯示月台與方向。",
    busSubtitle: "先揀路線，再揀站。即時顯示巴士到站時間。",
    routeLabel: "路線",
    stationLabel: "車站",
    busStopLabel: "巴士站",
    directionLabel: "行車方向",
    directionCircular: "循環線",
    refresh: "手動更新",
    loadingRoutes: "載入中…",
    chooseRoute: "請先選擇路線",
    chooseStation: "請先選擇車站",
    chooseDirection: "請先選擇方向",
    allRoutes: "所有路線",
    allStations: "全部車站",
    lastUpdate: "更新時間",
    nextRefresh: "下次自動更新",
    arrivalsTitle: "到站資訊",
    arrivalsSubtitle: "顯示月台與方向，過時資料會自動移除",
    busArrivalsSubtitle: "顯示各站到站時間",
    noData: "暫時未有班次資料",
    stopped: "服務暫停",
    platform: "月台",
    direction: "方向",
    length: "車卡",
    eta: "到站",
    route: "路線",
    departing: "正在離開",
    arriving: "即將抵達",
    busId: "車號",
    minutes: "分鐘",
    ok: "正常",
    routesFallback: "未能載入路線列表，暫時只顯示所有車站。",
  },
  en: {
    lrtEyebrow: "HK Light Rail · Real-time Arrivals",
    busEyebrow: "MTR Bus · Real-time Arrivals",
    lrtTitle: "LRT Arrival",
    busTitle: "MTR Bus Arrival",
    lrtSubtitle: "Choose route, then station. Live platform + direction updates.",
    busSubtitle: "Choose route, then stop. Live bus arrival updates.",
    routeLabel: "Route",
    stationLabel: "Station",
    busStopLabel: "Bus stop",
    directionLabel: "Direction",
    directionCircular: "Circular",
    refresh: "Refresh",
    loadingRoutes: "Loading…",
    chooseRoute: "Select a route first",
    chooseStation: "Select a station",
    chooseDirection: "Select direction",
    allRoutes: "All routes",
    allStations: "All stations",
    lastUpdate: "Last updated",
    nextRefresh: "Next auto refresh",
    arrivalsTitle: "Arrivals",
    arrivalsSubtitle: "Platform + direction shown. Stale entries are removed.",
    busArrivalsSubtitle: "Live arrival times for the selected stop",
    noData: "No arrival data available",
    stopped: "Service stopped",
    platform: "Platform",
    direction: "Direction",
    length: "Cars",
    eta: "ETA",
    route: "Route",
    departing: "Departing",
    arriving: "Arriving",
    busId: "Bus",
    minutes: "min",
    ok: "OK",
    routesFallback: "Route list unavailable. Showing all stations instead.",
  },
};

const routeSelect = document.getElementById("routeSelect");
const directionSelect = document.getElementById("directionSelect");
const directionField = document.getElementById("directionField");
const stationSelect = document.getElementById("stationSelect");
const refreshBtn = document.getElementById("refreshBtn");
const arrivalsTable = document.getElementById("arrivalsTable");
const lastUpdate = document.getElementById("lastUpdate");
const nextRefresh = document.getElementById("nextRefresh");
const notice = document.getElementById("notice");

const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
const modeButtons = Array.from(document.querySelectorAll(".mode-btn"));

let currentLang = "zh";
let currentMode = "lrt";
let routeStations = new Map();
let lastFetchAt = null;
let nextRefreshAt = null;
let refreshTimer = null;
let tickTimer = null;
let currentController = null;

const ROUTE_COLORS = {
  "505": "#d22d2f",
  "507": "#0a8f4f",
  "610": "#6b3a2c",
  "614": "#18a0db",
  "615": "#f2c200",
  "705": "#2aa84a",
  "706": "#6b4aa0",
  "751": "#f07a2a",
  "614P": "#f3a0b2",
  "615P": "#1a8f3f",
  "761P": "#5a3aa0",
};

const stationById = new Map(STATIONS.map((s) => [s.id, s]));
const busRouteMeta = buildBusRouteMeta();
const busLineRefLabels = buildBusLineRefLabels();

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  setModeLabels();
  setText("routeLabel", t.routeLabel);
  setText("stationLabel", currentMode === "bus" ? t.busStopLabel : t.stationLabel);
  setText("directionLabel", t.directionLabel);
  setText("statusLabel", t.lastUpdate);
  setText("nextRefreshLabel", t.nextRefresh);
  setText("arrivalsTitle", t.arrivalsTitle);
  setText("arrivalsSubtitle", currentMode === "bus" ? t.busArrivalsSubtitle : t.arrivalsSubtitle);
  refreshBtn.textContent = t.refresh;

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  hydrateRouteSelect();
  hydrateDirectionSelect();
  hydrateStationSelect();
  renderArrivals([]);
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang);
  });
});

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setMode(btn.dataset.mode);
  });
});

function setMode(mode) {
  currentMode = mode;
  modeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  directionField.classList.toggle("hidden", currentMode !== "bus");
  applyLanguage(currentLang);
}

function setModeLabels() {
  const t = translations[currentLang];
  const isBus = currentMode === "bus";
  setText("eyebrow", isBus ? t.busEyebrow : t.lrtEyebrow);
  setText("title", isBus ? t.busTitle : t.lrtTitle);
  setText("subtitle", isBus ? t.busSubtitle : t.lrtSubtitle);
}

function buildBusRouteMeta() {
  const map = new Map();
  BUS_ROUTES.forEach((route) => {
    if (!map.has(route.id)) {
      map.set(route.id, {
        id: route.id,
        zh: [],
        en: [],
        isCircular: false,
      });
    }
    const entry = map.get(route.id);
    if (route.is_circular) entry.isCircular = true;
    if (route.zh) entry.zh.push(route.zh);
    if (route.en) entry.en.push(route.en);
  });
  map.forEach((entry) => {
    entry.isCircular =
      entry.isCircular ||
      entry.zh.some((name) => name.includes("循環")) ||
      entry.en.some((name) => name.toLowerCase().includes("circular"));
    entry.zh = Array.from(new Set(entry.zh));
    entry.en = Array.from(new Set(entry.en));
  });
  return map;
}

function buildBusLineRefLabels() {
  const map = new Map();
  BUS_ROUTES.forEach((route) => {
    const isCircular =
      route.is_circular ||
      String(route.zh || "").includes("循環") ||
      String(route.en || "").toLowerCase().includes("circular");
    const zhParts = parseRouteName(route.zh, "zh");
    const enParts = parseRouteName(route.en, "en");
    if (route.line_up) {
      map.set(route.line_up, {
        zh: isCircular
          ? translations.zh.directionCircular
          : zhParts?.to || route.zh,
        en: isCircular
          ? translations.en.directionCircular
          : enParts?.to || route.en,
      });
    }
    if (route.line_down) {
      map.set(route.line_down, {
        zh: isCircular
          ? translations.zh.directionCircular
          : zhParts?.from || route.zh,
        en: isCircular
          ? translations.en.directionCircular
          : enParts?.from || route.en,
      });
    }
  });
  return map;
}

function loadRoutesAndStops() {
  notice.classList.add("hidden");
  notice.textContent = "";

  routeStations = new Map(
    Object.entries(ROUTE_STOPS).map(([route, stopIds]) => [
      route,
      stopIds.map((id) => stationById.get(id)).filter(Boolean),
    ])
  );

  hydrateRouteSelect();
  hydrateDirectionSelect();
  hydrateStationSelect();
}

function hydrateRouteSelect() {
  const t = translations[currentLang];
  const options = [
    `<option value="">${t.chooseRoute}</option>`,
  ];

  if (currentMode === "bus") {
    Array.from(busRouteMeta.values())
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
      .forEach((route) => {
        options.push(`<option value="${route.id}">${route.id}</option>`);
      });
  } else {
    const routeList = Object.keys(ROUTE_STOPS);
    routeList.forEach((route) => {
      const color = ROUTE_COLORS[route] || "#1f1f1f";
      options.push(
        `<option value="${route}" class="route-option" style="--route-color: ${color}">${route}</option>`
      );
    });
  }

  routeSelect.innerHTML = options.join("");
}

function hydrateDirectionSelect() {
  const t = translations[currentLang];
  if (currentMode !== "bus") {
    directionSelect.innerHTML = `<option value="">${t.chooseDirection}</option>`;
    directionSelect.disabled = true;
    return;
  }
  const route = routeSelect.value;
  if (!route || !BUS_STOPS[route]) {
    directionSelect.innerHTML = `<option value="">${t.chooseRoute}</option>`;
    directionSelect.disabled = true;
    return;
  }
  const directions = Array.from(
    new Set(BUS_STOPS[route].map((stop) => stop.direction))
  ).sort();
  const meta = busRouteMeta.get(route);
  const isCircular = meta?.isCircular;
  const directionLabels = buildBusDirectionLabels(route);
  const options = [`<option value="">${t.chooseDirection}</option>`];
  directions.forEach((dir, index) => {
    if (isCircular) {
      options.push(`<option value="${dir}">${t.directionCircular}</option>`);
      return;
    }
    const name =
      directionLabels[dir] ||
      (currentLang === "zh" ? t.directionLabel : t.directionLabel);
    options.push(`<option value="${dir}">${name}</option>`);
  });
  directionSelect.innerHTML = options.join("");
  directionSelect.disabled = false;
}

function hydrateStationSelect() {
  const t = translations[currentLang];
  const route = routeSelect.value;
  let stations = [];

  if (currentMode === "bus") {
    const direction = directionSelect.value;
    if (route && BUS_STOPS[route]) {
      stations = BUS_STOPS[route]
        .filter((stop) => (direction ? stop.direction === direction : true))
        .sort((a, b) => a.seq - b.seq);
    }
  } else if (route && ROUTE_STOPS[route]) {
    stations = ROUTE_STOPS[route].map((id) => stationById.get(id)).filter(Boolean);
  }

  const options = [
    `<option value="">${route ? t.chooseStation : t.chooseRoute}</option>`,
  ];

  if (currentMode === "bus") {
    stations.forEach((stop) => {
      const label = currentLang === "zh" ? stop.zh : stop.en;
      options.push(`<option value="${stop.id}">${label}</option>`);
    });
    stationSelect.innerHTML = options.join("");
    stationSelect.disabled = !route || !directionSelect.value;
  } else {
    stations.forEach((station) => {
      const label = currentLang === "zh" ? station.zh : station.en;
      options.push(`<option value="${station.id}">${label}</option>`);
    });
    stationSelect.innerHTML = options.join("");
    stationSelect.disabled = !route;
  }
}

function buildBusDirectionLabels(routeId) {
  const stops = BUS_STOPS[routeId] || [];
  const labels = {};
  const stopEndpoints = {};
  ["O", "I"].forEach((dir) => {
    const list = stops.filter((s) => s.direction === dir);
    if (!list.length) return;
    list.sort((a, b) => a.seq - b.seq);
    const first = list[0];
    const last = list[list.length - 1];
    stopEndpoints[dir] = {
      zhFrom: first.zh,
      zhTo: last.zh,
      enFrom: first.en,
      enTo: last.en,
    };
  });

  const routeEntries = BUS_ROUTES.filter((r) => r.id === routeId);
  const isCircular =
    routeEntries.some((r) => r.is_circular) ||
    routeEntries.some((r) => String(r.zh || "").includes("循環")) ||
    routeEntries.some((r) => String(r.en || "").toLowerCase().includes("circular"));
  ["O", "I"].forEach((dir) => {
    if (!stopEndpoints[dir]) return;
    if (isCircular) {
      labels[dir] = translations[currentLang].directionCircular;
      return;
    }
    const ep = stopEndpoints[dir];
    labels[dir] = currentLang === "zh" ? ep.zhTo : ep.enTo;
  });

  return labels;
}

function parseRouteName(name, lang) {
  if (!name) return null;
  if (lang === "zh") {
    const parts = String(name).split("至");
    if (parts.length >= 2) {
      return { from: parts[0].trim(), to: parts[1].trim() };
    }
  }
  if (lang === "en") {
    const parts = String(name).split(" to ");
    if (parts.length >= 2) {
      return { from: parts[0].trim(), to: parts[1].trim() };
    }
  }
  return null;
}

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[()（）·]/g, "")
    .replace(/至/g, "")
    .trim();
}
function formatSystemTime(timeString) {
  if (!timeString) return "—";
  const normalized = timeString
    .replace(/\//g, "-")
    .replace(" ", "T")
    .replace(/(\d{2}:\d{2})$/, "$1:00");
  const date = new Date(normalized + "+08:00");
  if (Number.isNaN(date.getTime())) return timeString;
  return new Intl.DateTimeFormat(currentLang === "zh" ? "zh-HK" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Hong_Kong",
  }).format(date);
}

function scheduleRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(() => {
    if (stationSelect.value) fetchSchedule();
  }, REFRESH_MS);
}

function scheduleTick() {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(updateNextRefresh, 1000);
}

function updateNextRefresh() {
  if (!nextRefreshAt) {
    nextRefresh.textContent = "—";
    return;
  }
  const diffMs = nextRefreshAt - Date.now();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));
  const mins = Math.floor(diffSec / 60);
  const secs = diffSec % 60;
  nextRefresh.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getEtaLabel(entry) {
  const t = translations[currentLang];
  const raw = currentLang === "zh" ? entry.time_ch : entry.time_en;
  if (!raw || raw === "-") return null;
  if (raw.toLowerCase && raw.toLowerCase().includes("arriv")) return t.arriving;
  if (raw.includes("即將抵達")) return t.arriving;
  if (raw.toLowerCase && raw.toLowerCase().includes("depart")) return t.departing;
  if (raw.includes("正在離開")) return t.departing;
  return raw;
}

function shouldKeepEntry(entry) {
  if (entry.stop === 1) return false;
  const raw = entry.time_en || entry.time_ch || "";
  if (!raw || raw === "-") return false;
  return true;
}

function renderArrivals(entries) {
  const t = translations[currentLang];
  if (!entries.length) {
    arrivalsTable.innerHTML = `<p class="notice">${t.noData}</p>`;
    return;
  }

  if (currentMode === "bus") {
    const stopLabel = entries[0]?.stopLabel;
    const busRows = entries.map((bus) => {
      const eta = bus.departureTimeText || bus.arrivalTimeText || "—";
      return `
        <div class="card">
          <div>
            <span class="tag">${t.route} ${routeSelect.value}</span>
            <strong>${stopLabel}</strong>
            <div><span>${t.busId}</span></div>
          </div>
          <div>
            <span>${t.eta}</span>
            <strong>${eta}</strong>
          </div>
          <div>
            <span>${t.direction}</span>
            <strong>${formatBusLineRef(bus.lineRef)}</strong>
          </div>
          <div>
            <span>${t.busId}</span>
            <strong>${bus.busId || "—"}</strong>
          </div>
        </div>
      `;
    });
    arrivalsTable.innerHTML = busRows.join("");
    return;
  }

  arrivalsTable.innerHTML = entries
    .map((entry) => {
      const etaLabel = getEtaLabel(entry) || "—";
      const dest = currentLang === "zh" ? entry.dest_ch : entry.dest_en;
      const color = ROUTE_COLORS[entry.route_no] || "#1f1f1f";
      return `
        <div class="card">
          <div>
            <span class="tag">
              <span class="route-dot" style="--route-color: ${color}"></span>
              ${t.route} ${entry.route_no}
            </span>
            <strong>${dest}</strong>
            <div><span>${t.direction}</span></div>
          </div>
          <div>
            <span>${t.platform}</span>
            <strong>${entry.platform_id}</strong>
          </div>
          <div>
            <span>${t.length}</span>
            <strong>${entry.train_length}</strong>
          </div>
          <div>
            <span>${t.eta}</span>
            <strong>${etaLabel}</strong>
          </div>
        </div>
      `;
    })
    .join("");
}

function formatBusLineRef(lineRef) {
  if (!lineRef) return "—";
  const label = busLineRefLabels.get(lineRef);
  if (label) {
    return currentLang === "zh" ? label.zh : label.en;
  }
  return lineRef;
}

async function fetchSchedule() {
  const stationId = stationSelect.value;
  if (!stationId) return;

  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    if (currentMode === "bus") {
      const response = await fetch(BUS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: currentLang,
          routeName: routeSelect.value,
        }),
        signal: currentController.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`API ${response.status}`);
      const data = await response.json();
      const stop = (data.busStop || []).find(
        (item) => item.busStopId === stationId
      );
      const stopInfo = (BUS_STOPS[routeSelect.value] || []).find(
        (s) => s.id === stationId
      );
      const stopLabel = stopInfo
        ? currentLang === "zh"
          ? stopInfo.zh
          : stopInfo.en
        : stationId;
      const buses = (stop?.bus || []).map((bus) => ({
        ...bus,
        stopLabel,
      }));
      renderArrivals(buses);
      lastUpdate.textContent = formatSystemTime(data.routeStatusTime);
    } else {
      const response = await fetch(`${API_URL}${stationId}`, {
        signal: currentController.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`API ${response.status}`);
      const data = await response.json();

      const route = routeSelect.value;
      const entries = (data.platform_list || [])
        .flatMap((platform) =>
          (platform.route_list || []).map((routeEntry) => ({
            ...routeEntry,
            platform_id: platform.platform_id,
          }))
        )
        .filter((entry) => (route ? entry.route_no === route : true))
        .filter(shouldKeepEntry);

      renderArrivals(entries);
      lastUpdate.textContent = formatSystemTime(data.system_time);
    }
    lastFetchAt = Date.now();
    nextRefreshAt = lastFetchAt + REFRESH_MS;
    updateNextRefresh();
  } catch (error) {
  }
}

routeSelect.addEventListener("change", () => {
  hydrateDirectionSelect();
  hydrateStationSelect();
  renderArrivals([]);
  if (stationSelect.value) fetchSchedule();
});

directionSelect.addEventListener("change", () => {
  hydrateStationSelect();
  renderArrivals([]);
});

stationSelect.addEventListener("change", () => {
  renderArrivals([]);
  fetchSchedule();
});

refreshBtn.addEventListener("click", () => {
  fetchSchedule();
});

applyLanguage("zh");
loadRoutesAndStops();
scheduleRefresh();
scheduleTick();
setMode("lrt");
