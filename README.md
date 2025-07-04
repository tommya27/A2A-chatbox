# A2A智能聊天助手 🤖

> **Anyone to AI** - 让每个人都能轻松使用AI的智能聊天助手

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/tommya27/A2A-chatbox.svg)](https://github.com/tommya27/A2A-chatbox/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tommya27/A2A-chatbox.svg)](https://github.com/tommya27/A2A-chatbox/network)
[![GitHub issues](https://img.shields.io/github/issues/tommya27/A2A-chatbox.svg)](https://github.com/tommya27/A2A-chatbox/issues)

## 🌟 项目简介

A2A智能聊天助手是一个现代化的Web应用，旨在为用户提供简单、直观、功能丰富的AI聊天体验。无论您是AI新手还是专业用户，都能在这里找到适合自己的使用方式。

### 🎯 核心优势

- **🚀 零门槛** - 无需注册，打开即用
- **🔄 多模型** - 支持多种主流AI模型
- **⚡ 即开即用** - 纯前端实现，响应迅速
- **💰 免费** - 完全开源，永久免费

## ✨ 功能特性

### 🤖 多AI模型支持
- OpenAI GPT系列 (GPT-3.5, GPT-4)
- Anthropic Claude系列
- Google Gemini
- 百度文心一言
- 阿里通义千问
- 腾讯混元
- 智谱ChatGLM
- 月之暗面Kimi
- 零一万物Yi
- 字节豆包
- 讯飞星火
- 更多模型持续添加中...

### 👥 智能助手角色
- **通用助手** - 日常对话和问题解答
- **编程助手** - 代码编写和技术支持
- **写作助手** - 文案创作和内容优化
- **翻译助手** - 多语言翻译服务
- **学习助手** - 知识解答和学习指导
- **创意助手** - 创意思维和头脑风暴
- **商务助手** - 商业分析和决策支持
- **生活助手** - 日常生活建议和规划

### 💬 多对话管理
- 支持多个对话窗口
- 对话历史保存
- 快速切换对话
- 对话导出功能

### 📁 文件上传
- 支持多种文件格式
- 图片识别和分析
- 文档内容解析
- 文件内容对话

### 🎨 现代化界面
- 响应式设计
- 深色/浅色主题
- 流畅的动画效果
- 直观的用户体验

### 📱 移动端适配
- 完美支持手机和平板
- 触摸友好的交互
- 自适应布局

### 💾 本地存储
- 对话历史本地保存
- 设置偏好记忆
- 隐私数据保护

### ⚙️ 灵活配置
- 自定义API配置
- 模型参数调整
- 界面个性化设置

## 🚀 快速开始

### 在线使用

直接访问：[A2A智能聊天助手](https://tommya27.github.io/A2A-chatbox/)

### 本地部署

1. **克隆项目**
   ```bash
   git clone https://github.com/tommya27/A2A-chatbox.git
   cd A2A-chatbox
   ```

2. **启动服务**
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或直接打开index.html文件
   ```

3. **访问应用**
   
   打开浏览器访问 `http://localhost:8000`

## ⚙️ 配置指南

### API配置

1. 点击右上角设置按钮
2. 选择"API配置"选项卡
3. 填入对应AI服务的API密钥
4. 保存配置即可使用

### 支持的AI服务

| 服务商 | 模型 | 官网 |
|--------|------|------|
| OpenAI | GPT-3.5, GPT-4 | [platform.openai.com](https://platform.openai.com) |
| Anthropic | Claude | [console.anthropic.com](https://console.anthropic.com) |
| Google | Gemini | [ai.google.dev](https://ai.google.dev) |
| 百度 | 文心一言 | [cloud.baidu.com](https://cloud.baidu.com) |
| 阿里云 | 通义千问 | [dashscope.aliyun.com](https://dashscope.aliyun.com) |
| 腾讯云 | 混元 | [cloud.tencent.com](https://cloud.tencent.com) |
| 智谱AI | ChatGLM | [open.bigmodel.cn](https://open.bigmodel.cn) |
| 月之暗面 | Kimi | [platform.moonshot.cn](https://platform.moonshot.cn) |
| 零一万物 | Yi | [platform.lingyiwanwu.com](https://platform.lingyiwanwu.com) |
| 字节跳动 | 豆包 | [console.volcengine.com](https://console.volcengine.com) |
| 讯飞 | 星火 | [console.xfyun.cn](https://console.xfyun.cn) |

### 环境变量配置（可选）

创建 `.env` 文件：
```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=https://api.openai.com/v1

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Google
GOOGLE_API_KEY=your_google_api_key

# 其他服务...
```

## 🛠️ 技术栈

- **前端框架**: 原生JavaScript (ES6+)
- **样式**: CSS3 + CSS变量
- **构建工具**: 无需构建，直接运行
- **依赖库**: 
  - Marked.js (Markdown解析)
  - Highlight.js (代码高亮)
  - Font Awesome (图标库)

## 📁 项目结构

```
A2A-chatbox/
├── index.html              # 主页面
├── script.js               # 核心逻辑
├── style.css               # 样式文件
├── README.md               # 项目说明
├── LICENSE                 # 开源协议
├── package.json            # 项目配置
├── .gitignore             # Git忽略文件
├── CONTRIBUTING.md         # 贡献指南
├── CHANGELOG.md            # 更新日志
├── ROADMAP.md              # 发展路线图
└── docs/                   # 文档目录
    ├── API_CONFIG_GUIDE.md # API配置指南
    └── DEPLOYMENT_GUIDE.md # 部署指南
```

## 🎯 项目愿景

### 当前阶段 (v1.0)
- ✅ 基础聊天功能
- ✅ 多模型支持
- ✅ 智能助手角色
- ✅ 响应式界面
- ✅ 本地存储

### 近期规划 (v1.1-v1.5)
- 🔄 插件系统
- 🔄 语音对话
- 🔄 图像生成
- 🔄 文档解析增强
- 🔄 团队协作功能

### 长期目标 (v2.0+)
- 🎯 AI工作流
- 🎯 知识库集成
- 🎯 企业级部署
- 🎯 移动端APP
- 🎯 API服务

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细信息。

### 贡献方式

- 🐛 报告Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码
- 🌍 翻译项目

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目和服务：

- [Marked.js](https://marked.js.org/) - Markdown解析
- [Highlight.js](https://highlightjs.org/) - 代码高亮
- [Font Awesome](https://fontawesome.com/) - 图标库
- 所有AI服务提供商
- 所有贡献者和用户

## 📞 联系我们

- **项目主页**: [https://github.com/tommya27/A2A-chatbox](https://github.com/tommya27/A2A-chatbox)
- **问题反馈**: [GitHub Issues](https://github.com/tommya27/A2A-chatbox/issues)
- **功能建议**: [GitHub Discussions](https://github.com/tommya27/A2A-chatbox/discussions)
- **邮箱**: [tommya27@users.noreply.github.com](mailto:tommya27@users.noreply.github.com)

## ⭐ Star History

如果这个项目对您有帮助，请给我们一个 ⭐ Star！

[![Star History Chart](https://api.star-history.com/svg?repos=tommya27/A2A-chatbox&type=Date)](https://star-history.com/#tommya27/A2A-chatbox&Date)

---

<div align="center">
  <p><strong>让AI触手可及，让智能服务每个人</strong></p>
  <p>Made with ❤️ by A2A Team</p>
</div>