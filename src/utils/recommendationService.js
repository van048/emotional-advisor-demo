// AI推荐引擎服务
export default {
  // 季节推断函数（北半球标准）
  determineSeason(date = new Date()) {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
  },

  // 构建大模型Prompt
  buildPrompt({ emotion, time = new Date(), weather, device }) {
    const effectiveSeason = this.determineSeason(time);
    const hour = time.getHours();
    const isNight = hour >= 22 || hour < 6;
    const isRainy = weather?.includes("rain");

    return {
      context: {
        emotion,
        timeOfDay: isNight ? "night" : "day",
        season: effectiveSeason,
        weather: isRainy ? "rain" : "sunny",
        timestamp: time.toISOString()
      },
      deviceSpecs: {
        maxPressure: device?.maxPressure,
        maxTemperature: device?.maxTemperature,
        flowRate: device?.flowRate,
        supportedCoffees: device?.supportedCoffees
      },
      constraints: {
        parameterProtection: true,
        outputFormat: {
          name: "string",
          steps: [{
            id: "string",
            description: "string",
            params: "string"
          }],
          reason: "string"
        }
      }
    };
  },

  // 模拟咖啡机API调用
  eventListeners: {},
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  },
  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(cb => cb(data));
    }
  },
  _makeCoffeeTimeout: null,
  async makeCoffee() {
    console.log('TODO 下发完整参数至咖啡机，咖啡机自动执行全部步骤')
    const delay = Math.floor(Math.random() * (12000 - 8000 + 1)) + 8000;
    this.emit('statusChange', 'started');
    
    return new Promise(resolve => {
      this._makeCoffeeTimeout = setTimeout(() => {
        console.log('TODO 咖啡机上报完成状态')
        this.emit('statusChange', 'completed');
        resolve({ success: true });
      }, delay);
    });
  },

  // 模拟停止咖啡机API调用
  // TODO 发送停止指令，咖啡机停止工作
  async stopCoffee() {
    console.log('TODO 发送停止指令，咖啡机停止工作，状态恢复为开始制作前状态')
    if (this._makeCoffeeTimeout) {
      clearTimeout(this._makeCoffeeTimeout);
      this._makeCoffeeTimeout = null;
      this.emit('statusChange', 'stopped');
      return { success: true };
    }
    return { success: false };
  },

  // 模拟大模型推理
  async simulateLLMInference(prompt) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 基于Prompt内容生成动态推荐
    const { context, deviceSpecs } = prompt;
    const baseRecipe = {
      recipeId: `recipe-${Date.now()}`,
      name: this._generateRecipeName(context, deviceSpecs),
      steps: this._generateRecipeSteps(context, deviceSpecs),
      reasons: this._generateRecipeReasons(context, deviceSpecs),
      // 新增字段
      duration: this._calculateDuration(context, deviceSpecs),
      cupSize: this._determineCupSize(context, deviceSpecs),
      temperature: this._determineTemperature(context, deviceSpecs),
      difficulty: this._calculateDifficulty(context, deviceSpecs)
    };
    
    return baseRecipe;
  },

  // 计算制作总时长（秒）
  _calculateDuration(context, deviceSpecs) {
    const { timeOfDay, season, weather } = context;
    let baseDuration = 120; // 基础时长
    
    // 根据时间段调整
    if (timeOfDay === "night") baseDuration -= 20;
    
    // 根据季节调整
    if (season === "summer") baseDuration -= 15;
    
    // 根据天气调整
    if (weather === "rain") baseDuration += 10;
    
    // 根据设备能力调整
    if (deviceSpecs.maxPressure && deviceSpecs.maxPressure < 15) {
      baseDuration += 15; // 压力不足时增加准备时间
    }
    
    return Math.max(60, Math.min(300, baseDuration)); // 限制在1-5分钟
  },

  // 确定杯量大小
  _determineCupSize(context, deviceSpecs) {
    const { emotion, timeOfDay } = context;
    
    // 优先根据设备能力决定
    if (deviceSpecs.supportedCupSizes?.includes("large")) return "大杯";
    
    // 根据情绪决定
    if (emotion === "tired" || emotion === "sad") return "大杯";
    if (emotion === "anxious" || emotion === "excited") return "小杯";
    
    // 根据时间段决定
    if (timeOfDay === "morning") return "大杯";
    if (timeOfDay === "night") return "小杯";
    
    // 默认中杯
    return "中杯";
  },

  // 确定温度（℃）
  _determineTemperature(context, deviceSpecs) {
    const { season, weather } = context;
    let baseTemp = 65; // 基础温度
    
    // 根据季节调整
    if (season === "winter") baseTemp += 10;
    if (season === "summer") baseTemp -= 10;
    
    // 根据天气调整
    if (weather === "rain") baseTemp += 5;
    
    // 设备能力限制
    if (deviceSpecs.maxTemperature && deviceSpecs.maxTemperature < baseTemp) {
      return deviceSpecs.maxTemperature;
    }
    
    return baseTemp;
  },

  // 计算难度等级
  _calculateDifficulty(context, deviceSpecs) {
    // 基于设备能力判断
    const hasAdvancedFeatures = deviceSpecs.supportedCoffees?.includes("latte") &&
                               deviceSpecs.maxPressure >= 15 &&
                               deviceSpecs.maxTemperature >= 85;
    
    // 基于情绪类型判断
    const isComplexEmotion = ["anxious", "confident", "hopeful"].includes(context.emotion);
    
    // 综合判断逻辑
    if (hasAdvancedFeatures && isComplexEmotion) return "高级";
    if (hasAdvancedFeatures || isComplexEmotion) return "中级";

    return "初级";
  },

  // 生成推荐名称
  // eslint-disable-next-line no-unused-vars
  _generateRecipeName(context, deviceSpecs) {
    const { timeOfDay, weather } = context;
    const baseNames = {
      morning: ["晨曦唤醒", "朝气拿铁", "早安特调"],
      day: ["午后轻享", "活力冰美式", "阳光摩卡"],
      night: ["夜幕低因", "星空拿铁", "晚安特调"]
    };
    const weatherSuffix = weather === "rain" ? "雨天特调" : "经典版";
    const randomName = baseNames[timeOfDay][Math.floor(Math.random() * baseNames[timeOfDay].length)];
    
    return `${randomName}${weatherSuffix}`;
  },

  // 生成推荐步骤
  _generateRecipeSteps(context, deviceSpecs) {
    const steps = [];
    const baseTemp = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
    
    // 准备步骤
    steps.push({
      id: "step1",
      description: "预热设备",
      params: `设备预热至${baseTemp - 5}℃`
    });
    
    // 萃取步骤
    steps.push({
      id: "step2",
      description: "专业萃取",
      params: `水温${baseTemp}℃，压力${deviceSpecs.maxPressure}bar，时长${context.timeOfDay === "night" ? 25 : 30}ml，${context.season === "winter" ? 30 : 25}秒`
    });
    
    // 牛奶处理（如果设备支持）
    if (deviceSpecs.supportedCoffees?.includes("latte")) {
      steps.push({
        id: "step3",
        description: "奶泡制作",
        params: `${deviceSpecs.flowRate ? deviceSpecs.flowRate * 3 : 150}ml全脂牛奶，${baseTemp + 5}℃，${context.weather === "rain" ? "绵密" : "轻盈"}奶泡`
      });
    }
    
    return steps;
  },

  // 生成推荐理由数组
  _generateRecipeReasons(context, deviceSpecs) {
    const { emotion, timeOfDay, season, weather } = context;
    const { maxPressure, maxTemperature } = deviceSpecs;
    
    const scenarios = {
      morning: "适合早晨提神",
      day: "午后能量补充",
      night: "夜间低因享受"
    };
    
    const healthTips = {
      highSugar: "高糖配方，建议适量",
      lowSugar: "低糖健康配方",
      noSugar: "无糖控卡选择"
    };
    
    const randomScenario = scenarios[timeOfDay];
    const randomHealth = healthTips[Object.keys(healthTips)[Math.floor(Math.random() * 3)]];
    
    let emotionChinese;
    switch (emotion) {
      case "happy":
        emotionChinese = "开心";
        break;
      case "sad":
        emotionChinese = "伤心";
        break;
      case "angry":
        emotionChinese = "生气";
        break;
      case "tired":
        emotionChinese = "疲惫";
        break;
      case "excited":
        emotionChinese = "兴奋";
        break;
      case "lonely":
        emotionChinese = "孤独";
        break;
      case "anxious":
        emotionChinese = "焦虑";
        break;
      case "confident":
        emotionChinese = "自信";
        break;
      case "relaxed":
        emotionChinese = "放松";
        break;
      case "calm":
        emotionChinese = "平静";
        break;
      case "content":
        emotionChinese = "满足";
        break;
      case "hopeful":
        emotionChinese = "期望";
        break;
    }
    return [
      `适合情绪：${emotionChinese}，${randomScenario}，${weather === "rain" ? "雨天" : "晴朗"}天气适配`,
      `${randomHealth}，${season}季节特别配方`,
      `设备参数智能适配：${maxPressure}bar压力，${maxTemperature ? maxTemperature + "℃" : "常温"}`
    ];
  },
  
  // 生成推荐理由（旧方法保留用于兼容）
  _generateRecipeReason(context, deviceSpecs) {
    const { emotion, timeOfDay, season, weather } = context;
    const { maxPressure, maxTemperature } = deviceSpecs;
    
    return `${season}的${timeOfDay}时分，${weather === "rain" ? "雨天" : "晴朗"}${emotion}时刻，${maxPressure}bar压力${maxTemperature?maxTemperature+"℃温度适配":""}，${timeOfDay === "night" ? "低因" : "高因"}配方，${weather === "rain" ? "温热驱寒" : "清爽提神"}`;
  },

  // 参数保护处理器
  applyParameterProtection(recipe, device) {
    if (!recipe || !device) return recipe;

    // 参数兼容性处理
    const useSupportsParameter = device && device.supportsParameter;
    const supportPressureSet = device?.supportPressureSet ?? useSupportsParameter;
    const supportTemperatureSet = device?.supportTemperatureSet ?? useSupportsParameter;
    const supportFlowControl = device?.supportFlowControl ?? useSupportsParameter;

    // 压力参数保护
    if (supportPressureSet && device.maxPressure && device.maxPressure < 15) {
      recipe.steps = recipe.steps?.map(step => {
        if (step.id === "step2") {
          return {
            ...step,
            params: step.params.replace(/压力\d+bar/, `压力${device.maxPressure}bar`)
          };
        }
        return step;
      }) || [];
    }

    // 温度参数保护
    if (supportTemperatureSet && device.maxTemperature && device.maxTemperature < 95) {
      recipe.steps = recipe.steps?.map(step => {
        if (step.id === "step2") {
          return {
            ...step,
            params: step.params.replace(/水温\d+℃/, `水温${device.maxTemperature}℃`)
          };
        }
        return step;
      }) || [];
    }

    // 流量控制保护
    if (supportFlowControl && device.flowRate && device.flowRate < 50) {
      recipe.steps = recipe.steps?.map(step => {
        if (step.id === "step3") {
          return {
            ...step,
            params: step.params.replace(/流速\d+ml\/s/, `流速${device.flowRate}ml/s`)
          };
        }
        return step;
      }) || [];
    }

    return recipe;
  },

  // 获取推荐咖啡方案
  // TODO 不使用硬编码映射表 大模型驱动（Prompt包含全部输入维度+食谱库）
  async getRecommendation({ emotion, time = new Date(), weather, device }) {
    try {
      // 构建Prompt
      const prompt = this.buildPrompt({ emotion, time, weather, device });
      
      // 调用模拟大模型
      let recipe = await this.simulateLLMInference(prompt);
      
      // 应用参数保护
      recipe = this.applyParameterProtection(recipe, device);
      
      return {
        recipeId: recipe.recipeId,
        name: recipe.name,
        steps: recipe.steps || [],
        reason: recipe.reason || "使用智能推荐参数",
        reasons: recipe.reasons,
        // 新增字段兼容性处理
        duration: recipe.duration || 120,
        cupSize: recipe.cupSize || "中杯",
        temperature: recipe.temperature || 65,
        difficulty: recipe.difficulty || "中级",
        status: "success",
        metadata: {
          promptSnapshot: prompt,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error("推荐系统错误:", error);
      return {
        status: "error",
        error: "推荐生成失败",
        fallbackRecipe: "经典美式",
        reason: "使用默认配方"
      };
    }
  }
};
