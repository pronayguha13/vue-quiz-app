<template>
  <MDBSpinner grow color="success" v-if="loading" />
  <div class="container" v-else>
    <div class="card score-card">{{ `Your Score: ${score} / 10` }}</div>
    <div class="bubble-block">
      <QuestionBubble
        v-for="(question, index) in questions"
        :key="index"
        :question-number="index + 1"
        :class="{ 'selected-question': isQuestionSelected(index) }"
        :disabled="isQuestionSelected(index)"
      >
      </QuestionBubble>
    </div>
    <QuestionCard
      :question="selectedQuestion"
      v-if="selectedQuestion"
      @question-change="handleQuestionChange"
    />
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
import QuestionCard from "@/components/QuestionCard.vue";
/*-------Local Component Import---------*/
/*-------Constant Import---------*/
import REQUEST_URL from "@/constants/BASE_URL";
/*-------Constant Import---------*/
/*-------Interface Import---------*/
import { QUESTION, RESPONSE, SELECTEDQUESTION } from "@/interfaces/Interface";
import DIFFICULTY from "@/constants/Difficulty";
/*-------Interface Import---------*/
/*-------Ref Declarations---------*/
const loading = ref<boolean>(true);
const difficulty = ref<string>("");
const questions = ref<QUESTION[]>([]);
const selectedQuestion = ref<SELECTEDQUESTION | null>(null);
const score = ref<number>(0);
/*-------Ref Declarations---------*/
/*-------Method Declarations---------*/
/**
 * @description Function to get the difficulty level from the local storage
 * @returns {string} difficultyLevel
 */
const getDifficultyLevel = (): string => {
  const difficultyLevel: string | null = localStorage.getItem("DIFFICULTY");
  return difficultyLevel || "";
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

const isQuestionSelected = (index: number): boolean => {
  if (selectedQuestion.value) {
    if (index !== selectedQuestion.value.index) return false;
  }
  return true;
};
/**
 * @description Function to handle the change of the displayed question in the card
 * @param {number} nextQuestionId
 */
const handleQuestionChange = (
  nextQuestionId: number,
  correct: boolean
): void => {
  if (correct) {
    score.value = score.value + 1;
  }
  if (questions.value.length < nextQuestionId + 1) {
    if (nextQuestionId + 1 === 11) {
      window.alert("Total Score: " + score.value + "/10");
      router.push("/");
    }
  } else {
    const newSelectedQuestion = questions.value[nextQuestionId];
    selectedQuestion.value = {
      index: nextQuestionId,
      question: newSelectedQuestion,
    };
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

watch(questions, () => {
  if (questions.value.length) {
    selectedQuestion.value = {
      index: 0,
      question: questions.value[0],
    };
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
<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.score-card {
  width: 100%;
  max-width: 540px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.bubble-block {
  margin-bottom: 5rem;
}

.selected-question {
  background-color: #fff;
  color: #000;
  box-shadow: 0 0px 9px -4px #3b71ca inset;
}
</style>
