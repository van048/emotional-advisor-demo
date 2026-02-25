<template>
  <div class="recommendation-result">
    <!-- 页面内容保持原有结构 -->
  </div>
</template>

<script>
import recommendationService from "@/utils/recommendationService";

export default {
  name: "RecommendationResult",
  data() {
    return {
      recommendation: null,
    };
  },
  created() {
    const mood = this.$route.params.mood;
    console.log("获取推荐:", mood);
    recommendationService
      .getRecommendation({
        emotion: mood,
        // TODO 定位
        weather: "sunny",
        device: {
          supportPressureSet: true,
          supportTemperatureSet: true,
          supportFlowControl: true,
          maxPressure: 15,
          supportedCoffees: ["espresso", "americano", "latte"],
        },
      })
      .then((response) => {
        this.recommendation = response;
        console.log("获取推荐成功:", response);
      })
      .catch((error) => {
        console.error("获取推荐失败:", error);
      });
  },
};
</script>

<style scoped>
/* 保持原有样式不变 */
</style>
