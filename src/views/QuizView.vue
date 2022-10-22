<template>
  <MDBSpinner grow color="success" v-if="loading" />
  <div class="container">
    <QuestionBubble
      v-for="(question, index) in questions"
      :key="index"
      :question-number="index + 1"
    >
    </QuestionBubble>
    <QuestionCard />
  </div>
</template>
<script setup lang="ts">
/*-------Third Party Import---------*/
import { ref, watch, onMounted, onUnmounted } from "vue";
import { MDBSpinner } from "mdb-vue-ui-kit";
import axios from "axios";
/*-------Third Party Import---------*/
/*-------Local Import---------*/
import router from "@/router";
/*-------Local Import---------*/
/*-------Local Component Import---------*/
import QuestionBubble from "@/components/QuestionBubble.vue";
/*-------Local Component Import---------*/
/*-------Constant Import---------*/
import REQUEST_URL from "@/constants/BASE_URL";
/*-------Constant Import---------*/
/*-------Interface Import---------*/
import { QUESTION, RESPONSE } from "@/interfaces/Interface";
import DIFFICULTY from "@/constants/Difficulty";
/*-------Interface Import---------*/
/*-------Ref Declarations---------*/
const loading = ref<boolean>(true);
const difficulty = ref<string>("");
const questions = ref<QUESTION[]>([]);
/*-------Ref Declarations---------*/
/*-------Method Declarations---------*/
/**
 * @description Function to get the difficulty level from the local storage
 * @returns {string} difficultyLevel
 */
const getDifficultyLevel = (): string => {
  const difficultyLevel: string = localStorage.getItem("DIFFICULTY") as string;
  return difficultyLevel;
};

const isValidDifficulty = (difficulty: string): boolean => {
  switch (difficulty) {
    case DIFFICULTY.LEVEL.EASY:
    case DIFFICULTY.LEVEL.MEDIUM:
    case DIFFICULTY.LEVEL.HARD:
      return true;
    default:
      return false;
  }
};
const fetchQuestions = async (): Promise<void> => {
  try {
    const response: { data: RESPONSE } = await axios.get(
      `${REQUEST_URL}${difficulty.value}`
    );

    questions.value = response.data.results;
  } catch (error) {
    console.warn("Error");
  } finally {
    loading.value = false;
  }
};
/*-------Method Declarations---------*/
/*-------Watcher---------*/
watch(difficulty, async () => {
  if (difficulty.value.length) {
    fetchQuestions();
  } else {
    window.alert("Failed to fetch questions");
  }
});
/*-------Watcher---------*/
onMounted(() => {
  const fetchedDifficulty: string = getDifficultyLevel();

  if (fetchedDifficulty.length && isValidDifficulty(fetchedDifficulty)) {
    difficulty.value = fetchedDifficulty;
  } else {
    window.alert("Invalid Difficulty");
    router.push("/");
  }
});

onUnmounted(() => {
  difficulty.value = "";
  localStorage.removeItem("DIFFICULTY");
});
</script>
<style scoped></style>
