/* global cytoscape, L, lucide */

const START_MINUTES = 10 * 60 + 10;
const INITIAL_EXIT_MINUTES = 20;
const RETURN_DEADLINE = 20 * 60 + 50;
const CHECKED_AT = "2026-08-21";

const attractions = {
  stationStart: {
    id: "stationStart", name: "苏州站", shortName: "苏州站 · 出发", type: "station", icon: "train-front", stay: 0,
    mapPoint: point("苏州站南广场 / 出站层", "姑苏区苏站路27号", [31.329683, 120.610870], "https://ditu.amap.com/place/B0200172JB"), graph: { x: 70, y: 240 },
    summary: "10:10 抵达后预留约 20 分钟出站、洗手间与补给，再开始第一段行程。",
    availability: { status: "open", label: "交通枢纽" },
    guide: { history: "苏州站位于姑苏区北部，是本次一日游的起点与终点。", highlights: ["抵达后先确认返程车次与检票口", "在站内完成洗手间、饮水与充电补给"], route: ["10:10 抵达", "预留约 20 分钟出站", "从图上选择第一段交通"], photo: "站前广场不建议久留拍照，优先把时间留给古城与湖畔。", rest: "站内餐饮选择多，但正餐建议留在平江路、诚品或山塘街。", rain: "雨天从出站起就打开雨具；站前路面湿滑，拖行李时放慢脚步。", reservation: "无需预约。" },
    sources: [{ label: "苏州站—山塘街官方接驳指引", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml" }]
  },
  ouyuan: {
    id: "ouyuan", name: "耦园", shortName: "耦园", type: "optional", icon: "landmark", stay: 70,
    mapPoint: point("耦园游客入口", "姑苏区仓街小新桥巷6号", [31.316230, 120.638350], "https://ditu.amap.com/place/B0FFF5U2QK"), graph: { x: 260, y: 105 },
    summary: "藏在平江东侧的双园宅院，适合把园林体验控制在一小时左右。",
    availability: { status: "open", label: "备选园林" },
    guide: { history: "耦园始建于清代，因东西两园相对、寓意“佳偶天成”而得名，是宅园合一的代表。", highlights: ["东园水池与黄石假山", "西园书斋、藏书楼与夫妻隐居意境", "临河外观和小体量宅院空间"], route: ["由入口进入东园", "沿水池、假山缓行", "穿过宅院后游览西园并从原路/出口离开"], photo: "东园池边、城曲草堂一带适合取景；雨后青砖和荷叶更有层次。", rest: "园内以静赏为主，休息与正餐可留到平江路。", rain: "廊檐可短暂避雨，但园路湿滑；雨势大时建议改走室内诚品。", reservation: "是否需要购票或分时安排请以当日园林公告为准。" },
    photoSpot: [{ name: "城曲草堂水阁", time: "上午或雨后", tip: "站在水池一侧向水阁取对称构图，保留门楣与倒影。" }, { name: "东园曲桥", time: "光线柔和时", tip: "用桥作引导线；桥面湿滑时不倒退取景。" }],
    image: photo("https://commons.wikimedia.org/wiki/Special:FilePath/%E8%8B%8F%E5%B7%9E%E8%80%A6%E5%9B%AD.jpg?width=960", "耦园水阁与水面", "Sharonmemory · CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:%E8%8B%8F%E5%B7%9E%E8%80%A6%E5%9B%AD.jpg"),
    sources: [{ label: "苏州市园林和绿化管理局 · 耦园", url: "https://ylj.suzhou.gov.cn/szsylj/kfsj/wztt.shtml" }]
  },
  humble: {
    id: "humble", name: "拙政园", shortName: "拙政园", type: "reservation", icon: "trees", stay: 120,
    mapPoint: point("拙政园东南角游客入口", "姑苏区东北街178号", [31.323354, 120.630448], "https://www.amap.com/place/B02000ITPI"), graph: { x: 295, y: 365 },
    summary: "以水为中心展开的江南名园，完整游览至少需要约两小时，因此仅作已预约分支。",
    availability: { status: "reservation", label: "需实名分时预约" },
    guide: { history: "拙政园始建于明代，是中国四大名园之一；园景以池水为中心，亭台、山石和花木随水展开。", highlights: ["远香堂看荷与中部水面", "梧竹幽居、听雨轩等空间层次", "东、中、西三部不同的造园氛围"], route: ["按预约时段入园", "以中部水景为主线慢走", "选择 2–3 个重点庭院，不强求走遍全园"], photo: "远香堂与荷风四面亭适合广角；高峰期避开主轴人流，从侧廊取框景。", rest: "园内以游览为主，建议离园后再吃正餐；夏日准备饮水与防晒。", rain: "廊、亭较多但无法全程避雨；中雨时园路湿滑，体验会明显下降。", reservation: "须实名、分时预约；未启用预约状态时，本网页不会将它列为可选下一站。" },
    photoSpot: [{ name: "远香堂外水面", time: "荷花季的上午", tip: "以水面、荷叶和远香堂同框；人流高峰时从侧廊避开主轴。" }, { name: "小飞虹回廊", time: "阴天或小雨后", tip: "利用廊桥的横向线条；不要为取景逆行或跨越栏杆。" }],
    image: photo("https://commons.wikimedia.org/wiki/Special:FilePath/Humble%20Administrator%27s%20Garden.JPG?width=960", "拙政园园景", "韩笃一 · Public domain", "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden.JPG"),
    sources: [{ label: "苏州市政府 · 拙政园实名预约说明", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202606/face4650ec2245ce818aecc53eb4aaaa.shtml" }]
  },
  museum: {
    id: "museum", name: "苏州博物馆", shortName: "苏博", type: "reservation", icon: "building-2", stay: 90,
    mapPoint: point("苏州博物馆本馆预约入口", "姑苏区东北街204号", [31.322675, 120.627897], "https://ditu.amap.com/place/B0FFKFVEXA"), graph: { x: 465, y: 365 },
    summary: "贝聿铭设计的新馆与忠王府相连，适合作为已预约情况下的室内文化分支。",
    availability: { status: "reservation", label: "需分时预约 · 通常 16:00 停止入馆" },
    guide: { history: "苏州博物馆新馆由贝聿铭主持设计，将白墙、灰瓦、庭院与几何天窗结合，并保留了忠王府古建。", highlights: ["中央庭院与片石假山", "新馆几何天窗和水景", "忠王府古建与苏州历史陈列"], route: ["按预约时间安检入馆", "先走新馆核心展厅", "再视体力前往忠王府，预留离馆时间"], photo: "中央庭院、主入口几何屋顶适合拍建筑；展厅内遵守禁闪光和展签要求。", rest: "馆内停留以展览为主，休息与咖啡建议安排在离馆后。", rain: "是天气不佳时较合适的室内替代，但排队和入馆时间仍需预留。", reservation: "本馆为分时预约；未预约时不要把它当作临时必去点。" },
    photoSpot: [{ name: "中央庭院片石假山", time: "中午前后", tip: "以白墙、几何线条和水面留白，遵守现场拍摄提示。" }, { name: "主入口屋顶几何线", time: "上午或傍晚", tip: "在入口外广场拍建筑线条，避开排队和安检通道。" }],
    image: photo("https://commons.wikimedia.org/wiki/Special:FilePath/Suzhoubowuguan.jpg?width=960", "苏州博物馆新馆建筑", "Brookqi · Public domain", "https://commons.wikimedia.org/wiki/File:Suzhoubowuguan.jpg"),
    sources: [{ label: "苏州文旅 · 苏州博物馆开放说明", url: "https://visitsz.wglj.suzhou.com.cn/venue-detail.aspx?Id=37" }]
  },
  pingjiang: {
    id: "pingjiang", name: "平江路", shortName: "平江路", type: "primary", icon: "waves", stay: 150,
    mapPoint: point("平江路南段建议进入点", "姑苏区白塔东路65号（平江路）", [31.313969, 120.634556], "https://ditu.amap.com/place/B0FFG6OTD5"), graph: { x: 480, y: 105 },
    summary: "一条水陆并行的古城街巷，把第一段游览和午餐留在这里会最从容。",
    availability: { status: "open", label: "全天开放 · 免费" },
    guide: { history: "平江历史街区保留了两千五百多年苏州古城的水陆格局，平江路沿河展开，巷弄、桥梁和民居相连。", highlights: ["平江河、石桥与临河民居", "小巷里的评弹、昆曲与手作店", "古城水陆并行的慢行尺度"], route: ["从南端或中段进入", "沿河慢走并择一两条横巷深入", "午餐后向北/西端离开，避免来回折返"], photo: "小桥向河道取纵深、临河窗棂取框景；早午后光线较柔和。", rest: "正餐、茶馆和轻食密集，建议午餐控制在 45–60 分钟，给下午留余量。", rain: "雨天石板、桥面湿滑；可转入茶馆或评弹空间短歇，避免河边湿滑边缘拍照。", reservation: "官方页面显示街区全天免费开放；仍请在出发前核验临时公告。" },
    photoSpot: [{ name: "平江河临水巷", time: "上午或午后早段", tip: "站在桥上向河道取纵深，给游人和居民留出通行空间。" }, { name: "悬桥巷附近石板路", time: "阴天或小雨后", tip: "低机位拍石板与白墙；雨天不靠近河埠和湿滑边缘。" }],
    image: photo("https://commons.wikimedia.org/wiki/Special:FilePath/%E8%8B%8F%E5%B7%9E%E5%B9%B3%E6%B1%9F%E8%B7%AF.jpg?width=960", "苏州平江路水巷", "Luxu0910 · CC0", "https://commons.wikimedia.org/wiki/File:%E8%8B%8F%E5%B7%9E%E5%B9%B3%E6%B1%9F%E8%B7%AF.jpg"),
    sources: [{ label: "苏州文旅 · 平江历史街区", url: "https://visitsz.wglj.suzhou.com.cn/scenic-spot-detail.aspx?id=34" }, { label: "苏州文旅 · 临时调整公告", url: "https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=3032" }]
  },
  eslite: {
    id: "eslite", name: "诚品书店", shortName: "诚品书店", type: "primary", icon: "book-open", stay: 100,
    mapPoint: point("诚品生活苏州入口", "工业园区月廊街8号", [31.321141, 120.709887], "https://www.amap.com/place/B0HB24UKLZ"), graph: { x: 720, y: 105 },
    summary: "金鸡湖东侧的室内文化空间，安排在午后可避雨、休息并恢复体力。",
    availability: { status: "open", label: "室内备选 · 约 10:00–21:30" },
    guide: { history: "诚品生活苏州是诚品在大陆的重要文化商业空间，以书店、展览、文创与餐饮共同构成可停留的室内场所。", highlights: ["阶梯阅读区与主题书展", "文创、展览与生活方式店铺", "临湖商圈的室内休整条件"], route: ["到店后先确认洗手间与寄存/服务点", "以书店和一层公共空间为主", "预留 20 分钟喝咖啡或用餐，再决定是否去湖边"], photo: "大阶梯与书墙适合环境人像；拍摄前留意店内提示，避免影响阅读者。", rest: "是主线中最适合充电、喝咖啡和使用洗手间的一站，可把午后休息放在这里。", rain: "雨天优先保留本点；可由此直接接山塘街或苏州站，减少湖畔步行。", reservation: "通常无需预约，营业时间以当日商场/场馆公告为准。" },
    photoSpot: [{ name: "诚品大步梯", time: "午后室内时段", tip: "拍阶梯、书墙与人物的尺度感；避开阅读区并遵守店内提示。" }, { name: "主题书展书墙", time: "人流较少时", tip: "使用局部取景，不长时间占用通道或打扰阅读者。" }],
    image: photo("https://jinjilake.sipac.gov.cn/upload/202207/04/202207041127407531.jpg", "诚品生活苏州官方场馆图片", "金鸡湖景区官网", "https://jinjilake.sipac.gov.cn/shanghuzixun_article-343-4088.html"),
    sources: [{ label: "金鸡湖 · 诚品生活苏州资料", url: "https://jinjilake.sipac.gov.cn/shanghuzixun_article-343-4088.html" }]
  },
  jinjihu: {
    id: "jinjihu", name: "金鸡湖", shortName: "金鸡湖", type: "primary", icon: "sunset", stay: 130,
    mapPoint: point("月光码头湖畔观景段", "工业园区水阁路月光码头（近科文中心）", [31.320136, 120.704846], "https://www.amap.com/place/B02001AKNW"), graph: { x: 900, y: 105 },
    summary: "以湖岸天际线与东方之门为核心的傍晚散步段；天气允许才加入。",
    availability: { status: "weather", label: "看天气决定 · 户外步行" },
    guide: { history: "金鸡湖位于苏州工业园区，是现代苏州城市景观的重要水域，湖畔串联文化、商业与城市天际线。", highlights: ["湖岸步道与城市天际线", "东方之门周边远景", "日落后湖面的灯光倒影"], route: ["从诚品一侧出发", "只选择一段临湖步道慢走", "天气转差立即改乘车前往山塘街/苏州站"], photo: "日落前后拍湖面与东方之门；逆光时注意人物补光，切勿跨越护栏靠近湿滑边缘。", rest: "沿线商业配套较多，但不要把休息拖得太久，需为回古城与回站留缓冲。", rain: "雨天模式会将本点设为跳过，优先从诚品直接转山塘街或苏州站。", reservation: "景区公共空间通常无需预约；水上项目和户外活动要以当天恢复/天气公告为准。" },
    photoSpot: [{ name: "月光码头 270° 湖景", time: "日落前后", tip: "湖岸取东方之门和天际线；提前看云量，雨势变大立刻收束。" }, { name: "湖畔步道低机位", time: "蓝调时刻", tip: "利用灯光倒影，不跨护栏、不站在湿滑水边。" }],
    image: photo("https://commons.wikimedia.org/wiki/Special:FilePath/Jinji%20Lake%2C%20with%20view%20of%20Gate%20of%20the%20Orient.jpg?width=960", "金鸡湖与东方之门", "EricStoneChina · CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Jinji_Lake,_with_view_of_Gate_of_the_Orient.jpg"),
    sources: [{ label: "金鸡湖景区 · 官方信息", url: "https://jinjilake.sipac.gov.cn/zuixinzixun_article-342-3550.html" }]
  },
  shantang: {
    id: "shantang", name: "山塘街", shortName: "山塘街", type: "primary", icon: "store", stay: 115,
    mapPoint: point("山塘街站 4 号口 / 东段入口", "姑苏区地铁2号线山塘街站4号口", [31.319984, 120.602365], "https://ditu.amap.com/place/BT09911464"), graph: { x: 900, y: 365 },
    summary: "白居易疏浚山塘河后形成的七里山塘，适合在傍晚收束古城体验。",
    availability: { status: "open", label: "全天开放 · 免费" },
    guide: { history: "山塘街由唐代白居易主持开凿山塘河后逐渐形成，常被称为“七里山塘”，水巷、店铺与古桥相连。", highlights: ["山塘河、古桥与夜间灯影", "山塘老街的临河立面", "从山塘街站快速回苏州站的便利性"], route: ["从山塘街站/东段进入", "沿河走一小段看桥与夜景", "20:25 前离开街区并前往地铁或叫车点"], photo: "新民桥、通贵桥附近适合取灯影与河道；人多时把相机/手机收紧，注意脚下。", rest: "可安排简餐或小吃，但末段不宜排长队；返程前确认地铁/打车时间。", rain: "下雨可缩短为临河主街 30–45 分钟，避免桥面和石板长时间步行。", reservation: "官方页面显示街区全天免费开放；商户、游船与临时管控以当日公告为准。" },
    photoSpot: [{ name: "通贵桥与山塘河", time: "天色将暗至入夜", tip: "站稳后拍灯笼与水面倒影；桥面人多且湿时不后退取景。" }, { name: "临河主街灯笼", time: "蓝调时刻", tip: "沿街取纵深，控制停留时间，20:25 前离开回站。" }],
    image: photo("https://commons.wikimedia.org/wiki/Special:FilePath/%E8%8B%8F%E5%B7%9E%E5%B1%B1%E5%A1%98%E8%A1%97.jpg?width=960", "苏州山塘街夜景", "张泽华0822 · CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E8%8B%8F%E5%B7%9E%E5%B1%B1%E5%A1%98%E8%A1%97.jpg"),
    sources: [{ label: "苏州文旅 · 山塘街", url: "https://visitsz.wglj.suzhou.com.cn/scenic-spot-detail.aspx?id=35" }]
  },
  stationEnd: {
    id: "stationEnd", name: "苏州站", shortName: "苏州站 · 回站", type: "station", icon: "train-front", stay: 0,
    mapPoint: point("苏州站南广场 / 进站层", "姑苏区苏站路27号", [31.329683, 120.610870], "https://ditu.amap.com/place/B0200172JB"), graph: { x: 1120, y: 365 },
    summary: "建议 20:40–20:45 到站，为进站、安检、找检票口预留时间；20:50 是本规划的硬截止。",
    availability: { status: "open", label: "行程终点" },
    guide: { history: "返程不是附带环节，而是路线可行性的硬条件。", highlights: ["到站后先看站内屏幕", "按车票提示完成安检与候车"], route: ["最晚 20:50 抵达", "确认检票口", "保留少量机动时间"], photo: "不安排拍照点，优先完成进站。", rest: "如时间充裕再在站内购买补给。", rain: "雨天优先选择更稳妥、步行更少的回站方案。", reservation: "按车票及车站规定进站。" },
    sources: [{ label: "苏州站—山塘街官方接驳指引", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml" }]
  }
};

const routes = [
  route("s-p", "stationStart", "pingjiang", [option("taxi", "打车 / 网约车", 20, ["苏州站出站后前往上车点", "约 20 分钟抵达平江路建议入口"], "行李较多、想少走路时", "以实时路况为准"), option("metro", "地铁 + 步行", 40, ["步行至苏州火车站地铁站", "按实时导航换乘前往平江路周边", "出站后步行至街区入口"], "预算优先、雨势较小", "换乘与出站步行较多")]),
  route("s-o", "stationStart", "ouyuan", [option("taxi", "打车 / 网约车", 20, ["苏州站出站后前往上车点", "约 20 分钟至耦园入口"], "想先看小园林", "少走路"), option("metro", "地铁 + 步行", 35, ["进入苏州火车站地铁站", "按实时导航前往相邻站点", "出站步行至耦园"], "不赶时间且天气平稳", "末段需要步行")]),
  route("o-p", "ouyuan", "pingjiang", [option("walk", "步行", 12, ["沿仓街/平江河方向缓步前行", "进入平江路东侧街巷"], "天气舒适、想连贯看古城", "全程平缓，雨天注意石板"), option("taxi", "打车 / 网约车", 8, ["在耦园外围叫车", "至平江路临近入口下车"], "雨天或体力不足", "上车点以实时定位为准")]),
  route("s-h", "stationStart", "humble", [option("taxi", "打车 / 网约车", 18, ["苏州站出站后前往上车点", "抵达拙政园预约入口附近"], "已预约且希望直接入园", "避开换乘"), option("metro", "地铁 + 步行", 30, ["进入苏州火车站地铁站", "按实时导航选择地铁线路", "出站后步行至预约入口"], "高峰期担心道路拥堵", "需预留出站步行")]),
  route("h-m", "humble", "museum", [option("walk", "步行", 5, ["从拙政园出口沿园林路步行", "到苏州博物馆预约入口"], "已连续预约、天气允许", "距离很近"), option("taxi", "短程叫车", 6, ["从园林路附近上车", "按实时上车点到苏博入口"], "暴雨或行动不便", "短途等车时间可能超过车程")]),
  route("h-p", "humble", "pingjiang", [option("taxi", "打车 / 网约车", 12, ["从拙政园出口前往上车点", "至平江路入口下车"], "园林后想减少步行", "以实时路况为准"), option("walk", "步行", 25, ["穿过古城街巷前往平江路", "沿导航选择人行路线"], "天气干爽、体力充足", "雨天不建议")]),
  route("m-p", "museum", "pingjiang", [option("walk", "步行", 15, ["离馆后沿东北街、临顿路方向步行", "进入平江路街区"], "天气干爽、想继续古城慢走", "路口较多，跟随导航"), option("taxi", "打车 / 网约车", 8, ["在博物馆周边上车", "至平江路入口下车"], "降雨或展后体力不足", "短途用时受上车等待影响")]),
  route("p-e", "pingjiang", "eslite", [option("taxi", "打车 / 网约车", 30, ["在平江路外围道路选择上车点", "经古城至园区", "抵达诚品生活苏州"], "舒适、省换乘", "晚高峰用时可能增加"), option("metro", "地铁 + 步行", 42, ["步行至邻近地铁站", "按实时导航换乘至文化博览中心/周边", "步行进入诚品"], "道路拥堵或预算优先", "换乘及末段步行较多")]),
  route("p-s", "pingjiang", "shantang", [option("taxi", "打车 / 网约车", 20, ["到街区外围叫车", "抵达山塘街站/东段附近"], "雨天、带行李或不想走", "古城道路拥堵时留缓冲"), option("metro", "地铁 + 步行", 30, ["步行至临近地铁站", "按实时导航换乘至山塘街站", "出站短步行进入街区"], "周末道路拥堵时", "需完成换乘")]),
  route("p-r", "pingjiang", "stationEnd", [option("taxi", "打车 / 网约车", 20, ["从街区外围上车", "抵达苏州站进站层附近"], "提前收束行程", "预留进站时间"), option("metro", "地铁 + 步行", 35, ["前往临近地铁站", "按实时导航回苏州火车站", "出站后进站"], "路况不稳或预算优先", "请关注末班与进站距离")]),
  route("e-j", "eslite", "jinjihu", [option("walk", "湖畔步行", 10, ["从诚品一侧出发", "沿建议步道至金鸡湖观景段"], "天气干爽、想看傍晚湖景", "仅在非雨天可选", "dry"), option("taxi", "短程叫车", 7, ["在诚品周边上车", "到湖畔指定观景区域"], "少走路且天气稳定", "下车后仍需短步行", "dry")]),
  route("e-s", "eslite", "shantang", [option("taxi", "打车 / 网约车", 40, ["从诚品周边上车", "跨区前往山塘街站/东段"], "雨天、携带物品或少走路", "晚高峰需按实时路况调整"), option("metro", "地铁 + 步行", 48, ["步行至文化博览中心等周边地铁站", "按实时导航换乘至山塘街站", "短步行进入街区"], "道路拥堵或预算优先", "换乘较多，雨天请预留时间")]),
  route("e-r", "eslite", "stationEnd", [option("taxi", "打车 / 网约车", 35, ["从诚品周边上车", "抵达苏州站进站层附近"], "天气恶化时直接回站", "最少折返"), option("metro", "地铁 + 步行", 45, ["进入邻近地铁站", "按实时导航回苏州火车站", "出站后进站"], "道路拥堵或预算优先", "请给进站留余量")]),
  route("j-s", "jinjihu", "shantang", [option("taxi", "打车 / 网约车", 35, ["在湖畔上车点叫车", "抵达山塘街站/东段"], "想保留山塘夜景", "傍晚路况可能波动"), option("metro", "地铁 + 步行", 48, ["前往最近地铁站", "按实时导航换乘至山塘街站", "出站步行进街区"], "周末道路拥堵时", "换乘后注意回站时间")]),
  route("j-r", "jinjihu", "stationEnd", [option("taxi", "打车 / 网约车", 35, ["在湖畔指定点上车", "前往苏州站"], "跳过山塘或时间收紧", "以实时路况为准"), option("metro", "地铁 + 步行", 50, ["前往最近地铁站", "按实时导航回苏州火车站", "出站进站"], "预算优先", "换乘较多")]),
  route("s-r", "shantang", "stationEnd", [option("metro", "地铁 2 号线", 15, ["进入山塘街站", "乘 2 号线 1 站至苏州火车站", "按车站指示进站"], "首选：稳定、少受道路拥堵影响", "请以当日运营与站内指引为准"), option("taxi", "打车 / 网约车", 15, ["从山塘街外围上车点叫车", "前往苏州站"], "降雨、携带行李或站内拥挤时", "等车与道路拥堵可能增加时间")])
];

const routeState = {
  selectedNodes: ["stationStart"],
  selectedLegs: [],
  skipped: new Set(),
  rainMode: false,
  reservationsEnabled: false
};

const state = { cy: null, map: null, markers: [], mapFilter: "all", modalRouteId: null, modalOptionId: null };

function route(id, source, target, options) { return { id, source, target, options }; }
function option(id, title, minutes, steps, suitability, note, condition = "any") { return { id, title, minutes, steps, suitability, note, condition }; }
function point(label, address, gcj02, sourceUrl) { return { label, address, gcj02, sourceUrl, verified: `${CHECKED_AT} · 高德地点坐标转 OpenStreetMap 坐标` }; }
function photo(src, alt, credit, sourceUrl) { return { src, alt, credit, sourceUrl }; }
function routeById(id) { return routes.find((item) => item.id === id); }
function optionById(routeItem, optionId) { return routeItem.options.find((item) => item.id === optionId); }
function formatTime(minutes) { const h = Math.floor(minutes / 60); const m = minutes % 60; return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`; }
function escapeHTML(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
function amapLink(place) { return `https://uri.amap.com/search?keyword=${encodeURIComponent(place)}`; }
function outOfChina(lat, lng) { return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271; }
function transformLatitude(lng, lat) { return -100 + 2 * lng + 3 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng)) + (20 * Math.sin(6 * lng * Math.PI) + 20 * Math.sin(2 * lng * Math.PI)) * 2 / 3 + (20 * Math.sin(lat * Math.PI) + 40 * Math.sin(lat / 3 * Math.PI)) * 2 / 3 + (160 * Math.sin(lat / 12 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30)) * 2 / 3; }
function transformLongitude(lng, lat) { return 300 + lng + 2 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng)) + (20 * Math.sin(6 * lng * Math.PI) + 20 * Math.sin(2 * lng * Math.PI)) * 2 / 3 + (20 * Math.sin(lng * Math.PI) + 40 * Math.sin(lng / 3 * Math.PI)) * 2 / 3 + (150 * Math.sin(lng / 12 * Math.PI) + 300 * Math.sin(lng / 30 * Math.PI)) * 2 / 3; }
function gcj02ToWgs84([lat, lng]) {
  if (outOfChina(lat, lng)) return [lat, lng];
  let dLat = transformLatitude(lng - 105, lat - 35); let dLng = transformLongitude(lng - 105, lat - 35);
  const radLat = lat / 180 * Math.PI; let magic = Math.sin(radLat); magic = 1 - 0.00669342162296594323 * magic * magic;
  const sqrtMagic = Math.sqrt(magic); dLat = dLat * 180 / ((6335552.717000426 * (1 - 0.00669342162296594323)) / (magic * sqrtMagic) * Math.PI); dLng = dLng * 180 / (6378245 / sqrtMagic * Math.cos(radLat) * Math.PI);
  return [lat * 2 - (lat + dLat), lng * 2 - (lng + dLng)];
}
function mapCoords(place) { return gcj02ToWgs84(place.mapPoint.gcj02); }
function isTerminal(id) { return id === "stationEnd"; }
function currentNodeId() { return routeState.selectedNodes.at(-1); }
function currentElapsed() {
  return INITIAL_EXIT_MINUTES + routeState.selectedLegs.reduce((sum, leg) => sum + optionById(routeById(leg.routeId), leg.optionId).minutes, 0) + routeState.selectedNodes.slice(1).reduce((sum, id) => sum + attractions[id].stay, 0);
}
function isPlaceBlocked(id) {
  const place = attractions[id];
  if (!place) return true;
  if (routeState.skipped.has(id)) return true;
  if (routeState.rainMode && id === "jinjihu") return true;
  if (place.availability.status === "reservation" && !routeState.reservationsEnabled) return true;
  return false;
}
function placeBlockReason(id) {
  const place = attractions[id];
  if (routeState.skipped.has(id)) return "已标记为本次不去";
  if (routeState.rainMode && id === "jinjihu") return "雨天 / 少走路模式已跳过湖畔步道";
  if (place?.availability.status === "reservation" && !routeState.reservationsEnabled) return "需要预约，当前未启用预约状态";
  if (routeState.selectedNodes.includes(id)) return "已在当前路线中，避免重复访问";
  return "当前不可选";
}
function optionAllowed(optionItem) { return optionItem.condition !== "dry" || !routeState.rainMode; }
function shortestReturnFrom(nodeId, visited = new Set()) {
  if (nodeId === "stationEnd") return 0;
  const localVisited = new Set(visited);
  localVisited.add(nodeId);
  const candidates = routes.filter((item) => item.source === nodeId).map((item) => {
    if (item.target !== "stationEnd") {
      if (localVisited.has(item.target) || routeState.selectedNodes.includes(item.target) || isPlaceBlocked(item.target)) return Infinity;
    }
    const fastest = item.options.filter(optionAllowed).reduce((best, itemOption) => Math.min(best, itemOption.minutes), Infinity);
    if (!Number.isFinite(fastest)) return Infinity;
    const onward = shortestReturnFrom(item.target, localVisited);
    if (!Number.isFinite(onward)) return Infinity;
    return fastest + (item.target === "stationEnd" ? 0 : attractions[item.target].stay) + onward;
  });
  return candidates.length ? Math.min(...candidates) : Infinity;
}
function candidateStatus(routeItem) {
  if (routeItem.source !== currentNodeId()) return { selectable: false, reason: "请先沿当前路线完成上一站" };
  if (isTerminal(currentNodeId())) return { selectable: false, reason: "已回到苏州站，本次路线已完成" };
  if (routeState.selectedNodes.includes(routeItem.target)) return { selectable: false, reason: "已在当前路线中，避免重复访问" };
  if (isPlaceBlocked(routeItem.target)) return { selectable: false, reason: placeBlockReason(routeItem.target) };
  const eligibleOptions = routeItem.options.filter(optionAllowed).filter((itemOption) => {
    const onward = shortestReturnFrom(routeItem.target, new Set([routeItem.source]));
    return Number.isFinite(onward) && currentElapsed() + itemOption.minutes + attractions[routeItem.target].stay + onward <= RETURN_DEADLINE;
  });
  if (!eligibleOptions.length) return { selectable: false, reason: "按现有时间与最短回站路径，无法在 20:50 前回到苏州站" };
  return { selectable: true, options: eligibleOptions };
}
function getDirectRoute(targetId) { return routes.find((item) => item.source === currentNodeId() && item.target === targetId); }
function selectedLegForRoute(routeId) { return routeState.selectedLegs.find((item) => item.routeId === routeId); }
function compactTransportName(title) { return title.replace(" / 网约车", "").replace("地铁 + 步行", "地铁").replace("短程叫车", "打车"); }
function edgeLabel(routeItem) {
  const selectedLeg = selectedLegForRoute(routeItem.id);
  if (selectedLeg) {
    const selectedOption = optionById(routeItem, selectedLeg.optionId);
    return `已选 · ${compactTransportName(selectedOption.title)} · ${selectedOption.minutes} 分钟`;
  }
  const availableOptions = routeItem.options.filter(optionAllowed);
  return availableOptions.length ? `最快 ${Math.min(...availableOptions.map((item) => item.minutes))} 分钟起` : "雨天停用";
}
function estimateReturn() {
  const elapsed = currentElapsed();
  if (isTerminal(currentNodeId())) return START_MINUTES + elapsed;
  const remainder = shortestReturnFrom(currentNodeId());
  return Number.isFinite(remainder) ? START_MINUTES + elapsed + remainder : Infinity;
}
function returnStatus() {
  const projected = estimateReturn();
  if (!Number.isFinite(projected)) return { kind: "critical", label: "当前无可行回站路径", text: "请撤销后重新选择" };
  const buffer = RETURN_DEADLINE - projected;
  if (buffer < 0) return { kind: "critical", label: "无法按时回站", text: `晚 ${Math.abs(buffer)} 分钟` };
  if (buffer <= 25) return { kind: "warning", label: "回站缓冲较少", text: `还剩 ${buffer} 分钟缓冲` };
  return { kind: "ok", label: "可在截止前回站", text: `预计最早 ${formatTime(projected)} 回站，缓冲 ${buffer} 分钟` };
}
function renderIcons(scope = document) { if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 }, icons: window.lucide.icons, nameAttr: "data-lucide" }); }

function buildGraph() {
  const elements = [
    ...Object.values(attractions).map((place) => ({ data: { id: place.id, label: place.shortName, type: place.type, icon: place.icon }, position: place.graph })),
    ...routes.map((item) => ({ data: { id: item.id, source: item.source, target: item.target, label: edgeLabel(item) } }))
  ];
  state.cy = cytoscape({
    container: document.getElementById("cy"), elements, layout: { name: "preset", fit: true, padding: 38 }, wheelSensitivity: 0.2,
    style: [
      { selector: "node", style: { "background-color": "#f7f2e8", "border-color": "#9b7454", "border-width": 2, label: "data(label)", color: "#173f37", "font-family": "Noto Serif SC, serif", "font-size": 12, "font-weight": 700, "text-valign": "center", "text-halign": "center", width: 76, height: 76, "text-wrap": "wrap", "text-max-width": 65, "overlay-opacity": 0 } },
      { selector: "node[type = 'station']", style: { "background-color": "#173f37", "border-color": "#173f37", color: "#fffaf1", shape: "round-rectangle", width: 90, height: 58 } },
      { selector: "node[type = 'reservation']", style: { "border-style": "dashed", "border-color": "#bb6f35" } },
      { selector: "node[type = 'optional']", style: { "border-color": "#b89a52" } },
      { selector: "edge", style: { width: 2, "line-color": "#b7c2bc", "target-arrow-color": "#b7c2bc", "target-arrow-shape": "triangle", "curve-style": "bezier", label: "data(label)", "font-size": 10, color: "#64726c", "text-background-color": "#fffaf1", "text-background-opacity": 1, "text-background-padding": 3, "overlay-opacity": 0 } },
      { selector: ".candidate", style: { "line-color": "#b77c32", "target-arrow-color": "#b77c32", width: 3.5, color: "#80561e", "line-style": "solid" } },
      { selector: ".selected", style: { "line-color": "#2f8170", "target-arrow-color": "#2f8170", width: 4.5, color: "#176051" } },
      { selector: ".current", style: { "background-color": "#2f8170", "border-color": "#2f8170", color: "#ffffff", "border-width": 4 } },
      { selector: ".visited", style: { "background-color": "#e2f0eb", "border-color": "#2f8170" } },
      { selector: ".unavailable", style: { opacity: 0.34 } },
      { selector: ".blocked", style: { "background-color": "#eee8de", "border-color": "#b2aaa0", color: "#7b766f", opacity: 0.58 } },
      { selector: ".focus", style: { "border-color": "#d68b2b", "border-width": 7, "underlay-color": "#f5d48f", "underlay-opacity": 0.55, "underlay-padding": 8 } }
    ]
  });
  state.cy.on("tap", "node", (event) => openPlannerDrawer(event.target.id()));
  state.cy.on("tap", "edge", (event) => openTransport(event.target.id()));
  refreshGraph();
}
function refreshGraph() {
  if (!state.cy) return;
  state.cy.elements().removeClass("candidate selected current visited unavailable blocked");
  const current = currentNodeId();
  state.cy.$id(current).addClass("current");
  routeState.selectedNodes.slice(0, -1).forEach((id) => state.cy.$id(id).addClass("visited"));
  Object.values(attractions).forEach((place) => { if (isPlaceBlocked(place.id) && !routeState.selectedNodes.includes(place.id)) state.cy.$id(place.id).addClass("blocked"); });
  routes.forEach((item) => {
    const edge = state.cy.$id(item.id);
    edge.data("label", edgeLabel(item));
    if (selectedLegForRoute(item.id)) edge.addClass("selected");
    else if (candidateStatus(item).selectable) edge.addClass("candidate");
    else edge.addClass("unavailable");
  });
  renderRouteUI();
}

function openPlannerDrawer(placeId) {
  const place = attractions[placeId];
  const directRoute = getDirectRoute(placeId);
  const directStatus = directRoute ? candidateStatus(directRoute) : null;
  const selected = routeState.selectedNodes.includes(placeId);
  const canSkip = !["stationStart", "stationEnd"].includes(placeId) && !selected;
  const sourceLinks = place.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${escapeHTML(source.label)} ↗</a>`).join("");
  const photoSpotSection = place.photoSpot?.length ? `<details class="guide-section photo-spot-section" open><summary>网红打卡点</summary><figure class="guide-photo" data-photo-wrap><img data-photo-image src="${escapeHTML(place.image.src)}" alt="${escapeHTML(place.image.alt)}" loading="lazy" referrerpolicy="no-referrer"/><div class="image-fallback"><i data-lucide="image-off"></i><span>参考图片暂不可用</span></div><figcaption><span>${escapeHTML(place.image.alt)}</span><a href="${place.image.sourceUrl}" target="_blank" rel="noreferrer">${escapeHTML(place.image.credit)} ↗</a></figcaption></figure><ol class="photo-spot-list">${place.photoSpot.map((spot) => `<li><b>${escapeHTML(spot.name)}</b><span>${escapeHTML(spot.time)} · ${escapeHTML(spot.tip)}</span></li>`).join("")}</ol></details>` : "";
  document.getElementById("drawer-content").innerHTML = `
    <div class="drawer-kicker"><span class="status-pill ${place.availability.status}">${escapeHTML(place.availability.label)}</span><span>资料核验：${CHECKED_AT}</span></div>
    <h2>${escapeHTML(place.name)}</h2><p class="drawer-lede">${escapeHTML(place.summary)}</p>
    <div class="guide-meta"><span><i data-lucide="clock-3"></i>建议停留 ${place.stay || "—"} 分钟</span><span><i data-lucide="ticket"></i>${escapeHTML(place.guide.reservation)}</span></div>
    <details class="guide-section" open><summary>怎么玩</summary><p>${escapeHTML(place.guide.history)}</p><h3>核心看点</h3><ul>${place.guide.highlights.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul><h3>推荐游览动线</h3><ol>${place.guide.route.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol></details>
    <details class="guide-section"><summary>拍照与休息</summary><p><b>拍照：</b>${escapeHTML(place.guide.photo)}</p><p><b>休息 / 餐饮：</b>${escapeHTML(place.guide.rest)}</p></details>
    ${photoSpotSection}
    <details class="guide-section"><summary>预约、避雨与导航</summary><p><b>预约与费用：</b>${escapeHTML(place.guide.reservation)}</p><p><b>避雨方案：</b>${escapeHTML(place.guide.rain)}</p><a class="inline-action" href="${amapLink(place.name)}" target="_blank" rel="noreferrer"><i data-lucide="navigation"></i>用高德查看实时导航</a></details>
    <section class="guide-sources"><p>官方资料与核验日期</p>${sourceLinks}</section>
    <div class="drawer-actions">
      ${directStatus?.selectable ? `<button class="primary-button" data-open-route="${directRoute.id}" type="button"><i data-lucide="plus"></i>作为下一站加入</button>` : ""}
      ${directStatus && !directStatus.selectable && !selected ? `<p class="action-hint">当前不可加入：${escapeHTML(directStatus.reason)}</p>` : ""}
      ${place.availability.status === "reservation" && !routeState.reservationsEnabled ? `<button class="outline-button" data-enable-reservation type="button"><i data-lucide="badge-check"></i>我已完成预约，启用预约分支</button>` : ""}
      ${place.availability.status === "reservation" && routeState.reservationsEnabled ? `<p class="action-hint">预约分支已启用；仍请以本人订单的日期、时段与入园要求为准。</p>` : ""}
      ${selected && placeId !== "stationStart" ? `<p class="action-hint">该景点已经在路线中。如需调整，请在“当前所选路线”删除该站及后续安排。</p>` : ""}
      ${canSkip ? `<button class="text-button" data-skip-place="${placeId}" type="button">${routeState.skipped.has(placeId) ? "恢复为备选" : "本次不去"}</button>` : ""}
    </div>`;
  const drawer = document.getElementById("detail-drawer");
  drawer.classList.add("is-open"); document.getElementById("drawer-scrim").classList.add("is-visible");
  drawer.querySelector("[data-open-route]")?.addEventListener("click", () => openTransport(directRoute.id));
  drawer.querySelector("[data-skip-place]")?.addEventListener("click", (event) => toggleSkip(event.currentTarget.dataset.skipPlace));
  drawer.querySelector("[data-enable-reservation]")?.addEventListener("click", () => { routeState.reservationsEnabled = true; refreshGraph(); openPlannerDrawer(placeId); });
  bindImageFallback(drawer);
  renderIcons(drawer);
}
function bindImageFallback(scope) {
  scope.querySelectorAll("[data-photo-image]").forEach((image) => image.addEventListener("error", () => image.closest("[data-photo-wrap]")?.classList.add("is-fallback"), { once: true }));
}
function closeDrawer() { document.getElementById("detail-drawer").classList.remove("is-open"); document.getElementById("drawer-scrim").classList.remove("is-visible"); }
function toggleSkip(placeId) {
  if (routeState.skipped.has(placeId)) routeState.skipped.delete(placeId); else routeState.skipped.add(placeId);
  closeDrawer(); refreshGraph(); renderMapMarkers();
}

function openTransport(routeId) {
  const routeItem = routeById(routeId);
  const status = candidateStatus(routeItem);
  const alreadySelected = selectedLegForRoute(routeId);
  state.modalRouteId = routeId;
  state.modalOptionId = status.options?.[0]?.id || alreadySelected?.optionId || routeItem.options.find(optionAllowed)?.id || null;
  renderTransportModal();
  document.getElementById("transport-modal").showModal();
}
function renderTransportModal() {
  const routeItem = routeById(state.modalRouteId); const from = attractions[routeItem.source]; const to = attractions[routeItem.target];
  const status = candidateStatus(routeItem); const chosenLeg = selectedLegForRoute(routeItem.id);
  const canChoose = status.selectable && !chosenLeg;
  const visibleOptions = routeItem.options.filter(optionAllowed);
  const selectedOption = optionById(routeItem, state.modalOptionId) || visibleOptions[0];
  const earliestAfterChoice = selectedOption ? START_MINUTES + currentElapsed() + selectedOption.minutes + to.stay + shortestReturnFrom(to, new Set([from.id])) : Infinity;
  document.getElementById("modal-content").innerHTML = `
    <p class="eyebrow">TRANSPORT OPTIONS</p><h2 id="transport-title">${escapeHTML(from.name)} → ${escapeHTML(to.name)}</h2>
    <p class="modal-lede">${chosenLeg ? "这一段已加入当前路线，可查看已选方案。" : status.selectable ? "选择一项交通方式后，再确认加入路线。" : `这条边暂时不能加入：${escapeHTML(status.reason)}`}</p>
    <div class="transport-options">${visibleOptions.map((itemOption) => {
      const feasible = status.options?.some((item) => item.id === itemOption.id);
      const active = itemOption.id === selectedOption?.id;
      return `<button class="transport-option ${active ? "is-selected" : ""}" data-option-id="${itemOption.id}" type="button" ${(!canChoose || !feasible) ? "disabled" : ""}><span class="transport-option-head"><b>${escapeHTML(itemOption.title)}</b><strong>${itemOption.minutes} 分钟</strong></span><span>${escapeHTML(itemOption.suitability)}</span>${!feasible && canChoose ? "<em>此方案将压缩回站缓冲</em>" : ""}</button>`;
    }).join("")}</div>
    ${selectedOption ? `<section class="transport-detail"><div class="transport-detail-title"><span>${escapeHTML(selectedOption.title)}</span><b>预计 ${selectedOption.minutes} 分钟</b></div><ol>${selectedOption.steps.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol><p><b>适用：</b>${escapeHTML(selectedOption.suitability)}<br><b>提醒：</b>${escapeHTML(selectedOption.note)}</p><a class="inline-action" href="${amapLink(to.name)}" target="_blank" rel="noreferrer"><i data-lucide="navigation"></i>用高德确认实时路线</a></section>` : ""}
    ${selectedOption && Number.isFinite(earliestAfterChoice) && canChoose ? `<p class="arrival-preview">选择后，按最短回站路径预计最早 <b>${formatTime(earliestAfterChoice)}</b> 回到苏州站。</p>` : ""}
    <div class="modal-actions">${canChoose ? `<button id="confirm-transport" class="primary-button" type="button"><i data-lucide="check"></i>选择此方案并继续</button>` : `<button id="close-modal-secondary" class="outline-button" type="button">返回查看路线</button>`}</div>`;
  document.querySelectorAll("[data-option-id]").forEach((button) => button.addEventListener("click", () => { state.modalOptionId = button.dataset.optionId; renderTransportModal(); }));
  document.getElementById("confirm-transport")?.addEventListener("click", commitSelectedTransport);
  document.getElementById("close-modal-secondary")?.addEventListener("click", closeTransportModal);
  renderIcons(document.getElementById("transport-modal"));
}
function commitSelectedTransport() {
  const routeItem = routeById(state.modalRouteId); const status = candidateStatus(routeItem);
  if (!status.selectable || !status.options.some((item) => item.id === state.modalOptionId)) return;
  routeState.selectedLegs.push({ routeId: routeItem.id, optionId: state.modalOptionId });
  routeState.selectedNodes.push(routeItem.target);
  closeTransportModal(); closeDrawer(); refreshGraph(); renderMapMarkers();
}
function closeTransportModal() { const modal = document.getElementById("transport-modal"); if (modal.open) modal.close(); }

function renderRouteUI() {
  const selectedPlaces = routeState.selectedNodes.slice(1).filter((id) => !isTerminal(id));
  const transportMinutes = routeState.selectedLegs.reduce((sum, leg) => sum + optionById(routeById(leg.routeId), leg.optionId).minutes, 0);
  const visitMinutes = routeState.selectedNodes.slice(1).reduce((sum, id) => sum + attractions[id].stay, 0);
  const projected = estimateReturn(); const status = returnStatus(); const completed = isTerminal(currentNodeId());
  const rainHint = routeState.rainMode && routeState.selectedNodes.includes("jinjihu")
    ? "已选金鸡湖；若雨势变大，可撤销至诚品后直接转山塘街或苏州站。"
    : routeState.rainMode ? "雨天模式已隐藏金鸡湖，优先保留室内与少走路分支。" : "";
  document.getElementById("route-count").textContent = String(selectedPlaces.length);
  document.getElementById("route-status-side").textContent = selectedPlaces.length ? `${status.label} · ${Number.isFinite(projected) ? formatTime(projected) : "请调整"}` : "先从苏州站选择第一站";
  document.getElementById("undo-route").disabled = routeState.selectedLegs.length === 0;
  document.getElementById("reset-route").disabled = routeState.selectedLegs.length === 0 && routeState.skipped.size === 0 && !routeState.rainMode;
  const firstCandidates = routes.filter((item) => candidateStatus(item).selectable).map((item) => attractions[item.target].name).join("、");
  document.getElementById("route-banner").innerHTML = completed ? `<div><span class="status-pill open">路线已收束</span><b>已选择回到苏州站</b><p>预计 ${formatTime(START_MINUTES + currentElapsed())} 到站，仍请以实时交通与进站情况为准。</p></div><button class="outline-button" data-view="route" type="button">查看完整行程</button>` : `<div><span class="status-pill ${status.kind}">${status.label}</span><b>${attractions[currentNodeId()].name} 是当前站</b><p>${selectedPlaces.length ? `${status.text}。${rainHint || "选择高亮边继续，或随时撤销重选。"}` : `${rainHint || `可从 ${firstCandidates || "可用分支"} 开始。`}`}</p></div><button class="outline-button" data-view="route" type="button">查看当前路线</button>`;
  document.querySelectorAll("[data-view]").forEach((button) => { button.onclick = () => switchView(button.dataset.view); });
  const overview = document.getElementById("route-overview"); const timeline = document.getElementById("route-timeline");
  overview.innerHTML = `<article class="summary-card"><span>已选景点</span><b>${selectedPlaces.length} 处</b><small>${selectedPlaces.map((id) => attractions[id].name).join(" · ") || "尚未选择"}</small></article><article class="summary-card"><span>已选交通</span><b>${transportMinutes} 分钟</b><small>游览停留 ${visitMinutes} 分钟 · 含出站缓冲 ${INITIAL_EXIT_MINUTES} 分钟</small></article><article class="summary-card ${status.kind}"><span>回站状态</span><b>${Number.isFinite(projected) ? formatTime(projected) : "—"}</b><small>${status.text}</small></article>`;
  if (!routeState.selectedLegs.length) { timeline.innerHTML = `<div class="route-empty"><i data-lucide="route"></i><h3>还没有选定路线</h3><p>回到“景点规划图”，从苏州站出发，点击一条高亮边并确认交通方案。</p><button class="primary-button" data-view="planner" type="button">开始选第一站</button></div>`; renderIcons(timeline); return; }
  let cursor = START_MINUTES;
  let rows = `<article class="timeline-item start"><div class="timeline-time">10:10</div><div class="timeline-dot"></div><div class="timeline-card"><p class="timeline-label">抵达 / 出站缓冲</p><h3>苏州站</h3><p>预留 ${INITIAL_EXIT_MINUTES} 分钟出站与补给，${formatTime(cursor + INITIAL_EXIT_MINUTES)} 开始第一段交通。</p></div></article>`;
  cursor += INITIAL_EXIT_MINUTES;
  routeState.selectedLegs.forEach((leg, index) => {
    const routeItem = routeById(leg.routeId); const transport = optionById(routeItem, leg.optionId); const place = attractions[routeItem.target]; const from = attractions[routeItem.source];
    const depart = cursor; cursor += transport.minutes; const arrival = cursor; const leave = cursor + place.stay; const nodeIndex = index + 1;
    rows += `<article class="timeline-item transport-item"><div class="timeline-time">${formatTime(depart)}</div><div class="timeline-dot"></div><section class="transport-card"><div class="transport-card-heading"><span><i data-lucide="navigation"></i>${escapeHTML(compactTransportName(transport.title))}</span><b>${transport.minutes} 分钟</b></div><p>${escapeHTML(from.name)} → ${escapeHTML(place.name)}</p><details><summary>查看交通步骤</summary><ol>${transport.steps.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol><a href="${amapLink(place.name)}" target="_blank" rel="noreferrer">用高德核验 ↗</a></details></section></article>`;
    rows += `<article class="timeline-item place-item" data-open-place="${place.id}" role="button" tabindex="0" aria-label="查看${escapeHTML(place.name)}旅行攻略"><div class="timeline-time">${formatTime(arrival)}</div><div class="timeline-dot"></div><section class="timeline-card place-card"><div class="timeline-heading"><div><p class="timeline-label">${isTerminal(place.id) ? "回站终点" : "景点停留 · 点击查看攻略"}</p><h3>${escapeHTML(place.name)}</h3></div>${!isTerminal(place.id) ? `<button class="remove-stop" data-remove-index="${nodeIndex}" type="button" aria-label="删除${escapeHTML(place.name)}及后续站点"><i data-lucide="trash-2"></i>删除后续</button>` : ""}</div><p>${isTerminal(place.id) ? `预计到站 ${formatTime(arrival)}。请直接进站并关注检票信息。` : `预计 ${formatTime(arrival)} 到达，建议 ${formatTime(leave)} 左右离开（停留 ${place.stay} 分钟）。`}</p>${!isTerminal(place.id) ? `<span class="place-card-link"><i data-lucide="book-open"></i>查看完整景点介绍与打卡点</span>` : ""}</section></article>`;
    cursor = leave;
  });
  timeline.innerHTML = rows;
  timeline.querySelectorAll("[data-remove-index]").forEach((button) => button.addEventListener("click", (event) => { event.stopPropagation(); removeFromIndex(Number(button.dataset.removeIndex)); }));
  timeline.querySelectorAll("[data-open-place]").forEach((card) => {
    const openPlace = () => openPlannerDrawer(card.dataset.openPlace);
    card.addEventListener("click", (event) => { if (!event.target.closest("button, a, summary, details")) openPlace(); });
    card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openPlace(); } });
  });
  renderIcons(timeline);
}
function removeFromIndex(index) {
  routeState.selectedNodes = routeState.selectedNodes.slice(0, index);
  routeState.selectedLegs = routeState.selectedLegs.slice(0, index - 1);
  refreshGraph(); renderMapMarkers();
}
function undoRoute() { if (!routeState.selectedLegs.length) return; routeState.selectedLegs.pop(); routeState.selectedNodes.pop(); refreshGraph(); renderMapMarkers(); }
function resetRoute() { routeState.selectedNodes = ["stationStart"]; routeState.selectedLegs = []; routeState.skipped.clear(); routeState.rainMode = false; document.getElementById("rain-mode").setAttribute("aria-pressed", "false"); document.getElementById("rain-mode").classList.remove("is-active"); refreshGraph(); renderMapMarkers(); }
function toggleRainMode() { routeState.rainMode = !routeState.rainMode; const button = document.getElementById("rain-mode"); button.classList.toggle("is-active", routeState.rainMode); button.setAttribute("aria-pressed", String(routeState.rainMode)); refreshGraph(); renderMapMarkers(); }

function initMap() {
  state.map = L.map("map", { zoomControl: true }).setView([31.317, 120.66], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap contributors" }).addTo(state.map);
  renderMapMarkers();
}
function mapPlaceVisible(place) {
  if (place.type === "station") return false;
  if (state.mapFilter === "all") return true;
  if (state.mapFilter === "primary") return place.type === "primary";
  return ["optional", "reservation"].includes(place.type);
}
function markerIcon(place) { return L.divIcon({ className: "", html: `<button class="map-marker ${place.type}" type="button" aria-label="${escapeHTML(place.name)}"><i data-lucide="${place.icon}"></i><span>${escapeHTML(place.name)}</span></button>`, iconSize: [92, 38], iconAnchor: [46, 19] }); }
function renderMapMarkers() {
  if (!state.map) return;
  state.markers.forEach((marker) => marker.remove()); state.markers = [];
  Object.values(attractions).filter(mapPlaceVisible).forEach((place) => {
    const marker = L.marker(mapCoords(place), { icon: markerIcon(place), keyboard: true, title: place.name }).addTo(state.map);
    marker.on("click", () => openMapCard(place.id)); state.markers.push(marker);
  });
  renderIcons(document.getElementById("map"));
}
function openMapCard(placeId) {
  const place = attractions[placeId]; const routeItem = getDirectRoute(placeId); const directStatus = routeItem ? candidateStatus(routeItem) : null;
  const card = document.getElementById("map-detail-card");
  card.innerHTML = `<button class="map-card-close" type="button" aria-label="关闭地图详情"><i data-lucide="x"></i></button><span class="status-pill ${place.availability.status}">${escapeHTML(place.availability.label)}</span><h3>${escapeHTML(place.name)}</h3><p>${escapeHTML(place.summary)}</p><div class="map-point"><i data-lucide="map-pin"></i><span><b>定位点：${escapeHTML(place.mapPoint.label)}</b><small>${escapeHTML(place.mapPoint.address)}<br>${escapeHTML(place.mapPoint.verified)}</small></span></div><div class="map-card-actions"><button class="outline-button" data-map-guide="${placeId}" type="button">查看攻略</button>${directStatus?.selectable ? `<button class="primary-button" data-map-add="${routeItem.id}" type="button">设为下一站</button>` : `<span class="map-card-note">${directStatus ? escapeHTML(directStatus.reason) : "可在规划图浏览相关分支"}</span>`}<a class="map-source-link" href="${place.mapPoint.sourceUrl}" target="_blank" rel="noreferrer">查看定位来源 ↗</a><button class="text-button" data-map-focus="${placeId}" type="button">在规划图中定位</button></div>`;
  card.classList.add("is-open");
  card.querySelector(".map-card-close").addEventListener("click", closeMapCard);
  card.querySelector("[data-map-guide]").addEventListener("click", () => { closeMapCard(); switchView("planner"); openPlannerDrawer(placeId); });
  card.querySelector("[data-map-add]")?.addEventListener("click", () => { closeMapCard(); switchView("planner"); openTransport(routeItem.id); });
  card.querySelector("[data-map-focus]").addEventListener("click", () => { closeMapCard(); switchView("planner", placeId); });
  renderIcons(card);
}
function closeMapCard() { const card = document.getElementById("map-detail-card"); card.classList.remove("is-open"); card.innerHTML = ""; }
function focusGraphNode(placeId) { if (!state.cy) return; const node = state.cy.$id(placeId); state.cy.animate({ center: { eles: node }, zoom: Math.max(state.cy.zoom(), 1.25) }, { duration: 350 }); node.flashClass("focus", 800); }
function switchView(view, focusNodeId = null) {
  if (view !== "map") closeMapCard();
  document.querySelectorAll(".view").forEach((element) => element.classList.toggle("is-active", element.id === `${view}-view`));
  document.querySelectorAll(".nav-item, .subnav-item").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view || (view === "route" && button.dataset.view === "planner")));
  if (view === "map") setTimeout(() => state.map?.invalidateSize(), 50);
  if (view === "planner") setTimeout(() => {
    if (!state.cy) return;
    state.cy.resize();
    if (focusNodeId) focusGraphNode(focusNodeId); else state.cy.fit(undefined, 38);
  }, 60);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initChecklist() {
  const checks = [
    { id: "weather", icon: "cloud-rain", title: "查看天气预警", text: "确认降雨与短时强对流预警", href: "https://www.nmc.cn/publish/forecast/AJS/suzhou.html" },
    { id: "notice", icon: "megaphone", title: "查看景区公告", text: "核验平江路、山塘街与金鸡湖状态", href: "https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=3032" },
    { id: "traffic", icon: "navigation", title: "用高德确认当前交通", text: "出发前与离开山塘街前各核验一次", href: "https://uri.amap.com/search?keyword=%E8%8B%8F%E5%B7%9E%E7%AB%99" }
  ];
  const saved = JSON.parse(localStorage.getItem("suzhou-trip-checks") || "{}"); const container = document.getElementById("checklist");
  container.innerHTML = checks.map((item) => `<label class="check-item ${saved[item.id] ? "is-done" : ""}"><input type="checkbox" data-check="${item.id}" ${saved[item.id] ? "checked" : ""}/><span class="check-box"><i data-lucide="check"></i></span><i class="check-icon" data-lucide="${item.icon}"></i><span><b>${item.title}</b><small>${item.text}</small></span><a href="${item.href}" target="_blank" rel="noreferrer" aria-label="打开${item.title}">↗</a></label>`).join("");
  container.querySelectorAll("input").forEach((input) => input.addEventListener("change", () => { saved[input.dataset.check] = input.checked; input.closest(".check-item").classList.toggle("is-done", input.checked); localStorage.setItem("suzhou-trip-checks", JSON.stringify(saved)); }));
  renderIcons(container);
}

document.addEventListener("DOMContentLoaded", () => {
  renderIcons(); buildGraph(); initMap(); initChecklist(); renderRouteUI();
  document.getElementById("close-drawer").addEventListener("click", closeDrawer);
  document.getElementById("drawer-scrim").addEventListener("click", closeDrawer);
  document.getElementById("close-modal").addEventListener("click", closeTransportModal);
  document.getElementById("undo-route").addEventListener("click", undoRoute);
  document.getElementById("reset-route").addEventListener("click", resetRoute);
  document.getElementById("rain-mode").addEventListener("click", toggleRainMode);
  document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => { state.mapFilter = button.dataset.filter; document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button)); closeMapCard(); renderMapMarkers(); }));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeDrawer(); closeMapCard(); } });
});
