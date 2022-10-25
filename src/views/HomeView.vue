<template>
  <div class="home">
    <i class="fa fa-question-circle fa-4x" aria-hidden="true"></i>
    <IntroCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IntroCard from "@/components/IntroCard.vue";

export default defineComponent({
  name: "HomeView",
  components: { IntroCard },
});
</script>

<style>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
