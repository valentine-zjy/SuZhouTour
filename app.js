/* 静态行程数据：预计时间用于分支判断，实时交通请以高德导航为准。 */
const VERIFY_DATE = "2026-08-21";
const DEADLINE = "20:50";

const attractions = {
  stationStart: { id: "stationStart", label: "苏州站\n10:10 抵达", name: "苏州站", kind: "station", group: "station", pos: { x: 90, y: 340 }, coords: [31.3305, 120.6101], summary: "从这里出发，先在南广场完成出站、洗手间与叫车。", stay: "约 20 分钟出站", hours: "铁路到站", tip: "回程请从山塘街于 20:25 左右出发，20:50 为最晚回站线。", source: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml" },
  ouyuan: { id: "ouyuan", label: "耦园\n可选", name: "耦园", kind: "attraction", group: "optional", pos: { x: 255, y: 205 }, coords: [31.3136, 120.6416], summary: "一宅两园，东、西花园各有意趣，适合想补一段安静园林体验时加入。", stay: "建议 60–75 分钟", hours: "需购票；以当日开放为准", tip: "不在无预约主线内；若加入，压缩平江路停留时间。", source: "https://ylj.suzhou.gov.cn/szsylj/kfsj/wztt.shtml" },
  humble: { id: "humble", label: "拙政园\n需预约", name: "拙政园", kind: "attraction", group: "reservation", pos: { x: 280, y: 82 }, coords: [31.3212, 120.6371], summary: "苏州古典园林代表作，水面、厅堂与荷景构成舒展的游园节奏。", stay: "建议 120 分钟", hours: "实名分时预约", tip: "没有预约不建议临时前往；它会占用主线的午前时间。", source: "https://www.suzhou.gov.cn/szsrmzf/mszx/202606/face4650ec2245ce818aecc53eb4aaaa.shtml" },
  museum: { id: "museum", label: "苏州博物馆\n需预约", name: "苏州博物馆", kind: "attraction", group: "reservation", pos: { x: 468, y: 82 }, coords: [31.3201, 120.6359], summary: "贝聿铭设计的新馆与忠王府相邻，适合偏好建筑和文物的人。", stay: "建议 90 分钟", hours: "分时预约；通常 16:00 停止入馆", tip: "只在已持有上午/中午预约时段时启用。", source: "https://visitsz.wglj.suzhou.com.cn/venue-detail.aspx?Id=37" },
  pingjiang: { id: "pingjiang", label: "平江路\n10:50–13:20", name: "平江路", kind: "attraction", group: "primary", pos: { x: 470, y: 325 }, coords: [31.3167, 120.6305], summary: "沿河慢行的古城街区，适合把苏式午餐、茶馆和小巷留给上午。", stay: "建议 150 分钟（含午餐）", hours: "全天开放、免费", tip: "雨天石板路湿滑；游船不纳入主线，出发前另行核验。", source: "https://visitsz.wglj.suzhou.com.cn/scenic-spot-detail.aspx?id=34" },
  eslite: { id: "eslite", label: "诚品书店\n13:50–15:30", name: "诚品生活苏州", kind: "attraction", group: "primary", pos: { x: 665, y: 245 }, coords: [31.3265, 120.7228], summary: "将书店、文创与餐饮集合在一起，是午后避雨、休息和补电的室内节点。", stay: "建议 100 分钟", hours: "相关场馆约至 21:30；以当日公告为准", tip: "雨势较大时可延长停留，并从这里直接转山塘街。", source: "https://jinjilake.sipac.gov.cn/zuixinzixun_article-342-3550.html" },
  jinjihu: { id: "jinjihu", label: "金鸡湖\n15:40–17:50", name: "金鸡湖（东岸 / 月光码头）", kind: "attraction", group: "primary", pos: { x: 845, y: 245 }, coords: [31.3283, 120.7166], summary: "城市湖景、现代天际线与湖畔步道交织，是天气允许时的傍晚舒展段。", stay: "建议 130 分钟", hours: "开放式景区", tip: "中雨或雷雨时直接跳过；水上项目不纳入本次计划。", source: "https://jinjilake.sipac.gov.cn/zuixinzixun_article-342-4463.html" },
  shantang: { id: "shantang", label: "山塘街\n18:30–20:25", name: "山塘街", kind: "attraction", group: "primary", pos: { x: 1025, y: 380 }, coords: [31.3199, 120.6024], summary: "白居易开凿的七里山塘，保留到夜间的河街灯火和苏式烟火气。", stay: "建议 115 分钟", hours: "街区开放信息以当日公告为准", tip: "20:25 必须离开，步行时注意雨天湿滑与晚间人流。", source: "https://visitsz.wglj.suzhou.com.cn/scenic-spot-detail.aspx?id=35" },
  stationEnd: { id: "stationEnd", label: "苏州站\n20:40–20:45", name: "苏州站（回程）", kind: "station", group: "station", pos: { x: 1210, y: 510 }, coords: [31.3305, 120.6101], summary: "回到车站后按车票信息进站候车。", stay: "20:50 前抵达", hours: "列车 21:25 发车", tip: "这是硬性终点；若实时导航显示延误，请从当前节点直接回站。", source: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml" }
};

const routes = [
  { id: "s-p", source: "stationStart", target: "pingjiang", label: "打车 · 约20分", mode: "打车", duration: 20, primary: true, steps: ["苏州站南广场出站后叫车", "沿苏站路、临顿路方向前往平江路南入口", "在干将东路 / 平江路附近下车，开始慢逛"], alt: "地铁换乘约 35–45 分钟" },
  { id: "s-o", source: "stationStart", target: "ouyuan", label: "打车 · 约20分", mode: "打车", duration: 20, optional: true, steps: ["从苏州站叫车前往小新桥巷", "抵达耦园后按当日票务规则入园"], alt: "加入后请缩短平江路停留" },
  { id: "o-p", source: "ouyuan", target: "pingjiang", label: "步行 · 约12分", mode: "步行", duration: 12, optional: true, steps: ["由耦园沿小巷向平江历史街区方向步行", "抵达平江路北段后向南慢逛"], alt: "雨天可叫车，约 8 分钟" },
  { id: "s-h", source: "stationStart", target: "humble", label: "打车 · 约18分", mode: "打车", duration: 18, optional: true, steps: ["从苏州站南广场叫车前往东北街", "按预约时段经入口入园"], alt: "地铁换乘约 30 分钟" },
  { id: "h-m", source: "humble", target: "museum", label: "步行 · 约5分", mode: "步行", duration: 5, optional: true, steps: ["从拙政园步行至东北街", "按苏博预约时段入馆"], alt: "无预约请改去平江路" },
  { id: "h-p", source: "humble", target: "pingjiang", label: "打车 · 约12分", mode: "打车", duration: 12, optional: true, steps: ["离园后叫车前往平江路", "从北段或中段开始慢逛"], alt: "步行约 25 分钟" },
  { id: "m-p", source: "museum", target: "pingjiang", label: "步行 · 约15分", mode: "步行", duration: 15, optional: true, steps: ["从苏博沿东北街、平江路方向步行", "抵达平江路北段"], alt: "雨天打车约 8 分钟" },
  { id: "p-e", source: "pingjiang", target: "eslite", label: "打车 · 约30分", mode: "打车", duration: 30, primary: true, steps: ["由平江路南入口附近叫车", "向工业园区诚品生活苏州行驶", "进入室内，安排书店与咖啡休息"], alt: "地铁约 40 分钟，需步行与换乘" },
  { id: "p-s", source: "pingjiang", target: "shantang", label: "打车 · 约20分", mode: "打车", duration: 20, optional: true, steps: ["从平江路叫车至山塘街东入口", "将古城与夜游安排合并"], alt: "地铁换乘约 35 分钟" },
  { id: "p-r", source: "pingjiang", target: "stationEnd", label: "打车 · 约20分", mode: "打车", duration: 20, optional: true, steps: ["从平江路直接叫车回苏州站", "提前结束行程，保留车站休息时间"], alt: "地铁换乘约 30 分钟" },
  { id: "e-j", source: "eslite", target: "jinjihu", label: "步行 · 约8分", mode: "步行", duration: 8, primary: true, steps: ["从诚品生活步行至金鸡湖东岸步道", "在月光码头一带看湖景与天际线"], alt: "雨天请直接前往山塘街" },
  { id: "e-s", source: "eslite", target: "shantang", label: "地铁/打车 · 约40分", mode: "少走路备选", duration: 40, optional: true, rain: true, steps: ["雨势较大时从诚品叫车或乘地铁离开", "直接抵达山塘街，跳过金鸡湖步道"], alt: "打车通常更舒适；以实时路况为准" },
  { id: "e-r", source: "eslite", target: "stationEnd", label: "打车 · 约35分", mode: "打车", duration: 35, optional: true, rain: true, steps: ["从诚品生活直接叫车前往苏州站", "适用于持续降雨、身体疲劳或时间不足"], alt: "地铁换乘约 50 分钟" },
  { id: "j-s", source: "jinjihu", target: "shantang", label: "打车 · 约35分", mode: "打车", duration: 35, primary: true, steps: ["从月光码头附近叫车前往山塘街", "避开复杂换乘，保留夜游时间"], alt: "地铁 1 号线转 2 号线约 45 分钟" },
  { id: "j-r", source: "jinjihu", target: "stationEnd", label: "打车 · 约35分", mode: "打车", duration: 35, optional: true, rain: true, steps: ["从金鸡湖直接叫车返回苏州站", "若雨势增强或已接近回站线，放弃山塘街"], alt: "地铁换乘约 50 分钟" },
  { id: "s-r", source: "shantang", target: "stationEnd", label: "地铁2号线 · 约15分", mode: "地铁", duration: 15, primary: true, steps: ["20:25 左右从山塘街前往山塘街站", "乘地铁 2 号线桑田岛方向，1 站至苏州火车站", "出站后按车票信息进站候车"], alt: "雨天或站外拥堵可改打车，约 15 分钟" }
];

const state = { rain: false, disabled: new Set(), mapFilter: "all", cy: null, map: null, markers: [] };
const $ = (selector) => document.querySelector(selector);

function groupLabel(item) {
  if (item.group === "primary") return "主线景点";
  if (item.group === "reservation") return "需预约分支";
  if (item.group === "optional") return "可选分支";
  return item.id === "stationEnd" ? "行程终点" : "行程起点";
}

function amapSearch(name) { return `https://www.amap.com/search?query=${encodeURIComponent(name)}`; }

function initGraph() {
  const elements = [
    ...Object.values(attractions).map((place) => ({ data: { id: place.id, label: place.label }, position: place.pos, classes: `${place.group} ${place.kind === "station" ? "station" : ""}` })),
    ...routes.map((route) => ({ data: { id: route.id, source: route.source, target: route.target, label: route.label }, classes: route.primary ? "primary-edge" : "optional-edge" }))
  ];
  state.cy = cytoscape({
    container: $("#cy"), elements, layout: { name: "preset", fit: true, padding: 48 }, minZoom: .45, maxZoom: 2.1,
    style: [
      { selector: "node", style: { "background-color": "#bd8d48", "border-width": 2, "border-color": "#fffdf8", "width": 128, "height": 58, "shape": "round-rectangle", "label": "data(label)", "font-family": "Noto Sans SC, Microsoft YaHei, sans-serif", "font-size": 11, "font-weight": 700, "color": "#fff", "text-valign": "center", "text-halign": "center", "text-wrap": "wrap", "text-max-width": 105, "text-outline-width": 0, "shadow-blur": 12, "shadow-color": "#8c9d97", "shadow-opacity": .18, "shadow-offset-y": 4 } },
      { selector: "node.primary", style: { "background-color": "#287b67" } },
      { selector: "node.reservation", style: { "background-color": "#b48646" } },
      { selector: "node.station", style: { "background-color": "#365d83", "width": 126 } },
      { selector: "edge", style: { "width": 1.7, "line-color": "#bd8d48", "target-arrow-color": "#bd8d48", "target-arrow-shape": "triangle", "curve-style": "bezier", "label": "data(label)", "font-family": "Noto Sans SC, Microsoft YaHei, sans-serif", "font-size": 9, "font-weight": 600, "color": "#60736c", "text-background-color": "#fffefa", "text-background-opacity": 1, "text-background-padding": 3, "text-rotation": "autorotate", "arrow-scale": .82 } },
      { selector: "edge.primary-edge", style: { "line-color": "#287b67", "target-arrow-color": "#287b67", "width": 2.6, "color": "#286151" } },
      { selector: ".is-disabled", style: { "opacity": .18, "events": "no" } },
      { selector: "node.rain-muted", style: { "opacity": .28, "background-color": "#98a29e" } },
      { selector: "edge.rain-choice", style: { "line-color": "#287b67", "target-arrow-color": "#287b67", "width": 2.6 } },
      { selector: ":selected", style: { "border-color": "#e6b15b", "border-width": 4 } }
    ]
  });
  state.cy.on("tap", "node", (event) => openDrawer(event.target.id()));
  state.cy.on("tap", "edge", (event) => openTransport(event.target.id()));
  refreshGraph();
}

function refreshGraph() {
  if (!state.cy) return;
  Object.keys(attractions).forEach((id) => {
    const node = state.cy.getElementById(id);
    node.removeClass("is-disabled rain-muted");
    if (state.disabled.has(id)) node.addClass("is-disabled");
    if (state.rain && id === "jinjihu") node.addClass("rain-muted");
  });
  routes.forEach((route) => {
    const edge = state.cy.getElementById(route.id);
    edge.removeClass("is-disabled rain-choice");
    if (state.disabled.has(route.source) || state.disabled.has(route.target)) edge.addClass("is-disabled");
    if (state.rain && route.rain) edge.addClass("rain-choice");
    if (state.rain && ["e-j", "j-s"].includes(route.id)) edge.addClass("is-disabled");
  });
}

function openDrawer(id) {
  const place = attractions[id];
  if (!place) return;
  const next = routes.filter((route) => route.source === id && !state.disabled.has(route.target));
  const isDisabled = state.disabled.has(id);
  const rainWarning = state.rain && id === "jinjihu";
  $("#drawer-content").innerHTML = `
    <span class="drawer-tag ${place.group === "primary" ? "" : "optional"}">${isDisabled ? "已标记不去" : rainWarning ? "雨天暂不推荐" : groupLabel(place)}</span>
    <h2>${place.name}</h2>
    <p class="drawer-summary">${place.summary}</p>
    <div class="detail-grid"><div><span>建议停留</span><b>${place.stay}</b></div><div><span>开放 / 状态</span><b>${place.hours}</b></div></div>
    <h3>行程提示</h3><p class="drawer-summary">${place.tip}</p>
    ${place.kind !== "station" ? `<button class="skip-button" id="toggle-place" type="button">${isDisabled ? "重新加入可选图" : "这站不去了，显示其余选择"}</button>` : ""}
    ${next.length ? `<h3>从这里还能去</h3><div class="branch-list">${next.map((route) => `<button class="branch-button" data-route="${route.id}" type="button">${attractions[route.target].name}<small>${route.label}</small></button>`).join("")}</div>` : ""}
    <h3>核验来源</h3><a class="source-link" target="_blank" rel="noreferrer" href="${place.source}">打开官方 / 权威信息 ↗</a>`;
  $("#detail-drawer").classList.add("is-open"); $("#drawer-scrim").classList.add("is-visible");
  const toggle = $("#toggle-place");
  if (toggle) toggle.addEventListener("click", () => { state.disabled.has(id) ? state.disabled.delete(id) : state.disabled.add(id); refreshGraph(); refreshMapMarkers(); openDrawer(id); });
  document.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => openTransport(button.dataset.route)));
}

function closeDrawer() { $("#detail-drawer").classList.remove("is-open"); $("#drawer-scrim").classList.remove("is-visible"); }

function openTransport(id) {
  const route = routes.find((item) => item.id === id); if (!route) return;
  const from = attractions[route.source], to = attractions[route.target];
  $("#modal-content").innerHTML = `
    <p class="modal-eyebrow">交通过程 · 预计时间，出发时请看实时路况</p>
    <h2 id="transport-title">${from.name} → ${to.name}</h2>
    <p>${route.mode}是当前推荐；这段预计 <strong>${route.duration} 分钟</strong>。</p>
    <div class="transport-meta"><span>${route.label}</span><span>备选：${route.alt}</span></div>
    <ol class="steps">${route.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    <a class="modal-action" target="_blank" rel="noreferrer" href="${amapSearch(to.name)}">在高德地图中核验路线 ↗</a>`;
  $("#transport-modal").showModal();
}

function initMap() {
  state.map = L.map("map", { zoomControl: true }).setView([31.323, 120.658], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap contributors" }).addTo(state.map);
  refreshMapMarkers();
}

function refreshMapMarkers() {
  if (!state.map) return;
  state.markers.forEach((marker) => marker.remove()); state.markers = [];
  Object.values(attractions).forEach((place) => {
    const visible = place.kind === "station" || state.mapFilter === "all" || (state.mapFilter === "primary" && place.group === "primary") || (state.mapFilter === "optional" && ["optional", "reservation"].includes(place.group));
    if (!visible) return;
    const cls = place.kind === "station" ? "station" : place.group === "primary" ? "" : "optional";
    const icon = L.divIcon({ className: "", iconSize: [26, 26], iconAnchor: [13, 26], html: `<div class="map-marker ${cls}"><span>${place.kind === "station" ? "站" : "●"}</span></div>` });
    const marker = L.marker(place.coords, { icon }).addTo(state.map);
    marker.bindPopup(`<div class="popup-title">${place.name}</div><span class="popup-tag">${groupLabel(place)}</span><br>${place.stay}<br><a href="#" data-place="${place.id}">查看行程详情</a>`);
    marker.on("click", () => setTimeout(() => { const link = document.querySelector(`[data-place="${place.id}"]`); if (link) link.addEventListener("click", (event) => { event.preventDefault(); openDrawer(place.id); }); }, 0));
    state.markers.push(marker);
  });
}

function initChecklist() {
  const checks = [
    { id: "weather", text: "天气预警", href: "https://www.nmc.cn/publish/forecast/AJS/suzhou.html" },
    { id: "notice", text: "景区公告", href: "https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=3032" },
    { id: "traffic", text: "高德实时交通", href: amapSearch("苏州站") }
  ];
  const saved = JSON.parse(localStorage.getItem("suzhou-trip-checks") || "{}");
  $("#checklist").innerHTML = checks.map((check) => `<label class="check-item"><span><input type="checkbox" data-check="${check.id}" ${saved[check.id] ? "checked" : ""}> ${check.text}</span><a target="_blank" rel="noreferrer" href="${check.href}">打开 ↗</a></label>`).join("");
  document.querySelectorAll("[data-check]").forEach((input) => input.addEventListener("change", () => { saved[input.dataset.check] = input.checked; localStorage.setItem("suzhou-trip-checks", JSON.stringify(saved)); }));
}

function switchView(view) {
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("is-active", item.id === `${view}-view`));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  if (view === "map") setTimeout(() => state.map.invalidateSize(), 80);
}

function setupEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $("#rain-mode").addEventListener("click", () => { state.rain = !state.rain; $("#rain-mode").classList.toggle("is-active", state.rain); $("#rain-mode").setAttribute("aria-pressed", state.rain); $("#rain-mode").textContent = state.rain ? "☂ 已启用雨天方案" : "☂ 雨天 / 少走路"; refreshGraph(); });
  $("#reset-plan").addEventListener("click", () => { state.rain = false; state.disabled.clear(); $("#rain-mode").classList.remove("is-active"); $("#rain-mode").setAttribute("aria-pressed", "false"); $("#rain-mode").textContent = "☂ 雨天 / 少走路"; refreshGraph(); refreshMapMarkers(); closeDrawer(); });
  $("#close-drawer").addEventListener("click", closeDrawer); $("#drawer-scrim").addEventListener("click", closeDrawer);
  $("#close-modal").addEventListener("click", () => $("#transport-modal").close());
  document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => { state.mapFilter = button.dataset.filter; document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button)); refreshMapMarkers(); }));
}

document.addEventListener("DOMContentLoaded", () => { initGraph(); initMap(); initChecklist(); setupEvents(); });
