# 贡献指南 🤝

感谢您对 A2A智能聊天助手 项目的关注！我们欢迎所有形式的贡献，无论是代码、文档、设计还是想法。

## 🎯 项目目标

我们的目标是创建一个**人人都能使用的AI聊天助手**：
- 操作简单，普通用户零门槛上手
- 支持多种AI模型，一个界面搞定所有需求
- 开源免费，让AI技术惠及更多人

## 🚀 如何开始贡献

### 1. 准备工作
```bash
# 1. Fork 本仓库到你的GitHub账户
# 2. 克隆你的Fork到本地
git clone https://github.com/你的用户名/a2a-chatbox.git
cd a2a-chatbox

# 3. 添加上游仓库
git remote add upstream https://github.com/原作者/a2a-chatbox.git
```

### 2. 开发流程
```bash
# 1. 创建新分支
git checkout -b feature/你的功能名称

# 2. 进行开发
# 编辑代码...

# 3. 测试你的更改
# 在浏览器中打开 index.html 测试

# 4. 提交更改
git add .
git commit -m "feat: 添加新功能描述"

# 5. 推送到你的Fork
git push origin feature/你的功能名称

# 6. 创建Pull Request
```

## 📝 贡献类型

### 🐛 Bug修复
- 发现并报告问题
- 修复已知的Bug
- 改进错误处理

### ✨ 新功能
- 添加新的AI模型支持
- 实现新的用户界面功能
- 增加实用工具和插件

### 📚 文档改进
- 完善README和使用指南
- 添加代码注释
- 翻译文档到其他语言

### 🎨 界面优化
- 改进用户体验
- 优化界面设计
- 增强响应式布局

### 🔧 技术改进
- 代码重构和优化
- 性能提升
- 安全性增强

## 📋 代码规范

### JavaScript 规范
```javascript
// 使用驼峰命名
const userName = 'example';
function sendMessage() {}

// 添加注释说明复杂逻辑
/**
 * 发送消息到AI API
 * @param {string} message - 用户消息
 * @param {string} model - AI模型名称
 * @returns {Promise<string>} AI回复
 */
function callAIAPI(message, model) {
    // 实现逻辑...
}

// 使用const/let，避免var
const apiKey = 'your-key';
let currentModel = 'gpt-3.5-turbo';
```

### CSS 规范
```css
/* 使用CSS变量 */
:root {
    --primary-color: #6c5ce7;
    --text-color: #2d3748;
}

/* 类名使用kebab-case */
.chat-container {
    background: var(--primary-color);
}

/* 添加注释说明复杂样式 */
/* 聊天气泡动画效果 */
.message-bubble {
    animation: slideIn 0.3s ease;
}
```

### HTML 规范
```html
<!-- 使用语义化标签 -->
<main class="chat-container">
    <section class="sidebar">
        <header class="sidebar-header">
            <h2>聊天</h2>
        </header>
    </section>
</main>

<!-- 添加必要的accessibility属性 -->
<button aria-label="发送消息" onclick="sendMessage()">
    <i class="fas fa-paper-plane"></i>
</button>
```

## 🧪 测试指南

### 功能测试
1. **基础功能测试**
   - 发送消息
   - 切换AI模型
   - 文件上传
   - 主题切换

2. **兼容性测试**
   - Chrome、Firefox、Safari、Edge
   - 移动端浏览器
   - 不同屏幕尺寸

3. **API测试**
   - 测试不同AI服务的连接
   - 错误处理机制
   - 网络异常情况

### 测试清单
- [ ] 界面正常显示
- [ ] 消息发送接收正常
- [ ] 文件上传功能正常
- [ ] 设置保存和加载正常
- [ ] 移动端适配正常
- [ ] 无JavaScript错误

## 🎨 设计指南

### 设计原则
1. **简洁易用** - 界面简洁，操作直观
2. **一致性** - 保持设计风格统一
3. **可访问性** - 支持键盘导航和屏幕阅读器
4. **响应式** - 适配各种设备和屏幕

### 颜色规范
```css
/* 主色调 */
--primary-color: #6c5ce7;     /* 主要按钮、链接 */
--secondary-color: #667eea;   /* 次要元素 */

/* 文本颜色 */
--text-primary: #2d3748;      /* 主要文本 */
--text-secondary: #718096;    /* 次要文本 */

/* 状态颜色 */
--success-color: #68d391;     /* 成功状态 */
--error-color: #fc8181;       /* 错误状态 */
--warning-color: #fbd38d;     /* 警告状态 */
```

## 📬 提交规范

### Commit Message 格式
```
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

### 类型说明
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 示例
```
feat(chat): 添加语音输入功能

- 集成Web Speech API
- 添加语音识别按钮
- 支持多语言语音输入

Closes #123
```

## 🔍 代码审查

### Pull Request 要求
1. **清晰的描述**
   - 说明更改的内容和原因
   - 列出相关的Issue编号
   - 提供测试步骤

2. **代码质量**
   - 遵循项目代码规范
   - 添加必要的注释
   - 确保代码可读性

3. **测试覆盖**
   - 提供测试用例
   - 确保现有功能不受影响
   - 在多个浏览器中测试

### PR模板
```markdown
## 更改描述
简要描述这个PR的内容

## 更改类型
- [ ] Bug修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 其他

## 测试
- [ ] 在Chrome中测试
- [ ] 在Firefox中测试
- [ ] 在移动设备中测试
- [ ] 添加了测试用例

## 相关Issue
Closes #(issue编号)

## 截图
如果有UI更改，请提供截图
```

## 🌍 国际化

我们欢迎将项目翻译成其他语言：

### 支持的语言
- 中文（简体）- 默认
- English - 计划中
- 日本語 - 计划中
- 한국어 - 计划中

### 翻译指南
1. 在`i18n/`目录下创建语言文件
2. 参考`zh-CN.json`的结构
3. 翻译所有文本内容
4. 测试翻译效果

## 🎁 奖励机制

为了感谢贡献者，我们设立了以下奖励：

### 贡献者徽章
- 🥇 **核心贡献者** - 提交10+个PR
- 🥈 **活跃贡献者** - 提交5+个PR
- 🥉 **新手贡献者** - 提交首个PR

### 特殊认可
- 📝 **文档专家** - 大量文档贡献
- 🎨 **设计师** - UI/UX改进
- 🐛 **Bug猎手** - 发现并修复重要Bug
- 🌍 **翻译专家** - 多语言支持

## 📞 联系我们

如果您有任何问题或建议：

- **GitHub Issues**: [提交问题](https://github.com/tommya27/A2A-chatbox/issues)
- **GitHub Discussions**: [参与讨论](https://github.com/tommya27/A2A-chatbox/discussions)
- **邮箱**: tommya27@users.noreply.github.com

## 📜 行为准则

### 我们的承诺
为了营造一个开放和友好的环境，我们承诺：
- 尊重不同的观点和经验
- 接受建设性的批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为
- 使用性别化语言或图像
- 人身攻击或政治攻击
- 公开或私下骚扰
- 发布他人的私人信息
- 其他在专业环境中不当的行为

## 🙏 致谢

感谢所有为项目做出贡献的开发者：

- 代码贡献者
- 文档编写者
- 设计师
- 测试人员
- 翻译者
- 问题报告者

每一个贡献都让这个项目变得更好！

---

**让我们一起让AI触手可及！** 🚀