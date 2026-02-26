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
      reason: this._generateRecipeReason(context, deviceSpecs)
    };

    return baseRecipe;
  },

  // 生成推荐名称
  _generateRecipeName(context, deviceSpecs) {
    const { emotion, timeOfDay, season, weather } = context;
    const deviceAdjective = deviceSpecs.maxPressure < 12 ? "轻压" : "高压";
    const weatherSuffix = weather === "rain" ? "雨天特调" : "经典版";
    
    return `${deviceAdjective}${emotion}·${timeOfDay}${season}${weatherSuffix}`;
  },

  // 生成推荐步骤
  _generateRecipeSteps(context, deviceSpecs) {
    const steps = [];
    
    // 研磨步骤
    steps.push({
      id: "step1",
      description: "研磨咖啡豆",
      params: `${deviceSpecs.maxPressure * 2}g，${context.season === "summer" ? "粗" : "细"}研磨度`
    });
    
    // 萃取步骤
    steps.push({
      id: "step2",
      description: "萃取浓缩咖啡",
      params: `水温${context.weather === "rain" ? 90 : 95}℃，压力${deviceSpecs.maxPressure}bar，${context.timeOfDay === "night" ? 25 : 30}ml，${context.season === "winter" ? 30 : 25}秒`
    });
    
    // 牛奶处理（如果设备支持）
    if (deviceSpecs.supportedCoffees?.includes("latte")) {
      steps.push({
        id: "step3",
        description: "打发牛奶",
        params: `${deviceSpecs.flowRate ? deviceSpecs.flowRate * 3 : 150}ml全脂牛奶，${context.timeOfDay === "night" ? 55 : 65}℃，${context.weather === "rain" ? "厚" : "薄"}奶泡`
      });
    }
    
    return steps;
  },

  // 生成推荐理由
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
