const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https'); // 引入原生 https 模块

const app = express();
const PORT = 3000;

// 1. 解析 JSON 请求体
app.use(express.json({ limit: '10mb' }));

// 2. 全局 CORS 配置
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'AIGC-USER']
}));

// 3. 手动转发请求（修复 axios.Agent 错误）
app.post('/api/workflows/run', async (req, res) => {
  try {
    // 打印请求信息（排查用）
    console.log('=== 收到请求 ===');
    console.log('请求头：', req.headers);
    console.log('请求体：', req.body);

    // 构建禁用 SSL 验证的 agent（正确写法）
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false // 禁用 SSL 证书验证
    });

    // 构建目标请求
    const response = await axios({
      method: 'POST',
      url: 'https://aigc.midea.com/dify2/server/v1/workflows/run',
      headers: {
        'Authorization': req.headers.authorization || '',
        'AIGC-USER': req.headers['aigc-user'] || '',
        'Content-Type': 'application/json',
        'Origin': 'https://aigc.midea.com',
        'Referer': 'https://aigc.midea.com/'
      },
      data: req.body,
      timeout: 30000, // 30 秒超时
      responseType: 'stream', // 支持流式响应
      httpsAgent: httpsAgent // 使用正确的 https.Agent
    });

    // 转发响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    Object.keys(response.headers).forEach(key => {
      res.setHeader(key, response.headers[key]);
    });

    // 转发响应内容
    response.data.pipe(res);

  } catch (error) {
    // 详细错误日志（关键！）
    console.error('=== 请求失败 ===');
    console.error('错误类型：', error.code || '无');
    console.error('错误信息：', error.message || '无');
    console.error('响应状态：', error.response?.status || '无');
    console.error('响应数据：', error.response?.data || '无');

    // 返回错误响应
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.message || '未知错误',
      code: error.code || 'UNKNOWN',
      target: 'https://aigc.midea.com/dify2/server/v1/workflows/run'
    });
  }
});

// 4. 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ 手动转发服务器启动成功：http://localhost:${PORT}`);
  console.log(`📌 接口地址：http://localhost:${PORT}/api/workflows/run`);
});