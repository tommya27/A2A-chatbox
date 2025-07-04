# AI API 配置指南

## 常见AI服务配置

### 1. OpenAI GPT
- **Base URL**: `https://api.openai.com`
- **模型名称**: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`
- **API Key**: 从 OpenAI 官网获取

### 2. DeepSeek AI
- **Base URL**: `https://api.deepseek.com`
- **模型名称**: `deepseek-chat`, `deepseek-coder`
- **API Key**: 从 DeepSeek 官网获取
- **注意**: DeepSeek使用标准OpenAI格式，但有特定的模型名称

### 3. Anthropic Claude
- **Base URL**: `https://api.anthropic.com`
- **模型名称**: `claude-3-sonnet-20240229`, `claude-3-haiku-20240307`
- **API Key**: 从 Anthropic 官网获取

### 4. 本地部署 (Ollama)
- **Base URL**: `http://localhost:11434`
- **模型名称**: `llama2`, `codellama`, `mistral`
- **API Key**: 通常不需要，可留空

### 5. 其他兼容 OpenAI API 的服务
- **Base URL**: 根据服务提供商文档
- **模型名称**: 查看服务商支持的模型列表
- **API Key**: 按服务商要求获取

## 故障排除

### 400 Bad Request 错误
1. **检查模型名称**: 确保模型名称与API服务支持的模型匹配
2. **检查Base URL**: 确保URL格式正确，通常以 `/v1` 结尾
3. **检查API Key**: 确保API Key有效且有足够权限

### 401 Unauthorized 错误
- API Key无效或已过期
- 检查API Key是否正确复制

### 403 Forbidden 错误
- API Key没有访问权限
- 账户余额不足
- 超出使用限制

### 429 Too Many Requests 错误
- 请求过于频繁
- 等待一段时间后重试
- 检查API使用限制

## 使用建议

1. **测试连接**: 配置完成后，系统会自动测试API连接
2. **模型选择**: 选择适合的模型，平衡性能和成本
3. **备用方案**: 如果API不可用，系统会自动切换到模拟回复
4. **安全性**: API Key会本地存储，不会上传到服务器

## 调试技巧

1. 打开浏览器开发者工具 (F12)
2. 查看控制台 (Console) 标签页
3. 发送消息时观察API请求和响应日志
4. 根据错误信息调整配置