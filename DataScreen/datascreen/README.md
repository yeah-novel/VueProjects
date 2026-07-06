# DataScreen 数据大屏 — 从 0 到 1 运行指南

基于 **Vue 2 + Vue Router + ECharts** 的数据可视化大屏项目，包含两种大屏布局与多种图表组件。

---

## 一、环境要求

在运行项目前，请先安装以下工具：

| 工具 | 最低版本 | 推荐版本 |
|------|----------|----------|
| Node.js | >= 6.0.0 | **14.x ~ 18.x**（兼容性更好） |
| npm | >= 3.0.0 | 随 Node 自带即可 |

检查是否已安装：

```bash
node -v
npm -v
```

> **说明**：项目使用 Webpack 3，若使用 Node 20+ 可能遇到兼容问题。建议使用 [nvm](https://github.com/nvm-sh/nvm) 切换到 Node 16 或 18。

---

## 二、获取代码

### 方式 1：克隆整个仓库

```bash
git clone git@github.com:yeah-novel/VueProjects.git
cd VueProjects/DataScreen/datascreen
```

### 方式 2：仅下载 DataScreen 目录

如果仓库中 `DataScreen` 是子目录，进入该目录后再进入实际项目根目录：

```bash
cd DataScreen/datascreen
```

> **注意**：真正的项目根目录是 `datascreen/`，其中包含 `package.json`、`src/`、`build/` 等文件。

---

## 三、安装依赖

在项目根目录（`datascreen/`）执行：

```bash
npm install
```

安装完成后会生成 `node_modules/` 目录。首次安装可能需要几分钟。

若安装较慢，可切换国内镜像：

```bash
npm config set registry https://registry.npmmirror.com
npm install
```

---

## 四、启动开发环境

```bash
npm run dev
```

或使用等价命令：

```bash
npm start
```

启动成功后，终端会显示访问地址，默认：

```
http://localhost:8080
```

在浏览器中打开即可查看大屏页面。

### 页面路由

| 地址 | 说明 |
|------|------|
| `http://localhost:8080/` | 默认跳转至 Screen2 |
| `http://localhost:8080/screen2` | **新版 2×2 网格数据大屏**（仪表盘、柱状图、饼图、折线图） |
| `http://localhost:8080/screen1` | **经典三栏布局大屏**（地图、排行榜、雷达图等） |

### 修改端口（可选）

若 8080 被占用，可指定端口启动：

```bash
PORT=3000 npm run dev
```

或在 `config/index.js` 中修改 `dev.port` 配置。

---

## 五、生产环境构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录，包含：

```
dist/
├── index.html
└── static/
    ├── css/
    └── js/
```

### 预览构建结果

`dist/` 不能直接双击 `index.html` 打开，需要通过 HTTP 服务访问：

```bash
# 方式 1：使用 npx serve（需已安装 Node）
npx serve dist

# 方式 2：使用 Python 简易服务
cd dist && python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

### 分析打包体积（可选）

```bash
npm run build --report
```

---

## 六、其他常用命令

```bash
# 代码规范检查
npm run lint
```

---

## 七、项目结构说明

```
datascreen/
├── build/                  # Webpack 构建配置
├── config/                 # 开发与生产环境配置（端口、路径等）
├── dist/                   # 生产构建输出（build 后生成）
├── src/
│   ├── assets/             # 静态资源（样式、图标）
│   ├── components/
│   │   ├── Echart/         # ECharts 图表组件
│   │   │   ├── MapEchart.vue      # 通用图表容器
│   │   │   ├── defaultOption.js   # 图表默认配置
│   │   │   └── BarEcharts.vue
│   │   └── RankCardWithScroll.vue # 滚动排行榜组件
│   ├── mapJson/            # 模拟数据（地图、表格 JSON）
│   ├── pages/
│   │   ├── Screen1.vue     # 三栏经典大屏
│   │   └── Screen2.vue     # 2×2 网格新版大屏
│   ├── plugins/
│   │   └── echarts.js      # ECharts 按需引入配置
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── App.vue
│   └── main.js             # 入口文件
├── index.html
├── package.json
└── README.md
```

### 核心依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| vue | ^2.5.2 | 前端框架 |
| vue-router | ^3.0.1 | 页面路由 |
| echarts | ^6.0.0 | 图表库 |

---

## 八、常见问题排查

### 1. `npm install` 失败

- 检查 Node / npm 版本是否符合要求
- 删除 `node_modules` 和 `package-lock.json` 后重试：

```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. `npm run dev` 启动报错

- 确认当前目录为 `datascreen/`（包含 `package.json`）
- 8080 端口被占用时，换端口启动：`PORT=3000 npm run dev`
- Node 版本过高时，尝试切换到 Node 16 / 18

### 3. 页面空白或图表不显示

- 打开浏览器开发者工具（F12）查看 Console 报错
- 确认访问的是 `http://localhost:8080`，而非直接打开本地 html 文件
- 开发模式下修改代码后会热更新，可尝试刷新页面

### 4. 构建后页面资源 404

- 生产部署时需将整个 `dist/` 目录上传到 Web 服务器
- 若部署在子路径（如 `/datascreen/`），需修改 `config/index.js` 中的 `build.assetsPublicPath`

### 5. ESLint 警告

构建时可能出现 ESLint 格式警告，一般不影响运行。如需修复：

```bash
npm run lint
```

---

## 九、快速上手检查清单

按顺序完成以下步骤，即可从零运行项目：

- [ ] 安装 Node.js（推荐 16 或 18）
- [ ] 克隆 / 下载代码
- [ ] 进入 `datascreen/` 目录
- [ ] 执行 `npm install`
- [ ] 执行 `npm run dev`
- [ ] 浏览器访问 `http://localhost:8080`
- [ ] 查看 `/screen2` 新版大屏效果
- [ ] （可选）执行 `npm run build` 构建生产包

---

## 十、技术说明

- **Screen1**：左中右三栏布局，包含中国地图、柱状图、雷达图、排行榜、仪表盘等
- **Screen2**：2×2 网格布局，包含半圆仪表盘、安全评分环、柱状图、饼图、双折线图，并支持图表入场动画与定时重播
- 图表配置集中在 `src/components/Echart/defaultOption.js`
- 新增图表类型需在 `MapEchart.vue` 中注册对应的 `echartsType`


