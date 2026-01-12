# Leavely - 团队休假管理工具

<p align="center">
  <strong>简单高效的团队休假计划管理</strong>
</p>

## ✨ 功能特点

- **休假申请** - 团队成员可以轻松提交休假计划，包括姓名、联系方式和休假时间段
- **日历视图** - 直观的日历展示每天有多少人休假，便于项目资源规划
- **列表视图** - 查看所有休假记录，支持搜索和筛选
- **统计面板** - 显示团队休假统计数据，包括总休假天数、当前休假人数等
- **本地存储** - 数据自动保存到本地，无需后端服务

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: React 18 + Tailwind CSS
- **状态管理**: Zustand
- **日期处理**: date-fns
- **图标**: Lucide React
- **语言**: TypeScript

## 📁 项目结构

```
src/
├── app/                    # Next.js 页面
│   ├── page.tsx           # 首页
│   ├── submit/            # 休假申请页
│   └── dashboard/         # 团队统计页
├── components/            # React 组件
│   ├── Navigation.tsx     # 导航栏
│   ├── DateRangePicker.tsx # 日期选择器
│   ├── CalendarView.tsx   # 日历视图
│   └── LeaveCard.tsx      # 休假卡片
├── store/                 # 状态管理
│   └── leaveStore.ts      # Zustand store
└── types/                 # TypeScript 类型
    └── index.ts
```

## 📝 使用说明

1. **休假计划**: 点击"休假计划"，填写姓名、联系方式，选择休假日期范围
2. **查看统计**: 点击"团队统计"查看日历视图或列表视图
3. **管理记录**: 在列表视图中可以删除休假记录

## 🎨 设计特点

- 深色主题，护眼舒适
- 毛玻璃效果，现代感十足
- 流畅动画，提升用户体验
- 响应式设计，支持移动端

---

Made with ❤️ by Leavely Team

