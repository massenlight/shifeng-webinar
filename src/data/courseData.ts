import { TargetRole, CourseModule, ImageSlot } from '../types';

const imageAsset = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

export const COURSE_TITLE = "《千萬流量脆煉計畫》";
export const COURSE_SUBTITLE_1 = "讓素人起號立刻流量變現的最佳戰場";
export const COURSE_SUBTITLE_2 = "——這是一堂改變品牌與掌握關鍵的 Threads 行銷實戰課";

export const PAIN_POINT_TEXT_1 = `有人每天發文，
三個月累積數萬粉絲；
有人努力一年，
只有身邊朋友按讚。`;

export const PAIN_POINT_TEXT_2 = `差別不是運氣，
而是懂不懂 Threads 的底層邏輯。`;

export const SYSTEM_SOLUTION_TEXT = `《千萬流量脆煉計畫》
將拆解 Threads 演算法、爆文邏輯、內容策略與成交模型，
把看似複雜的社群經營，
變成任何人都能立即上手的一套實戰系統。`;

export const TARGET_AUDIENCE_INTRO = `未來無論你是
創作者、品牌經營者、創業家、業務、講師、自媒體，
甚至只是想打造第二收入的人，`;

export const CORE_LEARNINGS = [
  {
    question: "如何讓陌生人願意停下來看你的內容？",
    description: "掌握前 3 秒黃金鉤子與視覺停留演算法機制，創造超高完讀率與互動率。",
    icon: "Eye"
  },
  {
    question: "如何讓一篇貼文自然擴散？",
    description: "解密 Threads 轉發（Repost）與演算法推播模型，讓單篇貼文破百萬曝光。",
    icon: "Share2"
  },
  {
    question: "如何把粉絲變成顧客？",
    description: "建立高轉化私訊腳本與精準導流引導，將社群熱度直接變現為營業額。",
    icon: "Users"
  },
  {
    question: "如何建立自己的影響力？",
    description: "塑造具備極高辨識度的人設 IP，讓同類領域的追蹤者視你為權威領袖。",
    icon: "Award"
  },
  {
    question: "以及最關鍵的「如何變現」",
    description: "打造多元變現矩陣：包含課程、團購、顧問服務、產品銷售與業配合作。",
    icon: "TrendingUp"
  }
];

export const CORE_PHILOSOPHY_QUOTE_1 = "真正的贏家，不是最勤勞發最多篇文的人，而是最懂得建立「流量加速器」的人。";
export const CORE_PHILOSOPHY_QUOTE_2 = "當別人還在焦慮演算法，你已經開始利用演算法。";

export const TARGET_ROLES: TargetRole[] = [
  {
    id: "creator",
    title: "創作者",
    subtitle: "Creator",
    iconName: "PenTool",
    description: "突破靈感瓶頸與觸擊率低迷，建立穩定的高爆文產出節奏。",
    keyOutcomes: ["解密 Threads 熱門話題鉤子", "30 分鐘快速產出 5 篇爆款貼文", "建立高黏度個人忠實粉絲圈"],
    caseImageUrl: imageAsset("kc1kuE3.webp"),
    caseCaption: "獨立遊戲 app 創作者，熱門下載排行衝向前 3 名"
  },
  {
    id: "brand",
    title: "品牌經營者",
    subtitle: "Brand Owner",
    iconName: "Building2",
    description: "以極低成本獲取精準顧客，翻轉品牌在年輕社群中的知名度與聲量。",
    keyOutcomes: ["不用買貴爆廣告也能獲得萬次曝光", "將品牌的真實故事化為高好感貼文", "無縫導流至官網與實體門市"],
    caseImageUrl: imageAsset("fi1MLJc.webp"),
    caseCaption: "台灣本土文創品牌，產品在設計購物平台拿下銷售第一"
  },
  {
    id: "sales",
    title: "業務",
    subtitle: "Sales",
    iconName: "UserCheck",
    description: "源源不絕的潛在客戶自動找上門，擺脫冷不防推銷的痛苦窘境。",
    keyOutcomes: ["展示專業知識讓客戶主動私訊諮詢", "高效率名單收集與信任建立機制", "提高個案客單價與成交轉換率"],
    caseImageUrl: imageAsset("rZOKgsk.webp"),
    caseCaption: "資深業務打造個人 IP，後台詢問度暴增"
  },
  {
    id: "self_media",
    title: "自媒體",
    subtitle: "Self Media",
    iconName: "Share2",
    description: "打造高知名度個人自媒體，建立強大社交影響力。",
    keyOutcomes: ["從零起號單月粉絲突破 10,000+", "掌握話題熱度與忠實粉絲社群", "打造長期個人品牌價值"],
    caseImageUrl: imageAsset("mxqPCYn.webp"),
    caseCaption: "行銷相關女孩經營自媒體，串文瀏覽數創新高，一天內變現 1 萬元"
  },
  {
    id: "side_hustle",
    title: "第二收入",
    subtitle: "Side Hustle",
    iconName: "DollarSign",
    description: "利用下班每天 30 分鐘經營 Threads，打造持續性的第二收入渠道。",
    keyOutcomes: ["接洽業配、聯盟行銷與顧問服務", "自動化導流與變現機制", "打造不倚賴主業的第二收入管道"],
    caseImageUrl: imageAsset("uAwYVbN.webp"),
    caseCaption: "素人女孩經營脆帳號，成功接到業配"
  },
  {
    id: "entrepreneur",
    title: "創業家",
    subtitle: "Entrepreneur",
    iconName: "Briefcase",
    description: "運用內容槓桿驗證商業模式，迅速打響企業品牌並獲取高品質合作機會。",
    keyOutcomes: ["精準吸引投資人與商業合作夥伴", "高效率建立新事業聲量與信任感", "無縫串聯商業閉環與用戶生態系"],
    caseImageUrl: imageAsset("BQxL11o.webp"),
    caseCaption: "服飾店的共創店創業計畫，後台詢問度暴增"
  },
  {
    id: "instructor",
    title: "講師",
    subtitle: "Instructor",
    iconName: "GraduationCap",
    description: "將專業知識萃取為高爆發力內容，吸引學員主動諮詢與報名課程。",
    keyOutcomes: ["塑造知識型權威 IP 人設", "把觀點貼文轉化為高價課程報名", "打造自動化知識變現閉環"],
    caseImageUrl: imageAsset("0mqAUK5.webp"),
    caseCaption: "講師經營脆帳號，打開知名度，瀏覽次數從寥寥無幾的 100 以下到突破百萬"
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    badge: "First Type",
    title: "怕鏡頭、又不太會拍短影音的人",
    description: `現有社群媒體充斥複雜短影音，從想腳本、拍攝、剪輯、後製， 耗費大量時間，卻不一定獲得關注。 
台灣是使用 threads 最踴躍的國家， 平均一個人一天會瀏覽30-50篇脆文， 「你今天滑脆了嗎？」、「你有看到那篇脆嗎？」 世豐老師讓你用幾個字、幾張圖片，甚至透過AI輔助， 不用露臉，就輕鬆達到流量變現。 
也許你不想露臉、也許你想多嘗試， threads將會你最好的戰場。 因為Threads， 就是最低成本打造個人品牌的平台。`,
    lessons: [
      "免露臉、免剪輯的「純文字爆文」產出公式",
      "台灣人黏著度高，精準打中你得受眾群體。",
      "圖文極簡排版與高完讀率情緒懸崖設計",
      "透過AI補助，輕鬆達到流量變現。"
    ],
    duration: "純文字實戰",
    icon: "Zap",
    imageUrl: imageAsset("ae66cAu.webp"),
    imagePosition: "side"
  },
  {
    id: 2,
    badge: "Second Type",
    title: "想快速幫品牌變現的經營者",
    description: `很多品牌產品很好， 卻始終沒有人知道。 因為內容沒有被看見。 
你知道嗎？threads內容甚至有納入google SEO， 找旅遊行程、找評價、找餐廳、找對象， 第一直覺滑Threads 
透過獨創「陸、海、空」三大策略佈局， 不用花大錢大量投放廣告， 也能累積曝光，再把流量轉換成交 
世豐老師， 就是你的品牌流量變現的最佳教練。`,
    lessons: [
      "從「空軍 × 陸軍 × 海軍」三層架構拆解品牌內容策略",
      "從貼文留言自然引導 DM 私訊的高轉換腳本",
      "無縫連結官網、LINE 與私域客戶池的導流路徑",
      "不用買貴爆廣告也能獲得萬次曝光與顧客信任"
    ],
    duration: "品牌變現模組",
    icon: "Target",
    imageUrl: imageAsset("1uwOY2w.webp"),
    imagePosition: "top"
  },
  {
    id: 3,
    badge: "Third Type",
    title: "準備要向世界傳遞理想、大聲喊話的夢想家",
    description: `你有很多心裡話想要向人抒發， 你想要尋找對的人成為你的隊友， 你有很多想法想要傳達給全世界 
那麼第一步， 就是讓別人先相信你， 
Threads 就是建立信任最快的平台之一， 
你錯過fb的成長期 錯過instagram 錯過YouTube … 那你絕對不能再錯過Threads`,
    lessons: [
      "抓緊目前趨勢，別再錯過Threads的成長期",
      "零粉絲起號，首週快速獲得 1,000+ 忠實追蹤",
      "塑造具備極高辨識度的人設 IP 與同溫層社群",
      "將影響力變現為課程、顧問、團購與商業合作"
    ],
    duration: "夢想家影響力",
    icon: "Rocket",
    imageUrl: imageAsset("HP4pt5I.webp"),
    imagePosition: "top"
  }
];

export const DEFAULT_IMAGE_SLOTS: ImageSlot[] = [
  {
    id: "hero_banner",
    name: "主視覺 Hero 廣告 Banner",
    description: "頁面最頂部的核心形象大圖，建議呈現高級感、神秘黑色與暗紅色調、Threads 社群爆發意象",
    currentUrl: imageAsset("RyYpIom.webp"),
    aspectRatio: "16:9",
    recommendedWidth: 1600,
    recommendedHeight: 900
  },
  {
    id: "instructor_photo",
    name: "講師/創作者個人形象照",
    description: "講師導師專屬頭像或專業形象照，展現自信與權威感",
    currentUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "1:1",
    recommendedWidth: 800,
    recommendedHeight: 800
  },
  {
    id: "course_preview",
    name: "課程實戰系統介面展示圖",
    description: "展現爆文數據統計、 Threads 流量成長曲線或課程後台實況示意圖",
    currentUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "4:3",
    recommendedWidth: 1200,
    recommendedHeight: 900
  },
  {
    id: "social_proof_1",
    name: "學員成果截圖 / 流量爆發證據 1",
    description: "呈現爆文點讚數破萬、私訊爆滿或觸擊破百萬的成就展示圖",
    currentUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "16:9",
    recommendedWidth: 1000,
    recommendedHeight: 562
  }
];

export const FAQS = [
  {
    q: "我沒有粉絲，也不會寫文，適合上嗎？",
    a: "非常適合。因為大部分經營成功的人，一開始也沒有任何粉絲。真正重要的，不是文筆有多好，而是你懂不懂：什麼內容值得分享？什麼內容容易被推薦？什麼內容能建立信任？\n\n即使沒有設計背景、沒有行銷經驗、沒有經營過自媒體，你也能一步一步建立自己的流量。",
    imageUrl: imageAsset("dSJWQH0.webp"),
    isHighlighted: true
  },
  {
    q: "Threads 和 Instagram 或 Facebook 有什麼不同？",
    a: "Threads 的演算法核心是「強大的冷啟動自然推播」與「高轉發擴散性」。傳統平台非常依賴既有粉絲數，而 Threads 即使零追蹤，只要掌握底層情緒鉤子與演算法規則，第一篇貼文就有機會獲得數萬甚至百萬曝光。"
  },
  {
    q: "這門課程適合想要經營哪種領域的人？",
    a: "不論您是想打造個人 IP 的創作者、知識型講師、接案業務、品牌企業主、或是只想在下班後打造第二收入的上班族，Threads 的演算法機制都能為您建立強大的流量與成交管道。"
  }
];

export const PRICING_PLANS = [
  {
    id: "early_bird",
    name: "報名即可獲得",
    price: "",
    originalPrice: "",
    badge: "限量早鳥優惠8.1折",
    popular: true,
    features: [
      "2 天手把手實戰培訓課程",
      "線上1V1教練顧問",
      "VIP 資源共享 社群",
      "【早鳥贈禮】100+ 個脆爆文模板",
      "【早鳥優惠】限量優惠8.1折"
    ]
  }
];
