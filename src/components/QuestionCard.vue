<template>
  <div class="question-card-container">
    <MDBBtn color="primary" floating class="selected-question-number-badge">
      {{ question.index + 1 }}
    </MDBBtn>
    <div class="card">
      <span class="question fs-4 text fw-bold">{{
        question.question.question
      }}</span>
      <div class="options">
        <OptionBlock
          v-for="(option, index) in options"
          :key="index"
          :option="option"
          @correct-selection="handleCorrectSelection"
          @incorrect-selection="handleIncorrectSelection"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*---------Third Party Import---------*/
import { computed, defineProps, defineEmits } from "vue";
import { MDBBtn } from "mdb-vue-ui-kit";
/*---------Third Party Import---------*/
/*---------Interface Import---------*/
import { Option, SELECTEDQUESTION } from "@/interfaces/Interface";
/*---------Interface Import---------*/
/*---------Local Component Import---------*/
import OptionBlock from "./OptionBlock.vue";
/*---------Local Component Import---------*/
/*---------Props declaration---------*/
const props = defineProps({
  question: { type: Object as () => SELECTEDQUESTION | null, required: true },
});
/*---------Props declaration---------*/
/*---------Emit declaration---------*/
const emit = defineEmits(["question-change"]);
/*---------Emit declaration---------*/
/*---------computed---------*/
const options = computed(() => {
  if (props.question) {
    const questionDetails = props.question.question;
    const options = questionDetails.incorrect_answers.map(
      (option, index): Option => {
        return {
          id: index,
          value: option,
          isCorrect: false,
        };
      }
    );
    options.push({
      id: 4,
      value: questionDetails.correct_answer,
      isCorrect: true,
    });
    //shuffle an array
    options.sort(() => Math.random() - 0.5);
    options.forEach((option, index) => (option.id = index));
    return options;
  } else {
    return [];
  }
});
/*---------computed---------*/
/*---------Method Declaration---------*/
/**
 * @description Function to lisiten to the correct-selection event and raise the question-change event
 */
const handleCorrectSelection = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  emit("question-change", props.question!.index + 1, true);
};
/**
 * @description Function to lisiten to the incorrect-selection event and raise the question-change event
 */
const handleIncorrectSelection = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  emit("question-change", props.question!.index + 1, false);
};
/*---------Method Declaration---------*/
</script>

<style scoped>
.question-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 540px;
}

.btn-floating {
  height: 3.5rem;
  width: 3.5rem;
}

.selected-question-number-badge {
  position: absolute;
  top: -43px;
  z-index: 1;
}

.card {
  box-shadow: 0 0px 15px 10px #00000012, 0 4px 6px -2px #0000000d;
}

.question {
  margin: 2rem;
}
</style>
