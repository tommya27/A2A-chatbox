// A2A智能聊天助手 - 核心JavaScript文件
// 版本: 1.0.0
// 作者: A2A Team

// 全局变量
let currentChatId = null;
let chats = {};
let currentAssistant = 'general';
let apiSettings = {
    provider: 'openai',
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1'
};
let userSettings = {
    theme: 'auto',
    language: 'zh-CN',
    fontSize: 'medium',
    autoSave: true,
    soundEnabled: true
};
let uploadedFiles = [];

// 模型配置
const modelConfigs = {
    'gpt-3.5-turbo': {
        name: 'GPT-3.5 Turbo',
        provider: 'openai',
        maxTokens: 4096,
        description: '快速、经济的通用模型'
    },
    'gpt-4': {
        name: 'GPT-4',
        provider: 'openai',
        maxTokens: 8192,
        description: '最强大的推理能力'
    },
    'deepseek-chat': {
        name: 'DeepSeek Chat',
        provider: 'deepseek',
        maxTokens: 4096,
        description: '中文优化的对话模型'
    },
    'deepseek-coder': {
        name: 'DeepSeek Coder',
        provider: 'deepseek',
        maxTokens: 4096,
        description: '专业的编程助手'
    },
    'claude-3-sonnet': {
        name: 'Claude-3 Sonnet',
        provider: 'claude',
        maxTokens: 4096,
        description: '平衡性能与成本'
    },
    'claude-3-haiku': {
        name: 'Claude-3 Haiku',
        provider: 'claude',
        maxTokens: 4096,
        description: '快速响应模型'
    }
};

// 智能助手配置
const assistantConfigs = {
    general: {
        name: '通用助手',
        icon: 'fas fa-robot',
        systemPrompt: '你是一个友善、专业的AI助手。请用简洁明了的语言回答用户的问题，并尽可能提供有用的信息和建议。',
        description: '全能AI助手，可以回答各种问题'
    },
    programmer: {
        name: '编程助手',
        icon: 'fas fa-code',
        systemPrompt: '你是一个专业的编程助手。请帮助用户解决编程问题，提供代码示例，解释技术概念，并给出最佳实践建议。请用代码块格式化代码，并添加必要的注释。',
        description: '专业的编程和技术问题解答'
    },
    writer: {
        name: '写作助手',
        icon: 'fas fa-pen-fancy',
        systemPrompt: '你是一个专业的写作助手。请帮助用户创作文章、故事、文案等内容。注重文字的流畅性、逻辑性和创意性。根据用户需求调整写作风格和语调。',
        description: '帮助您创作文章、故事和文案'
    },
    translator: {
        name: '翻译助手',
        icon: 'fas fa-language',
        systemPrompt: '你是一个专业的翻译助手。请提供准确、自然的翻译服务。在翻译时要考虑语境、文化差异和语言习惯。如果用户没有指定目标语言，请询问。',
        description: '专业的多语言翻译服务'
    },
    business: {
        name: '商务助手',
        icon: 'fas fa-briefcase',
        systemPrompt: '你是一个专业的商务助手。请帮助用户进行商业分析、策划和咨询。提供实用的商业建议，分析市场趋势，协助制定商业计划。',
        description: '商业分析、策划和咨询'
    },
    creative: {
        name: '创意助手',
        icon: 'fas fa-palette',
        systemPrompt: '你是一个富有创意的助手。请帮助用户进行创意设计、艺术创作和灵感激发。提供新颖的想法和创意解决方案。',
        description: '创意设计和艺术灵感'
    }
};

// AI回复模板
const aiResponseTemplates = {
    thinking: '🤔 让我想想...',
    processing: '⚡ 正在处理您的请求...',
    analyzing: '🔍 正在分析...',
    generating: '✨ 正在生成回复...',
    error: '❌ 抱歉，处理您的请求时出现了错误。',
    networkError: '🌐 网络连接出现问题，请检查您的网络设置。',
    apiError: '🔑 API配置可能有问题，请检查您的设置。'
};

// 初始化函数
function init() {
    loadSettings();
    loadChats();
    setupEventListeners();
    createNewChat();
    updateUI();
    
    // 检查API配置
    if (!apiSettings.apiKey) {
        showWelcomeMessage();
    }
}

// 加载设置
function loadSettings() {
    const savedApiSettings = localStorage.getItem('a2a_api_settings');
    if (savedApiSettings) {
        apiSettings = { ...apiSettings, ...JSON.parse(savedApiSettings) };
    }
    
    const savedUserSettings = localStorage.getItem('a2a_user_settings');
    if (savedUserSettings) {
        userSettings = { ...userSettings, ...JSON.parse(savedUserSettings) };
    }
    
    // 应用主题
    applyTheme(userSettings.theme);
    
    // 应用字体大小
    applyFontSize(userSettings.fontSize);
}

// 保存设置
function saveSettings() {
    localStorage.setItem('a2a_api_settings', JSON.stringify(apiSettings));
    localStorage.setItem('a2a_user_settings', JSON.stringify(userSettings));
}

// 加载聊天记录
function loadChats() {
    const savedChats = localStorage.getItem('a2a_chats');
    if (savedChats) {
        chats = JSON.parse(savedChats);
    }
}

// 保存聊天记录
function saveChats() {
    if (userSettings.autoSave) {
        localStorage.setItem('a2a_chats', JSON.stringify(chats));
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // 点击外部关闭弹窗
    document.addEventListener('click', handleOutsideClick);
    
    // 主题变化检测
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
    }
}

// 处理窗口大小变化
function handleResize() {
    // 移动端适配
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// 处理键盘快捷键
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + Enter 发送消息
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        sendMessage();
        event.preventDefault();
    }
    
    // Ctrl/Cmd + N 新建聊天
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        createNewChat();
        event.preventDefault();
    }
    
    // Ctrl/Cmd + , 打开设置
    if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        toggleSettings();
        event.preventDefault();
    }
    
    // ESC 关闭弹窗
    if (event.key === 'Escape') {
        hideAllModals();
    }
}

// 处理点击外部关闭弹窗
function handleOutsideClick(event) {
    // 关闭表情选择器
    const emojiPicker = document.getElementById('emojiPicker');
    if (emojiPicker.style.display === 'block' && !emojiPicker.contains(event.target) && !event.target.closest('.emoji-btn')) {
        emojiPicker.style.display = 'none';
    }
}

// 处理系统主题变化
function handleSystemThemeChange(event) {
    if (userSettings.theme === 'auto') {
        applyTheme('auto');
    }
}

// 应用主题
function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    
    if (theme === 'light') {
        body.classList.add('light-theme');
    } else if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        // auto - 跟随系统
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-theme');
        } else {
            body.classList.add('light-theme');
        }
    }
}

// 应用字体大小
function applyFontSize(size) {
    const body = document.body;
    body.classList.remove('font-small', 'font-medium', 'font-large');
    body.classList.add(`font-${size}`);
}

// 更新UI
function updateUI() {
    updateContactsList();
    updateChatHeader();
    updateModelSelector();
    updateSettingsPanel();
}

// 显示欢迎消息
function showWelcomeMessage() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">
                <i class="fas fa-robot"></i>
            </div>
            <h2>欢迎使用A2A智能聊天助手</h2>
            <p>在开始使用之前，请先配置您的API设置</p>
            <div class="quick-actions">
                <button class="quick-btn primary" onclick="toggleSettings()">
                    <i class="fas fa-cog"></i> 配置API
                </button>
                <button class="quick-btn" onclick="showAssistantSelector()">
                    <i class="fas fa-user-tie"></i> 选择助手
                </button>
            </div>
            <div class="features-preview">
                <h3>主要特性</h3>
                <div class="features-grid">
                    <div class="feature-item">
                        <i class="fas fa-brain"></i>
                        <span>多AI模型支持</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-users"></i>
                        <span>智能助手角色</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>响应式设计</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>本地存储</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 创建新聊天
function createNewChat() {
    const chatId = generateChatId();
    const chat = {
        id: chatId,
        title: '新对话',
        assistant: currentAssistant,
        model: document.getElementById('modelSelect')?.value || 'gpt-3.5-turbo',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    chats[chatId] = chat;
    currentChatId = chatId;
    
    updateContactsList();
    clearMessages();
    saveChats();
    
    // 如果没有API配置，显示欢迎消息
    if (!apiSettings.apiKey) {
        showWelcomeMessage();
    }
}

// 生成聊天ID
function generateChatId() {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// 切换聊天
function switchChat(chatId) {
    if (chats[chatId]) {
        currentChatId = chatId;
        loadChatMessages(chatId);
        updateContactsList();
        updateChatHeader();
    }
}

// 加载聊天消息
function loadChatMessages(chatId) {
    const chat = chats[chatId];
    if (!chat) return;
    
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    
    if (chat.messages.length === 0) {
        if (!apiSettings.apiKey) {
            showWelcomeMessage();
        } else {
            showEmptyChat();
        }
        return;
    }
    
    chat.messages.forEach(message => {
        displayMessage(message.content, message.role, false);
    });
    
    scrollToBottom();
}

// 显示空聊天
function showEmptyChat() {
    const messagesContainer = document.getElementById('messagesContainer');
    const assistant = assistantConfigs[currentAssistant];
    
    messagesContainer.innerHTML = `
        <div class="empty-chat">
            <div class="assistant-info">
                <div class="assistant-avatar">
                    <i class="${assistant.icon}"></i>
                </div>
                <h3>${assistant.name}</h3>
                <p>${assistant.description}</p>
            </div>
            <div class="suggested-prompts">
                <h4>试试这些问题：</h4>
                <div class="prompts-grid">
                    ${getSuggestedPrompts(currentAssistant).map(prompt => 
                        `<button class="prompt-btn" onclick="sendSuggestedPrompt('${prompt}')">${prompt}</button>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// 获取建议的提示词
function getSuggestedPrompts(assistantType) {
    const prompts = {
        general: [
            '你好，请介绍一下自己',
            '今天天气怎么样？',
            '推荐一些学习资源',
            '解释一下人工智能'
        ],
        programmer: [
            '如何学习编程？',
            '解释一下算法复杂度',
            '推荐一些开发工具',
            '什么是设计模式？'
        ],
        writer: [
            '帮我写一篇文章大纲',
            '如何提高写作技巧？',
            '创作一个故事开头',
            '润色这段文字'
        ],
        translator: [
            '翻译这段文字',
            '解释语言差异',
            '学习外语的方法',
            '文化背景对翻译的影响'
        ],
        business: [
            '分析市场趋势',
            '制定商业计划',
            '如何提高销售？',
            '团队管理技巧'
        ],
        creative: [
            '设计一个Logo',
            '创意头脑风暴',
            '色彩搭配建议',
            '艺术风格分析'
        ]
    };
    
    return prompts[assistantType] || prompts.general;
}

// 发送建议的提示词
function sendSuggestedPrompt(prompt) {
    document.getElementById('messageInput').value = prompt;
    sendMessage();
}

// 更新联系人列表
function updateContactsList() {
    const contactsList = document.getElementById('contactsList');
    const chatEntries = Object.values(chats).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    contactsList.innerHTML = chatEntries.map(chat => {
        const assistant = assistantConfigs[chat.assistant];
        const isActive = chat.id === currentChatId;
        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
        const preview = lastMessage ? truncateText(lastMessage.content, 50) : '开始新对话...';
        
        return `
            <div class="contact-item ${isActive ? 'active' : ''}" onclick="switchChat('${chat.id}')">
                <div class="contact-avatar">
                    <i class="${assistant.icon}"></i>
                </div>
                <div class="contact-info">
                    <div class="contact-name">${chat.title}</div>
                    <div class="contact-preview">${preview}</div>
                    <div class="contact-time">${formatTime(chat.updatedAt)}</div>
                </div>
                <div class="contact-actions">
                    <button class="action-btn small" onclick="event.stopPropagation(); deleteChat('${chat.id}')" title="删除聊天">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// 截断文本
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// 格式化时间
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // 1分钟内
        return '刚刚';
    } else if (diff < 3600000) { // 1小时内
        return Math.floor(diff / 60000) + '分钟前';
    } else if (diff < 86400000) { // 24小时内
        return Math.floor(diff / 3600000) + '小时前';
    } else if (diff < 604800000) { // 7天内
        return Math.floor(diff / 86400000) + '天前';
    } else {
        return date.toLocaleDateString();
    }
}

// 更新聊天头部
function updateChatHeader() {
    const currentChat = chats[currentChatId];
    if (!currentChat) return;
    
    const assistant = assistantConfigs[currentChat.assistant];
    document.getElementById('currentChatTitle').textContent = assistant.name;
    
    const status = document.getElementById('chatStatus');
    status.textContent = '在线';
    status.className = 'status online';
}

// 更新模型选择器
function updateModelSelector() {
    const modelSelect = document.getElementById('modelSelect');
    const modelInfo = document.getElementById('modelInfo');
    
    if (modelSelect && modelInfo) {
        const selectedModel = modelSelect.value;
        const config = modelConfigs[selectedModel];
        if (config) {
            modelInfo.textContent = config.name;
            modelInfo.title = config.description;
        }
    }
}

// 更新设置面板
function updateSettingsPanel() {
    // 更新API设置
    const apiProvider = document.getElementById('apiProvider');
    const apiKey = document.getElementById('apiKey');
    const apiBaseUrl = document.getElementById('apiBaseUrl');
    
    if (apiProvider) apiProvider.value = apiSettings.provider;
    if (apiKey) apiKey.value = apiSettings.apiKey;
    if (apiBaseUrl) apiBaseUrl.value = apiSettings.baseUrl;
    
    // 更新通用设置
    const theme = document.getElementById('theme');
    const language = document.getElementById('language');
    const fontSize = document.getElementById('fontSize');
    const autoSave = document.getElementById('autoSave');
    const soundEnabled = document.getElementById('soundEnabled');
    
    if (theme) theme.value = userSettings.theme;
    if (language) language.value = userSettings.language;
    if (fontSize) fontSize.value = userSettings.fontSize;
    if (autoSave) autoSave.checked = userSettings.autoSave;
    if (soundEnabled) soundEnabled.checked = userSettings.soundEnabled;
}

// 发送消息
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message && uploadedFiles.length === 0) return;
    
    if (!apiSettings.apiKey) {
        showError('请先配置API设置');
        toggleSettings();
        return;
    }
    
    // 清空输入框
    messageInput.value = '';
    adjustTextareaHeight(messageInput);
    
    // 构建消息内容
    let messageContent = message;
    if (uploadedFiles.length > 0) {
        messageContent += '\n\n附件：\n' + uploadedFiles.map(file => `- ${file.name}`).join('\n');
    }
    
    // 显示用户消息
    displayMessage(messageContent, 'user');
    
    // 添加到聊天记录
    const currentChat = chats[currentChatId];
    if (currentChat) {
        currentChat.messages.push({
            role: 'user',
            content: messageContent,
            timestamp: new Date().toISOString()
        });
        
        // 更新聊天标题
        if (currentChat.messages.length === 1) {
            currentChat.title = truncateText(message, 30);
        }
        
        currentChat.updatedAt = new Date().toISOString();
    }
    
    // 清空文件
    clearUploadedFiles();
    
    // 显示输入指示器
    showTypingIndicator();
    
    try {
        // 发送API请求
        const response = await sendApiRequest(currentChat.messages);
        
        // 隐藏输入指示器
        hideTypingIndicator();
        
        // 显示AI回复
        displayMessage(response, 'assistant');
        
        // 添加到聊天记录
        currentChat.messages.push({
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString()
        });
        
        currentChat.updatedAt = new Date().toISOString();
        
        // 保存聊天记录
        saveChats();
        updateContactsList();
        
        // 播放提示音
        if (userSettings.soundEnabled) {
            playNotificationSound();
        }
        
    } catch (error) {
        hideTypingIndicator();
        console.error('API请求失败:', error);
        
        let errorMessage = aiResponseTemplates.error;
        if (error.message.includes('network')) {
            errorMessage = aiResponseTemplates.networkError;
        } else if (error.message.includes('api') || error.message.includes('key')) {
            errorMessage = aiResponseTemplates.apiError;
        }
        
        displayMessage(errorMessage, 'assistant', true);
    }
}

// 发送API请求
async function sendApiRequest(messages) {
    const currentChat = chats[currentChatId];
    const assistant = assistantConfigs[currentChat.assistant];
    
    // 构建请求消息
    const requestMessages = [
        {
            role: 'system',
            content: assistant.systemPrompt
        },
        ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }))
    ];
    
    const requestBody = {
        model: currentChat.model,
        messages: requestMessages,
        temperature: 0.7,
        max_tokens: modelConfigs[currentChat.model]?.maxTokens || 4096
    };
    
    const response = await fetch(`${apiSettings.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiSettings.apiKey}`
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
        throw new Error(`API错误: ${data.error.message}`);
    }
    
    return data.choices[0].message.content;
}

// 显示消息
function displayMessage(content, role, isError = false) {
    const messagesContainer = document.getElementById('messagesContainer');
    
    // 如果是第一条消息，清空欢迎界面
    if (messagesContainer.querySelector('.welcome-message') || messagesContainer.querySelector('.empty-chat')) {
        messagesContainer.innerHTML = '';
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role} ${isError ? 'error' : ''}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (role === 'user') {
        avatar.innerHTML = '<i class="fas fa-user"></i>';
    } else {
        const currentChat = chats[currentChatId];
        const assistant = assistantConfigs[currentChat?.assistant || 'general'];
        avatar.innerHTML = `<i class="${assistant.icon}"></i>`;
    }
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    
    // 处理Markdown内容
    if (role === 'assistant' && !isError) {
        messageText.innerHTML = marked.parse(content);
        // 代码高亮
        messageText.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
    } else {
        messageText.textContent = content;
    }
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString();
    
    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTime);
    
    // 添加消息操作按钮
    if (role === 'assistant' && !isError) {
        const messageActions = document.createElement('div');
        messageActions.className = 'message-actions';
        messageActions.innerHTML = `
            <button class="action-btn" onclick="copyMessage(this)" title="复制">
                <i class="fas fa-copy"></i>
            </button>
            <button class="action-btn" onclick="regenerateMessage(this)" title="重新生成">
                <i class="fas fa-redo"></i>
            </button>
        `;
        messageContent.appendChild(messageActions);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// 滚动到底部
function scrollToBottom() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 显示输入指示器
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'flex';
    scrollToBottom();
}

// 隐藏输入指示器
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'none';
}

// 清空消息
function clearMessages() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    
    if (!apiSettings.apiKey) {
        showWelcomeMessage();
    } else {
        showEmptyChat();
    }
}

// 处理键盘事件
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// 调整文本框高度
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// 切换侧边栏
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// 清空当前聊天
function clearCurrentChat() {
    if (!currentChatId) return;
    
    if (confirm('确定要清空当前聊天记录吗？')) {
        const currentChat = chats[currentChatId];
        if (currentChat) {
            currentChat.messages = [];
            currentChat.updatedAt = new Date().toISOString();
            saveChats();
            clearMessages();
            updateContactsList();
        }
    }
}

// 删除聊天
function deleteChat(chatId) {
    if (confirm('确定要删除这个聊天吗？')) {
        delete chats[chatId];
        
        if (currentChatId === chatId) {
            // 如果删除的是当前聊天，切换到其他聊天或创建新聊天
            const remainingChats = Object.keys(chats);
            if (remainingChats.length > 0) {
                switchChat(remainingChats[0]);
            } else {
                createNewChat();
            }
        }
        
        saveChats();
        updateContactsList();
    }
}

// 导出聊天记录
function exportChat() {
    if (!currentChatId) return;
    
    const currentChat = chats[currentChatId];
    if (!currentChat || currentChat.messages.length === 0) {
        showError('当前聊天没有消息可导出');
        return;
    }
    
    const assistant = assistantConfigs[currentChat.assistant];
    let exportContent = `# ${currentChat.title}\n\n`;
    exportContent += `**助手类型**: ${assistant.name}\n`;
    exportContent += `**模型**: ${modelConfigs[currentChat.model]?.name || currentChat.model}\n`;
    exportContent += `**创建时间**: ${new Date(currentChat.createdAt).toLocaleString()}\n\n`;
    exportContent += `---\n\n`;
    
    currentChat.messages.forEach((message, index) => {
        const role = message.role === 'user' ? '用户' : assistant.name;
        exportContent += `## ${role}\n\n${message.content}\n\n`;
    });
    
    // 创建下载链接
    const blob = new Blob([exportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentChat.title}_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccess('聊天记录已导出');
}

// 显示智能助手选择器
function showAssistantSelector() {
    const selector = document.getElementById('assistantSelector');
    selector.style.display = 'flex';
}

// 隐藏智能助手选择器
function hideAssistantSelector() {
    const selector = document.getElementById('assistantSelector');
    selector.style.display = 'none';
}

// 选择助手
function selectAssistant(assistantType) {
    currentAssistant = assistantType;
    
    // 更新当前聊天的助手类型
    if (currentChatId && chats[currentChatId]) {
        chats[currentChatId].assistant = assistantType;
        chats[currentChatId].updatedAt = new Date().toISOString();
        saveChats();
    }
    
    hideAssistantSelector();
    updateChatHeader();
    updateContactsList();
    
    // 如果当前聊天为空，显示空聊天界面
    const currentChat = chats[currentChatId];
    if (currentChat && currentChat.messages.length === 0) {
        showEmptyChat();
    }
    
    showSuccess(`已切换到${assistantConfigs[assistantType].name}`);
}

// 切换设置面板
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel.style.display === 'flex') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'flex';
        updateSettingsPanel();
    }
}

// 显示设置标签
function showSettingsTab(tabName) {
    // 隐藏所有标签内容
    document.querySelectorAll('.settings-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // 移除所有标签按钮的激活状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示选中的标签内容
    const targetTab = document.getElementById(tabName + 'Settings');
    if (targetTab) {
        targetTab.style.display = 'block';
    }
    
    // 激活对应的标签按钮
    event.target.classList.add('active');
}

// 更改API提供商
function changeApiProvider() {
    const provider = document.getElementById('apiProvider').value;
    const baseUrlInput = document.getElementById('apiBaseUrl');
    
    // 设置默认Base URL
    const defaultUrls = {
        openai: 'https://api.openai.com/v1',
        deepseek: 'https://api.deepseek.com/v1',
        claude: 'https://api.anthropic.com/v1',
        custom: ''
    };
    
    baseUrlInput.value = defaultUrls[provider] || '';
    apiSettings.provider = provider;
    apiSettings.baseUrl = baseUrlInput.value;
}

// 测试API连接
async function testApiConnection() {
    const apiKey = document.getElementById('apiKey').value;
    const baseUrl = document.getElementById('apiBaseUrl').value;
    
    if (!apiKey || !baseUrl) {
        showError('请填写API Key和Base URL');
        return;
    }
    
    const testBtn = document.querySelector('.test-btn');
    const originalText = testBtn.textContent;
    testBtn.textContent = '测试中...';
    testBtn.disabled = true;
    
    try {
        const response = await fetch(`${baseUrl}/models`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        
        if (response.ok) {
            showSuccess('API连接测试成功！');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.error('API测试失败:', error);
        showError('API连接测试失败，请检查配置');
    } finally {
        testBtn.textContent = originalText;
        testBtn.disabled = false;
    }
}

// 保存API设置
function saveApiSettings() {
    const apiKey = document.getElementById('apiKey').value;
    const baseUrl = document.getElementById('apiBaseUrl').value;
    const provider = document.getElementById('apiProvider').value;
    
    if (!apiKey || !baseUrl) {
        showError('请填写完整的API配置');
        return;
    }
    
    apiSettings.apiKey = apiKey;
    apiSettings.baseUrl = baseUrl;
    apiSettings.provider = provider;
    
    saveSettings();
    showSuccess('API设置已保存');
    
    // 如果当前显示欢迎消息，切换到空聊天
    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesContainer.querySelector('.welcome-message')) {
        showEmptyChat();
    }
}

// 更改主题
function changeTheme() {
    const theme = document.getElementById('theme').value;
    userSettings.theme = theme;
    applyTheme(theme);
    saveSettings();
}

// 更改语言
function changeLanguage() {
    const language = document.getElementById('language').value;
    userSettings.language = language;
    saveSettings();
    // TODO: 实现多语言支持
}

// 更改字体大小
function changeFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    userSettings.fontSize = fontSize;
    applyFontSize(fontSize);
    saveSettings();
}

// 切换自动保存
function toggleAutoSave() {
    userSettings.autoSave = document.getElementById('autoSave').checked;
    saveSettings();
}

// 切换提示音
function toggleSound() {
    userSettings.soundEnabled = document.getElementById('soundEnabled').checked;
    saveSettings();
}

// 更改模型
function changeModel() {
    const model = document.getElementById('modelSelect').value;
    
    if (currentChatId && chats[currentChatId]) {
        chats[currentChatId].model = model;
        chats[currentChatId].updatedAt = new Date().toISOString();
        saveChats();
    }
    
    updateModelSelector();
}

// 触发文件上传
function triggerFileUpload() {
    document.getElementById('fileInput').click();
}

// 处理文件上传
function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB限制
            showError(`文件 ${file.name} 超过10MB限制`);
            return;
        }
        
        uploadedFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        });
    });
    
    updateFilePreview();
    event.target.value = ''; // 清空input
}

// 更新文件预览
function updateFilePreview() {
    const preview = document.getElementById('filePreview');
    
    if (uploadedFiles.length === 0) {
        preview.style.display = 'none';
        return;
    }
    
    preview.style.display = 'block';
    preview.innerHTML = uploadedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <i class="fas fa-file"></i>
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${formatFileSize(file.size)})</span>
            </div>
            <button class="remove-file-btn" onclick="removeFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// 移除文件
function removeFile(index) {
    uploadedFiles.splice(index, 1);
    updateFilePreview();
}

// 清空上传的文件
function clearUploadedFiles() {
    uploadedFiles = [];
    updateFilePreview();
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 切换表情选择器
function toggleEmojiPicker() {
    const picker = document.getElementById('emojiPicker');
    picker.style.display = picker.style.display === 'block' ? 'none' : 'block';
}

// 插入表情
function insertEmoji(emoji) {
    const input = document.getElementById('messageInput');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    
    input.value = text.substring(0, start) + emoji + text.substring(end);
    input.selectionStart = input.selectionEnd = start + emoji.length;
    input.focus();
    
    adjustTextareaHeight(input);
    toggleEmojiPicker();
}

// 复制消息
function copyMessage(button) {
    const messageText = button.closest('.message-content').querySelector('.message-text');
    const text = messageText.textContent || messageText.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        showSuccess('消息已复制到剪贴板');
    }).catch(() => {
        showError('复制失败');
    });
}

// 重新生成消息
function regenerateMessage(button) {
    const messageElement = button.closest('.message');
    const messageIndex = Array.from(messageElement.parentNode.children).indexOf(messageElement);
    
    // TODO: 实现重新生成功能
    showInfo('重新生成功能开发中...');
}

// 隐藏所有模态框
function hideAllModals() {
    document.getElementById('assistantSelector').style.display = 'none';
    document.getElementById('settingsPanel').style.display = 'none';
    document.getElementById('emojiPicker').style.display = 'none';
}

// 显示成功消息
function showSuccess(message) {
    showToast(message, 'success');
}

// 显示错误消息
function showError(message) {
    showToast(message, 'error');
}

// 显示信息消息
function showInfo(message) {
    showToast(message, 'info');
}

// 显示Toast消息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 触发动画
    setTimeout(() => toast.classList.add('show'), 100);
    
    // 自动移除
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// 播放通知音
function playNotificationSound() {
    // 创建简单的提示音
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 页面卸载前保存数据
window.addEventListener('beforeunload', () => {
    saveChats();
    saveSettings();
});